// LocalStorage service to replace API calls

// Generate a unique ID for new items
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Encryption helpers
const getEncryptionKey = async (password) => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('password-manager-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

const encryptData = async (data, password) => {
  const key = await getEncryptionKey(password);
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encoder.encode(JSON.stringify(data))
  );
  
  return {
    data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: btoa(String.fromCharCode(...iv))
  };
};

const decryptData = async (encryptedData, iv, password) => {
  const key = await getEncryptionKey(password);
  const decoder = new TextDecoder();
  
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: Uint8Array.from(atob(iv), c => c.charCodeAt(0))
    },
    key,
    Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))
  );
  
  return JSON.parse(decoder.decode(decrypted));
};

// Auth services
export const authService = {
  register: async (username, password) => {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.find(user => user.username === username)) {
      throw new Error('Username already exists');
    }
    
    // Hash the password
    const hashedPassword = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(password)
    );
    
    // Create new user with ID
    const newUser = {
      id: generateId(),
      username,
      password: btoa(String.fromCharCode(...new Uint8Array(hashedPassword))),
      createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    return { message: 'User registered successfully', userId: newUser.id };
  },
  
  login: async (username, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Hash the provided password
    const hashedPassword = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(password)
    );
    const hashedPasswordStr = btoa(String.fromCharCode(...new Uint8Array(hashedPassword)));
    
    // Find user with matching credentials
    const user = users.find(u => u.username === username && u.password === hashedPasswordStr);
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    // Create a token (in a real app, this would be a JWT)
    const token = btoa(JSON.stringify({ userId: user.id, username: user.username }));
    
    // Save token to localStorage
    localStorage.setItem('token', token);
    
    return { 
      token, 
      userId: user.id, 
      username: user.username 
    };
  }
};

// Password services
export const passwordService = {
  getAll: async (userId, masterPassword) => {
    // Get all passwords from localStorage
    const allPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    
    // Filter passwords for the current user
    const userPasswords = allPasswords.filter(p => p.userId === userId);
    
    // Decrypt each password
    return Promise.all(userPasswords.map(async (p) => {
      const decrypted = await decryptData(p.encryptedData, p.iv, masterPassword);
      return {
        ...p,
        ...decrypted
      };
    }));
  },
  
  create: async (userId, website, username, password, masterPassword) => {
    // Get existing passwords
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    
    // Encrypt the password data
    const encrypted = await encryptData(
      { website, username, password },
      masterPassword
    );
    
    // Create new password entry
    const newPassword = {
      id: generateId(),
      userId,
      encryptedData: encrypted.data,
      iv: encrypted.iv,
      createdAt: new Date().toISOString()
    };
    
    // Add to passwords array
    passwords.push(newPassword);
    
    // Save to localStorage
    localStorage.setItem('passwords', JSON.stringify(passwords));
    
    return { 
      message: 'Password created successfully', 
      passwordId: newPassword.id 
    };
  },
  
  update: async (id, website, username, password, masterPassword) => {
    // Get existing passwords
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    
    // Find the password to update
    const index = passwords.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Password not found');
    }
    
    // Encrypt the updated password data
    const encrypted = await encryptData(
      { website, username, password },
      masterPassword
    );
    
    // Update the password
    passwords[index] = {
      ...passwords[index],
      encryptedData: encrypted.data,
      iv: encrypted.iv,
      updatedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('passwords', JSON.stringify(passwords));
    
    return { message: 'Password updated successfully' };
  },
  
  delete: (id) => {
    // Get existing passwords
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    
    // Filter out the password to delete
    const filteredPasswords = passwords.filter(p => p.id !== id);
    
    // Save to localStorage
    localStorage.setItem('passwords', JSON.stringify(filteredPasswords));
    
    return { message: 'Password deleted successfully' };
  }
}; 
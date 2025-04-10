require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = process.env.MONGODB_DB_NAME;
let collection;
let usersCollection;

// Root route handler
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Password Manager API',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    endpoints: {
      register: 'POST /api/register',
      login: 'POST /api/login',
      passwords: {
        create: 'POST /api/passwords',
        getAll: 'GET /api/passwords',
        update: 'PUT /api/passwords/:id',
        delete: 'DELETE /api/passwords/:id'
      }
    }
  });
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    collection = db.collection('credentials');
    usersCollection = db.collection('users');

    // User Registration
    app.post('/api/register', async (req, res) => {
      try {
        const { username, password } = req.body;
        
        if (!username || !password) {
          return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const result = await usersCollection.insertOne({
          username,
          password: hashedPassword,
          createdAt: new Date()
        });

        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error creating user' });
      }
    });

    // User Login
    app.post('/api/login', async (req, res) => {
      try {
        const { username, password } = req.body;

        if (!username || !password) {
          return res.status(400).json({ error: 'Username and password are required' });
        }
        
        // Find user
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(400).json({ error: 'Invalid password' });
        }

        res.json({ message: 'Login successful', userId: user._id.toString() });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error logging in' });
      }
    });

    // Save Password
    app.post('/api/passwords', async (req, res) => {
      try {
        const { userId, site, username, password } = req.body;

        if (!userId || !site || !username || !password) {
          return res.status(400).json({ error: 'UserId, site, username, and password are required' });
        }

        const result = await collection.insertOne({
          userId,
          site,
          username,
          password,
          createdAt: new Date()
        });

        res.status(201).json({ message: 'Password saved successfully' });
      } catch (error) {
        console.error('Save password error:', error);
        res.status(500).json({ error: 'Error saving password' });
      }
    });

    // Get All Passwords
    app.get('/api/passwords/:userId', async (req, res) => {
      try {
        const { userId } = req.params;
        const passwords = await collection.find({ userId }).toArray();
        res.json(passwords);
      } catch (error) {
        console.error('Get passwords error:', error);
        res.status(500).json({ error: 'Error fetching passwords' });
      }
    });

    // Update Password
    app.put('/api/passwords/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { site, username, password } = req.body;

        if (!site || !username || !password) {
          return res.status(400).json({ error: 'Site, username, and password are required' });
        }

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid password ID' });
        }

        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { site, username, password, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Password not found' });
        }

        res.json({ message: 'Password updated successfully' });
      } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({ error: 'Error updating password' });
      }
    });

    // Delete Password
    app.delete('/api/passwords/:id', async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid password ID' });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Password not found' });
        }

        res.json({ message: 'Password deleted successfully' });
      } catch (error) {
        console.error('Delete password error:', error);
        res.status(500).json({ error: 'Error deleting password' });
      }
    });

    // Health check route
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        timestamp: new Date(),
        environment: process.env.NODE_ENV
      });
    });

    // Apply error handling middleware
    app.use(errorHandler);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

main().catch(console.error); 
# PassOP - Password Manager

<img src="public/logo.png" alt="PassOP Logo" width="200"/>

PassOP is a modern, secure password management solution designed to help you keep track of your digital credentials safely and efficiently. Built with the latest web technologies, PassOP provides a user-friendly interface while maintaining high security standards.

## 🌟 Features

- **Secure Password Storage**: All passwords are encrypted and stored securely
- **User Authentication**: Secure login and registration system
- **Password Management**: Add, edit, delete, and view stored passwords
- **Copy to Clipboard**: Quick copy functionality for websites, usernames, and passwords
- **Password Visibility Toggle**: Show/hide password functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant feedback for all actions
- **Dark Theme**: Modern dark theme with green accents

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)
*Secure login interface with email and password*

### Register Page
![Register Page](screenshots/register.png)
*User registration with email and password*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Main dashboard showing stored passwords and management interface*

### About Page
![About Page](screenshots/about.png)
*Information about PassOP and its features*

### Contact Page
![Contact Page](screenshots/contact.png)
*Developer contact information and skills*

## 🛠️ Technology Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- bcrypt

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Suraj051198/Password-Manager.git
cd Password-Manager
```

2. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd Backend
npm install
```

3. Create a .env file in the Backend directory
```env
MONGODB_URI=mongodb://localhost:27017/password_manager
MONGODB_DB_NAME=password_manager
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
PORT=5000
```

4. Start the backend server
```bash
cd Backend
npm run dev
```

5. Start the frontend development server
```bash
# In the root directory
npm run dev
```

6. Access the application
- Frontend: http://localhost:5174
- Backend API: http://localhost:5000

## 🔒 Security Features

- Password hashing using bcrypt
- Secure session management
- Protected API endpoints
- Input validation and sanitization
- Error handling and logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

Created by [Suraj Sonawane](https://github.com/Suraj051198)

## 📞 Contact

- Email: surajsonawane051198@gmail.com
- GitHub: [Suraj051198](https://github.com/Suraj051198)
- Portfolio: [https://suraj05-portfolio.netlify.app/](https://suraj05-portfolio.netlify.app/)

---

© 2025 PassOP. All rights reserved.

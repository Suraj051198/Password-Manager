# PassOP - Password Manager

<img src="public/logo.png" alt="PassOP Logo" width="200"/>

PassOP is a modern, secure password management solution designed to help you keep track of your digital credentials safely and efficiently. Built with the latest web technologies, PassOP provides a user-friendly interface while maintaining high security standards.

## 🌟 Features

- **Local Password Storage**: All passwords are stored securely in your browser's localStorage
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
- React Toastify
- LocalStorage for data persistence

### Backend
- Node.js
- Express.js
- MongoDB
- bcrypt

## 🌍 Live Demo

The application is deployed and accessible online:
- Frontend: https://password-manager-frontend.onrender.com

## 🚀 Installation and Usage

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/password-manager.git
cd password-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview the production build:
```bash
npm run preview
```

### Usage

1. Register a new account or login with existing credentials
2. Add, edit, or delete passwords as needed
3. Use the copy to clipboard functionality for quick access to credentials
4. Toggle password visibility as needed

## 🔒 Security Features

- Local storage for data persistence
- User authentication with localStorage
- Input validation and sanitization
- Error handling and logging
- Password visibility toggle for security

## 🚢 Deployment

### Frontend Deployment
The frontend is deployed on Render.com with the following configuration:
- Build Command: `npm run build`
- Publish Directory: `dist`

### Backend Deployment
The backend is deployed on Render.com as a Web Service with the following configuration:
- Build Command: `npm run render-build`
- Start Command: `npm start`
- Environment Variables:
  - `NODE_ENV=production`
  - `PORT=10000`
  - `MONGODB_URI=<your_mongodb_atlas_connection_string>`
  - `MONGODB_DB_NAME=password_manager`
  - `BCRYPT_SALT_ROUNDS=10`

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

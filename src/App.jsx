import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/Login'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <div className="container mx-auto px-4 py-8 pt-20">
                  <h1 className="text-3xl font-bold text-center text-slate-800">
                    <span className='text-green-500'>&lt;</span>Welcome to <span className="text-green-500">Passop</span>/&gt;
                  </h1>
                  <p className="mt-4 text-center text-gray-600">
                    Your secure password management solution
                  </p>
                  <Login />
                  <Manager />
                </div>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </AuthProvider>
    </Router>
  )
}

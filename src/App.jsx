import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import Login from './components/Login'
import About from './components/About'
import Contact from './components/Contact'

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
        </div>
      </AuthProvider>
    </Router>
  )
}

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-800 shadow-lg text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-green-500">&lt;</span>
              <span className="text-white">Pass</span>
              <span className="text-green-500">OP/&gt;</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-green-500' : 'text-gray-300'
              } hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-green-500' : 'text-gray-300'
              } hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-green-500' : 'text-gray-300'
              } hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-300">Welcome, {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <span className="text-gray-300">Please login to continue</span>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-green-500' : 'text-gray-300'
              } block hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-green-500' : 'text-gray-300'
              } block hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-green-500' : 'text-gray-300'
              } block hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

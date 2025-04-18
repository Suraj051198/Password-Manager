import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-2xl font-semibold">
            <span className="text-green-500">&lt;</span>
            <span className="text-white">Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/Suraj051198"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="hover:text-green-500 transition"
            >
              <img src="/github.png" alt="GitHub" className="w-6 h-6" />
            </a>
            <a
              href="https://suraj05-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              title="Portfolio"
              className="hover:text-green-500 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400 text-center md:text-right">
            <p>© {new Date().getFullYear()} Passop. All rights reserved.</p>
            <p className="mt-1">
              Created by{' '}
              <a
                href="https://github.com/Suraj051198"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300"
              >
                Suraj Sonawane
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

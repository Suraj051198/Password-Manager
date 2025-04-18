import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            About <span className="text-green-500">Passop</span>
          </h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">What is Passop?</h2>
              <p>
                Passop is a modern, secure password management solution designed to help you keep track of your digital credentials safely and efficiently. Built with the latest web technologies, Passop provides a user-friendly interface while maintaining high security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Key Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Secure password storage with encryption</li>
                <li>User authentication and authorization</li>
                <li>Easy password management interface</li>
                <li>Copy to clipboard functionality</li>
                <li>Responsive design for all devices</li>
                <li>Real-time updates and notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Technology Stack</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-600 mb-2">Frontend</h3>
                  <ul className="list-disc list-inside text-sm">
                    <li>React.js</li>
                    <li>Tailwind CSS</li>
                    <li>React Router</li>
                    <li>Axios</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-600 mb-2">Backend</h3>
                  <ul className="list-disc list-inside text-sm">
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>MongoDB</li>
                    <li>bcrypt</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Security</h2>
              <p>
                Passop implements industry-standard security practices including password hashing, secure session management, and encrypted data storage. Your passwords are never stored in plain text, and all data is protected using modern encryption techniques.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 
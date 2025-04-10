import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { passwordService } from '../services/api';

export default function Manager() {
  const eyeIconRef = useRef();
  const [form, setForm] = useState({ website: '', username: '', password: '' });
  const [passwords, setPasswords] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [editId, setEditId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadPasswords();
    }
  }, [user]);

  useEffect(() => {
    if (eyeIconRef.current) {
      eyeIconRef.current.src = showPass ? '/hide.png' : '/show.png';
    }
  }, [showPass]);

  const loadPasswords = async () => {
    try {
      const data = await passwordService.getAll(user.id);
      setPasswords(data);
    } catch (error) {
      toast.error('Failed to load passwords');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPass(prev => !prev);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.website === '' || form.username === '' || form.password === '') {
      toast.error('Please fill all the fields!');
      return;
    }

    try {
      if (editId) {
        await passwordService.update(editId, form.website, form.username, form.password);
        toast.success('Password updated!');
      } else {
        await passwordService.create(user.id, form.website, form.username, form.password);
        toast.success('Password saved!');
      }
      loadPasswords();
      setForm({ website: '', username: '', password: '' });
      setEditId(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleEdit = (item) => {
    setForm({ website: item.site, username: item.username, password: item.password });
    setEditId(item._id);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const deletePassword = async (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      try {
        await passwordService.delete(id);
        toast.success('Password deleted!');
        loadPasswords();
      } catch (error) {
        toast.error('Failed to delete password');
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-8 md:px-16 lg:px-32">
      <ToastContainer position="top-right" autoClose={3000} transition={Bounce} />

      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-green-500 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]" />
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
          <input
            value={form.website}
            onChange={handleChange}
            type="text"
            className="rounded-full border border-green-500 w-full p-3"
            name="website"
            placeholder="Enter website name or URL"
            required
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              className="rounded-full border border-green-500 w-full p-3"
              name="username"
              placeholder="Enter username"
              required
            />
            <div className="relative w-full">
              <input
                value={form.password}
                onChange={handleChange}
                type={showPass ? 'text' : 'password'}
                className="rounded-full border border-green-500 w-full p-3 pr-10"
                name="password"
                placeholder="Enter password"
                required
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <img
                  ref={eyeIconRef}
                  className="p-1"
                  width={25}
                  height={20}
                  src="/show.png"
                  alt="Toggle visibility"
                />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="flex justify-center gap-2 bg-green-500 text-white p-3 rounded-full hover:bg-green-600 w-fit mx-auto px-6 border border-green-900 transition-all"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            {editId ? 'Update Password' : 'Add Password'}
          </button>
        </form>
      </div>

      {/* Password Table */}
      <div className="passwords mt-10">
        <h2 className="text-2xl font-bold mb-4">Your Passwords</h2>
        {passwords.length === 0 ? (
          <div className="text-center text-gray-500">No passwords saved.</div>
        ) : (
          <div className="relative overflow-x-auto rounded-xl shadow-lg bg-white">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-green-700 text-white">
                <tr>
                  <th className="px-6 py-3">Website</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Password</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwords.map((item) => (
                  <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img
                          onClick={() => copyToClipboard(item.site, 'Website')}
                          src="/icons8-copy-30.png"
                          alt="copy"
                          className="w-4 h-4 cursor-pointer"
                          title="Copy website"
                        />
                        {item.site}
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.username}</td>
                    <td className="px-6 py-4">
                      {showPass ? item.password : '*'.repeat(item.password.length)}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <span
                        onClick={() => deletePassword(item._id)}
                        className="cursor-pointer"
                        title="Delete"
                      >
                        <img src="/delete.png" alt="delete" className="w-4 h-4 hover:scale-110 transition-all" />
                      </span>
                      <span
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer"
                        title="Edit"
                      >
                        <img src="/update.png" alt="edit" className="w-4 h-4 hover:scale-110 transition-all" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

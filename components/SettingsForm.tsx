'use client';

import { useState, useEffect } from 'react';
import { getUserEmail } from '@/lib/auth';
import { isBugActive } from '@/lib/bugs';

export default function SettingsForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  // Bug #5: Form Won't Submit - Shows persistent error
  const bug5Active = isBugActive(5);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const userEmail = getUserEmail();
    if (userEmail) {
      setEmail(userEmail);
      setName(userEmail.split('@')[0]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (bug5Active) {
      // Bug #5: Show persistent error
      setShowError(true);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Display Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          placeholder="you@example.com"
        />
      </div>

      {/* Notifications Toggle */}
      <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
          <p className="text-sm text-gray-500">Receive updates about your orders</p>
        </div>
        <button
          type="button"
          onClick={() => setNotifications(!notifications)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            notifications ? 'bg-indigo-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              notifications ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Error Message (Bug #5) */}
      {showError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Error saving settings</span>
          </div>
          <p className="text-sm text-red-600 mt-1">Unable to save your changes. Please try again later.</p>
        </div>
      )}

      {/* Success Message */}
      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

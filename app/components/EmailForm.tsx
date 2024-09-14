'use client'

import { useState } from 'react';

interface EmailFormProps {
  onValidationResult: (result: any) => void;
}

export default function EmailForm({ onValidationResult }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      onValidationResult(result);
    } catch (error) {
      console.error('Error validating email:', error);
      onValidationResult({ error: 'An error occurred while validating the email.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Validating...' : 'Validate'}
        </button>
      </div>
    </form>
  );
}
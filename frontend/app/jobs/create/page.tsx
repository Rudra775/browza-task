"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/lib/api';

export default function CreateJob() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', targetUrl: '', budget: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createJob({ ...form, budget: Number(form.budget) });
    setLoading(false);
    router.push('/');
  };

  // Shared class for inputs to keep code clean
  const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
          <p className="text-gray-500 mt-1">Define the parameters for your new scraping task.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            {/* Title */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input 
              required
              className={inputClass}
              placeholder="e.g. Amazon Price Scraper"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
            />
          </div>

          <div>
            {/* Target URL */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Target URL</label>
            <input 
              required
              type="url"
              className={inputClass}
              placeholder="https://..."
              value={form.targetUrl}
              onChange={(e) => setForm({...form, targetUrl: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
            <div className="relative">
              {/* Currency Symbol */}
              <span className="absolute left-4 top-2 text-gray-500">&#8377;</span>
              <input 
                required
                type="number"
                className={`pl-8 ${inputClass.replace('px-4', 'pr-4')}`} 
                placeholder="0.00"
                value={form.budget}
                onChange={(e) => setForm({...form, budget: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea 
              rows={3}
              className={inputClass}
              value={form.notes}
              onChange={(e) => setForm({...form, notes: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
             <button 
               type="button" 
               onClick={() => router.back()}
               className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
             >
               Cancel
             </button>
             <button 
               type="submit" 
               disabled={loading}
               className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
             >
               {loading ? 'Creating...' : 'Create Job'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
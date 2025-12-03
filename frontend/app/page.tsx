"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchJobs } from '@/lib/api';
import StatusBadge from '@/components/StatusBadge';
import JobDrawer from '@/components/JobDrawer';
import { ChevronRight, List, CheckCircle, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  // Summary stats
  const stats = {
    total: jobs.length,
    completed: jobs.filter((j: any) => j.status === 'COMPLETED').length,
    active: jobs.filter((j: any) => j.status === 'RUNNING').length,
  };

  const loadJobs = async () => {
    setLoading(true);
    const data = await fetchJobs(filter);
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => { loadJobs(); }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          Browza
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button onClick={logout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-indigo-600 font-medium">Login</Link>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
           <div>
             <h1 className="text-3xl font-bold text-gray-900">Jobs Overview</h1>
             <p className="text-gray-500 mt-1">Manage your scraping tasks.</p>
           </div>
           <Link href="/jobs/create" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
             + Create New Job
           </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
           {[
             { 
               label: 'Total Jobs', 
               val: stats.total, 
               color: 'bg-blue-50 text-blue-600', 
               icon: List 
             },
             { 
               label: 'Completed', 
               val: stats.completed, 
               color: 'bg-green-50 text-green-600', 
               icon: CheckCircle 
             },
             { 
               label: 'Active Now', 
               val: stats.active, 
               color: 'bg-yellow-50 text-yellow-600', 
               icon: Activity 
             },
           ].map((stat) => (
             <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
               <div>
                 <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                 <div className="text-3xl font-bold mt-1 text-gray-900">{stat.val}</div>
               </div>
               <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.color}`}>
                 {/* Render the Lucide Icon here */}
                 <stat.icon size={24} />
               </div>
             </div>
           ))}
        </div>

        {/* Filters */}
        <div className="flex gap-6 border-b border-gray-200 mb-6 text-sm font-medium">
          {['All', 'Pending', 'Running', 'Completed', 'Failed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-3 border-b-2 transition-colors ${filter === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
             <div className="p-12 text-center text-gray-500">Loading jobs...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Job Title</th>
                  <th className="p-4 font-semibold">Target</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Budget</th>
                  <th className="p-4 font-semibold">Created</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map((job: any) => (
                  <tr 
                    key={job._id} 
                    onClick={() => setSelectedJob(job)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{job.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">ID: #{job._id.slice(-4).toUpperCase()}</div>
                    </td>
                    <td className="p-4 text-gray-500 text-sm max-w-xs truncate">{job.targetUrl}</td>
                    <td className="p-4"><StatusBadge status={job.status} /></td>
                    <td className="p-4 text-right font-medium text-gray-900">&#8377;{job.budget}</td>
                    <td className="p-4 text-gray-500 text-sm">{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right text-gray-400 group-hover:text-indigo-600">
                      <ChevronRight size={18} />
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">No jobs found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Detail Drawer */}
      <JobDrawer job={selectedJob} onClose={() => setSelectedJob(null)} onUpdate={loadJobs} />
    </div>
  );
}
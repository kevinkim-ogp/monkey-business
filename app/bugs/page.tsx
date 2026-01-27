'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import { getActiveBugs, BUG_POOL } from '@/lib/bugs';
import Sidebar from '@/components/Sidebar';

export default function BugsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeBugIds, setActiveBugIds] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    if (!isLoggedIn()) {
      router.push('/');
      return;
    }
    setActiveBugIds(getActiveBugs());
  }, [router]);

  if (!mounted) {
    return null;
  }

  const activeBugs = BUG_POOL.filter(bug => activeBugIds.includes(bug.id));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Active Bugs</h1>
          <p className="text-gray-600 mt-1">
            Bugs that are active in this session ({activeBugs.length} of {BUG_POOL.length} total)
          </p>
        </div>

        {/* Active Bugs */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Currently Active</h2>
          {activeBugs.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500">
              No bugs active in this session
            </div>
          ) : (
            <div className="grid gap-4">
              {activeBugs.map(bug => (
                <div
                  key={bug.id}
                  className="bg-white rounded-xl border border-red-200 p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">#{bug.id} - {bug.name}</h3>
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{bug.description}</p>
                      <p className="text-sm text-gray-500">
                        Location: <span className="font-medium capitalize">{bug.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Bugs Reference */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Possible Bugs</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {BUG_POOL.map(bug => {
                  const isActive = activeBugIds.includes(bug.id);
                  return (
                    <tr key={bug.id} className={isActive ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{bug.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bug.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{bug.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{bug.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isActive ? (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

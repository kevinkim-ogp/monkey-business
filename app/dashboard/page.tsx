'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserEmail, isLoggedIn } from '@/lib/auth';
import { isBugActive } from '@/lib/bugs';
import Sidebar from '@/components/Sidebar';
import StatsCard from '@/components/StatsCard';

const statsData = [
  {
    title: 'Total Orders',
    value: '1,234',
    change: '12%',
    changeType: 'positive' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: 'Revenue',
    value: '$48,352',
    change: '8%',
    changeType: 'positive' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Customers',
    value: '892',
    change: '3%',
    changeType: 'negative' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '0.5%',
    changeType: 'positive' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Bug #8: Cut-off Text - Welcome message truncated
  const bug8Active = isBugActive(8);

  useEffect(() => {
    setMounted(true);
    if (!isLoggedIn()) {
      router.push('/');
      return;
    }
    setUserEmail(getUserEmail());
  }, [router]);

  if (!mounted) {
    return null;
  }

  const welcomeMessage = bug8Active
    ? 'Welcome back to your dashbo'
    : 'Welcome back to your dashboard';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{welcomeMessage}</h1>
          <p className="text-gray-600 mt-1">
            {userEmail && `Logged in as ${userEmail}`}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              cardIndex={index}
            />
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { action: 'New order', details: 'Order #1234 from john@example.com', time: '5 min ago' },
                { action: 'Payment received', details: '$299.00 for Order #1233', time: '1 hour ago' },
                { action: 'New customer', details: 'sarah@example.com signed up', time: '2 hours ago' },
                { action: 'Product updated', details: 'Wireless Headphones stock updated', time: '4 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 py-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

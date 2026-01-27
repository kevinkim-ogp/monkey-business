'use client';

import { isBugActive } from '@/lib/bugs';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  cardIndex: number;
}

export default function StatsCard({ title, value, change, changeType, icon, cardIndex }: StatsCardProps) {
  // Bug #2: Infinite Spinner - First card stuck loading
  const bug2Active = isBugActive(2) && cardIndex === 0;

  // Bug #3: Overlapping Text - Revenue card (index 1) has overlapping text
  const bug3Active = isBugActive(3) && cardIndex === 1;

  // Bug #10: Permanent Error State - Third card shows error
  const bug10Active = isBugActive(10) && cardIndex === 2;

  if (bug10Active) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <div className="text-red-600 font-medium">Failed to load</div>
        <p className="text-sm text-red-400 mt-1">Unable to fetch data. Please try again.</p>
      </div>
    );
  }

  if (bug2Active) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
            {icon}
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg text-indigo-600">
          {icon}
        </div>
        <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          {changeType === 'positive' ? '+' : ''}{change}
        </span>
      </div>
      <div className={bug3Active ? 'relative' : ''}>
        {bug3Active ? (
          <>
            <div className="text-2xl font-bold text-gray-900 absolute top-0 left-0">{value}</div>
            <p className="text-sm text-gray-500 mt-0">{title}</p>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <p className="text-sm text-gray-500 mt-1">{title}</p>
          </>
        )}
      </div>
    </div>
  );
}

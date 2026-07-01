import React from 'react';
import { cn } from '@/lib/utils';
import { MentorStatus } from '@/types/admin';

interface FilterTabsProps {
  activeTab: MentorStatus | 'ALL';
  onTabChange: (tab: MentorStatus | 'ALL') => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { label: string; value: MentorStatus | 'ALL' }[] = [
    { label: 'All Mentors', value: 'ALL' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
  ];

  return (
    <div className="flex border-b border-zinc-200">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
            activeTab === tab.value
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

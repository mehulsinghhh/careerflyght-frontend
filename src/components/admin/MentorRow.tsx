import React from 'react';
import { Mentor } from '@/types/admin';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Check, X, UserCircle } from 'lucide-react';
import Link from 'next/link';

interface MentorRowProps {
  mentor: Mentor;
  onApprove: (mentor: Mentor) => void;
  onReject: (mentor: Mentor) => void;
}

export const MentorRow: React.FC<MentorRowProps> = ({ mentor, onApprove, onReject }) => {
  const joinedDate = new Date(mentor.user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <tr className="hover:bg-zinc-50/50 transition-colors border-b border-zinc-100 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {mentor.user.profilePhoto ? (
              <img className="h-10 w-10 rounded-full object-cover" src={mentor.user.profilePhoto} alt="" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold">
                {mentor.user.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-zinc-900">{mentor.user.name}</div>
            <div className="text-sm text-zinc-500 truncate max-w-[150px]">{mentor.user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-zinc-900 font-medium">{mentor.company}</div>
        <div className="text-xs text-zinc-500">{mentor.designation}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 text-center">
        {mentor.experienceYears} yrs
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 font-semibold text-center">
        ${parseFloat(mentor.hourlyRate).toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <StatusBadge status={mentor.approvalStatus} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 text-center">
        {joinedDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-zinc-600 border-zinc-200 hover:bg-zinc-50 h-8 px-3"
          >
            <Link href={`/whatcanibe/mentors/${mentor.id}`}>
              <UserCircle className="w-4 h-4 mr-1" /> View Profile
            </Link>
          </Button>

          {mentor.approvalStatus === 'PENDING' && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 h-8 px-2"
                onClick={() => onApprove(mentor)}
              >
                <Check className="w-4 h-4 mr-1" /> Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-8 px-2"
                onClick={() => onReject(mentor)}
              >
                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

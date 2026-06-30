import React from 'react';
import { Mentor } from '@/types/admin';
import { MentorRow } from './MentorRow';

interface MentorTableProps {
  mentors: Mentor[];
  onApprove: (mentor: Mentor) => void;
  onReject: (mentor: Mentor) => void;
}

export const MentorTable: React.FC<MentorTableProps> = ({
  mentors,
  onApprove,
  onReject
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-200">
        <thead className="bg-zinc-50/50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Mentor
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Work
            </th>
            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Exp.
            </th>
            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Rate
            </th>
            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Joined
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-zinc-100">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <MentorRow
                key={mentor.id}
                mentor={mentor}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                No mentors found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

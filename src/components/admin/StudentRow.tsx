import React from 'react';
import { Student } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';

interface StudentRowProps {
  student: Student;
}

export const StudentRow: React.FC<StudentRowProps> = ({ student }) => {
  const joinedDate = new Date(student.user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <tr className="hover:bg-zinc-50/50 transition-colors border-b border-zinc-100 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {student.user.profilePhoto ? (
              <img className="h-10 w-10 rounded-full object-cover" src={student.user.profilePhoto} alt="" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold">
                {student.user.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-zinc-900">{student.user.name}</div>
            <div className="text-sm text-zinc-500 truncate max-w-[150px]">{student.user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-zinc-900">{student.educationLevel}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
        {student.preferredCountry}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
        {joinedDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          variant="outline"
          size="sm"
          className="text-zinc-600 border-zinc-200 hover:bg-zinc-50 h-8 px-3"
          asChild
        >
          <Link href={`/admin/users/${student.id}`}>
            <UserCircle className="w-4 h-4 mr-1" /> View Profile
          </Link>
        </Button>
      </td>
    </tr>
  );
};

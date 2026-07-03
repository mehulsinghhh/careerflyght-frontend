import React from 'react';
import { Student } from '@/types/admin';
import { StudentRow } from './StudentRow';

interface StudentTableProps {
  students: Student[];
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-200">
        <thead className="bg-zinc-50/50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Student
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Education
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Preferred Country
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Joined
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-zinc-100">
          {students.length > 0 ? (
            students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                No students found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

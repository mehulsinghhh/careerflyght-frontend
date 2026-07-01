"use client";

import React from 'react';
import { AdminModal } from './AdminModal';
import { Button } from '@/components/ui/button';
import { Mentor } from '@/types/admin';

interface ApprovalDialogProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mentorId: string) => void;
  isSubmitting: boolean;
}

export const ApprovalDialog: React.FC<ApprovalDialogProps> = ({
  mentor,
  isOpen,
  onClose,
  onConfirm,
  isSubmitting
}) => {
  if (!mentor) return null;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Approve Mentor"
      description={`Are you sure you want to approve ${mentor.user.name}? They will be able to start accepting bookings.`}
      type="success"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => onConfirm(mentor.id)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Approving..." : "Confirm Approval"}
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
        <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
          {mentor.user.profilePhoto ? (
            <img src={mentor.user.profilePhoto} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              {mentor.user.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="font-bold text-zinc-900">{mentor.user.name}</p>
          <p className="text-sm text-zinc-500">{mentor.designation} at {mentor.company}</p>
        </div>
      </div>
    </AdminModal>
  );
};

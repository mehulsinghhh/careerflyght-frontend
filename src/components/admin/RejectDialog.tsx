"use client";

import React, { useState } from 'react';
import { AdminModal } from './AdminModal';
import { Button } from '@/components/ui/button';
import { Mentor } from '@/types/admin';

interface RejectDialogProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mentorId: string, reason?: string) => void;
  isSubmitting: boolean;
}

export const RejectDialog: React.FC<RejectDialogProps> = ({
  mentor,
  isOpen,
  onClose,
  onConfirm,
  isSubmitting
}) => {
  const [reason, setReason] = useState("");

  if (!mentor) return null;

  const handleConfirm = () => {
    onConfirm(mentor.id, reason.trim() || undefined);
    setReason("");
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Reject Mentor Application"
      description={`Are you sure you want to reject ${mentor.user.name}'s application? This will notify them of the decision.`}
      type="danger"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
            {mentor.user.profilePhoto ? (
              <img src={mentor.user.profilePhoto} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                {mentor.user.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-zinc-900">{mentor.user.name}</p>
            <p className="text-sm text-zinc-500">{mentor.designation} at {mentor.company}</p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="reason" className="text-sm font-medium text-zinc-700">
            Rejection Reason (Optional)
          </label>
          <textarea
            id="reason"
            rows={3}
            className="w-full px-3 py-2 border border-zinc-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="E.g. Missing profile information, insufficient experience..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </AdminModal>
  );
};

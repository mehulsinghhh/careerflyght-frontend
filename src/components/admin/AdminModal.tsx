"use client";

import React from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  type?: 'default' | 'danger' | 'success';
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  type = 'default'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {type === 'success' && <CheckCircle className="w-6 h-6 text-emerald-500" />}
              {type === 'danger' && <AlertTriangle className="w-6 h-6 text-red-500" />}
              <h3 className="text-xl font-bold text-zinc-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          {description && (
            <p className="text-sm text-zinc-500 mb-6">{description}</p>
          )}

          <div className="mb-6">
            {children}
          </div>

          {footer && (
            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

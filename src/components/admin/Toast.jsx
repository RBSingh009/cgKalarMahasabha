// src/components/admin/Toast.jsx
'use client';

import { useEffect } from 'react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const { type = 'success', message } = toast;
  const icon =
    type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info';

  return (
    <div className={`ckm-admin-toast is-${type}`} role="status">
      <i className={`fa-solid ${icon}`} />
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Close">
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}

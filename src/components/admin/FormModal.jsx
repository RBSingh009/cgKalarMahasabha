// src/components/admin/FormModal.jsx
'use client';

import { useEffect } from 'react';

export default function FormModal({ open, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ckm-admin-modal-backdrop" onClick={onClose}>
      <div
        className={`ckm-admin-modal is-${size}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className="ckm-admin-modal-head">
          <h2>{title}</h2>
          <button type="button" className="ckm-admin-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </header>
        <div className="ckm-admin-modal-body">{children}</div>
        {footer && <footer className="ckm-admin-modal-foot">{footer}</footer>}
      </div>
    </div>
  );
}

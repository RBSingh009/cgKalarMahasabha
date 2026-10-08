// src/components/admin/ConfirmDialog.jsx
'use client';

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
  danger = true,
}) {
  if (!open) return null;

  return (
    <div className="ckm-admin-modal-backdrop" onClick={onClose}>
      <div className="ckm-admin-confirm" onClick={(e) => e.stopPropagation()} role="alertdialog">
        <div className={`ckm-admin-confirm-icon ${danger ? 'is-danger' : ''}`}>
          <i className={`fa-solid ${danger ? 'fa-triangle-exclamation' : 'fa-circle-question'}`} />
        </div>
        <h2 className="ckm-admin-confirm-title">{title}</h2>
        <p className="ckm-admin-confirm-msg">{message}</p>
        <div className="ckm-admin-confirm-actions">
          <button type="button" className="ckm-admin-btn ckm-admin-btn-ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </button>
          <button
            type="button"
            className={`ckm-admin-btn ${danger ? 'ckm-admin-btn-danger' : 'ckm-admin-btn-primary'}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <span className="ckm-admin-spinner" /> : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

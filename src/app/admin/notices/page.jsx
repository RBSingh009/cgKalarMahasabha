// src/app/admin/notices/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSection from '@/components/admin/AdminSection';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

const EMPTY_FORM = {
  title: '',
  titleEn: '',
  slug: '',
  category: 'सूचना',
  categoryEn: 'Notice',
  publishedAt: '',
  important: false,
  body: '',
  bodyEn: '',
  attachment: '',
};

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notices', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setNotices(data.notices || []);
      }
    } catch {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const slugify = (text) =>
    String(text || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const openCreate = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditId(row.id);
    setForm({
      title: row.title || '',
      titleEn: row.titleEn || '',
      slug: row.slug || '',
      category: row.category || 'सूचना',
      categoryEn: row.categoryEn || 'Notice',
      publishedAt: row.publishedAt || '',
      important: !!row.important,
      body: row.body || '',
      bodyEn: row.bodyEn || '',
      attachment: row.attachment || '',
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setToast({ type: 'error', message: 'Title (Hindi) is required' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.titleEn || form.title),
      };

      const url = editId ? `/api/admin/notices/${editId}` : '/api/admin/notices';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');

      setToast({
        type: 'success',
        message: editId ? 'Notice updated' : 'Notice added',
      });
      setFormOpen(false);
      await load();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/notices/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Delete failed');

      setToast({ type: 'success', message: 'Notice deleted' });
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (row) => (
        <div className="ckm-admin-cell-user">
          <div className="ckm-admin-cell-avatar">
            <i className="fa-solid fa-bullhorn" />
          </div>
          <div>
            <strong>{row.title || '—'}</strong>
            <small>{row.titleEn || row.slug || '—'}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (row) => (
        <span className={`ckm-admin-tier is-${row.categoryEn?.toLowerCase() || 'notice'}`}>
          {row.category}
        </span>
      ),
    },
    {
      key: 'publishedAt',
      label: 'Published',
      sortable: true,
      render: (row) => row.publishedAt || '—',
    },
    {
      key: 'important',
      label: 'Important',
      render: (row) =>
        row.important ? (
          <span className="ckm-admin-tier is-patron">Important</span>
        ) : (
          <span style={{ color: 'var(--admin-muted)' }}>—</span>
        ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '120px',
      render: (row) => (
        <div className="ckm-admin-row-actions">
          <button
            type="button"
            className="ckm-admin-icon-action"
            onClick={(e) => {
              e.stopPropagation();
              openEdit(row);
            }}
            aria-label="Edit"
          >
            <i className="fa-solid fa-pen" />
          </button>
          <button
            type="button"
            className="ckm-admin-icon-action is-danger"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(row);
            }}
            aria-label="Delete"
          >
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminSection
        title="Notices"
        subtitle="Manage all notices, schemes and announcements"
        actions={
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-primary"
            onClick={openCreate}
          >
            <i className="fa-solid fa-plus" />
            Add Notice
          </button>
        }
      />

      {loading ? (
        <div className="ckm-admin-card-loading">
          <span className="ckm-admin-spinner" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={notices}
          searchPlaceholder="Search by title, category…"
        />
      )}

      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editId ? 'Edit Notice' : 'Add New Notice'}
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="ckm-admin-btn ckm-admin-btn-ghost"
              onClick={() => setFormOpen(false)}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ckm-admin-btn ckm-admin-btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <span className="ckm-admin-spinner" />
              ) : editId ? (
                'Save Changes'
              ) : (
                'Add Notice'
              )}
            </button>
          </>
        }
      >
        <div className="ckm-admin-form-grid">
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Title (Hindi) *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. मासिक बैठक की सूचना"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Title (English)</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
              placeholder="e.g. Monthly Meeting Notice"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Slug (URL — auto if empty)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. monthly-meeting-notice"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Category (Hindi)</label>
            <select
              value={form.category}
              onChange={(e) => {
                const val = e.target.value;
                const en = val === 'सूचना' ? 'Notice' : val === 'योजना' ? 'Scheme' : 'Event';
                setForm({ ...form, category: val, categoryEn: en });
              }}
            >
              <option value="सूचना">सूचना</option>
              <option value="योजना">योजना</option>
              <option value="कार्यक्रम">कार्यक्रम</option>
            </select>
          </div>

          <div className="ckm-admin-form-field">
            <label>Category (English)</label>
            <input
              type="text"
              value={form.categoryEn}
              onChange={(e) => setForm({ ...form, categoryEn: e.target.value })}
              placeholder="Notice / Scheme / Event"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Published Date</label>
            <input
              type="date"
              value={form.publishedAt}
              onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Important?</label>
            <select
              value={form.important ? 'yes' : 'no'}
              onChange={(e) => setForm({ ...form, important: e.target.value === 'yes' })}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Body (Hindi)</label>
            <textarea
              rows={5}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Full notice text in Hindi"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Body (English)</label>
            <textarea
              rows={5}
              value={form.bodyEn}
              onChange={(e) => setForm({ ...form, bodyEn: e.target.value })}
              placeholder="Full notice text in English"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Attachment URL</label>
            <input
              type="text"
              value={form.attachment}
              onChange={(e) => setForm({ ...form, attachment: e.target.value })}
              placeholder="/pdfs/notice-2026.pdf (leave empty if none)"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete notice?"
        message={`This will permanently remove "${deleteTarget?.title}".`}
        confirmText="Delete"
        loading={saving}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
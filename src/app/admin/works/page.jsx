// src/app/admin/works/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSection from '@/components/admin/AdminSection';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

const EMPTY_FORM = {
  titleHi: '',
  titleEn: '',
  slug: '',
  categoryHi: '',
  categoryEn: '',
  dateHi: '',
  dateEn: '',
  image: '',
  excerptHi: '',
  excerptEn: '',
  contentHi: '',
  contentEn: '',
};

export default function AdminWorksPage() {
  const [works, setWorks] = useState([]);
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
      const res = await fetch('/api/admin/works', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setWorks(data.works || []);
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
      titleHi: row.titleHi || '',
      titleEn: row.titleEn || '',
      slug: row.slug || '',
      categoryHi: row.categoryHi || '',
      categoryEn: row.categoryEn || '',
      dateHi: row.dateHi || '',
      dateEn: row.dateEn || '',
      image: row.image || '',
      excerptHi: row.excerptHi || '',
      excerptEn: row.excerptEn || '',
      contentHi: row.contentHi || '',
      contentEn: row.contentEn || '',
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.titleHi.trim() && !form.titleEn.trim()) {
      setToast({ type: 'error', message: 'At least one title is required' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.titleEn || form.titleHi),
      };

      const url = editId ? `/api/admin/works/${editId}` : '/api/admin/works';
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
        message: editId ? 'Work updated' : 'Work added',
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
      const res = await fetch(`/api/admin/works/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Delete failed');

      setToast({ type: 'success', message: 'Work deleted' });
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
      key: 'titleHi',
      label: 'Work',
      sortable: true,
      render: (row) => (
        <div className="ckm-admin-cell-user">
          <div className="ckm-admin-cell-avatar">
            <i className="fa-solid fa-briefcase" />
          </div>
          <div>
            <strong>{row.titleHi || '—'}</strong>
            <small>{row.titleEn || row.slug || '—'}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'categoryHi',
      label: 'Category',
      sortable: true,
      render: (row) => (
        <span className="ckm-admin-tier is-general">
          {row.categoryHi || row.categoryEn || '—'}
        </span>
      ),
    },
    {
      key: 'dateHi',
      label: 'Date',
      render: (row) => row.dateHi || row.dateEn || '—',
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
        title="Works"
        subtitle="Manage all activities and community work"
        actions={
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-primary"
            onClick={openCreate}
          >
            <i className="fa-solid fa-plus" />
            Add Work
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
          rows={works}
          searchPlaceholder="Search by title, category…"
        />
      )}

      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editId ? 'Edit Work' : 'Add New Work'}
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
                'Add Work'
              )}
            </button>
          </>
        }
      >
        <div className="ckm-admin-form-grid">
          {/* Titles */}
          <div className="ckm-admin-form-field">
            <label>Title (Hindi) *</label>
            <input
              type="text"
              value={form.titleHi}
              onChange={(e) => setForm({ ...form, titleHi: e.target.value })}
              placeholder="e.g. छात्रवृत्ति वितरण कार्यक्रम 2026"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Title (English)</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
              placeholder="e.g. Scholarship Distribution Program 2026"
            />
          </div>

          {/* Slug */}
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Slug (auto if empty)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. scholarship-distribution-2026"
            />
          </div>

          {/* Categories */}
          <div className="ckm-admin-form-field">
            <label>Category (Hindi)</label>
            <input
              type="text"
              value={form.categoryHi}
              onChange={(e) => setForm({ ...form, categoryHi: e.target.value })}
              placeholder="e.g. शिक्षा, स्वास्थ्य, सांस्कृतिक"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Category (English)</label>
            <input
              type="text"
              value={form.categoryEn}
              onChange={(e) => setForm({ ...form, categoryEn: e.target.value })}
              placeholder="e.g. Education, Health, Cultural"
            />
          </div>

          {/* Dates (display text) */}
          <div className="ckm-admin-form-field">
            <label>Date (Hindi display)</label>
            <input
              type="text"
              value={form.dateHi}
              onChange={(e) => setForm({ ...form, dateHi: e.target.value })}
              placeholder="e.g. 15 जनवरी 2026"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Date (English display)</label>
            <input
              type="text"
              value={form.dateEn}
              onChange={(e) => setForm({ ...form, dateEn: e.target.value })}
              placeholder="e.g. 15 January 2026"
            />
          </div>

          {/* Image */}
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Cover Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/images/works/xxx.jpg"
            />
          </div>

          {/* Excerpts */}
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Excerpt (Hindi)</label>
            <textarea
              rows={2}
              value={form.excerptHi}
              onChange={(e) => setForm({ ...form, excerptHi: e.target.value })}
              placeholder="Short summary in Hindi"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Excerpt (English)</label>
            <textarea
              rows={2}
              value={form.excerptEn}
              onChange={(e) => setForm({ ...form, excerptEn: e.target.value })}
              placeholder="Short summary in English"
            />
          </div>

          {/* Contents */}
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Content (Hindi)</label>
            <textarea
              rows={6}
              value={form.contentHi}
              onChange={(e) => setForm({ ...form, contentHi: e.target.value })}
              placeholder="Full content in Hindi"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Content (English)</label>
            <textarea
              rows={6}
              value={form.contentEn}
              onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
              placeholder="Full content in English"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete work?"
        message={`This will permanently remove "${deleteTarget?.titleHi || deleteTarget?.titleEn}".`}
        confirmText="Delete"
        loading={saving}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
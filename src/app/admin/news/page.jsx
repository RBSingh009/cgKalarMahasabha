// src/app/admin/news/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSection from '@/components/admin/AdminSection';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

const EMPTY_FORM = {
  title: '',
  slug: '',
  category: '',
  author: '',
  publishedAt: '',
  excerpt: '',
  content: '',
  cover: '',
  tags: '',
};

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
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
      const res = await fetch('/api/admin/news', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setNews(data.news || []);
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
      slug: row.slug || '',
      category: row.category || '',
      author: row.author || '',
      publishedAt: row.publishedAt || '',
      excerpt: row.excerpt || '',
      content: row.content || '',
      cover: row.cover || '',
      tags: Array.isArray(row.tags) ? row.tags.join(', ') : row.tags || '',
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setToast({ type: 'error', message: 'Title is required' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: form.tags
          ? String(form.tags)
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      const url = editId ? `/api/admin/news/${editId}` : '/api/admin/news';
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
        message: editId ? 'News updated' : 'News added',
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
      const res = await fetch(`/api/admin/news/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Delete failed');

      setToast({ type: 'success', message: 'News deleted' });
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
      label: 'Headline',
      sortable: true,
      render: (row) => (
        <div className="ckm-admin-cell-user">
          <div className="ckm-admin-cell-avatar">
            <i className="fa-solid fa-newspaper" />
          </div>
          <div>
            <strong>{row.title || '—'}</strong>
            <small>{row.slug || '—'}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (row) => (
        <span className="ckm-admin-tier is-general">{row.category || '—'}</span>
      ),
    },
    {
      key: 'author',
      label: 'Author',
      render: (row) => row.author || '—',
    },
    {
      key: 'publishedAt',
      label: 'Published',
      sortable: true,
      render: (row) => row.publishedAt || '—',
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
        title="News"
        subtitle="Manage news articles and updates"
        actions={
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-primary"
            onClick={openCreate}
          >
            <i className="fa-solid fa-plus" />
            Add News
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
          rows={news}
          searchPlaceholder="Search by title, author, category…"
        />
      )}

      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editId ? 'Edit News' : 'Add News'}
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
                'Add News'
              )}
            </button>
          </>
        }
      >
        <div className="ckm-admin-form-grid">
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. छात्रवृत्ति योजना 2026 - 500 मेधावी छात्रों को सहायता"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Slug (auto if empty)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. shiksha-scholarship-2026"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. शिक्षा, स्वास्थ्य, युवा"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Author</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="e.g. कलार महासंघ मीडिया टीम"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Published Date</label>
            <input
              type="date"
              value={form.publishedAt}
              onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Excerpt (short summary)</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="One or two line summary shown on the list"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Full Content</label>
            <textarea
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Full article body"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Cover Image URL</label>
            <input
              type="text"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              placeholder="https://images.unsplash.com/…  or  /images/news/xxx.jpg"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="e.g. छात्रवृत्ति, शिक्षा, युवा"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete news?"
        message={`This will permanently remove "${deleteTarget?.title}".`}
        confirmText="Delete"
        loading={saving}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
// src/app/admin/events/page.jsx
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
  date: '',
  time: '',
  location: '',
  description: '',
  descriptionEn: '',
  cover: '',
  status: 'upcoming',
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
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
      const res = await fetch('/api/admin/events', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
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
      date: row.date || '',
      time: row.time || '',
      location: row.location || '',
      description: row.description || '',
      descriptionEn: row.descriptionEn || '',
      cover: row.cover || '',
      status: row.status || 'upcoming',
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

      const url = editId ? `/api/admin/events/${editId}` : '/api/admin/events';
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
        message: editId ? 'Event updated' : 'Event added',
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
      const res = await fetch(`/api/admin/events/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Delete failed');

      setToast({ type: 'success', message: 'Event deleted' });
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
      label: 'Event',
      sortable: true,
      render: (row) => (
        <div className="ckm-admin-cell-user">
          <div className="ckm-admin-cell-avatar">
            <i className="fa-solid fa-calendar-days" />
          </div>
          <div>
            <strong>{row.title || '—'}</strong>
            <small>{row.titleEn || row.slug || '—'}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (row) => row.date || '—',
    },
    {
      key: 'location',
      label: 'Location',
      render: (row) => row.location || '—',
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => (
        <span className={`ckm-admin-tier is-${row.status || 'upcoming'}`}>
          {row.status || 'upcoming'}
        </span>
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
        title="Events"
        subtitle="Manage all events, programs and functions"
        actions={
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-primary"
            onClick={openCreate}
          >
            <i className="fa-solid fa-plus" />
            Add Event
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
          rows={events}
          searchPlaceholder="Search by title, location…"
        />
      )}

      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editId ? 'Edit Event' : 'Add New Event'}
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
                'Add Event'
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
              placeholder="e.g. रक्तदान शिविर - रायपुर"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Title (English)</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
              placeholder="e.g. Blood Donation Camp - Raipur"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Slug (auto if empty)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. blood-donation-camp-raipur"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Time</label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              placeholder="e.g. 9:00 AM – 2:00 PM"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Community Hall, Raipur"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Description (Hindi)</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Full event description in Hindi"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Description (English)</label>
            <textarea
              rows={4}
              value={form.descriptionEn}
              onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
              placeholder="Full event description in English"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Cover Image URL</label>
            <input
              type="text"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              placeholder="/images/events/xxx.jpg"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete event?"
        message={`This will permanently remove "${deleteTarget?.title}".`}
        confirmText="Delete"
        loading={saving}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
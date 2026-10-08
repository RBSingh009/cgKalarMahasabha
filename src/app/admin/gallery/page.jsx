// src/app/admin/gallery/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSection from '@/components/admin/AdminSection';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

const EMPTY_ALBUM = {
  slug: '',
  titleHi: '',
  titleEn: '',
  descHi: '',
  descEn: '',
  cover: '',
  photos: [],
};

const EMPTY_PHOTO = {
  id: null,
  src: '',
  captionHi: '',
  captionEn: '',
};

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_ALBUM);

  // Photo editor sub-state
  const [photoOpen, setPhotoOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(-1);
  const [photoForm, setPhotoForm] = useState(EMPTY_PHOTO);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setAlbums(data.albums || []);
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

  /* ---------- Album modal ---------- */
  const openCreate = () => {
    setEditId(null);
    setForm({ ...EMPTY_ALBUM, photos: [] });
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditId(row.id);
    setForm({
      slug: row.slug || '',
      titleHi: row.titleHi || '',
      titleEn: row.titleEn || '',
      descHi: row.descHi || '',
      descEn: row.descEn || '',
      cover: row.cover || '',
      photos: Array.isArray(row.photos) ? [...row.photos] : [],
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

      const url = editId ? `/api/admin/gallery/${editId}` : '/api/admin/gallery';
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
        message: editId ? 'Album updated' : 'Album added',
      });
      setFormOpen(false);
      await load();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Photo modal ---------- */
  const openAddPhoto = () => {
    setPhotoIndex(-1);
    setPhotoForm({ ...EMPTY_PHOTO, id: form.photos.length + 1 });
    setPhotoOpen(true);
  };

  const openEditPhoto = (index) => {
    setPhotoIndex(index);
    setPhotoForm({ ...form.photos[index] });
    setPhotoOpen(true);
  };

  const savePhoto = () => {
    if (!photoForm.src.trim()) {
      setToast({ type: 'error', message: 'Photo URL is required' });
      return;
    }

    const nextPhotos = [...form.photos];
    if (photoIndex === -1) {
      nextPhotos.push({ ...photoForm, id: nextPhotos.length + 1 });
    } else {
      nextPhotos[photoIndex] = photoForm;
    }

    setForm({ ...form, photos: nextPhotos });
    setPhotoOpen(false);
    setPhotoIndex(-1);
    setPhotoForm(EMPTY_PHOTO);
  };

  const removePhoto = (index) => {
    const next = form.photos.filter((_, i) => i !== index);
    // Re-number ids
    const renumbered = next.map((p, i) => ({ ...p, id: i + 1 }));
    setForm({ ...form, photos: renumbered });
  };

  /* ---------- Delete album ---------- */
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Delete failed');

      setToast({ type: 'success', message: 'Album deleted' });
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
      label: 'Album',
      sortable: true,
      render: (row) => (
        <div className="ckm-admin-cell-user">
          <div className="ckm-admin-cell-avatar">
            <i className="fa-solid fa-images" />
          </div>
          <div>
            <strong>{row.titleHi || '—'}</strong>
            <small>{row.titleEn || row.slug || '—'}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'slug',
      label: 'Slug',
      render: (row) => (
        <code style={{ fontSize: '12px', color: 'var(--admin-muted)' }}>
          {row.slug || '—'}
        </code>
      ),
    },
    {
      key: 'photos',
      label: 'Photos',
      render: (row) => (
        <span className="ckm-admin-tier is-patron">
          {Array.isArray(row.photos) ? row.photos.length : 0} photos
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
        title="Gallery"
        subtitle="Manage photo albums and photos inside each album"
        actions={
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-primary"
            onClick={openCreate}
          >
            <i className="fa-solid fa-plus" />
            Add Album
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
          rows={albums}
          searchPlaceholder="Search by album title, slug…"
        />
      )}

      {/* ==============================
          ALBUM MODAL
          ============================== */}
      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editId ? 'Edit Album' : 'Add New Album'}
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
                'Add Album'
              )}
            </button>
          </>
        }
      >
        <div className="ckm-admin-form-grid">
          <div className="ckm-admin-form-field">
            <label>Title (Hindi) *</label>
            <input
              type="text"
              value={form.titleHi}
              onChange={(e) => setForm({ ...form, titleHi: e.target.value })}
              placeholder="e.g. सांस्कृतिक कार्यक्रम"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Title (English)</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
              placeholder="e.g. Cultural Programs"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Slug (auto if empty)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. sanskritik-karyakram"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Description (Hindi)</label>
            <textarea
              rows={2}
              value={form.descHi}
              onChange={(e) => setForm({ ...form, descHi: e.target.value })}
              placeholder="Short description in Hindi"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Description (English)</label>
            <textarea
              rows={2}
              value={form.descEn}
              onChange={(e) => setForm({ ...form, descEn: e.target.value })}
              placeholder="Short description in English"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Cover Image URL</label>
            <input
              type="text"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              placeholder="/images/gallery/album/cover.jpg"
            />
          </div>

          {/* ============ Photos section ============ */}
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <label style={{ margin: 0 }}>
                Photos ({form.photos.length})
              </label>
              <button
                type="button"
                className="ckm-admin-btn ckm-admin-btn-ghost"
                onClick={openAddPhoto}
                style={{ padding: '6px 14px', fontSize: '12.5px' }}
              >
                <i className="fa-solid fa-plus" />
                Add Photo
              </button>
            </div>

            {form.photos.length === 0 ? (
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--admin-muted)',
                  textAlign: 'center',
                  padding: '20px',
                  background: 'var(--admin-cream)',
                  borderRadius: '10px',
                  margin: 0,
                }}
              >
                No photos yet. Click &quot;Add Photo&quot; above.
              </p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                }}
              >
                {form.photos.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px',
                      background: 'var(--admin-cream)',
                      borderRadius: '10px',
                      border: '1px solid var(--admin-border)',
                    }}
                  >
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: 'var(--admin-gold)',
                        color: 'var(--admin-maroon-deep)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '12px',
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          color: 'var(--admin-maroon-deep)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.captionHi || p.captionEn || 'Untitled'}
                      </strong>
                      <small
                        style={{
                          display: 'block',
                          fontSize: '11px',
                          color: 'var(--admin-muted)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.src}
                      </small>
                    </div>
                    <button
                      type="button"
                      className="ckm-admin-icon-action"
                      onClick={() => openEditPhoto(i)}
                      aria-label="Edit photo"
                      style={{ width: '28px', height: '28px' }}
                    >
                      <i className="fa-solid fa-pen" style={{ fontSize: '10px' }} />
                    </button>
                    <button
                      type="button"
                      className="ckm-admin-icon-action is-danger"
                      onClick={() => removePhoto(i)}
                      aria-label="Remove photo"
                      style={{ width: '28px', height: '28px' }}
                    >
                      <i className="fa-solid fa-xmark" style={{ fontSize: '10px' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </FormModal>

      {/* ==============================
          PHOTO SUB-MODAL
          ============================== */}
      <FormModal
        open={photoOpen}
        onClose={() => setPhotoOpen(false)}
        title={photoIndex === -1 ? 'Add Photo' : 'Edit Photo'}
        size="md"
        footer={
          <>
            <button
              type="button"
              className="ckm-admin-btn ckm-admin-btn-ghost"
              onClick={() => setPhotoOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ckm-admin-btn ckm-admin-btn-primary"
              onClick={savePhoto}
            >
              {photoIndex === -1 ? 'Add Photo' : 'Save Photo'}
            </button>
          </>
        }
      >
        <div className="ckm-admin-form-grid">
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Photo URL *</label>
            <input
              type="text"
              value={photoForm.src}
              onChange={(e) => setPhotoForm({ ...photoForm, src: e.target.value })}
              placeholder="/images/gallery/album/photo-1.jpg"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Caption (Hindi)</label>
            <input
              type="text"
              value={photoForm.captionHi}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, captionHi: e.target.value })
              }
              placeholder="e.g. वार्षिक सम्मेलन 2025"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Caption (English)</label>
            <input
              type="text"
              value={photoForm.captionEn}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, captionEn: e.target.value })
              }
              placeholder="e.g. Annual Convention 2025"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete album?"
        message={`This will permanently remove the album "${deleteTarget?.titleHi || deleteTarget?.titleEn}" and all its photos.`}
        confirmText="Delete"
        loading={saving}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
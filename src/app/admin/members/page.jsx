// src/app/admin/members/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSection from '@/components/admin/AdminSection';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

const EMPTY_FORM = {
  name: '',
  nameEn: '',
  role: '',
  roleEn: '',
  tier: 'general',
  phone: '',
  email: '',
  district: '',
  memberId: '',
  photo: '',
  status: 'pending',
  paymentStatus: 'unpaid',
  idType: '',
  idProof: '',
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'office', label: 'Office Bearers' },
  { id: 'members', label: 'Members' },
  { id: 'pending', label: 'Pending' },
  { id: 'inactive', label: 'Inactive' },
];

export default function AdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [idViewTarget, setIdViewTarget] = useState(null);
  const [activateTarget, setActivateTarget] = useState(null);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/members', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
      }
    } catch {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditId(row.id);
    setForm({
      name: row.name || '',
      nameEn: row.nameEn || '',
      role: row.role || '',
      roleEn: row.roleEn || '',
      tier: row.tier || 'general',
      phone: row.phone || '',
      email: row.email || '',
      district: row.district || '',
      memberId: row.memberId || '',
      photo: row.photo || '',
      status: row.status || 'pending',
      paymentStatus: row.paymentStatus || 'unpaid',
      idType: row.idType || '',
      idProof: row.idProof || '',
    });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setToast({ type: 'error', message: 'Name and phone are required' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        nameHi: form.name,
        roleHi: form.role,
      };

      const url = editId ? `/api/admin/members/${editId}` : '/api/admin/members';
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
        message: editId ? 'Member updated' : 'Member added',
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
      const res = await fetch(`/api/admin/members/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Delete failed');

      setToast({ type: 'success', message: 'Member deleted' });
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleActivate = async () => {
    if (!activateTarget) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/members/${activateTarget.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          status: 'active',
          activatedAt: new Date().toISOString(),
          activatedBy: 'admin',
        }),
      });

      if (!res.ok) throw new Error('Activate failed');

      setToast({
        type: 'success',
        message: `${activateTarget.name} activated`,
      });
      setActivateTarget(null);
      await load();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async (row) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/members/${row.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'inactive' }),
      });

      if (!res.ok) throw new Error('Deactivate failed');

      setToast({ type: 'success', message: 'Member deactivated' });
      await load();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Filter logic ---------- */
  const filteredMembers = members.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'active') return m.status === 'active';
    if (filter === 'office') return m.role && m.role.trim() !== '';
    if (filter === 'members') return m.status === 'active' && !m.role;
    if (filter === 'pending') return m.status === 'pending';
    if (filter === 'inactive')
      return m.status === 'inactive' || m.status === 'suspended';
    return true;
  });

  /* ---------- Filter counts ---------- */
  const getFilterCount = (id) => {
    if (id === 'all') return members.length;
    if (id === 'active')
      return members.filter((m) => m.status === 'active').length;
    if (id === 'office')
      return members.filter((m) => m.role && m.role.trim() !== '').length;
    if (id === 'members')
      return members.filter((m) => m.status === 'active' && !m.role).length;
    if (id === 'pending')
      return members.filter((m) => m.status === 'pending').length;
    if (id === 'inactive')
      return members.filter(
        (m) => m.status === 'inactive' || m.status === 'suspended'
      ).length;
    return 0;
  };

  const columns = [
    {
      key: 'name',
      label: 'Member',
      sortable: true,
      render: (row) => (
        <div className="ckm-admin-cell-user">
          <div className="ckm-admin-cell-avatar">
            <i className="fa-solid fa-user" />
          </div>
          <div>
            <strong>{row.name || '—'}</strong>
            <small>{row.memberId || '—'}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (row) =>
        row.role ? (
          <span className="ckm-admin-tier is-patron">{row.role}</span>
        ) : (
          <span style={{ color: 'var(--admin-muted)' }}>Member</span>
        ),
    },
    {
      key: 'tier',
      label: 'Tier',
      sortable: true,
      render: (row) => (
        <span className={`ckm-admin-tier is-${row.tier || 'general'}`}>
          {row.tier || 'general'}
        </span>
      ),
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      render: (row) =>
        row.paymentStatus === 'paid' ? (
          <span className="ckm-admin-tier is-active">Paid</span>
        ) : row.paymentStatus === 'pending' ? (
          <span className="ckm-admin-tier is-pending">Pending</span>
        ) : (
          <span className="ckm-admin-tier is-inactive">Unpaid</span>
        ),
    },
    {
      key: 'idProof',
      label: 'ID Proof',
      render: (row) =>
        row.idProof ? (
          <button
            type="button"
            className="ckm-admin-icon-action"
            onClick={(e) => {
              e.stopPropagation();
              setIdViewTarget(row);
            }}
            aria-label="View ID"
          >
            <i className="fa-regular fa-eye" />
          </button>
        ) : (
          <span style={{ color: 'var(--admin-muted)' }}>—</span>
        ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => {
        const s = row.status || 'pending';
        const label =
          s === 'active'
            ? 'Active'
            : s === 'pending'
            ? 'Pending'
            : s === 'suspended'
            ? 'Suspended'
            : 'Inactive';
        return <span className={`ckm-admin-tier is-${s}`}>{label}</span>;
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '160px',
      render: (row) => (
        <div className="ckm-admin-row-actions">
          {row.status === 'pending' && (
            <button
              type="button"
              className="ckm-admin-icon-action is-success"
              onClick={(e) => {
                e.stopPropagation();
                setActivateTarget(row);
              }}
              aria-label="Activate"
              title="Activate"
            >
              <i className="fa-solid fa-check" />
            </button>
          )}

          {row.status === 'active' && !row.role && (
            <button
              type="button"
              className="ckm-admin-icon-action"
              onClick={(e) => {
                e.stopPropagation();
                handleDeactivate(row);
              }}
              aria-label="Deactivate"
              title="Deactivate"
            >
              <i className="fa-solid fa-ban" />
            </button>
          )}

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
        title="Members"
        subtitle="Manage all members — office bearers, active, pending, inactive"
        actions={
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-primary"
            onClick={openCreate}
          >
            <i className="fa-solid fa-plus" />
            Add Member
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="ckm-admin-filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`ckm-admin-filter-btn ${filter === f.id ? 'is-active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <span className="ckm-admin-filter-count">{getFilterCount(f.id)}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="ckm-admin-card-loading">
          <span className="ckm-admin-spinner" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={filteredMembers}
          searchPlaceholder="Search by name, phone, role, memberId…"
        />
      )}

      {/* ==================== EDIT / CREATE MODAL ==================== */}
      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editId ? 'Edit Member' : 'Add New Member'}
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
                'Add Member'
              )}
            </button>
          </>
        }
      >
        <div className="ckm-admin-form-grid">
          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Full Name (Hindi) *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. राम कुमार जायसवाल"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>Full Name (English)</label>
            <input
              type="text"
              value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
              placeholder="e.g. Ram Kumar Jaiswal"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Role (Hindi)</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Leave empty for regular member"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Role (English)</label>
            <input
              type="text"
              value={form.roleEn}
              onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
              placeholder="e.g. President"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Tier</label>
            <select
              value={form.tier}
              onChange={(e) => setForm({ ...form, tier: e.target.value })}
            >
              <option value="none">None</option>
              <option value="general">General</option>
              <option value="life">Life</option>
              <option value="patron">Patron</option>
            </select>
          </div>

          <div className="ckm-admin-form-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="ckm-admin-form-field">
            <label>Payment Status</label>
            <select
              value={form.paymentStatus}
              onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}
            >
              <option value="unpaid">Unpaid</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div className="ckm-admin-form-field">
            <label>ID Type</label>
            <select
              value={form.idType}
              onChange={(e) => setForm({ ...form, idType: e.target.value })}
            >
              <option value="">— None —</option>
              <option value="aadhaar">Aadhaar</option>
              <option value="voter">Voter ID</option>
              <option value="pan">PAN</option>
              <option value="dl">Driving License</option>
            </select>
          </div>

          <div className="ckm-admin-form-field">
            <label>Phone *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98xxx xxxxx"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>District</label>
            <input
              type="text"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              placeholder="e.g. रायपुर"
            />
          </div>

          <div className="ckm-admin-form-field">
            <label>Member ID</label>
            <input
              type="text"
              value={form.memberId}
              onChange={(e) => setForm({ ...form, memberId: e.target.value })}
              placeholder="Auto-generated if empty"
            />
          </div>

          <div className="ckm-admin-form-field ckm-admin-form-full">
            <label>ID Proof URL</label>
            <input
              type="text"
              value={form.idProof}
              onChange={(e) => setForm({ ...form, idProof: e.target.value })}
              placeholder="/uploads/id/xxx.jpg"
            />
          </div>
        </div>
      </FormModal>

      {/* ==================== ID PROOF VIEWER ==================== */}
      <FormModal
        open={!!idViewTarget}
        onClose={() => setIdViewTarget(null)}
        title="ID Proof"
        size="md"
        footer={
          <button
            type="button"
            className="ckm-admin-btn ckm-admin-btn-primary"
            onClick={() => setIdViewTarget(null)}
          >
            Close
          </button>
        }
      >
        {idViewTarget && (
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                margin: '0 0 16px',
                color: 'var(--admin-muted)',
                fontSize: '13px',
              }}
            >
              <strong style={{ color: 'var(--admin-maroon-deep)' }}>
                {idViewTarget.name}
              </strong>{' '}
              — {idViewTarget.idType || 'ID'}
            </p>

            {idViewTarget.idProof ? (
              <img
                src={idViewTarget.idProof}
                alt="ID Proof"
                style={{
                  maxWidth: '100%',
                  maxHeight: '60vh',
                  borderRadius: '12px',
                  border: '1px solid var(--admin-border)',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.insertAdjacentHTML(
                    'afterend',
                    '<p style="color: #c0392b; font-size: 14px;">Image not found at path: ' +
                      idViewTarget.idProof +
                      '</p>'
                  );
                }}
              />
            ) : (
              <p style={{ color: '#c0392b' }}>No ID proof uploaded</p>
            )}
          </div>
        )}
      </FormModal>

      {/* ==================== ACTIVATE CONFIRM ==================== */}
      <ConfirmDialog
        open={!!activateTarget}
        onClose={() => setActivateTarget(null)}
        onConfirm={handleActivate}
        title="Activate member?"
        message={`Activate "${activateTarget?.name}"? They will get full access to their dashboard, profile, and ID card.`}
        confirmText="Activate"
        loading={saving}
      />

      {/* ==================== DELETE CONFIRM ==================== */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete member?"
        message={`This will permanently remove "${deleteTarget?.name}".`}
        confirmText="Delete"
        loading={saving}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
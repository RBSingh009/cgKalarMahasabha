// src/components/admin/DataTable.jsx
'use client';

import { useState, useMemo } from 'react';

export default function DataTable({
  columns = [],
  rows = [],
  searchable = true,
  searchPlaceholder = 'Search…',
  pageSize = 10,
  emptyMessage = 'No data found',
  onRowClick,
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => {
        const val = col.searchValue ? col.searchValue(row) : row[col.key];
        return String(val || '').toLowerCase().includes(q);
      })
    );
  }, [rows, search, columns]);

  const sorted = useMemo(() => {
    if (!sortCol) return filtered;
    const col = columns.find((c) => c.key === sortCol);
    if (!col) return filtered;
    return [...filtered].sort((a, b) => {
      const av = col.sortValue ? col.sortValue(a) : a[sortCol];
      const bv = col.sortValue ? col.sortValue(b) : b[sortCol];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortCol, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key) => {
    if (sortCol === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortCol(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="ckm-admin-table-wrap">
      {searchable && (
        <div className="ckm-admin-table-toolbar">
          <div className="ckm-admin-table-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
            />
          </div>
          <span className="ckm-admin-table-count">
            {sorted.length} {sorted.length === 1 ? 'row' : 'rows'}
          </span>
        </div>
      )}

      <div className="ckm-admin-table-scroll">
        <table className="ckm-admin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable ? 'is-sortable' : ''}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span>
                    {col.label}
                    {col.sortable && sortCol === col.key && (
                      <i className={`fa-solid fa-caret-${sortDir === 'asc' ? 'up' : 'down'}`} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="ckm-admin-table-empty">
                  <i className="fa-regular fa-folder-open" />
                  <p>{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              visible.map((row, i) => (
                <tr
                  key={row.id || i}
                  className={onRowClick ? 'is-clickable' : ''}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : row[col.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="ckm-admin-table-pagination">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-chevron-left" />
            Prev
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  MessageSquare,
  Clock,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Package,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceSnapshot: number;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  whatsappUrl: string | null;
  customerNote: string | null;
  createdAt: string;
  product: {
    name: string;
    slug: string;
    imageUrl: string | null;
  };
}

const STATUS_FILTERS = [
  { label: 'All Enquiries', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (status) params.set('status', status);
      params.set('page', page.toString());

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to load orders');
      }
      const data = await res.json();
      setOrders(data.enquiries || []);
      setTotal(data.total || 0);
      setPageSize(data.pageSize || 20);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [status, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update order status');

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus as OrderItem['status'] } : o))
      );
    } catch {
      alert('Could not update status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (st: string) => {
    switch (st) {
      case 'pending':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'contacted':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'confirmed':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'cancelled':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Order Enquiries
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track customer purchase requests initiated via WhatsApp.
          </p>
        </div>
        <button
          onClick={() => fetchOrders()}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-bold self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              setStatus(f.value);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              status === f.value
                ? 'bg-[#F5EFE6] text-[#23201C] shadow-sm font-semibold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Enquiry ID / Date</th>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">Quantity & Amount</th>
                <th className="py-3 px-4">Customer Note</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Loading order enquiries...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No orders found for this status.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* ID & Date */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-white font-semibold">
                        #{ord.id.slice(-6).toUpperCase()}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    {/* Product */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                          {ord.product.imageUrl ? (
                            <img
                              src={ord.product.imageUrl}
                              alt={ord.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <p className="font-bold text-white truncate">{ord.product.name}</p>
                          <a
                            href={`/products/${ord.product.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-[#E0D9CD] hover:underline flex items-center gap-1"
                          >
                            View product <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Qty & Amount */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">
                        {formatPrice(ord.priceSnapshot * ord.quantity)}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Qty: {ord.quantity} × {formatPrice(ord.priceSnapshot)}
                      </div>
                    </td>

                    {/* Customer note */}
                    <td className="py-3 px-4">
                      {ord.customerNote ? (
                        <p className="text-slate-300 max-w-xs line-clamp-2 italic">
                          &quot;{ord.customerNote}&quot;
                        </p>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>

                    {/* Status dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        disabled={updatingId === ord.id}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer capitalize ${getStatusColor(
                          ord.status
                        )}`}
                      >
                        <option value="pending" className="bg-slate-900 text-amber-400">
                          Pending
                        </option>
                        <option value="contacted" className="bg-slate-900 text-blue-400">
                          Contacted
                        </option>
                        <option value="confirmed" className="bg-slate-900 text-emerald-400">
                          Confirmed
                        </option>
                        <option value="cancelled" className="bg-slate-900 text-rose-400">
                          Cancelled
                        </option>
                      </select>
                    </td>

                    {/* Actions / WhatsApp */}
                    <td className="py-3 px-4 text-right">
                      {ord.whatsappUrl ? (
                        <a
                          href={ord.whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all text-[11px] font-bold"
                          title="Open WhatsApp chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Chat
                        </a>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 bg-slate-950/30 text-xs text-slate-400">
          <div>
            Showing {(page - 1) * pageSize + 1} to{' '}
            {Math.min(page * pageSize, total)} of {total} enquiries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            >
              Previous
            </button>
            <span className="text-slate-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

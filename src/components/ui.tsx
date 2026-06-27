import React, { useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react'

// ── Logo ────────────────────────────────────────────────────────────────────
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: { w: 22, text: 'text-sm' }, md: { w: 28, text: 'text-base' }, lg: { w: 36, text: 'text-xl' } }[size];
  console.log(s)
  return (
    <div className="flex items-center gap-2">
        <img src="gen-logo.svg" alt="www" />
      {/* <svg width={s.w} height={s.w} viewBox="0 0 36 36" fill="none">
        <path d="M18 4L2 12L18 20L34 12L18 4Z" fill="#0f2d40"/>
        <path d="M6 15.5V24C6 24 10 28 18 28C26 28 30 24 30 24V15.5L18 21.5L6 15.5Z" fill="#16a34a"/>
        <rect x="32" y="12" width="2" height="10" rx="1" fill="#0f2d40"/>
        <circle cx="33" cy="23" r="2" fill="#0f2d40"/>
      </svg>
      <span className={`font-bold ${s.text} text-navy`}>Academia<span className="text-primary">Flow</span></span> */}
    </div>
  );
}

// ── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ initials, color, size = 8, src }: { initials?: string; color?: string; size?: number; src?: string }) {
  const px = size * 4
  if (src) return <img src={src} alt="" className={`w-${size} h-${size} rounded-full object-cover`} />
  return (
    <div style={{ width: px, height: px, background: color || '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ color: 'white', fontWeight: 700, fontSize: px * 0.35 }}>{initials}</span>
    </div>
  )
}

// ── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: 'badge-active', Trial: 'badge-trial', Suspended: 'badge-suspended',
    'Expiring soon': 'badge-expiring', 'Expiring Soon': 'badge-expiring',
    Inactive: 'badge-inactive', Paid: 'badge-paid', Scheduled: 'badge-active',
    Completed: 'bg-slate-100 text-slate-600 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
    'Pending Review': 'badge-expiring', Rejected: 'badge-suspended',
    Online: 'badge-active', 'In-Person': 'badge-trial',
  }
  return <span className={map[status] || 'badge-inactive'}>{status}</span>
}

// ── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

// ── Success Modal ─────────────────────────────────────────────────────────────
export function SuccessModal({ open, onClose, title, message }: { open: boolean; onClose: () => void; title: string; message: string }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 text-center">
        <div className="text-5xl mb-4">🌿</div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{message}</p>
        <button onClick={onClose} className="btn-primary w-full justify-center">Done</button>
      </div>
    </Modal>
  )
}

// ── Confirm Modal ─────────────────────────────────────────────────────────────
export function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger = false, children }: {
  open: boolean; onClose: () => void; onConfirm: () => void; title: string; message?: string;
  confirmLabel?: string; danger?: boolean; children?: React.ReactNode;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
        {message && <p className="text-sm text-slate-500 mb-4">{message}</p>}
        {children}
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 justify-center font-semibold px-4 py-2 rounded-lg text-sm ${danger ? 'btn-danger' : 'btn-primary'}`}>{confirmLabel}</button>
        </div>
      </div>
    </Modal>
  )
}

// ── Search Input ──────────────────────────────────────────────────────────────
export function SearchInput({ placeholder, value, onChange }: { placeholder?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input className="input-field pl-9 text-sm w-48 md:w-64" placeholder={placeholder || 'Search'} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

// ── Select ────────────────────────────────────────────────────────────────────
export function Select({ value, onChange, options, className = '' }: { value: string; onChange: (v: string) => void; options: { label: string; value: string }[]; className?: string }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={`input-field ${className} bg-white`}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

// ── Toggle ────────────────────────────────────────────────────────────────────
export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none ${value ? 'bg-green-500' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

// ── Step Indicator ────────────────────────────────────────────────────────────
export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8 overflow-x-auto">
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${done ? 'bg-green-600 border-green-600 text-white' : active ? 'border-green-600 text-green-600 bg-white' : 'border-slate-200 text-slate-400 bg-white'}`}>
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${active ? 'text-green-600' : done ? 'text-slate-700' : 'text-slate-400'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 mb-4 ${done ? 'bg-green-600' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// ── Page Header ───────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, search, actions }: { title: string; subtitle?: string; search?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {search}
        {actions}
      </div>
    </div>
  )
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────
export function StatsBar({ stats }: { stats: { icon?: React.ReactNode; value: string | number; label: string; color?: string }[] }) {
  return (
    <div className="flex flex-wrap gap-4 md:gap-8 mb-6">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          {s.icon && <span className="text-slate-400">{s.icon}</span>}
          <div>
            <div className={`text-2xl font-bold ${s.color || 'text-slate-800'}`}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Data Table ────────────────────────────────────────────────────────────────
export function DataTable({ columns, children, className = '' }: { columns: string[]; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-max">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map(c => (
              <th key={c} className="text-left text-xs font-semibold text-slate-500 py-3 px-3 whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Tr({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <tr className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`} onClick={onClick}>
      {children}
    </tr>
  )
}

export function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-3 px-3 text-sm text-slate-700 ${className}`}>{children}</td>
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
export function ProgressBar({ percent, color = 'bg-green-500' }: { percent: number; color?: string }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2">
      <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${Math.min(percent, 100)}%` }} />
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────────────────────────
export function EmptyState({ message = 'No data found' }: { message?: string }) {
  return (
    <div className="py-16 text-center text-slate-400">
      <div className="text-4xl mb-3">📋</div>
      <p className="text-sm">{message}</p>
    </div>
  )
}

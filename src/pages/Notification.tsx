import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Badge, Modal, ProgressBar } from '../components/ui'
import { notifications } from '../data/mockData'

export default function Notification() {
  const [selected, setSelected] = useState(notifications[0])
  const [showCreate, setShowCreate] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ type: 'Announcement', title: '', message: '', sendTo: 'Everyone', specificSchool: '' })

  const typeColor: Record<string, string> = {
    Announcement: 'badge-active', Reminder: 'badge-trial', Alert: 'badge-suspended'
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-5">Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* List */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <input className="input-field w-48 text-sm" placeholder="Search by name, subject" />
            </div>
            <button onClick={() => { setShowCreate(true); setSent(false) }} className="btn-primary text-xs gap-1.5">
              <Plus size={13} /> New Notification
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => setSelected(n)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selected.id === n.id ? 'border-green-200 bg-green-50' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">{n.title}</span>
                    <span className={`${typeColor[n.type] || 'badge-inactive'}`}>{n.type}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mb-2">{n.message}</p>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{n.recipient} • {n.date} • {n.time}</span>
                  <span className="flex items-center gap-1">👁 {n.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Notification Detail</h3>
            <span className={`${typeColor[selected.type] || 'badge-inactive'} mb-3 inline-block`}>{selected.type}</span>
            <h2 className="text-base font-bold text-slate-800 mb-2">{selected.title}</h2>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">{selected.message}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-slate-800">{selected.recipients}</div>
                <div className="text-xs text-slate-500 mt-0.5">Recipients</div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-green-600">{selected.read}</div>
                <div className="text-xs text-slate-500 mt-0.5">Read</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600">Read Rate</span>
                <span className="font-semibold">{selected.readRate}%</span>
              </div>
              <ProgressBar percent={selected.readRate} />
            </div>

            <div className="text-xs space-y-1.5 mb-5">
              <div><span className="text-slate-400">Send To</span> <span className="text-slate-700 font-medium ml-2">{selected.sentTo}</span></div>
              <div><span className="text-slate-400">Sent At</span> <span className="text-slate-700 font-medium ml-2">{selected.date} • {selected.time}</span></div>
            </div>

            <div className="flex gap-3">
              <button className="btn-primary flex-1 justify-center text-xs">Resend</button>
              <button className="btn-danger flex-1 justify-center text-xs">Delete</button>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)}>
        {sent ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Notification Sent</h3>
            <p className="text-sm text-slate-500 mb-5">Your notification has been successfully sent.</p>
            <button onClick={() => setShowCreate(false)} className="btn-primary w-full justify-center">Done</button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-bold text-slate-800">Create New Notification</h3>
              <button onClick={() => setShowCreate(false)}><X size={16} className="text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Notification Type</label>
                <select className="input-field bg-white text-sm" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  <option>Announcement</option><option>Reminder</option><option>Alert</option><option>Event</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Notification Title</label>
                <input className="input-field text-sm" placeholder="Mathematics Mock Exam Schedule" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Message</label>
                <textarea className="input-field text-sm" rows={3} placeholder="Enter message here" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">Send To</label>
                <div className="space-y-2">
                  {['Everyone', 'Specific School'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="radio" name="sendto" value={opt} checked={form.sendTo === opt} onChange={() => setForm(p => ({ ...p, sendTo: opt }))} className="accent-green-600" />
                      {opt}
                    </label>
                  ))}
                </div>
                {form.sendTo === 'Specific School' && (
                  <div className="mt-2">
                    <input className="input-field text-sm" placeholder="Select the student as ID" value={form.specificSchool} onChange={e => setForm(p => ({ ...p, specificSchool: e.target.value }))} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              <button onClick={() => setSent(true)} className="btn-primary flex-1 justify-center">Send Notification</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

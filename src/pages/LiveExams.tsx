import React, { useState } from 'react'
import { Eye, X, Clock, Users, AlertCircle } from 'lucide-react'
import { Badge, Modal, ProgressBar } from '../components/ui'
import { liveExams } from '../data/mockData'

export default function LiveExams() {
  const [detail, setDetail] = useState<typeof liveExams[0] | null>(null)

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-5">Live Exams</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { val: '25', label: 'Live Exams', color: 'text-green-600', icon: '📋' },
          { val: '5', label: 'Ending Soon', color: 'text-orange-500', icon: '⏰' },
          { val: '350', label: 'Participants', color: 'text-purple-600', icon: '👥' },
          { val: '104', label: 'Submitted', color: 'text-blue-600', icon: '✅' },
          { val: '20', label: 'Trial Mode', color: 'text-slate-600', icon: '🔬' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
            <span className="text-xl">{s.icon}</span>
            <div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Exam grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {liveExams.map(ex => (
          <div key={ex.id} className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-slate-800">{ex.name}</span>
                  <Badge status={ex.mode} />
                </div>
                <div className="text-xs text-slate-500">{ex.school} • {ex.city}</div>
                <div className="text-xs text-slate-500 mt-0.5">Class Teacher : {ex.teacher}</div>
                <div className="text-xs text-slate-500">👥 {ex.class} • {ex.students} Students</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
              <span>{ex.submitted}/{ex.total} Submitted</span>
              <span className="font-semibold">{ex.percent}%</span>
            </div>
            <ProgressBar percent={ex.percent} />

            <div className="flex justify-between items-center mt-3">
              {ex.status === 'Ending Soon' && <span className="text-xs text-orange-500 font-medium">Ending Soon</span>}
              {ex.status === 'Completed' && <span className="text-xs text-slate-500">Completed</span>}
              {ex.issue && <span className="text-xs text-orange-500 font-medium">{ex.issue}</span>}
              {!ex.status && !ex.issue && <span className="text-xs text-green-500">No Issues</span>}
              <button onClick={() => setDetail(ex)} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700">
                <Eye size={13} /> Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail modal */}
      {detail && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-base font-bold text-slate-800">{detail.name}</h3>
              <button onClick={() => setDetail(null)}><X size={16} className="text-slate-400" /></button>
            </div>

            {/* Timer */}
            <div className="text-center mb-4 p-3 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-slate-800">01:59:50</div>
              <div className="text-xs text-slate-500 mt-0.5">10:00 AM – 12:00 PM</div>
            </div>

            {/* Participation */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-700 mb-2">Participation</div>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                {[['Registered', '45'], ['Joined', '38'], ['Submitted', '15']].map(([label, val]) => (
                  <div key={label} className="bg-slate-50 rounded-lg p-2">
                    <div className="text-sm font-bold text-slate-800">{val}</div>
                    <div className="text-[10px] text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-600 mb-1">Join Rate</div>
              <ProgressBar percent={70.8} />
              <div className="text-right text-xs text-slate-500 mt-1">70.8%</div>
              <div className="text-xs text-slate-600 mb-1 mt-2">Completion</div>
              <ProgressBar percent={39.4} color="bg-green-400" />
              <div className="text-right text-xs text-slate-500 mt-1">39.4%</div>
            </div>

            {/* Issues */}
            <div className="space-y-1.5 mb-4">
              {[['🚩 Suspicious Activity', '0'], ['🔌 Disconnections', '3'], ['🔄 Currently in Progress', '23']].map(([label, val]) => (
                <div key={label as string} className="flex justify-between text-xs">
                  <span className="text-slate-600">{label as string}</span>
                  <span className="font-semibold text-slate-800">{val as string}</span>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="space-y-1.5 text-xs border-t border-slate-100 pt-4">
              {[['👩‍🏫 Instructor', 'Dr. Sarah Johnson'], ['📚 Subject', 'Mathematics'], ['🏛 Class', 'SS3 A'], ['💻 Mode', detail.mode], ['🏫 School', detail.school], ['📍 City', detail.city]].map(([label, val]) => (
                <div key={label as string} className="flex justify-between">
                  <span className="text-slate-500">{label as string}</span>
                  <span className="font-medium text-slate-800">{val as string}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setDetail(null)} className="btn-primary w-full justify-center mt-5">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

import React from 'react'
import { BarChart2 } from 'lucide-react'

export default function Analytics() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-6">Analytics</h1>
      <div className="bg-white rounded-xl border border-slate-100 p-12 flex flex-col items-center justify-center text-slate-400">
        <BarChart2 size={48} className="mb-4 opacity-30" />
        <p className="text-sm font-medium">Analytics coming soon</p>
        <p className="text-xs mt-1">Platform-wide insights will appear here.</p>
      </div>
    </div>
  )
}

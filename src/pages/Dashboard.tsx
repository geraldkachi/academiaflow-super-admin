import React, { useState } from 'react'
import { Building2, Users, Monitor, BookOpen, DollarSign, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const revenueTrend = [
  { week: 'Week 1', value: 1000000 },
  { week: 'Week 2', value: 1400000 },
  { week: 'Week 3', value: 800000 },
  { week: 'Week 4', value: 500000 },
  { week: 'Week 3', value: 450000 },
  { week: 'Week 4', value: 1900000 },
]

const revenueData = [
  { week: 'Week 1', value: 1000000 },
  { week: 'Week 2', value: 1400000 },
  { week: 'Week 3', value: 500000 },
  { week: 'Week 4', value: 2000000 },
]

const examActivity = [
  { week: 'Week 1', online: 300, hall: 240 },
  { week: 'Week 2', online: 300, hall: 240 },
  { week: 'Week 3', online: 400, hall: 340 },
  { week: 'Week 4', online: 180, hall: 60 },
]

const formatNaira = (v: number) => `₦${(v / 1000000).toFixed(1)}M`

const subscriptions = [
  { label: 'Active Subscriptions', color: '#16a34a', count: 150 },
  { label: 'Trial Subscriptions', color: '#3b82f6', count: 20 },
  { label: 'Expiring Subscriptions', color: '#f59e0b', count: 20 },
  { label: 'Suspended Subscriptions', color: '#ef4444', count: 10 },
]

const alerts = [
  { icon: AlertCircle, color: 'text-orange-500 bg-orange-50', title: 'Subscription Expiring', message: '20 schools have their subscription expiring in under 30 days', time: '4:35 PM' },
  { icon: Info, color: 'text-blue-500 bg-blue-50', title: '5 Exams Live', message: '5 exams are ongoing on the platform now', time: '2:00 PM' },
  { icon: AlertTriangle, color: 'text-red-500 bg-red-50', title: 'Suspended Schools', message: '10 schools have been suspended due to expired subscription', time: '2:00 PM' },
]

export default function Dashboard() {
  const [revPeriod, setRevPeriod] = useState('This Month')
  const [examPeriod, setExamPeriod] = useState('This Month')

  return (
    <div>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Hello, Super Admin</h1>
        <p className="text-sm text-slate-500">What do you want to do today?</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { icon: Building2, value: '250', label: 'Total Schools', color: 'text-green-600', bg: 'bg-green-50' },
          { icon: Users, value: '5,240', label: 'Active Users', color: 'text-purple-600', bg: 'bg-purple-50' },
          { icon: BookOpen, value: '6', label: 'Live Exams', color: 'text-green-600', bg: 'bg-green-50' },
          { icon: BookOpen, value: '20', label: 'Exams This Month', color: 'text-slate-600', bg: 'bg-slate-50' },
          { icon: DollarSign, value: '150k', label: 'This Week', color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <s.icon size={17} className={s.color} />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-500 leading-tight">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left – charts */}
        <div className="lg:col-span-2 space-y-5">
          {/* Revenue Trend */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-800">Revenue Trend</h2>
              <select value={revPeriod} onChange={e => setRevPeriod(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 bg-white">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData} margin={{ top: 5, right: 5, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `₦${v/1000000}M`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={45} />
                <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2.5} dot={{ fill: '#16a34a', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Exam Activity */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-800">Exam Activity</h2>
              <select value={examPeriod} onChange={e => setExamPeriod(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 bg-white">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={examActivity} margin={{ top: 5, right: 5, left: 0, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="online" fill="#16a34a" name="Online Exams" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hall" fill="#1e293b" name="Hall-Based" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          {/* Subscriptions summary */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-800">Subscriptions</h2>
              <button className="text-xs text-green-600 font-medium hover:underline">Manage</button>
            </div>
            <div className="space-y-3">
              {subscriptions.map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-xs text-slate-600 flex-1">{s.label}</span>
                  <div className="flex-1 mx-2">
                    <div className="border-b border-dashed border-slate-200" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h2 className="text-sm font-bold text-slate-800 mb-4">Alerts</h2>
            <div className="space-y-4">
              {alerts.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center flex-shrink-0`}>
                    <a.icon size={15} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{a.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{a.message}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

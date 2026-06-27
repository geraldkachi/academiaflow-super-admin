import React, { useState } from 'react'
import { MoreHorizontal, ChevronRight } from 'lucide-react'
import { Avatar, Badge, DataTable, Tr, Td, SearchInput, Select } from '../components/ui'
import { schools } from '../data/mockData'

const plans = [
  { name: 'Standard Plan', price: '₦120,000/Month', students: '500 Students', schools: 10 },
  { name: 'Premium Plan', price: '₦250,000/Month', students: '1000 Students', schools: 15 },
  { name: 'Enterprise Plan', price: '₦500,000/Month', students: 'Unlimited Students', schools: 5 },
]

type TabKey = 'All Subscriptions' | 'Expiring Soon' | 'Trial Subscriptions' | 'Suspended'

export default function Subscriptions() {
  const [tab, setTab] = useState<TabKey>('All Subscriptions')
  const [search, setSearch] = useState('')

  const tabs: { key: TabKey; badge?: number }[] = [
    { key: 'All Subscriptions' },
    { key: 'Expiring Soon', badge: 2 },
    { key: 'Trial Subscriptions' },
    { key: 'Suspended' },
  ]

  const getStatusForTab = (t: TabKey) => ({
    'All Subscriptions': null,
    'Expiring Soon': 'Expiring soon',
    'Trial Subscriptions': 'Trial',
    'Suspended': 'Suspended',
  }[t])

  const filtered = schools.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const targetStatus = getStatusForTab(tab)
    const matchTab = !targetStatus || s.status === targetStatus || (tab === 'Expiring Soon' && s.status === 'Active')
    return matchSearch && matchTab
  })

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-5">Subscriptions</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { val: '₦1.54M', label: 'Monthly Revenue', icon: '💰', color: 'text-green-600' },
          { val: '₦18.5M', label: 'Annual Run Rate', icon: '📈', color: 'text-blue-600' },
          { val: '20', label: 'Active Subscriptions', icon: '✅', color: 'text-green-600' },
          { val: '2', label: 'Expiring Subscriptions', icon: '⚠️', color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
            <span className="text-xl">{s.icon}</span>
            <div>
              <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {plans.map(p => (
          <div key={p.name} className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-bold text-slate-800">{p.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{p.price}</div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">👥 {p.students}</div>
              </div>
              <button className="text-slate-400"><MoreHorizontal size={16} /></button>
            </div>
            <div className="mt-3 text-xs font-medium text-slate-600">{p.schools} schools</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-slate-100 mb-5 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`tab-btn flex items-center gap-1.5 ${tab === t.key ? 'active' : ''}`}
            >
              {t.key}
              {t.badge && <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center">{t.badge}</span>}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center mb-5">
          <SearchInput placeholder="Search by schools by name" value={search} onChange={setSearch} />
          <Select value="" onChange={() => {}} options={[{ label: 'All Status', value: '' }, { label: 'Active', value: 'Active' }]} className="text-xs w-auto" />
          <Select value="" onChange={() => {}} options={[{ label: 'All Plans', value: '' }, { label: 'Basic', value: 'Basic' }]} className="text-xs w-auto" />
        </div>

        <DataTable columns={['School', 'Plan', 'Users', 'Status', 'Expiry Date', '']}>
          {filtered.map(s => (
            <Tr key={s.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar initials={s.initials} color={s.color} size={8} />
                  <div>
                    <div className="text-sm font-medium text-slate-800">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.location}, Monthly</div>
                  </div>
                </div>
              </Td>
              <Td><span className="text-sm">{s.plan}</span></Td>
              <Td><span className="text-sm">{s.users.toLocaleString()}</span></Td>
              <Td>
                <Badge status={tab === 'Expiring Soon' ? 'Expiring soon' : tab === 'Trial Subscriptions' ? 'Trial' : tab === 'Suspended' ? 'Suspended' : s.status} />
              </Td>
              <Td><span className="text-sm text-slate-600">{s.expiry}</span></Td>
              <Td><ChevronRight size={15} className="text-slate-400" /></Td>
            </Tr>
          ))}
        </DataTable>
      </div>
    </div>
  )
}

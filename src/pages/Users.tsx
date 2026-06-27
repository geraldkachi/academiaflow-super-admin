import React, { useState } from 'react'
import { Eye, ArrowLeft } from 'lucide-react'
import { Avatar, Badge, DataTable, Tr, Td, SearchInput, Select, ProgressBar } from '../components/ui'
import { users } from '../data/mockData'

function UserDetail({ user, onBack }: { user: typeof users[0]; onBack: () => void }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-4">
        <button onClick={onBack} className="hover:text-green-600">Users</button>
        <span className="mx-1.5">›</span>
        <span className="text-slate-700 font-medium">{user.name}</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-5 mb-5">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar initials={user.initials} color={user.color} size={14} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-800">{user.name}</span>
                <Badge status="Active" />
              </div>
              <div className="flex flex-wrap gap-4 mt-1 text-xs text-slate-500">
                <span>{user.email}</span>
                <span>STU-001</span>
                <span>JSS 2A</span>
                <span>2025/2026</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400">last login: 3 mins ago</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Info */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
            {[['Gender', 'Male'], ['Date of Birth', '20th April 2020'], ['Nationality', 'Nigerian'], ['Blood Group', 'O+'], ['Religion', 'Christianity'], ['Enrollment Date', '26th January 2026'], ['Phone', '+234568845555'], ['Address', '1, Admiralty way Lekki']].map(([k, v]) => (
              <div key={k as string}><div className="text-slate-400">{k as string}</div><div className="text-slate-800 font-medium mt-0.5">{v as string}</div></div>
            ))}
          </div>
        </div>

        {/* Academic Info */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Academic Information</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
            {[['Student ID', 'STU-001'], ['Class', 'JSS 2'], ['Section', 'JSS 2A'], ['Session', '2025/2026'], ['Current Term', 'Second Term'], ['Class Teacher', 'Mr. Bob Marley']].map(([k, v]) => (
              <div key={k as string}><div className="text-slate-400">{k as string}</div><div className="text-slate-800 font-medium mt-0.5">{v as string}</div></div>
            ))}
          </div>
        </div>

        {/* Guardian Info */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Guardian Information</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
            {[['Name', 'Jonathan Doe'], ['Relationship', 'Father'], ['Phone', '+2347025546B5'], ['Email', 'Jonathandoe@gmail.com']].map(([k, v]) => (
              <div key={k as string}><div className="text-slate-400">{k as string}</div><div className="text-slate-800 font-medium mt-0.5">{v as string}</div></div>
            ))}
          </div>
        </div>

        {/* Term Summary */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Term Summary</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
            {[['Avg Exam Score', '84%'], ['Best Subject', 'English Language'], ['Assignments Graded', '3 of 5'], ['Class Position', 'No 3 of 32']].map(([k, v]) => (
              <div key={k as string}><div className="text-slate-400">{k as string}</div><div className="text-slate-800 font-medium mt-0.5">{v as string}</div></div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Subject Performance</h3>
          <div className="space-y-4">
            {[['Mathematics', 83.7], ['English', 95.7]].map(([subj, pct]) => (
              <div key={subj as string}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-700 font-medium">{subj as string}</span>
                  <span className="text-slate-500">{pct as number}%</span>
                </div>
                <ProgressBar percent={pct as number} />
              </div>
            ))}
            <button className="text-xs text-green-600 font-medium hover:underline">View All</button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {[{ icon: '✅', action: 'Submitted Biology Assignment', time: '4:10 PM', desc: '' }, { icon: '✅', action: 'Completed Physics Quiz', time: '2 Days ago', desc: 'Test coming up on Friday 20th' }].map((a, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-base">{a.icon}</span>
                <div className="text-xs">
                  <div className="font-medium text-slate-800">{a.action}</div>
                  {a.desc && <div className="text-slate-500">{a.desc}</div>}
                  <div className="text-slate-400 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Status')

  if (selectedUser) return <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} />

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All Roles' || u.role === roleFilter
    const matchStatus = statusFilter === 'All Status' || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-5">Users</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { val: '38', label: 'Total Users', color: 'text-green-600' },
          { val: '3', label: 'School Admins', color: 'text-purple-600' },
          { val: '20', label: 'Teachers', color: 'text-blue-600' },
          { val: '10', label: 'Students', color: 'text-green-600' },
          { val: '5', label: 'Suspended', color: 'text-orange-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex flex-wrap gap-3 items-center mb-5">
          <SearchInput placeholder="Search by schools by name" value={search} onChange={setSearch} />
          <Select value="" onChange={() => {}} options={[{ label: 'All Schools', value: '' }]} className="text-xs w-auto" />
          <Select value={roleFilter} onChange={setRoleFilter} options={['All Roles','School Admin','Teacher','Student'].map(v => ({ label: v, value: v }))} className="text-xs w-auto" />
          <Select value={statusFilter} onChange={setStatusFilter} options={['All Status','Active','Inactive'].map(v => ({ label: v, value: v }))} className="text-xs w-auto" />
        </div>

        <DataTable columns={['User', 'Role', 'School', 'Status', 'Last Login', '']}>
          {filtered.map(u => (
            <Tr key={u.id} onClick={() => setSelectedUser(u)}>
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar initials={u.initials} color={u.color} size={8} />
                  <div>
                    <div className="text-sm font-medium text-slate-800">{u.name}</div>
                    <div className="text-xs text-slate-400">{u.email}</div>
                  </div>
                </div>
              </Td>
              <Td><span className="text-sm">{u.role}</span></Td>
              <Td><span className="text-sm text-slate-600">{u.school}</span></Td>
              <Td><Badge status={u.status} /></Td>
              <Td><span className="text-xs text-slate-500">{u.lastLogin}</span></Td>
              <Td><Eye size={15} className="text-slate-400 hover:text-slate-600" /></Td>
            </Tr>
          ))}
        </DataTable>
      </div>
    </div>
  )
}

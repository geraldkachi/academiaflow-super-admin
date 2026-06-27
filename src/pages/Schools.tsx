import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, MoreHorizontal, Mail, Shield, ShieldOff, Trash2, ChevronRight, X, Calendar, Upload } from 'lucide-react'
import {
  Avatar, Badge, Modal, SuccessModal, ConfirmModal,
  DataTable, Tr, Td, SearchInput, Select, ProgressBar, StepIndicator
} from '../components/ui'
import { schools, schoolDetail, schoolStudents, schoolStaff, recentExams, invoices } from '../data/mockData'

// ──────────────────────────────────────────────────────────────────────────────
// Add School Wizard
// ──────────────────────────────────────────────────────────────────────────────
function AddSchoolWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [success, setSuccess] = useState(false)
  const steps = ['School Info', 'Documents', 'Administrator', 'Academic Setup', 'Select Plan']
  const [form, setForm] = useState({
    schoolName: '', institutionType: 'Secondary School', ownership: 'Private',
    address: '', city: '', state: '', zip: '', country: 'Nigeria',
    adminFirst: '', adminLast: '', adminEmail: '', adminPhone: '',
    passwordMethod: 'auto', initialPassword: '',
    academicYear: '2024-2025', students: '250', teachers: '300', classes: '11', terms: '3 Terms',
    plan: '',
  })

  const plans = [
    { id: 'basic', name: 'Basic Plan', price: '₦50,000/Month', students: '200 Students' },
    { id: 'standard', name: 'Standard Plan', price: '₦100,000/Month', students: '500 Students' },
    { id: 'premium', name: 'Premium Plan', price: '₦250,000/Month', students: '1000 Students' },
    { id: 'enterprise', name: 'Enterprise Plan', price: '₦500,000/Month', students: 'Unlimited Students' },
  ]

  if (success) return (
    <div className="p-8 text-center">
      <div className="text-5xl mb-4">🌿</div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">School Added!</h3>
      <p className="text-sm text-slate-500 mb-6">The school has been successfully created and onboarded.</p>
      <button onClick={onClose} className="btn-primary w-full justify-center">Done</button>
    </div>
  )

  return (
    <div className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-bold text-slate-800">Add New School</h2>
        <button onClick={onClose}><X size={18} className="text-slate-400" /></button>
      </div>
      <StepIndicator steps={steps} current={step} />

      {/* Step 0 – School Info */}
      {step === 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">School Information</h3>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">School Name</label>
            <input className="input-field" placeholder="Spring hills" value={form.schoolName} onChange={e => setForm(p => ({ ...p, schoolName: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Institution Type</label>
              <input className="input-field" value={form.institutionType} onChange={e => setForm(p => ({ ...p, institutionType: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">School Ownership</label>
              <input className="input-field" value={form.ownership} onChange={e => setForm(p => ({ ...p, ownership: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Address</label>
            <input className="input-field" placeholder="1, Admiralty way, Lekki, Lagos" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">City/Town</label><input className="input-field" placeholder="Mushin" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">State/Province</label><input className="input-field" placeholder="Lagos" value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Zip/Postal code</label><input className="input-field" placeholder="1122334" value={form.zip} onChange={e => setForm(p => ({ ...p, zip: e.target.value }))} /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Country</label><input className="input-field" value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))} /></div>
          </div>
        </div>
      )}

      {/* Step 1 – Documents */}
      {step === 1 && (
        <div className="space-y-5">
          {['CAC certificates', 'Proprietor Valid ID', 'Proof of Address'].map((doc, i) => (
            <div key={doc}>
              <div className="text-xs font-semibold text-slate-700 mb-1">{doc}</div>
              <div className="text-xs text-slate-400 mb-2">{['Add Corporate Affairs Commission Certificate', 'NIN passport, or Driver\'s Licence', 'Electricity Bill, Landlord Receipt, Tenancy Agreement, or Land Certificate'][i]}</div>
              <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-green-400 transition-colors">
                <Upload size={20} className="text-slate-400" />
                <span className="text-xs text-slate-500 font-medium">Upload Document</span>
                <span className="text-[10px] text-slate-400">JPG, PNG or PDF (max 5MB)</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Step 2 – Administrator */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Administrator Account</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">First Name</label><input className="input-field" placeholder="John" value={form.adminFirst} onChange={e => setForm(p => ({ ...p, adminFirst: e.target.value }))} /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Last Name</label><input className="input-field" placeholder="Doe" value={form.adminLast} onChange={e => setForm(p => ({ ...p, adminLast: e.target.value }))} /></div>
          </div>
          <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Email Address</label><input className="input-field" placeholder="admin@springhill.com" value={form.adminEmail} onChange={e => setForm(p => ({ ...p, adminEmail: e.target.value }))} /></div>
          <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Phone Number (Optional)</label><input className="input-field" placeholder="07030000000" value={form.adminPhone} onChange={e => setForm(p => ({ ...p, adminPhone: e.target.value }))} /></div>
          <div className="space-y-2 mt-2">
            <label className="text-xs font-semibold text-slate-700">Password Method</label>
            {[{ v: 'auto', label: 'Auto Generate Password', desc: 'System generates a secure password and emails it to the admin' },
              { v: 'manual', label: 'Set Password Manually', desc: 'Define initial password for admin' }].map(opt => (
              <label key={opt.v} className={`flex gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${form.passwordMethod === opt.v ? 'border-green-500 bg-green-50' : 'border-slate-200'}`}>
                <input type="radio" name="pwmethod" value={opt.v} checked={form.passwordMethod === opt.v} onChange={() => setForm(p => ({ ...p, passwordMethod: opt.v }))} className="mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-slate-800">{opt.label}</div>
                  <div className="text-xs text-slate-500">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
          {form.passwordMethod === 'manual' && (
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Initial Password</label><input type="password" className="input-field" placeholder="Enter password" value={form.initialPassword} onChange={e => setForm(p => ({ ...p, initialPassword: e.target.value }))} /></div>
          )}
        </div>
      )}

      {/* Step 3 – Academic Setup */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Academic Configuration</h3>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Current Academic Year</label>
            <select className="input-field bg-white" value={form.academicYear} onChange={e => setForm(p => ({ ...p, academicYear: e.target.value }))}>
              <option>2024-2025</option><option>2025-2026</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Number of Students</label><input className="input-field" value={form.students} onChange={e => setForm(p => ({ ...p, students: e.target.value }))} /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Number of Teachers</label><input className="input-field" value={form.teachers} onChange={e => setForm(p => ({ ...p, teachers: e.target.value }))} /></div>
          </div>
          <div><label className="block text-xs font-medium text-slate-600 mb-1.5">Number of Classes</label><input className="input-field" value={form.classes} onChange={e => setForm(p => ({ ...p, classes: e.target.value }))} /></div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Number of Terms/Semester</label>
            <select className="input-field bg-white" value={form.terms} onChange={e => setForm(p => ({ ...p, terms: e.target.value }))}>
              <option>2 Terms</option><option>3 Terms</option><option>4 Terms</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 4 – Select Plan */}
      {step === 4 && (
        <div className="space-y-3">
          <div className="flex gap-2 mb-4">
            <button className="btn-primary text-xs px-3 py-1.5">Monthly</button>
            <button className="btn-secondary text-xs px-3 py-1.5">Annual <span className="text-green-500 ml-1">-11%</span></button>
          </div>
          {plans.map(p => (
            <label key={p.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.plan === p.id ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input type="radio" name="plan" value={p.id} checked={form.plan === p.id} onChange={() => setForm(prev => ({ ...prev, plan: p.id }))} />
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-800">{p.name}</div>
                <div className="text-xs text-slate-500">{p.price}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <span>👤</span>{p.students}
                </div>
              </div>
            </label>
          ))}
          {form.plan === 'basic' && <p className="text-xs text-slate-400 mt-2">30-day free trial</p>}
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button onClick={() => step === 0 ? onClose() : setStep(s => s - 1)} className="btn-secondary flex-1 justify-center">Back</button>
        <button
          onClick={() => step === steps.length - 1 ? setSuccess(true) : setStep(s => s + 1)}
          className="btn-primary flex-1 justify-center"
        >
          {step === steps.length - 1 ? 'Add School' : 'Next'}
        </button>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// School Detail View
// ──────────────────────────────────────────────────────────────────────────────
function SchoolDetail({ school, onBack }: { school: typeof schoolDetail & { status: string }; onBack: () => void }) {
  const [tab, setTab] = useState<'overview' | 'users' | 'exams' | 'billings' | 'settings'>('overview')
  const [userFilter, setUserFilter] = useState('Students')
  const [suspended, setSuspended] = useState(school.status === 'Suspended')
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false)
  const [showSuspendSuccess, setShowSuspendSuccess] = useState(false)
  const [showActivateConfirm, setShowActivateConfirm] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailForm, setEmailForm] = useState({ subject: 'Notice of Changes', message: '' })
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [planSuccess, setPlanSuccess] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('basic')
  const [showExtendModal, setShowExtendModal] = useState(false)
  const [extendDate, setExtendDate] = useState('')
  const [extendSuccess, setExtendSuccess] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  const plans = [
    { id: 'basic', name: 'Basic Plan', price: '₦50,000/Month', students: '200 Students' },
    { id: 'standard', name: 'Standard Plan', price: '₦100,000/Month', students: '500 Students' },
    { id: 'premium', name: 'Premium Plan', price: '₦250,000/Month', students: '1000 Students' },
  ]

  const tabs = ['Overview', 'Users', 'Exams', 'Billings', 'Settings'] as const

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 mb-4">
        <button onClick={onBack} className="hover:text-green-600">School Management</button>
        <span className="mx-1.5">›</span>
        <span className="text-slate-700 font-medium">SpringHill Academy</span>
      </div>

      {/* School header card */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 mb-5">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center text-2xl">🏫</div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-800">Spring Hill Academy</h2>
                <Badge status={suspended ? 'Suspended' : 'Active'} />
              </div>
              <div className="flex flex-wrap gap-4 mt-1 text-xs text-slate-500">
                <span>1, Admiralty way, Lekki, Lagos</span>
                <span>{school.email}</span>
                <span>{school.phone}</span>
                <span>Joined {school.joined}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowEmailModal(true)} className="btn-secondary text-xs gap-1.5 h-9 px-3">
              <Mail size={13} /> Email Admin
            </button>
            {suspended ? (
              <button onClick={() => setShowActivateConfirm(true)} className="btn-primary text-xs gap-1.5 h-9 px-3">
                <Shield size={13} /> Activate School
              </button>
            ) : (
              <button onClick={() => setShowSuspendConfirm(true)} className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs gap-1.5 h-9 px-3 rounded-lg flex items-center transition-colors">
                <ShieldOff size={13} /> Suspend
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mt-5 border-b border-slate-100 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t.toLowerCase() as any)}
              className={`tab-btn ${tab === t.toLowerCase() ? 'active' : ''}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            {/* Stats */}
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { icon: '👥', val: '250', label: 'Total Students' },
                  { icon: '🧑‍🏫', val: '10', label: 'Total Teachers' },
                  { icon: '⚙️', val: '3', label: 'Total Admins' },
                  { icon: '📋', val: '10', label: 'Exams This month' },
                  { icon: '⏱', val: '2 Mins', label: 'Last Activity' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-lg mb-0.5">{s.icon}</div>
                    <div className="text-base font-bold text-slate-800">{s.val}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700">Storage Usage</span>
                <span className="text-sm font-bold text-green-600">{school.storagePercent}%</span>
              </div>
              <ProgressBar percent={school.storagePercent} />
              <p className="text-xs text-slate-400 mt-2">{school.storageUsed}GB of {school.storageTotal}GB Used</p>
            </div>

            {/* Active Subscription */}
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Active Subscription</h3>
              <div className="grid grid-cols-4 gap-3 text-xs">
                {[['Plan', school.subscription.plan], ['Plan Price', school.subscription.price], ['Renewal Date', school.subscription.renewalDate], ['Status', school.subscription.status]].map(([label, val]) => (
                  <div key={label as string}><div className="text-slate-400">{label}</div><div className="font-semibold text-slate-800 mt-0.5">{val as string}</div></div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Administrator */}
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">School Administrator</h3>
              <div className="flex items-center gap-3">
                <Avatar initials="MO" color="#16a34a" size={10} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">{school.administrator.name}</div>
                  <div className="text-xs text-slate-500">{school.administrator.email}</div>
                </div>
                <Badge status={school.administrator.status} />
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <select className="input-field w-auto bg-white text-sm" value={userFilter} onChange={e => setUserFilter(e.target.value)}>
              <option>Students</option><option>Staff</option>
            </select>
          </div>
          {userFilter === 'Students' ? (
            <DataTable columns={['Students', 'Student ID', 'Class', 'Status', 'Enrolled', '']}>
              {schoolStudents.map(s => (
                <Tr key={s.id}>
                  <Td><div className="flex items-center gap-2"><Avatar initials={s.name.slice(0,2)} color="#3b82f6" size={7} /><div><div className="text-xs font-medium text-slate-800">{s.name}</div><div className="text-[10px] text-slate-400">{s.email}</div></div></div></Td>
                  <Td><span className="text-xs text-slate-600">{s.studentId}</span></Td>
                  <Td><div className="text-xs"><div className="font-medium">{s.class}</div><div className="text-slate-400">{s.section}</div></div></Td>
                  <Td><Badge status={s.status} /></Td>
                  <Td><span className="text-xs text-slate-500">{s.enrolled}</span></Td>
                  <Td><button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={15} /></button></Td>
                </Tr>
              ))}
            </DataTable>
          ) : (
            <DataTable columns={['Staff', 'Staff ID', 'Role', 'Class', 'Status', 'Enrolled', '']}>
              {schoolStaff.map(s => (
                <Tr key={s.id}>
                  <Td><div className="flex items-center gap-2"><Avatar initials={s.name.slice(0,2)} color="#8b5cf6" size={7} /><div><div className="text-xs font-medium text-slate-800">{s.name}</div><div className="text-[10px] text-slate-400">{s.email}</div></div></div></Td>
                  <Td><span className="text-xs text-slate-600">{s.staffId}</span></Td>
                  <Td><span className="text-xs text-slate-600">{s.role}</span></Td>
                  <Td><span className="text-xs text-slate-500">{s.class}</span></Td>
                  <Td><Badge status={s.status} /></Td>
                  <Td><span className="text-xs text-slate-500">{s.enrolled}</span></Td>
                  <Td><button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={15} /></button></Td>
                </Tr>
              ))}
            </DataTable>
          )}
        </div>
      )}

      {tab === 'exams' && (
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Exams</h3>
          <DataTable columns={['Exam', 'Class', 'Mode', 'Schedule', 'Duration', 'Status', '']}>
            {recentExams.map((ex, i) => (
              <Tr key={i}>
                <Td><div className="text-xs"><div className="font-medium text-slate-800">{ex.name}</div><div className="text-slate-400">{ex.subject} · {ex.sections} marks</div></div></Td>
                <Td><span className="text-xs">{ex.class}</span></Td>
                <Td><span className="text-xs">{ex.mode}</span></Td>
                <Td><span className="text-xs text-slate-500 whitespace-nowrap">{ex.schedule}</span></Td>
                <Td><span className="text-xs">{ex.duration}</span></Td>
                <Td><Badge status={ex.status} /></Td>
                <Td><button className="text-slate-400"><MoreHorizontal size={15} /></button></Td>
              </Tr>
            ))}
          </DataTable>
        </div>
      )}

      {tab === 'billings' && (
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="grid grid-cols-3 gap-5 mb-6">
            <div><div className="text-xs text-slate-500">Total Paid (Lifetime)</div><div className="text-xl font-bold text-slate-800 mt-1">₦1,500,000</div></div>
            <div><div className="text-xs text-slate-500">Current Plan</div><div className="text-sm font-bold text-slate-800 mt-1">Enterprise</div></div>
            <div><div className="text-xs text-slate-500">Next Renewal</div><div className="text-sm font-bold text-slate-800 mt-1">July 15th, 2025</div></div>
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Invoice History</h3>
          <DataTable columns={['Invoice', 'Date', 'Period', 'Amount', 'Status']}>
            {invoices.map(inv => (
              <Tr key={inv.id}>
                <Td><span className="text-xs text-green-600 font-medium">{inv.id}</span></Td>
                <Td><span className="text-xs text-slate-600">{inv.date}</span></Td>
                <Td><span className="text-xs text-slate-600">{inv.period}</span></Td>
                <Td><span className="text-xs font-medium text-slate-800">{inv.amount}</span></Td>
                <Td><Badge status={inv.status} /></Td>
              </Tr>
            ))}
          </DataTable>
        </div>
      )}

      {tab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left – action items */}
          <div className="space-y-3">
            <button onClick={() => setShowPlanModal(true)} className="w-full flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-left">
              <div>
                <div className="text-sm font-semibold text-green-700">Change Subscription Plan</div>
                <div className="text-xs text-slate-500 mt-0.5">Current Enterprise</div>
              </div>
              <div className="text-right text-xs text-slate-500">
                <div>Enterprise · 15/07/25 · Monthly · ₦50,000</div>
              </div>
              <ChevronRight size={15} className="text-slate-400 ml-2" />
            </button>

            <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-700">Reset Admin Password</div>
                <div className="text-xs text-slate-400">Send password reset to school admin</div>
              </div>
              <button className="btn-primary text-xs px-3 py-1.5">Send</button>
            </div>

            <button onClick={() => setShowExtendModal(true)} className="w-full flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-left">
              <div>
                <div className="text-sm font-semibold text-green-700">Extend Subscription</div>
                <div className="text-xs text-slate-500">Expires Jul 8, 2025</div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-left">
              <div>
                <div className="text-sm font-semibold text-slate-700">Edit School Info</div>
                <div className="text-xs text-slate-400">Update name, contact, address</div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            <button onClick={() => setShowDeleteConfirm(true)} className="w-full p-4 bg-red-50 border border-red-200 rounded-xl text-left hover:bg-red-100 transition-colors">
              <div className="text-sm font-semibold text-red-600">Delete School Account</div>
              <div className="text-xs text-red-400">Delete all school records</div>
            </button>
          </div>

          {/* Right – School Profile form */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 text-center">School Profile</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500 mb-1">School Logo</div>
                <div className="text-[10px] text-slate-400">Allow JPG or PNG, max 2MB (optional)</div>
                <button className="mt-1 text-xs text-green-600 border border-green-300 px-2 py-1 rounded">Change Photo</button>
              </div>
              {[['School Name', 'Springhills Academy'], ['Tagline/Motto', 'On the Hills of Knowledge']].map(([label, val]) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                  <input className="input-field text-xs" defaultValue={val} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2">
                {[['Email Address', '@springhills.com'], ['Phone Number', '+234560000']].map(([label, placeholder]) => (
                  <div key={label}><label className="block text-xs font-medium text-slate-600 mb-1">{label}</label><input className="input-field text-xs" placeholder={placeholder} /></div>
                ))}
              </div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Address</label><input className="input-field text-xs" placeholder="1, Admiralty way, Lekki" /></div>
              <div className="grid grid-cols-2 gap-2">
                {[['State', 'Lagos'], ['Website Link', 'https://springhills.com']].map(([label, placeholder]) => (
                  <div key={label}><label className="block text-xs font-medium text-slate-600 mb-1">{label}</label><input className="input-field text-xs" placeholder={placeholder} /></div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[['Registration Number', 'Hyeh-8467BH'], ['Year of Establishment', '1988']].map(([label, placeholder]) => (
                  <div key={label}><label className="block text-xs font-medium text-slate-600 mb-1">{label}</label><input className="input-field text-xs" placeholder={placeholder} /></div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">School Type</label>
                  <select className="input-field text-xs bg-white"><option>Private School</option><option>Public School</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Education Level</label>
                  <select className="input-field text-xs bg-white"><option>Secondary School</option></select>
                </div>
              </div>
              <button className="btn-primary w-full justify-center mt-2">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ConfirmModal
        open={showSuspendConfirm}
        onClose={() => setShowSuspendConfirm(false)}
        onConfirm={() => { setSuspended(true); setShowSuspendConfirm(false); setShowSuspendSuccess(true) }}
        title="Suspend Account"
        message="Are you sure you want to suspend this School? You can always reactivate later."
        confirmLabel="Suspend"
        danger
      >
        <div className="mt-3">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Suspension Feedback</label>
          <textarea className="input-field text-xs" rows={3} placeholder="Enter reason for Suspension" />
        </div>
      </ConfirmModal>

      <SuccessModal open={showSuspendSuccess} onClose={() => setShowSuspendSuccess(false)} title="School Suspended" message="School Account has been suspended. An email has been sent to Admin." />

      <ConfirmModal
        open={showActivateConfirm}
        onClose={() => setShowActivateConfirm(false)}
        onConfirm={() => { setSuspended(false); setShowActivateConfirm(false) }}
        title="Activate School"
        message="Are you sure you want to reactivate this school?"
        confirmLabel="Activate"
      />

      {/* Email Admin Modal */}
      <Modal open={showEmailModal} onClose={() => setShowEmailModal(false)}>
        {emailSent ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Email Sent</h3>
            <p className="text-sm text-slate-500">Your message has been successfully sent</p>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Email Admin</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Admin Email</label>
                <input className="input-field text-sm" defaultValue="Admin@springhills.com" readOnly />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Subject</label>
                <input className="input-field text-sm" value={emailForm.subject} onChange={e => setEmailForm(p => ({ ...p, subject: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Message</label>
                <textarea className="input-field text-sm" rows={4} placeholder="Message will be written here" value={emailForm.message} onChange={e => setEmailForm(p => ({ ...p, message: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowEmailModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              <button onClick={() => setEmailSent(true)} className="btn-primary flex-1 justify-center">Send Email</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Change Plan Modal */}
      <Modal open={showPlanModal} onClose={() => { setShowPlanModal(false); setPlanSuccess(false) }}>
        {planSuccess ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Subscription Plan Changed</h3>
            <p className="text-sm text-slate-500 mb-5">New plan will take effect on next billing cycle. An email notification has been sent to Admin.</p>
            <button onClick={() => { setShowPlanModal(false); setPlanSuccess(false) }} className="btn-primary w-full justify-center">Done</button>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Change Subscription Plan</h3>
            <div className="flex gap-2 mb-4">
              <button className="btn-primary text-xs px-3 py-1.5">Monthly</button>
              <button className="btn-secondary text-xs px-3 py-1.5">Annual <span className="text-green-500 ml-1">-11%</span></button>
            </div>
            <div className="space-y-2">
              {plans.map(p => (
                <label key={p.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${selectedPlan === p.id ? 'border-green-500 bg-green-50' : 'border-slate-200'}`}>
                  <input type="radio" name="changeplan" value={p.id} checked={selectedPlan === p.id} onChange={() => setSelectedPlan(p.id)} />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.price} · {p.students}</div>
                  </div>
                </label>
              ))}
            </div>
            <button onClick={() => setPlanSuccess(true)} className="btn-primary w-full justify-center mt-5">Change Plan</button>
          </div>
        )}
      </Modal>

      {/* Extend Subscription Modal */}
      <Modal open={showExtendModal} onClose={() => { setShowExtendModal(false); setExtendSuccess(false) }}>
        {extendSuccess ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Subscription Extended</h3>
            <p className="text-sm text-slate-500 mb-5">New expiration date set for 19/8/2025. An email notification has been sent to Admin.</p>
            <button onClick={() => { setShowExtendModal(false); setExtendSuccess(false) }} className="btn-primary w-full justify-center">Done</button>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Extend Subscription</h3>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Extension Date</label>
              <input type="date" className="input-field" value={extendDate} onChange={e => setExtendDate(e.target.value)} />
            </div>
            <button onClick={() => setExtendSuccess(true)} className="btn-primary w-full justify-center mt-5">Save</button>
          </div>
        )}
      </Modal>

      {/* Delete Account Modal */}
      <ConfirmModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => { setShowDeleteConfirm(false); setDeleteSuccess(true) }}
        title="Delete School Account"
        message="Are you sure you want to delete this School? This action cannot be undone."
        confirmLabel="Delete"
        danger
      />
      <Modal open={deleteSuccess} onClose={() => setDeleteSuccess(false)}>
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🗑️</div>
          <h3 className="text-base font-bold text-slate-800 mb-1">School Account Deleted</h3>
          <p className="text-sm text-slate-500 mb-5">All school details has been deleted.</p>
          <button onClick={() => setDeleteSuccess(false)} className="btn-primary w-full justify-center">Done</button>
        </div>
      </Modal>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Schools Page
// ──────────────────────────────────────────────────────────────────────────────
export default function Schools() {
  const [selectedSchool, setSelectedSchool] = useState<null | string>(null)
  const [showAddWizard, setShowAddWizard] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [planFilter, setPlanFilter] = useState('All Plans')

  if (selectedSchool) {
    const school = { ...schoolDetail, status: schools.find(s => s.id === selectedSchool)?.status || 'Active' }
    return <SchoolDetail school={school} onBack={() => setSelectedSchool(null)} />
  }

  if (showAddWizard) return (
    <div className="max-w-2xl mx-auto">
      <div className="text-xs text-slate-500 mb-4">
        <button onClick={() => setShowAddWizard(false)} className="hover:text-green-600">School Management</button>
        <span className="mx-1.5">›</span>
        <span className="text-slate-700">Add New School</span>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <AddSchoolWizard onClose={() => setShowAddWizard(false)} />
      </div>
    </div>
  )

  const filtered = schools.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All Status' || s.status === statusFilter
    const matchPlan = planFilter === 'All Plans' || s.plan === planFilter
    return matchSearch && matchStatus && matchPlan
  })

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-5">School Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { val: '25', label: 'Total Schools', color: 'text-green-600' },
          { val: '150', label: 'Active Subscriptions', color: 'text-purple-600' },
          { val: '20', label: 'Trial Mode', color: 'text-orange-500' },
          { val: '10', label: 'Suspended', color: 'text-red-500' },
          { val: '5,345', label: 'Total accounts', color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-5">
          <SearchInput placeholder="Search by schools by name" value={search} onChange={setSearch} />
          <div className="flex gap-2 flex-wrap">
            <Select value={statusFilter} onChange={setStatusFilter} options={['All Status','Active','Trial','Suspended'].map(v => ({ label: v, value: v }))} className="text-xs w-auto" />
            <Select value={planFilter} onChange={setPlanFilter} options={['All Plans','Basic','Standard','Premium'].map(v => ({ label: v, value: v }))} className="text-xs w-auto" />
            <button onClick={() => setShowAddWizard(true)} className="btn-primary text-xs">
              <Plus size={13} /> Add New School
            </button>
          </div>
        </div>

        <DataTable columns={['School', 'Plan', 'Users', 'Status', 'Expiry Date', '']}>
          {filtered.map(s => (
            <Tr key={s.id} onClick={() => setSelectedSchool(s.id)}>
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar initials={s.initials} color={s.color} size={8} />
                  <div>
                    <div className="text-sm font-medium text-slate-800">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.location}, {s.admin}</div>
                  </div>
                </div>
              </Td>
              <Td><span className="text-sm">{s.plan}</span></Td>
              <Td><span className="text-sm">{s.users.toLocaleString()}</span></Td>
              <Td><Badge status={s.status} /></Td>
              <Td><span className="text-sm text-slate-600">{s.expiry}</span></Td>
              <Td><Eye size={15} className="text-slate-400 hover:text-slate-600 cursor-pointer" /></Td>
            </Tr>
          ))}
        </DataTable>
      </div>
    </div>
  )
}

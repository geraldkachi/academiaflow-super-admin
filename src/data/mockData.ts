export const schools = [
  { id: '1', initials: 'JD', color: '#3b82f6', name: 'Springhill College', location: 'Lagos', admin: 'Mr. Akpan Uche', plan: 'Basic', users: 5789, status: 'Active', expiry: '11/03/2026' },
  { id: '2', initials: 'JB', color: '#8b5cf6', name: 'Springfield Academy', location: 'Abuja', admin: 'Mr. Okoro Emmanuel', plan: 'Standard', users: 2345, status: 'Active', expiry: '04/16/2026' },
  { id: '3', initials: 'AS', color: '#f59e0b', name: 'Westbrook High', location: 'Port Harcourt', admin: 'Mr. Ude Jude', plan: 'Premium', users: 7890, status: 'Active', expiry: '07/22/2026' },
  { id: '4', initials: 'JD', color: '#10b981', name: 'Northgate School', location: 'Kano', admin: 'Mr. Aliyu Musa', plan: 'Basic', users: 3456, status: 'Active', expiry: '09/15/2026' },
  { id: '5', initials: 'MJ', color: '#ec4899', name: 'Evergreen College', location: 'Ibadan', admin: 'Mr. Ojo Ayodele', plan: 'Standard', users: 6234, status: 'Trial', expiry: '12/01/2026' },
  { id: '6', initials: 'AO', color: '#f97316', name: 'Oakhaven Institute', location: 'Benin', admin: 'Mr. Edozie Chukwudi', plan: 'Premium', users: 1678, status: 'Active', expiry: '01/08/2026' },
  { id: '7', initials: 'CD', color: '#06b6d4', name: 'Crestwood Grammar', location: 'Calabar', admin: 'Mr. Etim Bassey', plan: 'Basic', users: 4901, status: 'Active', expiry: '02/14/2026' },
  { id: '8', initials: 'SV', color: '#6366f1', name: 'Southview Academy', location: 'Jos', admin: 'Mr. Dauda Yakubu', plan: 'Standard', users: 7123, status: 'Suspended', expiry: '06/20/2026' },
]

export const schoolDetail = {
  id: '2',
  name: 'Spring Hill Academy',
  status: 'Active',
  address: '1, Admiralty way, Lekki, Lagos',
  email: 'Admin@springhills.edu.ng',
  phone: '+23470102030',
  joined: 'Jan 15th, 2024',
  totalStudents: 250,
  totalTeachers: 10,
  totalAdmins: 3,
  examsThisMonth: 10,
  lastActivity: '2 Mins',
  storageUsed: 18,
  storageTotal: 50,
  storagePercent: 83.7,
  administrator: { name: 'Mr. Okafor', email: 'Okafor@springhills.edu', status: 'Active' },
  subscription: { plan: 'Premium', price: '₦25,000', renewalDate: '26th April 2026', status: 'Active' },
}

export const subscriptionPlans = [
  { name: 'Standard Plan', price: '₦120,000/Month', students: '500 Students', schools: 10 },
  { name: 'Premium Plan', price: '₦250,000/Month', students: '1000 Students', schools: 15 },
  { name: 'Enterprise Plan', price: '₦500,000/Month', students: 'Unlimited Students', schools: 5 },
]

export const users = [
  { id: '1', initials: 'CN', color: '#3b82f6', name: 'Dr. Chioma Nwosu', email: 'c.nwosu@springhill.edu.ng', role: 'School Admin', school: 'Springhill College', status: 'Active', lastLogin: '1 mins ago' },
  { id: '2', initials: 'AW', color: '#8b5cf6', name: 'Arron Wabisaka', email: 'A.wabisaka@springfield.edu.ng', role: 'School Admin', school: 'Springfield Academy', status: 'Active', lastLogin: '2 mins ago' },
  { id: '3', initials: 'FA', color: '#10b981', name: 'Folakemi Adeyemi', email: 'F.adekemi@westbrook.edu.ng', role: 'Teacher', school: 'Westbrook High', status: 'Active', lastLogin: '4 mins ago' },
  { id: '4', initials: 'AM', color: '#f59e0b', name: 'Abdul Musa', email: 'a.musa@northgate.edu.ng', role: 'Teacher', school: 'Northgate School', status: 'Active', lastLogin: '7 mins ago' },
  { id: '5', initials: 'AO', color: '#ec4899', name: 'Adaeze Okafor', email: 'A.okafor@evergreen.edu.ng', role: 'Student', school: 'Evergreen College', status: 'Active', lastLogin: '9 mins ago' },
  { id: '6', initials: 'KB', color: '#f97316', name: 'Kenny Bonney', email: 'K.bonney@oakhaven.edu.ng', role: 'Student', school: 'Oakhaven Institute', status: 'Inactive', lastLogin: '3 months ago' },
  { id: '7', initials: 'SM', color: '#06b6d4', name: 'Sandra Matins', email: 's.Matins@crestwood.edu.ng', role: 'Student', school: 'Crestwood Grammer', status: 'Active', lastLogin: '12 mins ago' },
  { id: '8', initials: 'JD', color: '#6366f1', name: 'John Doe', email: 'j.doe@southview.edu.ng', role: 'Student', school: 'Southview Academy', status: 'Inactive', lastLogin: '6 months ago' },
]

export const liveExams = [
  { id: '1', name: 'Organic Chemistry Midterms', school: 'Spring Hills College', city: 'Lagos', teacher: 'Mr. Okon', class: 'SS3A', students: 45, submitted: 45, total: 45, percent: 100, mode: 'Online', status: 'Ending Soon', issue: null },
  { id: '2', name: 'Mathematics Midterms', school: 'Royal Academy', city: 'Lagos', teacher: 'Mrs. Sandra O', class: 'SS1A', students: 95, submitted: 12, total: 95, percent: 100, mode: 'Online', status: null, issue: '3 Disconnections' },
  { id: '3', name: 'Physics Midterms', school: 'Tech University', city: 'Abuja', teacher: 'Mr. Ibrahim', class: 'SS2B', students: 40, submitted: 38, total: 40, percent: 95, mode: 'In-Person', status: 'Completed', issue: null },
  { id: '4', name: 'Biology Midterms', school: 'Greenwood College', city: 'Lagos', teacher: 'Mrs. Adebayo', class: 'SS3B', students: 50, submitted: 48, total: 50, percent: 96, mode: 'Online', status: null, issue: '1 Absence' },
  { id: '5', name: 'Chemistry Midterms', school: 'Silver Oak Institute', city: 'Port Harcourt', teacher: 'Dr. Sani', class: 'SS2A', students: 35, submitted: 34, total: 35, percent: 97, mode: 'In-Person', status: 'Completed', issue: null },
  { id: '6', name: 'History Midterms', school: 'Bright Future Academy', city: 'Ibadan', teacher: 'Mr. Adeyemi', class: 'SS1B', students: 30, submitted: 30, total: 30, percent: 100, mode: 'Online', status: null, issue: null },
]

export const notifications = [
  { id: '1', title: 'Notice of Maintenance', type: 'Announcement', message: 'Please be advised that scheduled maintenance will occur on March 5, 2026, from 1:00 AM to 4:00 AM. During this time, some services may be temporarily unavailable. We appreciate your understanding and apologize for any inconvenience caused.', recipient: 'All Schools', date: 'Feb 18, 2026', time: '10:30AM', views: 92, recipients: 37, read: 21, readRate: 80, sentTo: 'All Schools' },
  { id: '2', title: 'Welcome Aboard', type: 'Reminder', message: 'Welcome to AcademiaFlow. We\'re excited to have you join our community. Please review the onboarding guide and reach out if you have any questions.', recipient: 'Green Spring School', date: 'Feb 18, 2026', time: '10:30AM', views: 62, recipients: 25, read: 18, readRate: 72, sentTo: 'Green Spring School' },
  { id: '3', title: 'New Exciting Features Coming', type: 'Alert', message: 'Stay tuned for upcoming updates that will enhance your experience. We\'re committed to bringing you new features that make learning more engaging and accessible.', recipient: 'All Schools', date: 'Feb 18, 2026', time: '10:30AM', views: 102, recipients: 50, read: 40, readRate: 80, sentTo: 'All Schools' },
]

export const invoices = [
  { id: 'INV-2024-SH-001', date: 'Jan 15, 2025', period: 'Jan 2025', amount: '₦250,000', status: 'Paid' },
  { id: 'INV-2024-SH-002', date: 'Feb 15, 2025', period: 'Feb 2025', amount: '₦250,000', status: 'Paid' },
  { id: 'INV-2024-SH-003', date: 'Mar 15, 2025', period: 'Mar 2025', amount: '₦250,000', status: 'Paid' },
  { id: 'INV-2024-SH-004', date: 'Apr 15, 2025', period: 'Apr 2025', amount: '₦100,000', status: 'Paid' },
  { id: 'INV-2024-SH-005', date: 'May 15, 2025', period: 'May 2025', amount: '₦250,000', status: 'Paid' },
  { id: 'INV-2024-SH-006', date: 'Jun 15, 2025', period: 'Jun 2025', amount: '₦760,000', status: 'Paid' },
]

export const recentExams = [
  { name: 'Mathematics Finals', subject: 'Mathematics', class: 'SS1', sections: 'Section A, B', mode: 'Half-Based', schedule: 'Jan 15, 2026 · 12:00 PM - 02:00 PM', duration: '90 Minutes', status: 'Scheduled' },
  { name: 'Biology Practical Assessment', subject: 'Biology', class: 'SS3', sections: 'Section A, C', mode: 'Online', schedule: 'Feb 20, 2026 · 10:00 AM - 12:00 PM', duration: '90 Minutes', status: 'Scheduled' },
  { name: 'Physics Quiz 3', subject: 'Physics', class: 'JSS2', sections: 'Section B', mode: 'Half-Based', schedule: 'Mar 8, 2026 · 2:00 AM - 4:00 AM', duration: '90 Minutes', status: 'Scheduled' },
  { name: 'English Mid-Term', subject: 'English', class: 'JSS3', sections: 'Section A, B, C', mode: 'Online', schedule: 'Feb 25, 2026 · 2:00 AM - 4:00 AM', duration: '90 Minutes', status: 'Pending Review' },
  { name: 'Government Mock Exam', subject: 'Government', class: 'SS3', sections: 'Section B', mode: 'Half-Based', schedule: 'Jan 29, 2026 · 2:00 AM - 4:00 AM', duration: '90 Minutes', status: 'Pending Review' },
  { name: 'Chemistry Test', subject: 'Chemistry', class: 'JSS1', sections: 'Section B', mode: 'Online', schedule: 'Feb 12, 2026 · 2:00 AM - 4:00 AM', duration: '90 Minutes', status: 'Completed' },
  { name: 'Commerce Mid-term', subject: 'Commerce', class: 'SS1', sections: 'Section A', mode: 'Half-Based', schedule: 'Mar 13, 2026 · 2:00 AM - 4:00 AM', duration: '90 Minutes', status: 'Completed' },
  { name: 'Accounting Mock Exam', subject: 'Accounting', class: 'SS2', sections: 'Section B', mode: 'Online', schedule: 'Mar 22, 2026 · 2:00 AM - 4:00 AM', duration: '90 Minutes', status: 'Rejected' },
]

export const schoolStudents = [
  { id: '1', name: 'Jane Doe', email: 'janedoe@springhills.com', studentId: 'STU239', class: 'SS1', section: 'Section A', status: 'Active', enrolled: '5/27/2023' },
  { id: '2', name: 'Jameson Black', email: 'jblack@springhills.com', studentId: 'STU356', class: 'SS3', section: 'Section E', status: 'Active', enrolled: '1/30/2020' },
  { id: '3', name: 'Amelia Spoon', email: 'amelia@springhills.com', studentId: 'STU278', class: 'JSS2', section: 'Section A', status: 'Active', enrolled: '10/28/2016' },
  { id: '4', name: 'John Doe', email: 'john@springhills.com', studentId: 'STU209', class: 'JSS3', section: 'Section B', status: 'Active', enrolled: '9/1/2019' },
  { id: '5', name: 'Malcolm Johnson', email: 'malcolm@springhills.com', studentId: 'STU878', class: 'SS2', section: 'Section F', status: 'Inactive', enrolled: '5/30/2014' },
  { id: '6', name: 'Akemafuna Okuchi', email: 'akema@springhills.com', studentId: 'STU476', class: 'JSS1', section: 'Section C', status: 'Active', enrolled: '5/30/2014' },
  { id: '7', name: 'Celine Dion', email: 'celine@springhills.com', studentId: 'STU521', class: 'SS2', section: 'Section D', status: 'Active', enrolled: '5/30/2014' },
  { id: '8', name: 'Sofia Vagara', email: 'sofia@springhills.com', studentId: 'STU883', class: 'SS3', section: 'Section B', status: 'Active', enrolled: '5/30/2014' },
]

export const schoolStaff = [
  { id: '1', name: 'Jane Doe', email: 'janedoe@springhills.com', staffId: 'STF-1338', role: 'Teacher', class: 'SS1 · Section A', status: 'Active', enrolled: '5/27/2023' },
  { id: '2', name: 'Jameson Black', email: 'jblack@springhills.com', staffId: 'STF-1358', role: 'Teacher', class: 'SS3 · Section E', status: 'Active', enrolled: '1/30/2020' },
  { id: '3', name: 'Amelia Spoon', email: 'amelia@springhills.com', staffId: 'STF-1278', role: 'Teacher', class: 'JSS2 · Maths/Science', status: 'Active', enrolled: '10/28/2016' },
  { id: '4', name: 'John Doe', email: 'john@springhills.com', staffId: 'STF-3018', role: 'Admin Staff', class: '—', status: 'Active', enrolled: '8/2/2019' },
  { id: '5', name: 'Malcolm Johnson', email: 'malcolm@springhills.com', staffId: 'STF-1678', role: 'Support Staff', class: '—', status: 'Inactive', enrolled: '5/30/2014' },
  { id: '6', name: 'Akemafuna Okuchi', email: 'akema@springhills.com', staffId: 'STF-3478', role: 'Teacher', class: 'JSS1', status: 'Active', enrolled: '9/20/2014' },
  { id: '7', name: 'Celine Dion', email: 'celine@springhills.com', staffId: 'STF-8140', role: 'Support Staff', class: '—', status: 'Active', enrolled: '9/8/2014' },
  { id: '8', name: 'Sofia Vagara', email: 'sofia@springhills.com', staffId: 'STF-1183', role: 'Admin Staff', class: '—', status: 'Inactive', enrolled: '3/30/2014' },
]

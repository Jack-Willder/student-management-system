'use client';
import { useState, useEffect } from 'react';
import AddStudentForm from './form';
import EditStudentForm from './edit';
import DeleteStudentForm from './delete';

export default function DashboardContent() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [currentStudentId, setCurrentStudentId] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    studentId: '',
    className: 'Class 10A',
    contact: '',
    attendance: '',
    status: 'Active',
  });

  useEffect(() => {
    fetch('/api/get')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, [refresh]);

  function toggleRefresh() {
    setRefresh(!refresh);
  }

  function handleEdit(student) {
    setEditVisible(true);
    console.log(student)
    setForm({
        name: student.name,
        email: student.email,
        studentId: student.studentId,
        className: student.class,
        contact: student.contact,
        attendance: student.attendance,
        status: student.status,
    });
    setCurrentStudentId(student._id);
  } 
    function handleDelete(student) {
      setDeleteVisible(true);
      setCurrentStudentId(student._id);
  }

  function handleNav(page) {
    console.log(`Navigate to page: ${page}`);
  }

return (
        <div className="flex-1 overflow-auto bg-indigo-50
          ">
            <div className="max-w-7xl mx-auto m-10 w-full">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold mb-1 text-black">Student Management</h2>
                    <p className="text-gray-600">Manage student profiles and attendance records</p>
                  </div>
                  <button
                      onClick={() => setVisible(!visible)}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-5 rounded-lg shadow transition flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Student
                  </button>
                </div>





                {visible && (<div className="absolute inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-lg p-8 min-w-7xl min-h-3/4 flex flex-col items-center justify-center drop-shadow-xl">
                    <AddStudentForm setVisible={setVisible} refresh={refresh} reload={toggleRefresh} />
                  </div>
                </div>)}

                {editVisible && (<div className="absolute inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-lg p-8 min-w-7xl min-h-3/4 flex flex-col items-center justify-center drop-shadow-xl">
                    <EditStudentForm setEditVisible={setEditVisible} form={form} setForm={setForm} currentStudentId={currentStudentId} refresh={refresh} reload={toggleRefresh} />
                  </div>
                </div>)}

                {deleteVisible && (<div className="absolute inset-0 flex items-center justify-center z-50">
                  <DeleteStudentForm setDeleteVisible={setDeleteVisible} currentStudentId={currentStudentId} refresh={refresh} reload={toggleRefresh} />
                </div>)}



                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 w-full">
                  <div className="bg-white rounded-xl p-5 shadow border flex flex-col">
                    <div className="flex items-center mb-2">
                      <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M3 20h6v-2a4 4 0 00-3-3.87"/></svg>
                      </span>
                      <span className="font-semibold text-gray-700">Total Students</span>
                    </div>
                    <div className="text-2xl font-bold text-black">1,248</div>
                    <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow border flex flex-col">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                      </span>
                      <span className="font-semibold text-gray-700">Present Today</span>
                    </div>
                    <div className="text-2xl font-bold text-black">1,156</div>
                    <div className="text-xs text-gray-500 mt-1">92.6% attendance rate</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow border flex flex-col">
                    <div className="flex items-center mb-2">
                      <span className="bg-red-100 text-red-600 p-2 rounded-lg mr-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                      </span>
                      <span className="font-semibold text-gray-700">Absent Today</span>
                    </div>
                    <div className="text-2xl font-bold text-black">92</div>
                    <div className="text-xs text-red-500 mt-1">7.4% absent</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow border flex flex-col">
                    <div className="flex items-center mb-2">
                      <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
                      </span>
                      <span className="font-semibold text-gray-700">Active Classes</span>
                    </div>
                    <div className="text-2xl font-bold text-black">24</div>
                    <div className="text-xs text-gray-500 mt-1">Across 6 departments</div>
                  </div>
                </div>




<div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Student Profiles
      </h2>

      <div className="flex gap-3">
        <select className="border rounded-md px-3 py-2 text-sm text-gray-600">
          <option>All Classes</option>
        </select>
        <select className="border rounded-md px-3 py-2 text-sm text-gray-600">
          <option>All Status</option>
        </select>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500 border-b">
          <tr>
            <th className="py-3">Student</th>
            <th>Student ID</th>
            <th>Class</th>
            <th>Contact</th>
            <th>Attendance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>







        <tbody className="divide-y">
          {students.map((s, i) => (
            <tr key={s._id}>
              <td className="py-4 flex items-center gap-3">
                <img
                  src={`https://i.pravatar.cc/40?img=${i + 1}`}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-black">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.email}</p>
                </div>
              </td>
              <td className="text-gray-500">{s.studentId}</td>
              <td className="text-gray-500">{s.class}</td>
              <td className="text-gray-500">{s.contact}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-black">{s.attendance}%</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        s.attendance >= 90
                          ? 'bg-green-500'
                          : s.attendance >= 75
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${s.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </td>
              <td>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    s.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : s.status === 'Warning'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {s.status}
                </span>
              </td>
                  <td className="flex gap-8 -translate-y-4/12">
                      <button
                          onClick={() => handleEdit(s)}
                          className="text-blue-500 hover:text-blue-700 w-2"
                          aria-label="Edit"
                      >
                          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                      </button>
                      <button
                          onClick={() => handleDelete(s)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete"
                      >
                          <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" /></svg>
                      </button>
                  </td>
              </tr>
          ))}
        </tbody>    







      </table>
    </div>

    <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
      <p>Showing 1 to 5 of 1,248 students</p>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1 border rounded-md hover:scale-125" onClick={() => handleNav("previous")}>Previous</button>
        <button className="px-3 py-1 rounded-md bg-purple-600 text-white hover:scale-125" onClick={() => handleNav("1")}>1</button>
        <button className="px-3 py-1 border rounded-md hover:scale-125" onClick={() => handleNav("2")}>2</button>
        <button className="px-3 py-1 border rounded-md hover:scale-125" onClick={() => handleNav("3")}>3</button>
        <button className="px-3 py-1 border rounded-md hover:scale-125" onClick={() => handleNav("next")}>Next</button>
      </div>
    </div>
  </div>


  </div>
</div>
)};
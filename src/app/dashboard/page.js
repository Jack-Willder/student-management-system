import { MongoClient } from 'mongodb';
import Sidebar from './sidebar';
import DashboardContent from './main';
import AddStudentForm from './form';
import { refresh } from 'next/cache';


async function getUserName() {
  const uri = 'mongodb+srv://manipirama:mani@cluster0.svr0w6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('student-management');
    const admins = database.collection('admin');
    const admin = await admins.findOne();
    return admin?.name || 'Admin';
  } catch {
    return 'Guest';
  } finally {
    await client.close();
  }
}

export default async function Dashboard() {
  const userName = await getUserName();
  const userType = "Administrator";
  return (
    <div className="min-h-screen h-screen bg-white flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-rounded-circle" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AttendEase</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 text-gray-500 placeholder-gray-400 w-100 transition"
              />
            </div>
            <button className="relative mx-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <svg className="w-3 h-3" viewBox="0 0 8 8" fill="red" >
                  <circle cx="4" cy="4" r="4" />
                </svg>
              </span>
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex flex-col items-start">
              <span className="text-gray-700 font-bold">{userName}</span>
              <span className="text-gray-700 font-light">{userType}</span>
            </div>
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              {userName ? userName.split(' ').map(n => n[0]).join('') : 'A'}
            </div>
          </div>
        </header>
        <main className="flex-1 p-0 min-h-0 overflow-hidden">
        <div className="flex h-full min-h-0 overflow-hidden">
        <Sidebar />
        <DashboardContent />
        </div>
        </main>
      </div>
    </div>
  );
}
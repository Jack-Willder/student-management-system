export default function Sidebar() {
    return (
                <aside className="w-56 bg-white border-r border-gray-200 flex flex-col min-h-full p-4 shrink-0">
        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-semibold">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a4 4 0 00-3-3.87" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 20h6v-2a4 4 0 00-3-3.87" />
                </svg>
                Students
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M8 2v4M16 2v4M2 10h20" />
                </svg>
                Attendance
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M8 8h8M8 12h8M8 16h8" />
                </svg>
                Classes
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                Reports
              </a>
            </li>
          </ul>
          <div className="mt-8 mb-2 text-xs text-gray-400 font-semibold">MANAGE</div>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                Staff
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M8 8h8M8 12h8M8 16h8" />
                </svg>
                Settings
              </a>
            </li>
          </ul>
          <div className="mt-8 mb-2 text-xs text-gray-400 font-semibold">SUPPORT</div>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
                Help Center
              </a>
            </li>
          </ul>
        </nav>
        </aside>
    );
}
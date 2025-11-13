import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold">U</span>
          <span className="text-lg font-semibold text-gray-800">User Manager</span>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `px-3 py-2 rounded-md font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/users/new"
            className={({ isActive }) => `px-3 py-2 rounded-md font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Create User
          </NavLink>
          <a
            href="/test"
            className="px-3 py-2 rounded-md font-medium text-gray-600 hover:text-gray-900"
          >
            Backend Test
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

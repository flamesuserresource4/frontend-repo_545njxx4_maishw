import Navbar from './components/Navbar'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import CreateUser from './components/CreateUser'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <Routes>
          <Route index element={<UserList />} />
          <Route path="/users/new" element={<CreateUser />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users/:id/edit" element={<UserDetail />} />
        </Routes>
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        Built with React + Tailwind. Data from JSONPlaceholder.
      </footer>
    </div>
  )
}

export default App

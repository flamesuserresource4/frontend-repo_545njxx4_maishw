import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

const API = 'https://jsonplaceholder.typicode.com/users'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API)
        if (!res.ok) throw new Error('Failed to fetch users')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return users
    return users.filter((u) =>
      [u.name, u.email, u.phone, u.username].some((f) => (f || '').toLowerCase().includes(q))
    )
  }, [users, query])

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete user')
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <Spinner />

  if (error)
    return (
      <div className="rounded-md bg-red-50 text-red-700 px-4 py-3">{error}</div>
    )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={() => navigate('/users/new')}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Create User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <Link to={`/users/${u.id}`} className="text-blue-600 hover:underline">
                    {u.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.phone}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/users/${u.id}/edit`)}
                    className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="rounded-md border px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList

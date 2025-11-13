import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from './Spinner'
import UserForm from './UserForm'

const API = 'https://jsonplaceholder.typicode.com/users'

function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/${id}`)
        if (!res.ok) throw new Error('Failed to fetch user')
        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  const updateUser = async (payload) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, ...payload }),
    })
    if (!res.ok) throw new Error('Update failed')
    const updated = await res.json()
    alert('User updated (simulated).')
    setUser(updated)
    setEditing(false)
  }

  if (loading) return <Spinner />
  if (error) return <div className="rounded-md bg-red-50 text-red-700 px-4 py-3">{error}</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
        {!editing && (
          <div className="space-x-2">
            <button
              onClick={() => setEditing(true)}
              className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => navigate(-1)}
              className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        )}
      </div>

      {!editing ? (
        <div className="bg-white rounded-lg border p-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Info label="Name" value={user.name} />
            <Info label="Username" value={user.username} />
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone} />
            <Info label="Website" value={user.website} />
            <Info label="Company" value={user.company?.name} />
            <Info label="City" value={user.address?.city} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-4">
          <UserForm initialUser={user} onSubmit={updateUser} submitLabel="Update" onCancel={() => setEditing(false)} />
        </div>
      )}
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase text-gray-500">{label}</div>
      <div className="text-gray-800">{value || '-'}
      </div>
    </div>
  )
}

export default UserDetail

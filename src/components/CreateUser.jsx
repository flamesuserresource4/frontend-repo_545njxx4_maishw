import { useNavigate } from 'react-router-dom'
import UserForm from './UserForm'

const API = 'https://jsonplaceholder.typicode.com/users'

function CreateUser() {
  const navigate = useNavigate()

  const createUser = async (payload) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Create failed')
    const created = await res.json()
    alert('User created (simulated).')
    navigate(`/users/${created.id || 1}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Create User</h2>
      <div className="bg-white rounded-lg border p-4">
        <UserForm onSubmit={createUser} submitLabel="Create" />
      </div>
    </div>
  )
}

export default CreateUser

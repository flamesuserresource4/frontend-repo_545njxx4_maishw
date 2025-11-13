import { useEffect, useState } from 'react'

const emptyUser = {
  name: '',
  email: '',
  phone: '',
  website: '',
}

function UserForm({ initialUser, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [user, setUser] = useState(emptyUser)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialUser) {
      setUser({
        name: initialUser.name || '',
        email: initialUser.email || '',
        phone: initialUser.phone || '',
        website: initialUser.website || '',
      })
    }
  }, [initialUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await onSubmit(user)
    } catch (err) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="text"
            name="website"
            value={user.website}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="example.com"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default UserForm

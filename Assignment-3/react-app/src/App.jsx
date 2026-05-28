import React, {useState} from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com/posts'

export default function App() {
  const [form, setForm] = useState({name:'', email:'', message:''})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (ev) => setForm({...form, [ev.target.name]: ev.target.value})

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setStatus(null)
    if (!validate()) return
    try {
      const resp = await axios.post(apiUrl, form, {timeout:5000})
      setStatus({type:'success', msg:`Submitted successfully (id: ${resp.data.id ?? 'n/a'})`})
      setForm({name:'', email:'', message:''})
    } catch (err) {
      const msg = err.response ? `Server error: ${err.response.status}` : (err.code === 'ECONNABORTED' ? 'Request timed out' : 'Network or TLS error')
      setStatus({type:'error', msg})
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Contact us</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="4" />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {status && <div className={`alert mt-4 ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>{status.msg}</div>}
    </div>
  )
}

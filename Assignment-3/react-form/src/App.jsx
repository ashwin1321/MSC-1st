import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com/posts'

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value })
    if (errors[ev.target.name]) {
      setErrors({ ...errors, [ev.target.name]: null })
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setStatus(null)
    if (!validate()) return
    
    setLoading(true)
    try {
      const resp = await axios.post(apiUrl, form, { timeout: 5000 })
      setStatus({ type: 'success', msg: `✓ Submitted successfully (id: ${resp.data.id ?? 'n/a'})` })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      const msg = err.response ? `✗ Server error: ${err.response.status}` : (err.code === 'ECONNABORTED' ? '✗ Request timed out' : '✗ Network or TLS error')
      setStatus({ type: 'error', msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Get In Touch</h1>
          <p className="subtitle">We'd love to hear from you. Send us a message!</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              disabled={loading}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              disabled={loading}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message here... (minimum 10 characters)"
              rows="5"
              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
              disabled={loading}
            />
            {errors.message && <div className="error-message">{errors.message}</div>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>

      {status && (
        <div className={`toast-notification ${status.type}`}>
          {status.msg}
        </div>
      )}
    </div>
  )
}

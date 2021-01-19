import React, { useState } from 'react'

import CodeForm from './CodeForm'

import { createShortcode } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

const initialFormData = { short_url: '', full_url: '' }

const CodeCreate = () => {

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    setFormData(newFormData)
  }
  
  const handleSubmit = async () => {
    try {
      const response = await createShortcode(formData)
      console.log(response.data)
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      {!isAuthenticated() && <div>You must be logged in - DON INSRT LINK TO HOME HERE</div>}
      {isAuthenticated() && <CodeForm mode='new' formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />}
    </div>
  )
}

export default CodeCreate
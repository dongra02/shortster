import React, { useState } from 'react'

import CodeForm from './CodeForm'

import { createShortcode } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

const initialFormData = { short_url: '', full_url: '' }

const CodeCreate = (props) => {

  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    const newFormerrors = { ...formErrors, [e.target.id]: '' }
    setFormData(newFormData)
    setFormErrors(newFormerrors)
  }
  
  const handleSubmit = async () => {
    try {
      const response = await createShortcode(formData)
      props.history.push(`/${response.data.short_url}/stats/`)
    } catch (err) {
      console.log(err.response)
      setFormErrors(err.response.data)
    }
  }

  return (
    <>
      {!isAuthenticated() && <div>You must be logged in - DON INSRT LINK TO HOME HERE</div>}
      {isAuthenticated() && <CodeForm mode='new' formData={formData} formErrors={formErrors} handleSubmit={handleSubmit} handleChange={handleChange} />}
    </>

  )
}

export default CodeCreate
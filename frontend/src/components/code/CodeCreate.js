import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import CodeForm from './CodeForm'

import { createShortcode } from '../../lib/api'

import Typography from '@material-ui/core/Typography'

const initialFormData = { short_url: '', full_url: '' }

const CodeCreate = ({ loggedIn }) => {

  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState({})

  const history = useHistory()

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    const newFormerrors = { ...formErrors, [e.target.id]: '' }
    setFormData(newFormData)
    setFormErrors(newFormerrors)
  }
  
  const handleSubmit = async () => {
    try {
      const response = await createShortcode(formData)
      history.push(`/${response.data.short_url}/stats/`)
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  return (
    <>
      {!loggedIn && <Typography>You must be logged in...</Typography>}
      {loggedIn && <CodeForm mode='new' formData={formData} formErrors={formErrors} handleSubmit={handleSubmit} handleChange={handleChange} />}
    </>

  )
}

export default CodeCreate
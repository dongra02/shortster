import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import CodeForm from './CodeForm'

import { getCodeStats, updateShortcode } from '../../lib/api'


const CodeEdit = ({ loggedIn }) => {

  const [formData, setFormData] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const { shortUrl } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getCode = async () => {
      try {
        const response  = await getCodeStats(shortUrl)
        setFormData({ short_url: response.data.short_url, full_url: response.data.full_url })
      } catch (err) {
        console.log(err.response.data)
      }
    }
    getCode()
  }, [])

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    const newFormerrors = { ...formErrors, [e.target.id]: '' }
    setFormData(newFormData)
    setFormErrors(newFormerrors)
  }

  const handleSubmit = async () => {
    try {
      const response = await updateShortcode(shortUrl, formData)
      history.push(`/${response.data.short_url}/stats/`)
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  while (!formData) return <div>loading</div>

  return (
    <>
      {!loggedIn && <div>You must be logged in - DON INSRT LINK TO HOME HERE</div>}
      {loggedIn && <CodeForm mode='edit' formData={formData} formErrors={formErrors} handleSubmit={handleSubmit} handleChange={handleChange} />}
    </>
  )
}

export default CodeEdit
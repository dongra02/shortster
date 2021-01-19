import React, { useState, useEffect } from 'react'

import CodeForm from './CodeForm'

import { getCodeStats, updateShortcode } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'


const CodeEdit = (props) => {

  const [formData, setFormData] = useState(null)
  const shortUrl = props.match.params.shortUrl

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
    setFormData(newFormData)
  }

  const handleSubmit = async () => {
    try {
      const response = await updateShortcode(shortUrl, formData)
      props.history.push(`/${response.data.short_url}/stats/`)
    } catch (err) {
      console.log(err.response)
    }
  }

  while (!formData) return <div>loading</div>

  return (
    <>
      {!isAuthenticated() && <div>You must be logged in - DON INSRT LINK TO HOME HERE</div>}
      {isAuthenticated() && <CodeForm mode='edit' formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />}
    </>
  )
}

export default CodeEdit
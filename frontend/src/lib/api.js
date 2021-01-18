import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'
const baseAuth = `${baseUrl}/auth`
const baseShortcodes = `${baseUrl}/shortcodes`

const withHeaders = () => {
  const header = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  console.log(header)
  return header
}

export const register = (formData) => axios.post(`${baseAuth}/register/`, formData)

export const login = (formData) => axios.post(`${baseAuth}/login/`, formData)


export const createShortcode = (formData) => axios.post(`${baseShortcodes}/`, formData, withHeaders())

export const getUserCodes = () => axios.get(`${baseShortcodes}/`, withHeaders())

export const getCodeStats = (shortUrl) => axios.get(`${baseShortcodes}/${shortUrl}/stats/`, withHeaders())

export const updateShortcode = (shortUrl, formData) => axios.put(`${baseShortcodes}/${shortUrl}/stats/`, formData, withHeaders())

export const deleteShortcode = (shortUrl) => axios.delete(`${baseShortcodes}/${shortUrl}/stats/`, withHeaders())
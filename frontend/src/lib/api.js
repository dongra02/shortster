import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

const withHeaders = () => {
  return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
}

export const register = (formData) => axios.post(`${baseUrl}/register/`, formData)

export const login = (formData) => axios.post(`${baseUrl}/auth/login/`, formData)


export const getUserCodes = () => axios.get(`${baseUrl}/shortcodes/`, withHeaders())

export const getCodeStats = (shortUrl) => axios.get(`${baseUrl}/shortcodes/${shortUrl}/stats/`, withHeaders())
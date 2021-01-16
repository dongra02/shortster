import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'


export const register = (formData) => axios.post(`${baseUrl}/register/`, formData)

export const login = (formData) => axios.post(`${baseUrl}/auth/login/`, formData)

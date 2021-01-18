export const getToken = () => {
  return localStorage.getItem('token')
}

export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const splitToken = token.split('.')
  if (splitToken < 3) return false
  return JSON.parse(atob(splitToken[1]))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.floor(Date.now() / 1000)
  return now < payload.exp
}

export const isShortCodeOwner = id => {
  return id === getPayload().sub
}
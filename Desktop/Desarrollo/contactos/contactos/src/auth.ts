const KEY = 'logged'

export const isLogged = () => {
  return localStorage.getItem(KEY) === 'true'
}

export const login = () => {
  localStorage.setItem(KEY, 'true')
}

export const logout = () => {
  localStorage.removeItem(KEY)
}
const KEY = 'logged'

export const isLogged = (): boolean => localStorage.getItem(KEY) === 'true'

export const login = () => localStorage.setItem(KEY, 'true')

export const logout = () => localStorage.removeItem(KEY)
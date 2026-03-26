import { createContext, useContext, type ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import type { User } from 'firebase/auth'

// Define la forma del contexto
interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | null>(null)

// Provider: envuelve la app y comparte el estado
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para consumir el contexto fácilmente desde cualquier página
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  }
  return context
}

import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'

type Props = {
  path: string
  exact?: boolean
  children: React.ReactNode
}

export default function ProtectedRoute({ path, exact = false, children }: Props) {
  const { user, loading } = useAuthContext()

  // Mientras Firebase verifica si hay sesión activa, no redirige
  if (loading) {
    return null
  }

  if (!user) {
    return <Redirect to="/login" />
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  )
}
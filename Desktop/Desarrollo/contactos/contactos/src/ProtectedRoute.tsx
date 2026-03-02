import { Route, Redirect } from 'react-router-dom'
import { isLogged } from './auth'

type Props = {
  path: string
  exact?: boolean
  children: React.ReactNode
}

export default function ProtectedRoute({ path, exact = false, children }: Props) {
  if (!isLogged()) {
    return <Redirect to="/login" />
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  )
}
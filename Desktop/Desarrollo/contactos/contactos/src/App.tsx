import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import { calendar, people, person } from 'ionicons/icons'
import { useEffect, useState } from 'react'

import Home from './pages/Home'
import ContactDetailPage from './pages/ContactDetailPage'
import LoginPage from './pages/LoginPage'
import MisPacientesPage from './pages/MisPacientesPage'
import PerfilMedicoPage from './pages/PerfilMedicoPage'
import ProtectedRoute from './ProtectedRoute'
import { isLogged } from './auth'
import { loadVisitas } from './storage'
import type { Visita } from './types'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import './theme/variables.css'

setupIonicReact({ mode: 'ios' })

function TabsLayout({
  pendientesCount,
  refreshPendientes,
}: {
  pendientesCount: number
  refreshPendientes: () => void
}) {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/visitas">
          <Home refreshPendientes={refreshPendientes} />
        </Route>

        <Route exact path="/tabs/visitas/:id">
          <ContactDetailPage refreshPendientes={refreshPendientes} />
        </Route>

        <Route exact path="/tabs/pacientes">
          <MisPacientesPage />
        </Route>

        <Route exact path="/tabs/perfil">
          <PerfilMedicoPage />
        </Route>

        <Route exact path="/tabs">
          <Redirect to="/tabs/visitas" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" href="/tabs/visitas">
          <IonIcon icon={calendar} />
          <IonLabel>Visitas</IonLabel>
          {pendientesCount > 0 && <IonBadge color="danger">{pendientesCount}</IonBadge>}
        </IonTabButton>

        <IonTabButton tab="pacientes" href="/tabs/pacientes">
          <IonIcon icon={people} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="perfil" href="/tabs/perfil">
          <IonIcon icon={person} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

const App: React.FC = () => {
  const [visitas, setVisitas] = useState<Visita[]>([])

  const refreshPendientes = () => {
    setVisitas(loadVisitas())
  }

  useEffect(() => {
    refreshPendientes()
  }, [])

  const pendientesCount = visitas.filter(v => v.estado === 'pendiente').length

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Login público */}
          <Route exact path="/login">
            <LoginPage />
          </Route>

          {/* Tabs protegidas */}
          <ProtectedRoute path="/tabs">
            <TabsLayout
              pendientesCount={pendientesCount}
              refreshPendientes={refreshPendientes}
            />
          </ProtectedRoute>

          {/* Entrada */}
          <Route exact path="/">
            <Redirect to={isLogged() ? '/tabs/visitas' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
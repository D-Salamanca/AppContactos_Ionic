import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Home from './pages/Home'
import CreateContactPage from './pages/CreateContactPage'
import EditContactPage from './pages/EditContactPage'
import ContactDetailPage from './pages/ContactDetailPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './ProtectedRoute'
import { isLogged } from './auth'

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

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Login público */}
        <Route exact path="/login">
          <LoginPage />
        </Route>

        {/* Rutas protegidas */}
        <ProtectedRoute exact path="/home">
          <Home />
        </ProtectedRoute>

        <ProtectedRoute exact path="/contacts/create">
          <CreateContactPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/contacts/detail/:id">
          <ContactDetailPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/contacts/edit/:id">
          <EditContactPage />
        </ProtectedRoute>

        {/* Entrada: decide según token */}
        <Route exact path="/">
          <Redirect to={isLogged() ? '/home' : '/login'} />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)

export default App
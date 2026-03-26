import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'
import ContactsListPage from './pages/ContactsListPage'
import CreateContactPage from './pages/CreateContactPage'
import EditContactPage from './pages/EditContactPage'
import ContactDetailPage from './pages/ContactDetailPage'
import TasksListPage from './pages/TasksListPage'
import TaskFormPage from './pages/TaskFormPage'
import TaskDetailPage from './pages/TaskDetailPage'
import FruitsListPage from './pages/FruitsListPage'
import ProtectedRoute from './ProtectedRoute'

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

        {/* Rutas públicas */}
        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/register">
          <RegisterPage />
        </Route>

        {/* Home */}
        <ProtectedRoute exact path="/home">
          <Home />
        </ProtectedRoute>

        {/* Contacts */}
        <ProtectedRoute exact path="/contacts">
          <ContactsListPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/contacts/create">
          <CreateContactPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/contacts/edit/:id">
          <EditContactPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/contacts/detail/:id">
          <ContactDetailPage />
        </ProtectedRoute>

        {/* Tasks */}
        <ProtectedRoute exact path="/tasks">
          <TasksListPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/tasks/create">
          <TaskFormPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/tasks/edit/:id">
          <TaskFormPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/tasks/detail/:id">
          <TaskDetailPage />
        </ProtectedRoute>

        {/* Fruits */}
        <ProtectedRoute exact path="/fruits">
          <FruitsListPage />
        </ProtectedRoute>

        {/* Entrada por defecto */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)

export default App
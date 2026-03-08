import { useState } from 'react'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { login } from '../auth'

export default function LoginPage() {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleLogin = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      if (email.trim() === 'user@mail.com' && password.trim() === '123') {
        login()
        history.push('/tabs/visitas')
      } else {
        setShowToast(true)
      }
    }, 1500)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MediCare+</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <h2>Ingreso médico</h2>
        </IonText>

        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            value={email}
            type="email"
            onIonInput={e => setEmail(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            value={password}
            type={showPassword ? 'text' : 'password'}
            onIonInput={e => setPassword(e.detail.value ?? '')}
          />
        </IonItem>

        <IonButton
          expand="block"
          fill="outline"
          className="ion-margin-top"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        </IonButton>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleLogin}
        >
          Login
        </IonButton>

        <IonLoading
          isOpen={loading}
          message="Verificando credenciales..."
        />

        <IonToast
          isOpen={showToast}
          message="Credenciales incorrectas"
          duration={1800}
          color="danger"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  )
}
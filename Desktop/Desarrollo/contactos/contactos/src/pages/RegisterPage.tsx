import { useState } from 'react'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function RegisterPage() {
  const history = useHistory()
  const { register } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    const e = email.trim()
    const p = password.trim()

    if (!e || !p) {
      setError('Completa email y contraseña')
      return
    }

    if (p.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      await register(e, p)
      history.push('/home')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
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
            type="password"
            onIonInput={e => setPassword(e.detail.value ?? '')}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleRegister}>
          Register
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => history.push('/login')}
        >
          Already have an account? Login
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
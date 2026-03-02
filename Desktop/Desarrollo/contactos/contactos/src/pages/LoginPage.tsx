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
import { login } from '../auth'

export default function LoginPage() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    const e = email.trim()
    const p = password.trim()

    if (e === 'user@mail.com' && p === '123') {
      login()
      history.push('/home')
      return
    }

    setError('Credenciales incorrectas')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            value={email}
            type="email"
            onIonInput={ev => setEmail(ev.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            value={password}
            type="password"
            onIonInput={ev => setPassword(ev.detail.value ?? '')}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
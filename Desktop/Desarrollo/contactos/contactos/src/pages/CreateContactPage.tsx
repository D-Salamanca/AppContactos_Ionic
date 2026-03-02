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
  useIonViewWillEnter,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { loadContacts, saveContacts } from '../storage'
import type { Contact } from '../types'

export default function CreateContactPage() {
  const history = useHistory()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('') // se captura como string y se convierte a number
  const [error, setError] = useState('')

  // Limpia inputs cada vez que entras a la página
  useIonViewWillEnter(() => {
    setName('')
    setPhone('')
    setError('')
  })

  const create = () => {
    const n = name.trim()
    const pRaw = phone.trim()

    if (!n || !pRaw) {
      setError('Completa nombre y teléfono')
      return
    }

    // convertir a número
    const pNum = Number(pRaw)
    if (!Number.isFinite(pNum)) {
      setError('El teléfono debe ser un número')
      return
    }

    const now = new Date().toISOString()
    const contacts = loadContacts()

    const newContact: Contact = {
      id: Date.now(),
      name: n,
      phone: pNum,
      createdAt: now,
      updatedAt: now,
    }

    saveContacts([newContact, ...contacts])
    history.push('/home')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Contact</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput
            value={name}
            onIonInput={e => setName(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Phone</IonLabel>
          <IonInput
            value={phone}
            inputMode="numeric"
            type="tel"
            placeholder="Ej: 3001234567"
            onIonInput={e => setPhone(e.detail.value ?? '')}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={create}>
          Save
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => history.push('/home')}
        >
          Cancel
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
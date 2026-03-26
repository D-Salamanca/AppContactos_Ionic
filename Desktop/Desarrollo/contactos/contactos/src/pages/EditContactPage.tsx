import { useEffect, useState } from 'react'
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
import { useHistory, useParams } from 'react-router-dom'
import { useContactsContext } from '../context/ContactsContext'
import type { Contact } from '../types'

export default function EditContactPage() {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const contactId = Number(id)

  const { contacts, updateContact } = useContactsContext()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const c = contacts.find(x => x.id === contactId)

    if (!c) {
      history.push('/home')
      return
    }

    setName(c.name)
    setPhone(String(c.phone))
  }, [contactId])

  const update = () => {
    const n = name.trim()
    const pRaw = phone.trim()

    if (!n || !pRaw) {
      setError('Completa nombre y teléfono')
      return
    }

    const pNum = Number(pRaw)
    if (!Number.isFinite(pNum)) {
      setError('El teléfono debe ser un número')
      return
    }

    const now = new Date().toISOString()

    const updatedContact: Contact = {
      id: contactId,
      name: n,
      phone: pNum,
      createdAt: now,
      updatedAt: now,
    }

    updateContact(updatedContact)
    history.push('/home')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Contact</IonTitle>
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

        <IonButton expand="block" className="ion-margin-top" onClick={update}>
          Update
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
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  useIonViewWillEnter,
} from '@ionic/react'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { loadContacts, saveContacts } from '../storage'
import type { Contact } from '../types'

const buildPreContacts = (): Contact[] => {
  const now = new Date().toISOString()
  return [
    { id: 1, name: 'Ana', phone: 3001234567, createdAt: now, updatedAt: now },
    { id: 2, name: 'Luis', phone: 3119876543, createdAt: now, updatedAt: now },
    { id: 3, name: 'Sofía', phone: 3205554444, createdAt: now, updatedAt: now },
  ]
}

const formatDate = (iso: string) => new Date(iso).toLocaleString()

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const [contact, setContact] = useState<Contact | null>(null)
  const [loaded, setLoaded] = useState(false)

  useIonViewWillEnter(() => {
    let contacts = loadContacts()

    // Si entras directo al link y no hay nada guardado, crea los 3
    if (contacts.length === 0) {
      const pre = buildPreContacts()
      saveContacts(pre)
      contacts = pre
    }

    const found = contacts.find(c => c.id === Number(id)) ?? null
    setContact(found)
    setLoaded(true)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contact Detail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!loaded ? (
          <IonText color="medium">
            <p>Cargando...</p>
          </IonText>
        ) : !contact ? (
          <>
            <IonText color="danger">
              <p>Contacto no encontrado.</p>
            </IonText>

            <IonButton expand="block" onClick={() => history.push('/home')}>
              Volver
            </IonButton>
          </>
        ) : (
          <>
            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700, margin: 0 }}>Name</h2>
                <p style={{ margin: 0 }}>{contact.name}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700, margin: 0 }}>Phone</h2>
                <p style={{ margin: 0 }}>{contact.phone}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700, margin: 0 }}>Created At</h2>
                <p style={{ margin: 0 }}>{formatDate(contact.createdAt)}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2 style={{ fontWeight: 700, margin: 0 }}>Last Updated</h2>
                <p style={{ margin: 0 }}>{formatDate(contact.updatedAt)}</p>
              </IonLabel>
            </IonItem>

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={() => history.push(`/contacts/edit/${contact.id}`)}
            >
              Edit
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              onClick={() => history.push('/home')}
            >
              Back
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}
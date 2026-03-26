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
} from '@ionic/react'
import { useHistory, useParams } from 'react-router-dom'
import { useContactsContext } from '../context/ContactsContext'

const formatDate = (iso: string) => new Date(iso).toLocaleString()

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const { contacts } = useContactsContext()

  const contact = contacts.find(c => c.id === Number(id)) ?? null

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contact Detail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!contact ? (
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
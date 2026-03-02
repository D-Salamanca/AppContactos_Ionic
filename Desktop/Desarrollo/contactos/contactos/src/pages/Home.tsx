import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  useIonViewWillEnter,
  IonButtons,
  IonButton,
  IonAlert,
} from '@ionic/react'
import { add } from 'ionicons/icons'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loadContacts, saveContacts } from '../storage'
import type { Contact } from '../types'
import { logout } from '../auth'
import './Home.css'

const buildPreContacts = (): Contact[] => {
  const now = new Date().toISOString()
  return [
    { id: 1, name: 'Ana', phone: 3001234567, createdAt: now, updatedAt: now },
    { id: 2, name: 'Luis', phone: 3119876543, createdAt: now, updatedAt: now },
    { id: 3, name: 'Sofía', phone: 3205554444, createdAt: now, updatedAt: now },
  ]
}

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showAlert, setShowAlert] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const history = useHistory()

  useIonViewWillEnter(() => {
    let current = loadContacts()

    if (current.length === 0) {
      const pre = buildPreContacts()
      saveContacts(pre)
      current = pre
    }

    setContacts(current)
  })

  const confirmDelete = (id: number) => {
    setSelectedId(id)
    setShowAlert(true)
  }

  const deleteContact = () => {
    if (selectedId === null) return

    const updated = contacts.filter(c => c.id !== selectedId)
    setContacts(updated)
    saveContacts(updated)

    setShowAlert(false)
    setSelectedId(null)
  }

  const handleLogout = () => {
    logout()
    history.push('/login')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="home-wrap">

          <IonList className="home-list">
            {contacts.map(c => (
              <IonItemSliding key={c.id}>

                <IonItem
                  className="home-item"
                  button
                  routerLink={`/contacts/detail/${c.id}`}
                >
                  <IonLabel>
                    <h2 className="home-name">{c.name}</h2>
                    <p className="home-phone">{c.phone}</p>
                  </IonLabel>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption
                    color="primary"
                    routerLink={`/contacts/edit/${c.id}`}
                  >
                    Edit
                  </IonItemOption>

                  <IonItemOption
                    color="danger"
                    onClick={() => confirmDelete(c.id)}
                  >
                    Delete
                  </IonItemOption>
                </IonItemOptions>

              </IonItemSliding>
            ))}
          </IonList>

        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/contacts/create">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={showAlert}
          header="Eliminar contacto"
          message="¿Estás seguro que deseas eliminar este contacto?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                setShowAlert(false)
                setSelectedId(null)
              },
            },
            {
              text: 'Eliminar',
              role: 'destructive',
              handler: deleteContact,
            },
          ]}
          onDidDismiss={() => setShowAlert(false)}
        />

      </IonContent>
    </IonPage>
  )
}

export default Home
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButtons,
  IonButton,
  IonBadge,
} from '@ionic/react'
import { peopleOutline, checkboxOutline, leafOutline } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import useNetwork from '../hooks/useNetwork'

const Home: React.FC = () => {
  const history = useHistory()
  const { logout } = useAuthContext()
  const { isOnline, connectionType } = useNetwork()

  const handleLogout = async () => {
    await logout()
    history.push('/login')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge 06</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem lines="none" className="ion-margin-bottom">
          <IonLabel>
            <h2>Network Status</h2>
            <p>Type: {connectionType ?? 'unknown'}</p>
          </IonLabel>
          <IonBadge color={isOnline ? 'success' : 'danger'}>
            {isOnline ? 'Online' : 'Offline'}
          </IonBadge>
        </IonItem>

        <IonList>
          <IonItem
            button
            onClick={() => history.push('/contacts')}
          >
            <IonIcon icon={peopleOutline} slot="start" />
            <IonLabel>
              <h2>Contacts</h2>
              <p>Firebase Firestore</p>
            </IonLabel>
          </IonItem>

          <IonItem
            button
            onClick={() => history.push('/tasks')}
          >
            <IonIcon icon={checkboxOutline} slot="start" />
            <IonLabel>
              <h2>Tasks</h2>
              <p>Firebase Realtime Database</p>
            </IonLabel>
          </IonItem>

          <IonItem
            button
            onClick={() => history.push('/fruits')}
          >
            <IonIcon icon={leafOutline} slot="start" />
            <IonLabel>
              <h2>Fruits</h2>
              <p>Dexie Local Database</p>
            </IonLabel>
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  )
}

export default Home
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
  IonBadge,
  IonButtons,
  IonButton,
  IonText,
} from '@ionic/react'
import { add } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import { useTasksContext } from '../context/TasksContext'
import useNetwork from '../hooks/useNetwork'

export default function TasksListPage() {
  const history = useHistory()
  const { tasks, deleteTask, updateTask } = useTasksContext()
  const { isOnline } = useNetwork()

  const handleToggle = async (task: any) => {
    await updateTask(task.id, { ...task, completed: !task.completed })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!isOnline && (
          <IonText color="danger">
            <p className="ion-text-center">
              Sin conexión — acciones deshabilitadas
            </p>
          </IonText>
        )}

        <IonList>
          {tasks.map((t: any) => (
            <IonItemSliding key={t.id}>
              <IonItem
                button
                routerLink={`/tasks/detail/${t.id}`}
              >
                <IonLabel>
                  <h2 style={{
                    fontWeight: 700,
                    textDecoration: t.completed ? 'line-through' : 'none'
                  }}>
                    {t.title}
                  </h2>
                  <p>{t.description}</p>
                </IonLabel>
                <IonBadge color={t.completed ? 'success' : 'medium'}>
                  {t.completed ? 'Done' : 'Todo'}
                </IonBadge>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption
                  color="success"
                  disabled={!isOnline}
                  onClick={() => handleToggle(t)}
                >
                  {t.completed ? 'Undo' : 'Done'}
                </IonItemOption>

                <IonItemOption
                  color="primary"
                  disabled={!isOnline}
                  routerLink={`/tasks/edit/${t.id}`}
                >
                  Edit
                </IonItemOption>

                <IonItemOption
                  color="danger"
                  disabled={!isOnline}
                  onClick={() => deleteTask(t.id)}
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            disabled={!isOnline}
            routerLink="/tasks/create"
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}
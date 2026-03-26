import { useState, useEffect } from 'react'
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
  IonTextarea,
} from '@ionic/react'
import { useHistory, useParams } from 'react-router-dom'
import { useTasksContext } from '../context/TasksContext'

export default function TaskFormPage() {
  const history = useHistory()
  const { id } = useParams<{ id?: string }>()
  const { tasks, addTask, updateTask } = useTasksContext()

  const isEditing = !!id
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditing) {
      const task = tasks.find((t: any) => t.id === id)
      if (!task) {
        history.push('/tasks')
        return
      }
      setTitle(task.title)
      setDescription(task.description)
    }
  }, [id, tasks])

  const handleSubmit = async () => {
    const t = title.trim()
    const d = description.trim()

    if (!t) {
      setError('El título es obligatorio')
      return
    }

    if (isEditing) {
      const task = tasks.find((t: any) => t.id === id)
      await updateTask(id!, { ...task, title: t, description: d })
    } else {
      await addTask({ title: t, description: d, completed: false })
    }

    history.push('/tasks')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? 'Edit Task' : 'New Task'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput
            value={title}
            onIonInput={e => setTitle(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea
            value={description}
            rows={4}
            onIonInput={e => setDescription(e.detail.value ?? '')}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit}>
          {isEditing ? 'Update' : 'Save'}
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => history.push('/tasks')}
        >
          Cancel
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
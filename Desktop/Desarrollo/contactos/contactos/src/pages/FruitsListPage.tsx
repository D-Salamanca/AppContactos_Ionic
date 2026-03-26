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
  IonInput,
  IonButton,
  IonText,
  IonButtons,
} from '@ionic/react'
import { add } from 'ionicons/icons'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useFruitsContext } from '../context/FruitsContext'

export default function FruitsListPage() {
  const history = useHistory()
  const { fruits, addFruit, updateFruit, deleteFruit } = useFruitsContext()

  const [nombre, setNombre] = useState('')
  const [proveedor, setProveedor] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const handleAdd = async () => {
    const n = nombre.trim()
    const p = proveedor.trim()

    if (!n || !p) {
      setError('Completa nombre y proveedor')
      return
    }

    if (editingId !== null) {
      await updateFruit(editingId, { nombre: n, proveedor: p })
      setEditingId(null)
    } else {
      await addFruit({ nombre: n, proveedor: p })
    }

    setNombre('')
    setProveedor('')
    setError('')
  }

  const handleEdit = (fruit: any) => {
    setEditingId(fruit.id)
    setNombre(fruit.nombre)
    setProveedor(fruit.proveedor)
  }

  const handleCancel = () => {
    setEditingId(null)
    setNombre('')
    setProveedor('')
    setError('')
  }

  // newFunction: filtrar frutas por proveedor
  const [filterProveedor, setFilterProveedor] = useState('')
  const filteredFruits = filterProveedor.trim()
    ? fruits.filter((f: any) =>
        f.proveedor.toLowerCase().includes(filterProveedor.toLowerCase())
      )
    : fruits

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fruits</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/home')}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* Formulario agregar / editar */}
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={nombre}
            placeholder="Ej: Mango"
            onIonInput={e => setNombre(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Proveedor</IonLabel>
          <IonInput
            value={proveedor}
            placeholder="Ej: Frutas del Valle"
            onIonInput={e => setProveedor(e.detail.value ?? '')}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleAdd}>
          {editingId !== null ? 'Update' : 'Add Fruit'}
        </IonButton>

        {editingId !== null && (
          <IonButton expand="block" fill="outline" onClick={handleCancel}>
            Cancel
          </IonButton>
        )}

        {/* newFunction: filtro por proveedor */}
        <IonItem className="ion-margin-top">
          <IonLabel position="stacked">Filtrar por proveedor</IonLabel>
          <IonInput
            value={filterProveedor}
            placeholder="Buscar proveedor..."
            onIonInput={e => setFilterProveedor(e.detail.value ?? '')}
          />
        </IonItem>

        {/* Lista */}
        <IonList className="ion-margin-top">
          {filteredFruits.map((f: any) => (
            <IonItemSliding key={f.id}>
              <IonItem>
                <IonLabel>
                  <h2 style={{ fontWeight: 700, margin: 0 }}>{f.nombre}</h2>
                  <p style={{ margin: 0 }}>Proveedor: {f.proveedor}</p>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption
                  color="primary"
                  onClick={() => handleEdit(f)}
                >
                  Edit
                </IonItemOption>

                <IonItemOption
                  color="danger"
                  onClick={() => deleteFruit(f.id)}
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleAdd}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  )
}
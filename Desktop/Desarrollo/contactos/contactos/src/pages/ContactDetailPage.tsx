import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { loadVisitas, saveVisitas } from '../storage'
import type { Medicamento, Visita } from '../types'

export default function ContactDetailPage({
  refreshPendientes,
}: {
  refreshPendientes: () => void
}) {
  const { id } = useParams<{ id: string }>()
  const [visita, setVisita] = useState<Visita | null>(null)
  const [nombre, setNombre] = useState('')
  const [dosis, setDosis] = useState('')

  useIonViewWillEnter(() => {
    const visitas = loadVisitas()
    const found = visitas.find(v => v.id === Number(id)) || null
    setVisita(found)
  })

  const persist = (updatedVisita: Visita) => {
    const updated = loadVisitas().map(v =>
      v.id === updatedVisita.id ? updatedVisita : v
    )
    saveVisitas(updated)
    setVisita(updatedVisita)
    refreshPendientes()
  }

  const agregarMedicamento = () => {
    if (!visita || !nombre.trim() || !dosis.trim()) return

    const nuevo: Medicamento = {
      id: Date.now(),
      nombre,
      dosis,
    }

    persist({
      ...visita,
      receta: [...visita.receta, nuevo],
    })

    setNombre('')
    setDosis('')
  }

  const finalizarVisita = () => {
    if (!visita) return

    persist({
      ...visita,
      estado: 'finalizada',
    })
  }

  if (!visita) return null

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle visita</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>
            <h2>{visita.paciente}</h2>
            <p>{visita.direccion}</p>
            <p>{visita.hora}</p>
            <p>Estado: {visita.estado}</p>
            {visita.motivoCancelacion && (
              <p>Motivo cancelación: {visita.motivoCancelacion}</p>
            )}
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Medicamento</IonLabel>
          <IonInput
            value={nombre}
            placeholder="Ej: Acetaminofén"
            onIonInput={e => setNombre(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Dosis</IonLabel>
          <IonInput
            value={dosis}
            placeholder="Ej: 500 mg cada 8 horas"
            onIonInput={e => setDosis(e.detail.value ?? '')}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={agregarMedicamento}
        >
          Agregar a receta
        </IonButton>

        <IonList>
          {visita.receta.map(m => (
            <IonItem key={m.id}>
              <IonLabel>
                <h3>{m.nombre}</h3>
                <p>{m.dosis}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonButton
          expand="block"
          color="success"
          className="ion-margin-top"
          onClick={finalizarVisita}
        >
          Finalizar visita
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
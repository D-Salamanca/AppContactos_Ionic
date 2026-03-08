import {
  IonAlert,
  IonContent,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
  useIonViewWillEnter,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { loadVisitas, saveVisitas } from '../storage'
import type { EstadoVisita, Visita } from '../types'
import './Home.css'

const Home: React.FC<{
  refreshPendientes: () => void
}> = ({ refreshPendientes }) => {
  const history = useHistory()

  const [visitas, setVisitas] = useState<Visita[]>([])
  const [segment, setSegment] = useState<'todas' | EstadoVisita>('todas')
  const [showCancelAlert, setShowCancelAlert] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useIonViewWillEnter(() => {
    const data = loadVisitas()
    setVisitas(data)
    refreshPendientes()
  })

  const updateVisitas = (updated: Visita[]) => {
    setVisitas(updated)
    saveVisitas(updated)
    refreshPendientes()
  }

  const marcarEnCamino = (id: number) => {
    const updated = visitas.map(v =>
      v.id === id ? { ...v, estado: 'en_camino' } : v
    )
    updateVisitas(updated)
  }

  const cancelarVisita = (motivo: string) => {
    if (selectedId === null) return

    const updated = visitas.map(v =>
      v.id === selectedId
        ? { ...v, estado: 'cancelada', motivoCancelacion: motivo }
        : v
    )

    updateVisitas(updated)
    setSelectedId(null)
  }

  const pendientes = visitas.filter(v => v.estado === 'pendiente')
  const fijas = visitas.filter(v => v.estado !== 'pendiente')

  const orderedVisitas = [...pendientes, ...fijas]

  const filtered =
    segment === 'todas'
      ? orderedVisitas
      : orderedVisitas.filter(v => v.estado === segment)

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    const reorderedPendientes = event.detail.complete([...pendientes]) as Visita[]
    const updated = [...reorderedPendientes, ...fijas]
    updateVisitas(updated)
  }

  const renderVisita = (v: Visita) => (
    <IonItemSliding key={v.id}>
      <IonItem className="home-item">
        {v.estado === 'pendiente' && <IonReorder slot="start" />}

        <IonLabel>
          <h2 className="home-name">{v.paciente}</h2>
          <p className="home-phone">
            {v.hora} • {v.direccion}
          </p>
          <p className="home-phone">Estado: {v.estado}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="start">
        <IonItemOption color="primary" onClick={() => marcarEnCamino(v.id)}>
          En camino
        </IonItemOption>

        <IonItemOption
          color="danger"
          onClick={() => {
            setSelectedId(v.id)
            setShowCancelAlert(true)
          }}
        >
          Cancelar
        </IonItemOption>
      </IonItemOptions>

      <IonItemOptions side="end">
        <IonItemOption
          color="secondary"
          onClick={() => history.push(`/tabs/visitas/${v.id}`)}
        >
          Ver detalle
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas del día</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="home-wrap">
          <IonSegment
            value={segment}
            onIonChange={e => setSegment(e.detail.value as 'todas' | EstadoVisita)}
          >
            <IonSegmentButton value="todas">
              <IonLabel>Todas</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="pendiente">
              <IonLabel>Pendientes</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="en_curso">
              <IonLabel>En curso</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="finalizada">
              <IonLabel>Finalizadas</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {(segment === 'todas' || segment === 'pendiente') ? (
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              <IonList className="home-list">
                {filtered.map(renderVisita)}
              </IonList>
            </IonReorderGroup>
          ) : (
            <IonList className="home-list">
              {filtered.map(renderVisita)}
            </IonList>
          )}
        </div>

        <IonAlert
          isOpen={showCancelAlert}
          header="Cancelar visita"
          inputs={[
            {
              name: 'motivo',
              type: 'textarea',
              placeholder: 'Motivo de cancelación',
            },
          ]}
          buttons={[
            {
              text: 'Volver',
              role: 'cancel',
              handler: () => setSelectedId(null),
            },
            {
              text: 'Confirmar',
              handler: data => cancelarVisita(data.motivo || ''),
            },
          ]}
          onDidDismiss={() => setShowCancelAlert(false)}
        />
      </IonContent>
    </IonPage>
  )
}

export default Home
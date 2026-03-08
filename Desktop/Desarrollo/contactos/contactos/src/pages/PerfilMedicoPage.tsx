import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { loadMedico } from '../storage'

export default function PerfilMedicoPage() {
  const medico = loadMedico()

  const iniciales = medico.nombre
    .split(' ')
    .map(parte => parte[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil médico</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <IonAvatar style={{ width: 96, height: 96 }}>
            {medico.foto ? (
              <IonImg src={medico.foto} />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#7c3aed',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 28,
                }}
              >
                {iniciales}
              </div>
            )}
          </IonAvatar>
        </div>

        <IonItem>
          <IonLabel>
            <h2>{medico.nombre}</h2>
            <p>{medico.email}</p>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  )
}
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { loadVisitas } from '../storage'

export default function MisPacientesPage() {
  const pacientes = Array.from(new Set(loadVisitas().map(v => v.paciente)))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {pacientes.map((paciente, index) => (
            <IonItem key={index}>
              <IonLabel>{paciente}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
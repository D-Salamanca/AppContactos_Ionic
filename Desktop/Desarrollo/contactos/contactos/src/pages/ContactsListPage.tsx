import { useEffect, useState } from 'react'
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
} from '@ionic/react'
import { add } from 'ionicons/icons'
import type { Contact } from '../types'
import { loadContacts, saveContacts } from '../storage'

export default function ContactsListPage() {
    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
    setContacts(loadContacts())
    }, [])

    useEffect(() => {
    saveContacts(contacts)
    }, [contacts])

    const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id))
    }

    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>Contacts</IonTitle>
        </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
        <IonList>
            {contacts.map(c => (
            <IonItemSliding key={c.id}>
                <IonItem>
                <IonLabel>
                    <h2 style={{ margin: 0, fontWeight: 700 }}>{c.name}</h2>
                    <p style={{ margin: 0 }}>{c.phone}</p>
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
                    onClick={() => deleteContact(c.id)}
                >
                    Delete
                </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
            ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton routerLink="/contacts/create">
            <IonIcon icon={add} />
            </IonFabButton>
        </IonFab>
        </IonContent>
    </IonPage>
    )
}
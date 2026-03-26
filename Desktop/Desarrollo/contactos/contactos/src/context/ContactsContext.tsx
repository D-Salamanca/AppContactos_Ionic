import { createContext, useContext, type ReactNode } from 'react'
import useCollection from '../hooks/useCollection'

interface Contact {
  id?: string
  name: string
  phone: string
}

interface ContactsContextType {
  contacts: Contact[]
  isPending: boolean
  error: string | null
  loadContacts: () => Promise<void>
  addContact: (data: Contact) => Promise<void>
  updateContact: (id: string, data: Contact) => Promise<void>
  deleteContact: (id: string) => Promise<void>
}

const ContactsContext = createContext<ContactsContextType | null>(null)

export function ContactsProvider({ children }: { children: ReactNode }) {
  const { results, isPending, error, getAll, add, update, remove } = useCollection('contacts')

  const loadContacts = async () => {
    await getAll()
  }

  const addContact = async (data: Contact) => {
    await add(data)
    await getAll()
  }

  const updateContact = async (id: string, data: Contact) => {
    await update(id, data)
    await getAll()
  }

  const deleteContact = async (id: string) => {
    await remove(id)
    await getAll()
  }

  return (
    <ContactsContext.Provider value={{
      contacts: results,
      isPending,
      error,
      loadContacts,
      addContact,
      updateContact,
      deleteContact,
    }}>
      {children}
    </ContactsContext.Provider>
  )
}

export function useContactsContext() {
  const context = useContext(ContactsContext)
  if (!context) {
    throw new Error('useContactsContext debe usarse dentro de ContactsProvider')
  }
  return context
}
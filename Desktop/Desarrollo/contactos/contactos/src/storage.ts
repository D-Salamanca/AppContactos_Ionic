import type { Contact } from './types'

const KEY = 'contacts_v1'

export const loadContacts = (): Contact[] => {
    try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as Contact[]
    return Array.isArray(data) ? data : []
    } catch {
    localStorage.removeItem(KEY)
    return []
    }
}

export const saveContacts = (contacts: Contact[]) => {
    localStorage.setItem(KEY, JSON.stringify(contacts))
}
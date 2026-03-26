import Dexie from 'dexie'

const db = new Dexie('AppChallenge06DB')

// Version 1: tablas y campos de búsqueda
db.version(1).stores({
  fruits: '++id, nombre, proveedor, createdAt',
})

export default db
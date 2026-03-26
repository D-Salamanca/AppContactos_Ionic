import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/dexie'

const useDexie = (table: string, filterFn: any = null) => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Escucha en tiempo real cambios en la tabla
  const liveResults = useLiveQuery(() => {
    if (filterFn) {
      return (db as any)[table].filter(filterFn).toArray()
    }
    return (db as any)[table].toArray()
  }, [table]) ?? []

  const add = async (data: any) => {
    setIsPending(true)
    setError(null)
    try {
      await (db as any)[table].add({
        ...data,
        createdAt: new Date().toISOString(),
      })
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const update = async (id: number, data: any) => {
    setIsPending(true)
    setError(null)
    try {
      await (db as any)[table].update(id, data)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  const deleteItem = async (id: number) => {
    setIsPending(true)
    setError(null)
    try {
      await (db as any)[table].delete(id)
      setIsPending(false)
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { liveResults, isPending, error, add, update, deleteItem }
}

export default useDexie
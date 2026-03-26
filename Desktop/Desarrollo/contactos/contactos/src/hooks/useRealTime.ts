import { useState, useEffect } from 'react'
import {
  ref,
  push,
  set,
  remove,
  onValue,
} from 'firebase/database'
import { rtdb } from '../firebase/config'

const useRealTime = (table: string) => {
  const [results, setResults] = useState<any[]>([])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Escucha cambios en tiempo real
  useEffect(() => {
    setIsPending(true)
    const dbRef = ref(rtdb, table)

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...(value as any),
          }))
          setResults(data)
        } else {
          setResults([])
        }
        setIsPending(false)
      },
      (err) => {
        setError(err.message)
        setIsPending(false)
      }
    )

    return () => unsubscribe()
  }, [table])

  const add = async (data: any) => {
    setIsPending(true)
    setError(null)

    try {
      const newRef = await push(ref(rtdb, table), {
        ...data,
        createdAt: new Date().toISOString(),
      })
      setIsPending(false)
      return newRef
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
      return null
    }
  }

  const update = async (id: string, data: any) => {
    setIsPending(true)
    setError(null)

    try {
      await set(ref(rtdb, `${table}/${id}`), {
        ...data,
        updatedAt: new Date().toISOString(),
      })
      setIsPending(false)
      return true
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
      return false
    }
  }

  const deleteDoc = async (id: string) => {
    setIsPending(true)
    setError(null)

    try {
      await remove(ref(rtdb, `${table}/${id}`))
      setIsPending(false)
      return true
    } catch (err: any) {
      setError(err.message)
      setIsPending(false)
      return false
    }
  }

  return { results, isPending, error, add, update, deleteDoc }
}

export default useRealTime
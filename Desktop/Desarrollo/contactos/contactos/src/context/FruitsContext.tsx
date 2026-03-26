import { createContext, useContext, type ReactNode } from 'react'
import useDexie from '../hooks/useDexie'

interface Fruit {
  id?: number
  nombre: string
  proveedor: string
}

interface FruitsContextType {
  fruits: Fruit[]
  isPending: boolean
  error: string | null
  addFruit: (data: Fruit) => Promise<void>
  updateFruit: (id: number, data: Partial<Fruit>) => Promise<void>
  deleteFruit: (id: number) => Promise<void>
}

const FruitsContext = createContext<FruitsContextType | null>(null)

export function FruitsProvider({ children }: { children: ReactNode }) {
  const { liveResults, isPending, error, add, update, deleteItem } = useDexie('fruits')

  const addFruit = async (data: Fruit) => {
    await add(data)
  }

  const updateFruit = async (id: number, data: Partial<Fruit>) => {
    await update(id, data)
  }

  const deleteFruit = async (id: number) => {
    await deleteItem(id)
  }

  return (
    <FruitsContext.Provider value={{
      fruits: liveResults,
      isPending,
      error,
      addFruit,
      updateFruit,
      deleteFruit,
    }}>
      {children}
    </FruitsContext.Provider>
  )
}

export function useFruitsContext() {
  const context = useContext(FruitsContext)
  if (!context) {
    throw new Error('useFruitsContext debe usarse dentro de FruitsProvider')
  }
  return context
}
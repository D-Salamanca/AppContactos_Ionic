import { createContext, useContext, type ReactNode } from 'react'
import useRealTime from '../hooks/useRealTime'

interface Task {
  id?: string
  title: string
  description: string
  completed: boolean
}

interface TasksContextType {
  tasks: Task[]
  isPending: boolean
  error: string | null
  addTask: (data: Task) => Promise<void>
  updateTask: (id: string, data: Task) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

const TasksContext = createContext<TasksContextType | null>(null)

export function TasksProvider({ children }: { children: ReactNode }) {
  const { results, isPending, error, add, update, deleteDoc } = useRealTime('tasks')

  const addTask = async (data: Task) => {
    await add(data)
  }

  const updateTask = async (id: string, data: Task) => {
    await update(id, data)
  }

  const deleteTask = async (id: string) => {
    await deleteDoc(id)
  }

  return (
    <TasksContext.Provider value={{
      tasks: results,
      isPending,
      error,
      addTask,
      updateTask,
      deleteTask,
    }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasksContext() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasksContext debe usarse dentro de TasksProvider')
  }
  return context
}
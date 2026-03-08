import type { Medico, Visita } from './types'

const VISITAS_KEY = 'visitas_medicare'
const MEDICO_KEY = 'medico_medicare'

export const seedVisitas = (): Visita[] => [
  {
    id: 1,
    paciente: 'Carlos Pérez',
    direccion: 'Calle 10 #15-20',
    hora: '08:00 AM',
    estado: 'pendiente',
    receta: [],
  },
  {
    id: 2,
    paciente: 'María López',
    direccion: 'Cra 45 #8-30',
    hora: '09:30 AM',
    estado: 'pendiente',
    receta: [],
  },
  {
    id: 3,
    paciente: 'Andrés Gómez',
    direccion: 'Av. Central #22-11',
    hora: '11:00 AM',
    estado: 'en_curso',
    receta: [],
  },
  {
    id: 4,
    paciente: 'Laura Díaz',
    direccion: 'Calle 5 #44-18',
    hora: '02:00 PM',
    estado: 'finalizada',
    receta: [],
  },
]

export const loadVisitas = (): Visita[] => {
  const raw = localStorage.getItem(VISITAS_KEY)
  if (!raw) {
    const data = seedVisitas()
    localStorage.setItem(VISITAS_KEY, JSON.stringify(data))
    return data
  }
  return JSON.parse(raw)
}

export const saveVisitas = (visitas: Visita[]) => {
  localStorage.setItem(VISITAS_KEY, JSON.stringify(visitas))
}

export const loadMedico = (): Medico => {
  const raw = localStorage.getItem(MEDICO_KEY)
  if (!raw) {
    const medico: Medico = {
      nombre: 'Dr. Juan Medina',
      email: 'user@mail.com',
    }
    localStorage.setItem(MEDICO_KEY, JSON.stringify(medico))
    return medico
  }
  return JSON.parse(raw)
}
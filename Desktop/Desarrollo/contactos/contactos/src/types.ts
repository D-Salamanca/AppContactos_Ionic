export type EstadoVisita =
  | 'pendiente'
  | 'en_camino'
  | 'en_curso'
  | 'finalizada'
  | 'cancelada'

export type Medicamento = {
  id: number
  nombre: string
  dosis: string
}

export type Visita = {
  id: number
  paciente: string
  direccion: string
  hora: string
  estado: EstadoVisita
  motivoCancelacion?: string
  receta: Medicamento[]
}

export type Medico = {
  nombre: string
  email: string
  foto?: string
}
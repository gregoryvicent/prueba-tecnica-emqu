export interface LoginProps {
  session: boolean
  loading: boolean
}

export interface MachineCardProps {
  id: number
  name: string
  address: string
  user: string
  onUpdate: () => Promise<void>
  onDelete: (name: string) => void
}

export interface CreateMachinesProps { 
  getMachines: () => Promise<void>
}

export interface UpdateMachinesProps {
  visible: 'hidden' | 'block',
  id: number,
  onUpdate: () => void
}
import { FC, useEffect } from 'react'

import { MachineCard } from './MachineCard'
import type { Machine } from '../types/machine'

interface MachineListSectionProps {
  getMachines: () => Promise<void>
  machines: Machine[]
}

const MachineListSection: FC<MachineListSectionProps> = ({ getMachines, machines }) => {

  const handlerDelete = async (machineName: string) => {
    try {
      await fetch(`http://localhost:8000/machines/delete/${machineName}`, { method: 'DELETE' })
      await getMachines()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMachines()
  }, [])

  return (
    <section className="bg-gray-200 mx-auto rounded-lg py-3 max-w-[600px]">
      {
        machines.length === 0
          ? 'loading...'
          : (machines.map(machine => (
            <MachineCard
              key={machine.id}
              id={machine.id}
              name={machine.name}
              address={machine.address}
              user={machine.user}
              onDelete={handlerDelete}
              onUpdate={getMachines}
            />)))
      }
    </section>
  )
}

export { MachineListSection }

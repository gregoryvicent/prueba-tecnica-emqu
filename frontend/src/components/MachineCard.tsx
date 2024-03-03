import { FC, useState } from 'react'
import type { MachineCardProps } from '../types/props'

import { UpdateMachines } from './forms/UpdateMachines'

const MachineCard: FC<MachineCardProps> = ({ name, address, user, onDelete, onUpdate, id }) => {
  const [visible, setVisible] = useState<'hidden' | 'block'>('hidden')

  const handlerUpdate = () => {
    if (visible === 'hidden') {
      setVisible('block')
    } else {
      setVisible('hidden')
    }
  }

  return (
    <article className="p-6 bg-gray-50 m-5 rounded-lg">
      <div className="flex flex-col min-[530px]:flex-row min-[530px]:justify-between">
        <div>
          <h3><small>Name: </small><b>{name}</b></h3>
          <p><small>Address: </small><b>{address}</b></p>
          <p><small>Created By: </small><b>{user}</b></p>
        </div>
        <div className="flex justify-center items-center my-5">
          <button className="w-20 h-10 rounded-md text-gray-50 bg-blue-500 mx-2 font-semibold transition-colors duration-300 ease-in-out hover:bg-blue-800 hover:text-gray-200" onClick={handlerUpdate}>{visible === 'hidden' ? 'Update' : 'Close'}</button>
          <button className="w-20 h-10 rounded-md text-gray-50 bg-rose-500 mx-2 font-semibold transition-colors duration-300 ease-in-out hover:bg-rose-800 hover:text-gray-200" onClick={() => onDelete(name)}>Delete</button>
        </div>
      </div>
      <div>
        <UpdateMachines
          id={id}
          visible={visible}
          onUpdate={onUpdate}
        />
      </div>
    </article>
  )
}

export { MachineCard }

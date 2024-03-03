import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from '../Header'
import { CreateMachines } from '../forms/CreateMachines'
import { MachineListSection } from '../MachineListSection'
import { Loader } from '../Loader'

import type { LoginProps } from '../../types/props'
import type { Machine } from '../../types/machine'

const Machines: FC<LoginProps> = ({ session, loading }) => {
  const [machines, setMachines] = useState<Machine[]>([])
  const navigate = useNavigate()

  const getMachines = async () => {
    try {
      const machines = await fetch('http://localhost:8000/machines')
      const data = await machines.json()

      setMachines(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!session) {
      navigate('/')
    }
  }, [session, navigate])

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Header />
      <main>
        <h1 className="text-center text-3xl font-semibold my-10">Machines</h1>
        <CreateMachines getMachines={getMachines}/>
        <h2 className="text-center text-xl font-semibold my-20">Machines List</h2>
        <MachineListSection 
          machines={machines}
          getMachines={getMachines}
        />
      </main>
    </>
  )
}

export { Machines }
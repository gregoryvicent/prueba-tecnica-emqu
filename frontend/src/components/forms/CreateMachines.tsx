import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import type { CreateMachineInputs } from '../../types/forms'
import type { CreateMachinesProps } from '../../types/props'

const CreateMachines: FC<CreateMachinesProps> = ({ getMachines }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [createdMessage, setCreatedMessage] = useState('')

  let user = localStorage.getItem('user')

  if (user === null) {
    user = 'anonymus@example.com'
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateMachineInputs>()

  const onSubmit: SubmitHandler<CreateMachineInputs> = async data => {
    fetch('http://localhost:8000/machines/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status_code === 201) {
          setCreatedMessage('Machine created')
          getMachines()
          setTimeout(() => setCreatedMessage(''), 3000)
        }
        if (data.status_code === 400) {
          setErrorMessage(data.detail)
          setTimeout(() => setErrorMessage(''), 3000)
        } 
      })
      .catch(err => console.log(err))
  }

  const validateErrors = Object.keys(errors).length !== 0
  const invalidButton = validateErrors ? 'bg-gray-400 text-gray-500' : 'bg-green-600 text-gray-50 hover:bg-green-800 hover:text-gray-300'

  return (
    <form className="m-10 max-w-96 mx-auto px-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col my-10">
        <label htmlFor="name" >Name: </label>
        <input
          className="border-gray-400 bg-gray-200 rounded-md h-10 pl-3"
          type="text"
          id="name"
          {
          ...register(
            'name',
            {
              required: true,
              minLength: 3,
              maxLength: 30,
              pattern: /^[a-zA-Z0-9]+$/i
            }
          )
          }
        />
        {errors.name?.type === 'required' && <span className="text-red-500">The name is required</span>}
        {errors.name?.type === 'minLength' && <span className="text-red-500">Min length is 3</span>}
        {errors.name?.type === 'maxLength' && <span className="text-red-500">Max length is 30</span>}
        {errors.name?.type === 'pattern' && <span className="text-red-500">Invalid characters</span>}
      </div>
      <div className="flex flex-col my-10">
        <label htmlFor="address" >Address IPV4: </label>
        <input
          className="border-gray-400 bg-gray-200 rounded-md h-10 pl-3"
          type="text"
          id="address"
          {
          ...register(
            'address',
            {
              required: true,
              minLength: 7,
              maxLength: 15,
              pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            }
          )
          }
        />
        {errors.address?.type === 'required' && <span className="text-red-500">The address is required</span>}
        {errors.address?.type === 'minLength' && <span className="text-red-500">Min length is 7</span>}
        {errors.address?.type === 'maxLength' && <span className="text-red-500">Max length is 15</span>}
        {errors.address?.type === 'pattern' && <span className="text-red-500">Invalid ipv4 address format</span>}
      </div>
      <input
        type="hidden"
        value={user}
        {
        ...register(
          'user',
          {
            required: true,
            minLength: 10,
            pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
          }
        )
        }
      />
      <button className={`rounded-md w-20 h-10 font-semibold transition-colors duration-300 ease-in-out  ${invalidButton}`} disabled={validateErrors}>Add</button>

      {errorMessage && <p className="text-red-500 text-center my-10">{errorMessage}</p>}
      {createdMessage && <p className="text-green-800 text-center my-10">{createdMessage}</p>}
    </form>
  )
}

export { CreateMachines }
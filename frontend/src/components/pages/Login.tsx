import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Loader } from '../Loader'

import { login } from '../../utils/login'

import type { LoginProps } from '../../types/props'
import type { LoginInputs } from '../../types/forms'

const Login: FC<LoginProps> = ({ session, loading }) => {
  const [errorAutehnticated, setErrorAuthenticated] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    const result = await login(data)

    if (result) {
      window.location.reload()
    } else {
      setErrorAuthenticated(true)
    }
  }

  useEffect(() => {
    if (session) {
      navigate('/machines')
    }
  }, [session, navigate])

  if (loading) {
    return (
      <Loader />
    )
  }

  const validateErrors = Object.keys(errors).length !== 0
  const invalidButton = validateErrors ? 'bg-gray-400 text-gray-500' : 'bg-blue-400 text-gray-200 hover:bg-blue-500 hover:text-gray-300'

  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh] gap-y-20">
      <h1 className="text-3xl font-semibold">Login</h1>
      <form className="mx-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="border-gray-400 bg-gray-200 rounded-md h-10 pl-3"
            type="email"
            id="email"
            {
            ...register(
              'email',
              {
                required: true,
                minLength: 10,
                pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
              }
            )
            }
          />
          {errors.email?.type === 'required' && <span className="text-red-500">The email is required</span>}
          {errors.email?.type === 'minLength' && <span className="text-red-500">Min length is 10 latters</span>}
          {errors.email?.type === 'pattern' && <span className="text-red-500">This must be an email</span>}
        </div>
        <div className="my-10 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border-gray-400 bg-gray-200 rounded-md h-10 pl-3"
            type="password"
            id="password"
            {
            ...register(
              'password',
              {
                required: true,
                minLength: 10
              }
            )
            }
          />
          {errors.password?.type === 'required' && <span className="text-red-500">The password is required</span>}
          {errors.password?.type === 'minLength' && <span className="text-red-500">Min length is 10 latters</span>}
        </div>
        <button className={`rounded-md w-20 h-10 font-semibold transition-colors duration-300 ease-in-out ${invalidButton}`} type="submit" disabled={validateErrors} >Login</button>
      </form>
      {errorAutehnticated && <p className="text-red-500">The email or password is incorrect</p>}
    </main>
  )
}

export { Login }
import type { LoginInputs } from '../types/forms'

function login(data: LoginInputs) {
  const { email, password } = data

  const validationResult = fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.status_code === 200) {
        document.cookie = `sessiontoken=${data.session}; Expires=${new Date(data.expire)};`
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      console.log(err)
      return false
    })

  return validationResult
}

export { login }
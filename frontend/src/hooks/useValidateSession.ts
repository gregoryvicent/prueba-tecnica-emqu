import { useEffect, useState } from 'react'

const useValidateSession = () => {
  const [session, setSession] = useState(false)
  const [loading, setLoading] = useState(true)

  const cookie = decodeURIComponent(document.cookie).split('=')

  useEffect(() => {
    if (cookie[0] === 'sessiontoken') {
      fetch('http://localhost:8000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: cookie[1] })
      })
        .then(res => res.json())
        .then(data => {
          if (data.sub !== undefined) {
            localStorage.setItem('user', data.sub)
            setSession(true)
          }
          setLoading(false)
        })
        .catch(err => console.log(err))
    } else {
      setLoading(false)
    }
  }, [cookie, session, loading])

  return { session, loading }
}

export { useValidateSession }
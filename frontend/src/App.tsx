import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Machines } from './components/pages/Machines'
import { Login } from './components/pages/Login'

import { useValidateSession } from './hooks/useValidateSession'

function App() {
  const { session, loading } = useValidateSession()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login session={session} loading={loading} />} />
        <Route path="/machines" element={<Machines session={session} loading={loading} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

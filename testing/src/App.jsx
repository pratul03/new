import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmergencyLightingCertificate from './components/EmergencyLighting'
import EmergencyLightingForm from './components/EmergencyLighting'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <EmergencyLightingForm />
       </div>
    </>
  )
}

export default App

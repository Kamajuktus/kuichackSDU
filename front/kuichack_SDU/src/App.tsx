import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('Loading...')

  useEffect(() => {
    fetch('api/question')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage('Error: ' + err))
  }, [])

  return (
    <div className="App">
      <h1>kuichack APP</h1>
      <p>{message}</p>
    </div>
  )
}

export default App

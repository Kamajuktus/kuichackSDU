import { useState, useEffect } from 'react'
import './App.css'

interface QuestionData {
  question: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
}

function App() {
  const [data, setData] = useState<QuestionData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/question')
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data)
        setData(data)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setError('Ошибка при загрузке данных')
      })
  }, [])

  if (error) return <p>{error}</p>
  if (!data) return <p>Загрузка...</p>

  return (
    <div className="App">
      <h1>kuichack APP</h1>
      <p>{data.question}</p>
      <ul>
        <li><button>{data.answer1}</button></li>
        <li><button>{data.answer2}</button></li>
        <li><button>{data.answer3}</button></li>
        <li><button>{data.answer4}</button></li>
      </ul>
    </div>
  )
}

export default App
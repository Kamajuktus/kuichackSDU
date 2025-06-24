import { useState } from 'react'
import './App.css'

interface QuestionData {
  question: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  true_answer: string
  hint1: string
  hint2: string
  hint3: string
}

function App() {
  const [data, setData] = useState<QuestionData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showHint1, setShowHint1] = useState<boolean>(false)
  const [showHint2, setShowHint2] = useState<boolean>(false)
  const [showHint3, setShowHint3] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const resetHints = () => {
    setShowHint1(false)
    setShowHint2(false)
    setShowHint3(false)
  }

  const getQuestion = () => {
    setLoading(true)
    setError(null)
    setData(null)
    resetHints()

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
      .finally(() => {
        setLoading(false)
      })
  }

  const submitAnswer = (userAnswer: string) => {
    if (!data) return

    setSubmitting(true)

    // Determine correct answer (whichever answer contains the full correct one)
    const correctAnswer = data.true_answer
    const correct = data.hint3.includes(correctAnswer)
    
    console.log(data.question)
    console.log("User answer:", userAnswer)
    console.log("Correct answer:", correctAnswer)
    console.log("Is correct:", correct)

    fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: data.question,
        user_answer: userAnswer,
        correct_answer: correctAnswer,
        correct: correct,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка при отправке ответа')
      })
      .catch(err => {
        console.error(err)
        setError('Ошибка при отправке ответа')
      })
      .finally(() => {
        setSubmitting(false)
        getQuestion() // Load next question
      })
  }

  return (
    <div className="App">
      <h1>kuichack APP</h1>
      <button onClick={getQuestion} disabled={loading || submitting}>
        Сгенерировать вопрос
      </button>

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      {data && (
        <div>
          <p>{data.question}</p>
          <ul>
            <li><button onClick={() => submitAnswer(data.answer1)} disabled={submitting}> {data.answer1} </button></li>
            <li><button onClick={() => submitAnswer(data.answer2)} disabled={submitting}> {data.answer2} </button></li>
            <li><button onClick={() => submitAnswer(data.answer3)} disabled={submitting}> {data.answer3} </button></li>
            <li><button onClick={() => submitAnswer(data.answer4)} disabled={submitting}> {data.answer4} </button></li>
          </ul>

          <div style={{ marginTop: '1em' }}>
            {!showHint1 && (
              <button onClick={() => setShowHint1(true)}>
                Показать первую подсказку
              </button>
            )}
            {showHint1 && <p><strong>Подсказка 1:</strong> {data.hint1}</p>}

            {showHint1 && !showHint2 && (
              <button onClick={() => setShowHint2(true)}>
                Показать вторую подсказку
              </button>
            )}
            {showHint2 && <p><strong>Подсказка 2:</strong> {data.hint2}</p>}

            {showHint2 && !showHint3 && (
              <button onClick={() => setShowHint3(true)}>
                Показать ответ
              </button>
            )}
            {showHint3 && <p><strong>Ответ:</strong> {data.hint3}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default App





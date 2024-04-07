import { useState } from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'
import {nanoid} from "nanoid"

function App() {
  const [quizData, setQuizData] = useState([])
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  function ChangeLanguage (event) {
    setSelectedLanguage(event.target.value)
  }
  
  function quizStart() {
    getQuiz()
    setIsStart(prevIsStart => !prevIsStart)
  }
  
  function playAgain() {
    setScore(0)
    setIsAnswered(prevIsAnswered => !prevIsAnswered)
    setIsStart(prevIsStart => !prevIsStart)
  }
  
  function getUserAnswers(event) {
    const { name, value } = event.target
    setQuizData(prevQuizData =>
      prevQuizData.map(quiz => {
      if (quiz.idQuiz === name) {
        return {
          ...quiz,
          userAnswer: value
        }
      }
      return quiz;
    })
    )
  }
  
  function checkAnswers(event) {
    event.preventDefault()
    quizData.map(quiz =>{
      if (quiz.userAnswer === quiz.correct_answer) {
        setScore(prevScore => prevScore += 1)
      }
    })
    setIsAnswered(prevIsAnswered => !prevIsAnswered)
  }
  
  function getQuiz() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          const newQuizData = data.results.map(item => {
          const optionsArray = [...item.incorrect_answers]
          const randomIndex = Math.floor(Math.random() * (optionsArray.length + 1))
          optionsArray.splice(randomIndex, 0, item.correct_answer)
          return {
            idQuiz: nanoid(),
            userAnswer: "",
            optionsArray: optionsArray,
            ...item
          }
        })
          setQuizData(newQuizData)
        } else {
          setIsStart(prevIsStart => !prevIsStart)
          alert("Sorry, can't get new quizzes. Please try again.")
        }
      })
  }
  
  //map every quizzes
  const quizzes = quizData.map(quiz => {
    return (
      <Quiz
        key={quiz.idQuiz}
        onChange={getUserAnswers}
        isAnswered={isAnswered}
        selectedLanguage={selectedLanguage}
        {...quiz}
      />
    )
  })
  
  //UI
  return (
    <main>
    {
      isStart
      ?
      <fieldset>
        <form name="quizForm" onSubmit={checkAnswers} className="flex flex-col m-auto px-14 py-6">
          <section>
            {quizzes}
          </section>
          {
            isAnswered === false 
            ? 
            <button 
              type="submit" 
              className="text-white bg-slate-600 rounded-full pt-1 pb-2 px-3 mt-6 hover:bg-slate-700 self-center"
              title="Please answer all questions before checking the answer."
            >
              Check Answer
            </button> 
            :
            <div className="mt-3 flex justify-center items-center gap-x-2">
              <p className="">{`You scored ${score} / 5 correct answers`}</p>
              <button 
                type="reset" 
                className="text-white bg-slate-600 rounded-full pt-1 pb-2 px-3 hover:bg-slate-700 animate-bounce" 
                onClick={playAgain}
              >
                Play again
              </button>
            </div>
          }
        </form>
      </fieldset> 
      :
      <Start 
        onClick={quizStart}
        onChange={ChangeLanguage}
        selectedLanguage={selectedLanguage}
      />
    }
    </main>
  )
}

export default App

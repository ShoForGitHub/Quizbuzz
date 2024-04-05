/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import { decode } from 'html-entities'
import { translate } from 'deepl'

const Quiz = (props) => {
  const [question, setQuestion] = useState('')
  const [optionsArray, setOptionsArray] = useState([])
  let decodedQuestion = decode(props.question)
  let decodedCorrectAnswer = decode(props.correct_answer)
  let decodedOptionsArray = props.optionsArray.map(option => decode(option))
  let language = props.selectedLanguage
  console.log("rendered")

  useEffect(() => {
    if (language === 'EN') {
      setQuestion(decodedQuestion)
      setOptionsArray(decodedOptionsArray)
    } else {
      getTranslations(decodedQuestion, decodedOptionsArray)
    }
  }, [])
  
  async function getTranslations(question, optionsArray) {
    try {
      const result = await translate({
        free_api: true,
        text: [question, ...optionsArray],
        target_lang: 'JA',
        auth_key: '2aa4b33e-f85b-400c-80df-ce4e7a7cfd5d:fx',
      })
      let translations = result.data.translations.map(translation => translation.text);
      setQuestion(translations[0])
      setOptionsArray(translations.slice(1))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  //map options of every quiz
  let options = decodedOptionsArray.map((option, index) => {
    let idOption = nanoid()
    let bgColor = ''

    if (option === decodedCorrectAnswer && props.isAnswered) {
      bgColor = '#dcfce7';
  } else if (option === props.userAnswer && props.isAnswered) {
      bgColor = '#fee2e2';
  } else if (option === props.userAnswer && !props.isAnswered) {
      bgColor = '#f1f5f9';
  }

    const style = {
      backgroundColor: bgColor,
    };

    return (
      <div key={idOption} className="flex items-center">
        <input 
          type="radio" 
          id={idOption} 
          name={props.idQuiz} 
          value={option}
          checked={option === props.userAnswer}
          onChange={props.onChange}
          className="appearance-none"
          disabled={props.isAnswered ? true : false}
          required
        />
        <label 
          htmlFor={idOption}
          className='bg-transparent border border-slate-400 rounded py-1 px-3 mr-2 hover:bg-slate-100 cursor-pointer active:shadow-inner'
          style={style}
        >
          {optionsArray[index]}
        </label>
      </div>
    )
  })
  
  //UI
  return (
    <>
      <legend className="text-wrap text-xl py-2 text-slate-700 font-bold">
        {question}
      </legend>
      <section className="options mb-4 flex flex-col sm:flex-row items-center gap-3">
        {options}
      </section>  
      <hr/>
    </>
  )
}

export default Quiz
/* eslint-disable react/prop-types */

const Start = ({onClick, onChange, selectedLanguage}) => {
  return (
    <div className="flex flex-col m-auto h-dvh justify-center items-center">
      <h1 className="text-2xl font-bold text-slate-700">QuizBuzz</h1>
      <p className="text-slate-900 mb-5">Enjoy your quizzes!</p>
      <label>
        Language:
        <select
          name="language"
          value={selectedLanguage} 
          onChange={onChange} 
          className="border border-slate-500 rounded ml-1"
        >
          <option value="EN">English</option>
          <option value="JA">日本語</option>
        </select>
      </label>
      <button 
        type="button" 
        onClick={onClick}
        className="text-white bg-slate-600 rounded-full pt-1 pb-2 px-3 mt-6 animate-bounce hover:bg-slate-700" 
      >
        Start Quiz
      </button>
    </div>
  )
}

export default Start
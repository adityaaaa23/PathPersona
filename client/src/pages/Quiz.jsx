import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Quiz = () => {

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (answers.length === questions.length && questions.length > 0) {
      submitQuiz();
    }
  }, [answers])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get('/api/quiz/questions');
        setQuestions(response.data.questions);
      }
      catch (err) {
        console.log("Failed to fetch questions", err);
      }
    }
    fetchQuestions();
  }, [])

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers(prev => [...prev, { questionId: questionId, selectedType: selectedOption.type }]);
    goToNext();
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev + 1);
  }

  const goToPrev = () => {
    setCurrentIndex(prev => prev - 1);
  }

  const submitQuiz = async () => {
    try {
      await API.post('/api/quiz/submit', { answers });
      navigate('/dashboard');
    } catch (err) {
      console.log("Submition failed");
    }
  }

  if (questions.length === 0) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide text-brand-red'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-8 h-8 bg-brand-red animate-spin' />
        <p className='text-xs font-black uppercase tracking-widest'>Loading quiz...</p>
      </div>
    </div>
  )

  if (currentIndex >= questions.length) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide text-brand-red'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-8 h-8 bg-brand-red animate-spin' />
        <p className='text-xs font-black uppercase tracking-widest'>Submitting your profile...</p>
      </div>
    </div>
  )

  const currentQuestion = questions[currentIndex];
  const progress = Math.round((currentIndex / questions.length) * 100);

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 md:px-10 pt-28 pb-16 bg-brand-cream font-sans'>

      {/* Header pill */}
      <div className='w-full max-w-xl mb-4 text-center md:text-left'>
        <span className='text-xs font-black tracking-widest px-4 py-2 bg-brand-red text-brand-white border-2 border-brand-charcoal rounded-none uppercase inline-block shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'>
          Learning Personality Quiz
        </span>
      </div>

      {/* Card */}
      <div className='w-full max-w-xl rounded-none bg-brand-white border-2 border-brand-charcoal shadow-2xl swiss-shadow'>

        {/* Progress section */}
        <div className='px-6 py-5 border-b-2 border-brand-charcoal bg-brand-cream/60'>
          <div className='flex justify-between items-center mb-2.5'>
            <span className='text-[10px] font-black tracking-wider uppercase text-brand-charcoal/70'>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className='text-xs font-black tracking-wider uppercase text-brand-red font-mono'>
              {progress}%
            </span>
          </div>
          <div className='w-full h-3 rounded-none overflow-hidden bg-brand-cream border border-brand-charcoal'>
            <div
              className='h-full rounded-none bg-brand-red transition-all duration-500 shadow-inner'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className='px-6 py-6 border-b-2 border-brand-charcoal bg-brand-cream/20 text-left'>
          <h2 className='text-lg font-black tracking-wide text-brand-charcoal uppercase leading-relaxed'>
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className='flex flex-col px-6 py-5 gap-3 bg-brand-white text-left'>
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(currentQuestion.id, option)}
              className='w-full text-left px-5 py-4 rounded-none text-xs font-black tracking-widest uppercase text-brand-charcoal bg-brand-cream hover:bg-brand-red hover:text-brand-white hover:border-brand-charcoal border-2 border-brand-charcoal transition-all duration-200 cursor-pointer flex items-center shadow-[2px_2px_0px_0px_rgba(21,21,21,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
            >
              <span className='text-brand-white text-xs font-mono font-bold bg-brand-charcoal px-2.5 py-1 rounded-none border border-brand-charcoal mr-4 flex-shrink-0'>
                {String.fromCharCode(65 + i)}
              </span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>

        {/* Back button */}
        {currentIndex > 0 && (
          <div className='px-6 pb-5 bg-brand-white text-left'>
            <button
              onClick={goToPrev}
              className='text-xs font-black tracking-widest uppercase bg-brand-cream text-brand-charcoal border-2 border-brand-charcoal px-6 py-3 rounded-none hover:bg-brand-charcoal hover:text-brand-cream transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
            >
              ← Back
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Quiz

//    in useEffect:- try/catch must always be INSIDE the async function
//    because async errors only occur when the function runs (after await),
//    putting try/catch outside won't catch them

import React, { useEffect, useState } from 'react'
import API from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const RoadmapQuiz = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/api/roadmap/${id}/quiz`);
        setQuestions(response.data.quiz);
      } catch (err) {
        console.log("Failed to fetch the questions");
      }
    }
    fetchQuestions();
  }, [])

  const answerHandler = (newAnswer, index) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[index] = newAnswer;
      return updated;
    });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }

  const submit = async () => {
    try {
      if (questions.length !== answers.length || answers.some(a => a === undefined)) {
        setIsError(true);
        return;
      }
      setSubmitting(true);
      await API.post(`/api/roadmap/${id}/quiz/submit`, { questions, answers });
      navigate("/roadmaps");
    } catch (err) {
      console.log("Failed to submit quiz", err);
      setSubmitting(false);
    }
  }

  if (questions.length === 0) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide text-brand-red'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-8 h-8 bg-brand-red animate-spin' />
        <p className='text-xs font-black uppercase tracking-widest'>Generating your quiz...</p>
      </div>
    </div>
  )

  if (submitting) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide text-brand-red'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-8 h-8 bg-brand-red animate-spin' />
        <p className='text-xs font-black uppercase tracking-widest'>Submitting your answers...</p>
      </div>
    </div>
  )

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter(a => a !== undefined).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 md:px-10 pt-28 pb-16 bg-brand-cream font-sans'>

      {/* Card */}
      <div className='w-full max-w-xl rounded-none bg-brand-white border-2 border-brand-charcoal shadow-2xl swiss-shadow'>

        {/* Card header pill */}
        <div className='px-6 py-4 border-b-2 border-brand-charcoal bg-brand-cream/40 text-left'>
          <span className='text-[10px] font-black tracking-widest px-3.5 py-1.5 bg-brand-red text-brand-white border-2 border-brand-charcoal rounded-none uppercase inline-block shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'>
            Roadmap Assessment Quiz
          </span>
        </div>

        {/* Progress */}
        <div className='px-6 py-5 border-b-2 border-brand-charcoal bg-brand-cream/60'>
          <div className='flex justify-between items-center mb-2.5'>
            <span className='text-[10px] font-black tracking-wider uppercase text-brand-charcoal/70'>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className='text-xs font-black tracking-wider uppercase text-brand-red font-mono'>
              {answeredCount} answered · {progress}%
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
        <div className='px-6 py-6 border-b-2 border-brand-charcoal bg-brand-cream/25 text-left'>
          <h2 className='text-lg font-black tracking-wide text-brand-charcoal uppercase leading-relaxed'>
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className='flex flex-col px-6 py-5 gap-3 border-b-2 border-brand-charcoal bg-brand-white text-left'>
          {currentQuestion.options.map((option, i) => {
            const isSelected = answers[currentIndex] === option;
            return (
              <button
                key={i}
                onClick={() => answerHandler(option, currentIndex)}
                className={`w-full text-left px-5 py-4 rounded-none text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer border-2 flex items-center border-brand-charcoal shadow-[2px_2px_0px_0px_rgba(21,21,21,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                  ${isSelected
                    ? 'bg-brand-red text-brand-white'
                    : 'bg-brand-cream text-brand-charcoal hover:bg-brand-red hover:text-brand-white'
                  }`}
              >
                <span className='text-brand-white text-xs font-mono font-bold bg-brand-charcoal px-2.5 py-1 rounded-none border border-brand-charcoal mr-4 flex-shrink-0'>
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className='flex justify-between items-center px-6 py-4 bg-brand-cream/30'>
          <button
            onClick={() => setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
            className='text-[10px] font-black tracking-widest uppercase bg-brand-cream text-brand-charcoal border-2 border-brand-charcoal px-6 py-3 rounded-none hover:bg-brand-charcoal hover:text-brand-cream transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'
          >
            ← Prev
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className='text-[10px] font-black tracking-widest uppercase bg-brand-red text-brand-white border-2 border-brand-charcoal px-6 py-3 rounded-none hover:bg-brand-charcoal hover:border-brand-charcoal transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'
            >
              Next →
            </button>
          ) : (
            <button
              onClick={submit}
              className='text-[10px] font-black tracking-widest uppercase bg-brand-red text-brand-white border-2 border-brand-charcoal px-6 py-3 rounded-none hover:bg-brand-charcoal hover:border-brand-charcoal transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'
            >
              Submit Quiz →
            </button>
          )}
        </div>

        {/* Error */}
        {isError && (
          <div className='px-6 pb-4 pt-2 bg-brand-white'>
            <p className='text-brand-red text-xs font-black tracking-wider border-2 border-brand-red bg-brand-red/5 py-2 px-3 rounded-none text-center uppercase'>
              Please answer all questions before submitting the quiz.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default RoadmapQuiz

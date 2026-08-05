import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import image from '../assets/user.jpeg'

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [quote, setQuote] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/api/user/dashboard");
        setUser(response.data.user);
        setQuote(response.data.quote);
        setStats(response.data.stats);
        setRoadmaps(response.data.roadmaps);
      } catch (err) {
        console.log('Failed to fetch user details', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [])

  const newRoadmap = () => {
    if (user.personalityType) {
      navigate("/generate");
    } else {
      navigate("/quiz");
    }
  }

  if (loading) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide mx-8 mt-5 text-brand-red'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-8 h-8 bg-brand-red animate-spin' />
        <p className='text-xs font-black uppercase tracking-widest'>Loading your journey...</p>
      </div>
    </div>
  )

  if (!user) return null;

  const initials = user.username?.slice(0, 2).toUpperCase() || 'U';
  const isNewUser = !user.personalityType;

  return (
    <div className='min-h-screen w-full max-w-full flex flex-col px-4 py-6 gap-6 overflow-x-hidden md:flex-row md:items-stretch md:gap-8 font-sans pt-28 pb-16 bg-brand-cream'>

      {/* Sidebar - hidden on mobile, visible on pc */}
      <aside className='hidden md:flex md:flex-col md:items-center md:justify-between md:w-1/4 bg-brand-white border-2 border-brand-charcoal p-6 shadow-xl swiss-shadow-red rounded-none'>

        {/* Logo / Brand */}
        <div className='w-full text-center'>
          <div className='text-xl font-black tracking-widest uppercase text-brand-charcoal border-b-2 border-brand-red pb-4'>
            AURA<span className='text-brand-red'>.</span>LEARN
          </div>
        </div>

        {/* Navigation Links */}
        <nav className='flex flex-col gap-6 w-full items-center -mt-16'>
          <div className='flex flex-col items-center'>
            <div className='relative w-20 h-20 border-2 border-brand-charcoal overflow-hidden shadow-lg mb-3 bg-brand-cream flex items-center justify-center rounded-none shadow-[2px_2px_0px_0px_rgba(229,59,44,1)]'>
              <span className='text-2xl font-black text-brand-charcoal'>{initials}</span>
            </div>
            <div className='px-4 py-1.5 capitalize text-xs font-black tracking-wider text-brand-white bg-brand-red border-2 border-brand-charcoal rounded-none max-w-[150px] truncate text-center shadow-[1px_1px_0px_0px_rgba(21,21,21,1)]'>
              {user.username}
            </div>
          </div>
          <div className='flex flex-col gap-2.5 w-full mt-4'>
            <button
              onClick={() => navigate('/dashboard')}
              className='w-full flex items-center gap-3 px-4 py-3 rounded-none text-xs font-black tracking-widest uppercase text-brand-white bg-brand-red border-2 border-brand-charcoal transition-all duration-200 cursor-pointer text-left shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'
            >
              <span>⬡</span>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/roadmaps')}
              className='w-full flex items-center gap-3 px-4 py-3 rounded-none text-xs font-black tracking-widest uppercase text-brand-charcoal hover:bg-brand-cream border-2 border-transparent hover:border-brand-charcoal transition-all duration-200 cursor-pointer text-left'
            >
              <span>◈</span>
              <span>Roadmaps</span>
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className='w-full flex items-center gap-3 px-4 py-3 rounded-none text-xs font-black tracking-widest uppercase text-brand-charcoal hover:bg-brand-cream border-2 border-transparent hover:border-brand-charcoal transition-all duration-200 cursor-pointer text-left'
            >
              <span>◎</span>
              <span>Quiz</span>
            </button>
          </div>
        </nav>

        {/* User Email at the bottom of sidebar */}
        <div className='w-full text-center border-t-2 border-brand-red pt-4'>
          <p className='text-[10px] font-black tracking-widest uppercase text-brand-charcoal/70 font-mono'>{user.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex flex-col gap-6 w-full max-w-full overflow-x-hidden p-6 md:w-3/4 md:p-8 bg-brand-white border-2 border-brand-charcoal rounded-none shadow-2xl swiss-shadow'>

        {/* Header - Greeting + Personality Type */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-brand-red pb-5'>
          <div className='flex flex-wrap items-baseline gap-2'>
            <p className='text-brand-charcoal/70 text-xs font-bold uppercase tracking-wider'>{isNewUser ? "Hello," : "Good to see you back,"}</p>
            <h1 className='capitalize text-xl font-black tracking-wide text-brand-charcoal uppercase'>{user.username}</h1>
          </div>
          <div>
            {user.personalityType ? (
              <span className='text-xs font-black tracking-widest px-4 py-2 bg-brand-red text-brand-white border-2 border-brand-charcoal rounded-none uppercase shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'>
                {user.personalityType} Style
              </span>
            ) : (
              <span className='text-xs font-black tracking-wider px-4 py-2 bg-brand-cream border-2 border-brand-charcoal rounded-none text-brand-charcoal uppercase'>
                No Profile Yet
              </span>
            )}
          </div>
        </div>

        {/* New User Banner */}
        {isNewUser && (
          <div className='border-2 border-dashed border-brand-red bg-brand-red/5 p-6 rounded-none text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <p className='font-black text-brand-charcoal uppercase tracking-wider mb-1'>Welcome to your learning journey!</p>
              <p className='text-xs text-brand-charcoal/80 leading-relaxed font-bold uppercase tracking-wide'>Take the learning style quiz first so we can automatically shape all generated roadmaps to your personal learning speed and formats.</p>
            </div>
            <button className='flex-shrink-0 text-xs font-black tracking-widest uppercase text-brand-white bg-brand-red border-2 border-brand-charcoal px-6 py-3 hover:bg-brand-charcoal hover:text-brand-cream hover:border-brand-charcoal transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]' onClick={() => navigate('/quiz')}>
              Take Quiz →
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
          <StatCard label="Roadmaps Created" value={stats?.numberOfRoadmapsGenerated ?? 0} />
          <StatCard label="Completed" value={stats?.numberOfRoadmapsFinished ?? 0} />
          <StatCard label="Current Streak" value={`${user.currentStreak ?? 0}d`} />
          <StatCard label="Longest Streak" value={`${user.longestStreak ?? 0}d`} />
        </div>

        {/* Motivational Quote */}
        {quote && (
          <div className='rounded-none px-6 py-4 border-2 border-brand-red bg-brand-cream text-center relative overflow-hidden'>
            <p className='text-xs font-black uppercase tracking-wider text-brand-charcoal/85 leading-relaxed relative z-10'>"{quote}"</p>
          </div>
        )}

        {/* Roadmaps Section Header */}
        <div className='flex justify-between items-center mt-2'>
          <p className='text-xs font-black tracking-widest px-4 py-2 bg-brand-red text-brand-white border-2 border-brand-charcoal uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'>
            Your Roadmaps
          </p>
          <button className='text-xs font-black tracking-widest uppercase px-4 py-2 bg-brand-cream text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-white border-2 border-brand-charcoal rounded-none transition-all duration-200 cursor-pointer' onClick={newRoadmap}>
            + New Roadmap
          </button>
        </div>

        {/* Roadmaps List or Empty State */}
        {roadmaps.length === 0 ? (
          <div className='py-8 text-center border-2 border-dashed border-brand-red rounded-none bg-brand-cream'>
            <p className='text-xs font-black uppercase tracking-wider text-brand-charcoal/70'>
              {isNewUser ? 'Complete the personality quiz first, then generate your first study roadmap!' : 'No roadmaps created yet. Generate one now to start learning.'}
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 md:flex-row md:flex-wrap'>
              {roadmaps.slice(0, 4).map((r) => {
                const completedDays = r.roadmap?.filter(d => d.completed).length ?? 0;
                const totalDays = r.roadmap?.length ?? 28;
                const progress = Math.round((completedDays / totalDays) * 100);
                const lastAttempt = r.quizHistory?.length > 0
                  ? r.quizHistory[r.quizHistory.length - 1].percentage
                  : null;

                return (
                  <div
                    key={r._id}
                    onClick={() => navigate(`/roadmap/${r._id}`)}
                    className='w-full rounded-none cursor-pointer hover:border-brand-red hover:-translate-y-0.5 transition-all duration-200 md:w-[calc(50%-8px)] lg:w-[calc(50%-8px)] xl:w-[calc(25%-12px)] bg-brand-white border-2 border-brand-charcoal flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(21,21,21,1)]'
                  >
                    {/* Card Top */}
                    <div className='flex justify-between items-start px-4 py-3.5 border-b-2 border-brand-charcoal bg-brand-cream/60'>
                      <div>
                        <p className='text-sm font-black uppercase tracking-wide text-brand-charcoal mb-1 truncate max-w-[125px]'>{r.skill}</p>
                        <span className='text-[9px] font-black uppercase tracking-widest text-brand-white bg-brand-red border border-brand-charcoal px-2.5 py-0.5 rounded-none'>{r.personalityType}</span>
                      </div>
                      {r.completed && (
                        <span className='text-[9px] font-black uppercase tracking-widest text-white bg-emerald-600 border border-brand-charcoal px-2.5 py-0.5 rounded-none'>
                          ✓ Done
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className='flex flex-col gap-2 px-4 py-3.5 border-b-2 border-brand-charcoal bg-brand-cream/20'>
                      <div className='flex justify-between items-center'>
                        <span className='text-[9px] font-black uppercase tracking-wider text-brand-charcoal/60'>Progress</span>
                        <span className='text-[10px] text-brand-charcoal font-mono font-bold'>{completedDays}/{totalDays} Days</span>
                      </div>
                      <div className='h-3 rounded-none overflow-hidden bg-brand-cream border border-brand-charcoal'>
                        <div
                          className='h-full rounded-none bg-brand-red transition-all duration-500 shadow-inner'
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Last Quiz Score */}
                    {lastAttempt !== null && (
                      <div className='flex justify-between items-center px-4 py-2 border-b-2 border-brand-charcoal bg-brand-cream/20'>
                        <span className='text-[9px] font-black uppercase tracking-wider text-brand-charcoal/60'>Last Quiz</span>
                        <span className={`text-xs font-black font-mono ${lastAttempt >= 75 ? 'text-emerald-600' : 'text-brand-red'}`}>{lastAttempt}%</span>
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className='flex justify-between items-center px-4 py-3 bg-brand-cream/40'>
                      <span className='text-[9px] font-black uppercase tracking-wider text-brand-charcoal/50 font-mono'>
                        {r.quizHistory?.length ?? 0} attempt{r.quizHistory?.length !== 1 ? 's' : ''}
                      </span>
                      <span className='text-brand-red text-xs font-black uppercase tracking-widest hover:underline'>View →</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {roadmaps.length > 4 && (
              <button className='mt-2 text-xs font-black tracking-widest uppercase text-brand-red hover:underline transition-all duration-200 self-center md:self-start' onClick={() => navigate('/roadmaps')}>
                View All Roadmaps ({roadmaps.length})
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

const StatCard = ({ label, value }) => (
  <div className='
    w-full rounded-none bg-brand-cream cursor-pointer overflow-hidden
    border-2 border-brand-charcoal
    hover:-translate-y-0.5 hover:border-brand-red
    transition-all duration-200 ease-out
    group flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]
  '>
    <div className='
      flex justify-center items-center px-3 py-3
      border-b-2 border-brand-charcoal
      text-[9px] font-black tracking-[0.09em] uppercase
      text-brand-charcoal text-center leading-tight bg-brand-gray/40
    '>
      {label}
    </div>
    <div className='
      flex justify-center items-center py-5 px-3
      text-2xl md:text-3xl font-black font-mono text-brand-red
    '>
      {value}
    </div>
  </div>
)

export default Dashboard

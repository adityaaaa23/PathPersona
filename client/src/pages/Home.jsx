import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return navigate('/dashboard');

  return (
    <div className='min-h-screen bg-brand-cream text-brand-charcoal font-sans pt-16'>

      {/* ── Hero Split Layout ── */}
      <div className='flex flex-col md:flex-row items-stretch border-b-2 border-brand-red min-h-[85vh]'>
        
        {/* Left Side: Brand & Call To Action */}
        <div className='w-full md:w-1/2 flex flex-col justify-center items-start text-left bg-brand-cream px-8 py-16 md:px-16 md:py-24 border-b-2 md:border-b-0 md:border-r-2 border-brand-red'>
          <p className='text-xs tracking-[0.2em] uppercase text-brand-red mb-6 font-black bg-brand-red/10 px-3 py-1 border border-brand-red/20 rounded-none'>
            01 / AI-POWERED PLATFORM
          </p>

          <h1 className='text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[1.05] mb-6 max-w-xl tracking-wider text-brand-charcoal uppercase'>
            Learn the way your <span className='text-brand-red underline decoration-wavy underline-offset-8 decoration-2'>mind</span> works
          </h1>

          <p className='text-sm md:text-base text-brand-charcoal/80 max-w-md leading-relaxed mb-10'>
            Take a 10-question personality quiz, uncover your core cognitive learning type, and compile custom, AI-generated daily roadmaps for any skill.
          </p>

          <div className='flex flex-wrap gap-4 w-full'>
            <button
              onClick={() => navigate('/register')}
              className='bg-brand-red text-brand-white border-2 border-brand-charcoal px-8 py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer rounded-none swiss-shadow'
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className='bg-transparent text-brand-charcoal border-2 border-brand-charcoal px-8 py-3.5 text-xs font-black tracking-widest uppercase hover:bg-brand-charcoal hover:text-brand-cream transition-all duration-200 cursor-pointer rounded-none'
            >
              Login
            </button>
          </div>
        </div>

        {/* Right Side: Vermillion Modernist Block */}
        <div className='w-full md:w-1/2 bg-brand-red text-brand-white flex flex-col justify-center items-start text-left px-8 py-16 md:px-16 md:py-24 relative overflow-hidden'>
          <div className='absolute right-0 top-0 text-[180px] font-black text-brand-cream/5 select-none pointer-events-none tracking-tighter'>
            AURA
          </div>
          
          <p className='text-xs tracking-[0.2em] uppercase text-brand-cream/80 mb-6 font-black'>
            Currently Viewing
          </p>

          <h2 className='text-3xl md:text-5xl font-black leading-[1.1] mb-8 uppercase tracking-wide max-w-md'>
            Personality Development & productivity
          </h2>

          <div className='border-l-2 border-brand-cream pl-6 py-2 max-w-md'>
            <p className='text-sm text-brand-cream/90 leading-relaxed font-bold mb-4 uppercase tracking-wider'>
              "Traditional learning models assume everyone digests information identically. We build learning plans shaped specifically to you."
            </p>
            <span className='text-xs font-black tracking-widest text-brand-cream/80'>— AURALEARN METHOD</span>
          </div>
        </div>

      </div>

      {/* ── How It Works ── */}
      <div className='px-6 py-24 max-w-5xl mx-auto'>
        <div className='text-left border-l-4 border-brand-red pl-6 mb-16'>
          <p className='text-xs tracking-[0.2em] uppercase text-brand-red mb-2 font-black'>The Core Pipeline</p>
          <h2 className='text-3xl md:text-4xl font-black uppercase tracking-wider'>How it works</h2>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {[
            { step: '01', title: 'Take the Quiz', desc: 'Assess your processing style in 10 interactive questions.' },
            { step: '02', title: 'Identify Your Style', desc: 'Map your profile into visual, kinesthetic, social, or reading segments.' },
            { step: '03', title: 'Build Roadmaps', desc: 'Specify any technical skill and prompt AI to write daily learning flows.' },
          ].map((item) => (
            <div key={item.step} className='bg-brand-white border-2 border-brand-charcoal p-6 rounded-none swiss-shadow-red flex flex-col justify-between min-h-[200px] text-left'>
              <div className='flex justify-between items-start border-b border-brand-gray pb-4 mb-4'>
                <p className='font-mono text-3xl font-black text-brand-red'>{item.step}</p>
                <div className='w-3 h-3 bg-brand-charcoal' />
              </div>
              <div>
                <h3 className='text-sm font-black tracking-wide text-brand-charcoal uppercase mb-2'>{item.title}</h3>
                <p className='text-xs text-brand-charcoal/80 leading-relaxed'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Personality Types ── */}
      <div className='py-24 px-6 border-t-2 border-brand-red bg-brand-charcoal text-brand-cream relative'>
        <div className='max-w-5xl mx-auto'>
          <div className='text-left border-l-4 border-brand-red pl-6 mb-16'>
            <p className='text-xs tracking-[0.2em] uppercase text-brand-red mb-2 font-black'>Profiles</p>
            <h2 className='text-3xl md:text-4xl font-black uppercase tracking-wider'>4 Learning Styles</h2>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {[
              { icon: '👁️', type: 'Visual', desc: 'Diagrams, spatial layouts, maps.' },
              { icon: '📚', type: 'Reader', desc: 'Documentation, text-based guides, books.' },
              { icon: '🛠️', type: 'Kinesthetic', desc: 'Interactive code blocks, projects, trials.' },
              { icon: '🤝', type: 'Social', desc: 'Communities, peer discussion, mentorship.' },
            ].map((item) => (
              <div
                key={item.type}
                className='bg-brand-cream text-brand-charcoal border-2 border-brand-red p-6 rounded-none transition-all duration-200 hover:-translate-y-1 hover:swiss-shadow-red flex flex-col justify-between min-h-[220px] text-left'
              >
                <div className='flex justify-between items-center border-b border-brand-red/35 pb-4 mb-4'>
                  <span className='text-2xl'>{item.icon}</span>
                  <div className='w-2 h-2 bg-brand-red' />
                </div>
                <div>
                  <h3 className='text-sm font-black tracking-wide text-brand-charcoal uppercase mb-2'>{item.type}</h3>
                  <p className='text-xs text-brand-charcoal/80 leading-relaxed'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className='py-28 px-6 text-center bg-brand-red text-brand-white border-t-2 border-brand-charcoal relative'>
        <h2 className='text-3xl md:text-5xl font-black mb-8 tracking-wider uppercase max-w-3xl mx-auto leading-tight'>
          Ready to discover your cognitive learning profile?
        </h2>
        <button
          onClick={() => navigate('/register')}
          className='bg-brand-cream text-brand-charcoal border-2 border-brand-charcoal px-10 py-4 text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer rounded-none swiss-shadow'
        >
          Start Quiz Now
        </button>
      </div>

    </div>
  )
}

export default Home

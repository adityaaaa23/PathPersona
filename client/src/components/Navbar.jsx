import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logOut = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  }

  return (
    <nav className='fixed top-0 left-0 right-0 bg-brand-cream border-b-2 border-brand-red px-6 py-4.5 flex flex-col z-50'>

      {/* Top row */}
      <div className='flex justify-between items-center max-w-7xl mx-auto w-full'>

        {/* Logo */}
        <div className='text-brand-charcoal font-black text-xl tracking-widest uppercase cursor-pointer' onClick={() => navigate('/')}>
          AURA<span className='text-brand-red'>.</span>LEARN
        </div>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-6'>
          {user ? (
            <>
              <Link to='/dashboard' className='text-brand-charcoal hover:text-brand-red py-2 px-3 text-xs tracking-widest uppercase font-black transition-all duration-200'>
                HOME
              </Link>
              <Link to='/dashboard' className='text-brand-charcoal hover:text-brand-red py-2 px-3 text-xs tracking-widest uppercase font-black transition-all duration-200'>
                DASHBOARD
              </Link>
              <Link to='/roadmaps' className='text-brand-charcoal hover:text-brand-red py-2 px-3 text-xs tracking-widest uppercase font-black transition-all duration-200'>
                ROADMAPS
              </Link>
              <button
                onClick={logOut}
                className='bg-brand-red text-brand-white border border-brand-red px-5 py-2 text-xs font-black tracking-widest uppercase hover:bg-brand-charcoal hover:border-brand-charcoal transition-all duration-200 cursor-pointer rounded-none'
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to='/' className='text-brand-charcoal hover:text-brand-red py-2 px-3 text-xs tracking-widest uppercase font-black transition-all duration-200'>
                HOME
              </Link>
              <Link to='/login' className='text-brand-charcoal hover:text-brand-red py-2 px-3 text-xs tracking-widest uppercase font-black transition-all duration-200'>
                LOGIN
              </Link>
              <Link to='/register' className='bg-brand-red text-brand-white border border-brand-red px-6 py-2.5 text-xs font-black tracking-widest uppercase hover:bg-brand-charcoal hover:border-brand-charcoal transition-all duration-200 cursor-pointer rounded-none'>
                GET STARTED
              </Link>
            </>
          )}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className='md:hidden flex flex-col gap-1.5 cursor-pointer p-1'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-brand-charcoal transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brand-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brand-charcoal transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden flex flex-col gap-2 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 mt-4 pb-2' : 'max-h-0'}`}>
        <div className='w-full h-px bg-brand-red/30 my-2' />
        {user ? (
          <>
            <Link to='/dashboard' onClick={() => setMenuOpen(false)} className='text-brand-charcoal hover:text-brand-red py-2 text-xs tracking-widest uppercase font-black block text-left'>
              HOME
            </Link>
            <Link to='/dashboard' onClick={() => setMenuOpen(false)} className='text-brand-charcoal hover:text-brand-red py-2 text-xs tracking-widest uppercase font-black block text-left'>
              DASHBOARD
            </Link>
            <Link to='/roadmaps' onClick={() => setMenuOpen(false)} className='text-brand-charcoal hover:text-brand-red py-2 text-xs tracking-widest uppercase font-black block text-left'>
              ROADMAPS
            </Link>
            <button
              onClick={logOut}
              className='bg-brand-red text-brand-white border border-brand-red px-5 py-2.5 text-xs font-black tracking-widest uppercase hover:bg-brand-charcoal hover:border-brand-charcoal transition-all duration-200 w-full text-center cursor-pointer block rounded-none'
            >
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link to='/' onClick={() => setMenuOpen(false)} className='text-brand-charcoal hover:text-brand-red py-2 text-xs tracking-widest uppercase font-black block text-left'>
              HOME
            </Link>
            <Link to='/login' onClick={() => setMenuOpen(false)} className='text-brand-charcoal hover:text-brand-red py-2 text-xs tracking-widest uppercase font-black block text-left'>
              LOGIN
            </Link>
            <Link to='/register' onClick={() => setMenuOpen(false)} className='bg-brand-red text-brand-white border border-brand-red px-5 py-2.5 text-xs font-black tracking-widest uppercase hover:bg-brand-charcoal hover:border-brand-charcoal transition-all duration-200 w-full text-center cursor-pointer block rounded-none'>
              GET STARTED
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {

  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await register(username, email, password);
    if (result.success) {
      navigate('/dashboard');
      return;
    }
    else {
      setError(result.message);
    }
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center p-4 pt-28 bg-brand-cream font-sans'>
      <div className='bg-brand-white w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-none border-2 border-brand-charcoal shadow-2xl swiss-shadow-red'>

        {/* Image — hidden on mobile */}
        <div className='hidden md:block w-1/2 relative min-h-[500px] overflow-hidden bg-brand-red border-r-2 border-brand-charcoal'>
          <img className="object-cover w-full h-full grayscale mix-blend-multiply opacity-80" src="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Productivity Space" />
          <div className='absolute inset-0 bg-brand-red/30 mix-blend-color' />
          <div className='absolute bottom-8 left-8 right-8 text-left'>
            <h3 className='text-3xl font-black text-white uppercase tracking-wider mb-2'>02 / AURA.LEARN</h3>
            <p className='text-xs text-brand-cream leading-relaxed uppercase tracking-wider font-bold'>Unlock study roadmaps built dynamically around your personality and strengths.</p>
          </div>
        </div>

        {/* Form section */}
        <div className='w-full md:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-10 md:px-12 bg-brand-white'>

          <div className='mb-8 text-center md:text-left'>
            <h2 className='text-3xl font-black tracking-wider text-brand-charcoal mb-2 uppercase'>Create Account</h2>
            <p className='text-brand-charcoal/70 text-xs font-bold uppercase tracking-wider'>
              Join <span className='text-brand-red font-black'>AuraLearn</span> to start your customized journey
            </p>
          </div>

          <div className='w-full'>
            <form className='flex flex-col gap-5' onSubmit={(e) => submitHandler(e)}>

              <div className='flex flex-col gap-1.5 text-left'>
                <label className='text-[10px] font-black text-brand-charcoal uppercase tracking-widest ml-1'>Username</label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder='Enter username'
                  className="w-full bg-brand-cream border-2 border-brand-charcoal text-brand-charcoal text-sm px-4 py-3.5 rounded-none focus:outline-none focus:border-brand-red transition-all duration-200 placeholder-brand-charcoal/40 font-bold"
                />
              </div>

              <div className='flex flex-col gap-1.5 text-left'>
                <label className='text-[10px] font-black text-brand-charcoal uppercase tracking-widest ml-1'>Email Address</label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder='name@example.com'
                  className="w-full bg-brand-cream border-2 border-brand-charcoal text-brand-charcoal text-sm px-4 py-3.5 rounded-none focus:outline-none focus:border-brand-red transition-all duration-200 placeholder-brand-charcoal/40 font-bold"
                />
              </div>

              <div className='flex flex-col gap-1.5 text-left'>
                <label className='text-[10px] font-black text-brand-charcoal uppercase tracking-widest ml-1'>Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder='Create a password'
                  className="w-full bg-brand-cream border-2 border-brand-charcoal text-brand-charcoal text-sm px-4 py-3.5 rounded-none focus:outline-none focus:border-brand-red transition-all duration-200 placeholder-brand-charcoal/40 font-bold"
                />
              </div>

              {error && (
                <p className='text-brand-red text-xs font-black tracking-wider border-2 border-brand-red bg-brand-red/5 py-2 px-3 rounded-none text-center uppercase'>{error}</p>
              )}

              <button className='w-full mt-2 bg-brand-red text-brand-white border-2 border-brand-charcoal py-4 rounded-none font-black tracking-widest uppercase hover:bg-brand-charcoal hover:text-brand-cream transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'>
                Register Now
              </button>

            </form>

            <p className='mt-8 text-xs tracking-wider font-black text-center text-brand-charcoal/70 uppercase'>
              Already have an account?{' '}
              <span className="text-brand-red hover:underline transition-all duration-200 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register
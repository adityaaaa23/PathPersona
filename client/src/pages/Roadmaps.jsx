import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Roadmaps = () => {

  const navigate = useNavigate();
  const { user, logout, fetchUser } = useAuth();
  const [roadmaps, setRoadmaps] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [generating, setGenerating] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await API.get('api/roadmap/view');
        setRoadmaps(response.data.roadmaps);
        setLoading(false);
      } catch (err) {
        console.log("Failed to fetch roadmaps", err);
      }
    }
    fetchRoadmaps();
  }, [generating])

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await API.get("/api/roadmap/recommendations");
        setRecommendations(response.data.recommendations);
      } catch (err) {
        console.log("Failed to fetch recommendations", err);
      } finally {
        setLoadingRecommendations(false);
      }
    }
    fetchRecommendations();
  }, [])

  const logOut = () => {
    logout();
    navigate('/login');
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/roadmap/${id}`);
      setRoadmaps(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.log("Failed to delete roadmap", err);
    }
  }

  const generateRecommendation = async (skill) => {
    try {
      await API.post(`/api/roadmap/recommendations/${skill}`);
      navigate("/roadmaps");
    } catch (err) {
      console.log("Failed to generate the recommended roadmap", err);
    }
    setGenerating(null);
  }

  if (loading) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide text-brand-red'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-8 h-8 bg-brand-red animate-spin' />
        <p className='text-xs font-black uppercase tracking-widest'>Loading your roadmaps...</p>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen w-full flex flex-col px-4 py-6 md:px-8 font-sans pt-28 pb-16 bg-brand-cream'>

      <div className='w-full max-w-5xl mx-auto flex flex-col gap-6 bg-brand-white p-6 md:p-8 border-2 border-brand-charcoal shadow-2xl swiss-shadow rounded-none'>

        {/* ── Your Roadmaps Header ── */}
        <div className='flex justify-between items-center border-b-2 border-brand-red pb-4'>
          <p className='text-xs font-black tracking-widest px-4 py-2 bg-brand-red text-brand-white border-2 border-brand-charcoal uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'>
            Your Roadmaps
          </p>
          <button
            className='text-xs font-black tracking-widest uppercase px-4 py-2 bg-brand-cream text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-white border-2 border-brand-charcoal rounded-none transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
            onClick={() => navigate('/generate')}
          >
            + New Roadmap
          </button>
        </div>

        {/* Roadmap cards */}
        <div className='flex flex-col gap-5 md:flex-row md:flex-wrap text-left'>
          {roadmaps.length === 0 ? (
            <div className='w-full py-8 text-center border-2 border-dashed border-brand-red bg-brand-cream rounded-none'>
              <p className='text-xs font-black uppercase tracking-wider text-brand-charcoal/70'>No study roadmaps created yet. Click above to generate your first path!</p>
            </div>
          ) : (
            roadmaps.map((roadmap) => {
              const completedDays = roadmap.roadmap?.filter(d => d.completed).length ?? 0;
              const totalDays = roadmap.roadmap?.length ?? 28;
              const progress = Math.round((completedDays / totalDays) * 100);

              return (
                <div
                  key={roadmap._id}
                  className='w-full md:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)] rounded-none bg-brand-white border-2 border-brand-charcoal hover:border-brand-red hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(21,21,21,1)]'
                >
                  {/* Card top — skill + personality */}
                  <div className='flex justify-between items-center px-4 py-3.5 border-b-2 border-brand-charcoal bg-brand-cream/60'>
                    <div>
                      <p className='text-sm font-black uppercase tracking-wide text-brand-charcoal mb-1 truncate max-w-[130px]'>{roadmap.skill}</p>
                      <span className='text-[9px] font-black uppercase tracking-widest text-brand-white bg-brand-red border border-brand-charcoal px-2.5 py-0.5 rounded-none'>{roadmap.personalityType}</span>
                    </div>
                    {/* Initials avatar */}
                    <div className='flex items-center justify-center w-9 h-9 text-xs font-black font-mono text-brand-charcoal bg-brand-cream border-2 border-brand-charcoal rounded-none shadow-[1px_1px_0px_0px_rgba(21,21,21,1)]'>
                      {roadmap.skill.slice(0, 2).toUpperCase()}
                    </div>
                  </div>

                  {/* Progress bar */}
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

                  {/* Actions */}
                  <div className='flex gap-2.5 px-4 py-3 bg-brand-cream/40'>
                    <button
                      className='flex-1 py-2 bg-brand-red text-brand-white border-2 border-brand-charcoal rounded-none text-xs font-black tracking-widest uppercase hover:bg-brand-charcoal hover:border-brand-charcoal hover:text-brand-cream transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                      onClick={() => navigate(`/roadmap/${roadmap._id}`)}
                    >
                      View
                    </button>
                    <button
                      className='px-4 py-2 bg-brand-cream text-brand-red border-2 border-brand-charcoal hover:bg-brand-red hover:text-brand-white rounded-none text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer'
                      onClick={() => handleDelete(roadmap._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Divider */}
        <div className='w-full h-0.5 bg-brand-charcoal my-3' />

        {/* ── Action Buttons ── */}
        <div className='flex flex-wrap gap-4 px-2 text-left'>
          <button
            className='text-[10px] font-black tracking-widest uppercase bg-brand-cream text-brand-charcoal border-2 border-brand-charcoal px-4 py-3 rounded-none hover:bg-brand-charcoal hover:text-brand-cream transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'
            onClick={() => navigate('/quiz')}
          >
            Retake Profile Quiz
          </button>
          <button
            className='text-[10px] font-black tracking-widest uppercase bg-brand-red text-brand-white border-2 border-brand-charcoal px-4 py-3 rounded-none hover:bg-brand-charcoal hover:border-brand-charcoal transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'
            onClick={() => navigate('/generate')}
          >
            + New Roadmap
          </button>
        </div>

        {/* Divider */}
        <div className='w-full h-0.5 bg-brand-charcoal my-3' />

        {/* ── Recommended For You ── */}
        <div className='flex justify-between items-center pb-2'>
          <p className='text-xs font-black tracking-widest px-4 py-2 bg-brand-red text-brand-white border-2 border-brand-charcoal uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'>
            Recommended For You
          </p>
        </div>

        <div className='flex flex-col gap-5 pb-6 md:flex-row md:flex-wrap text-left'>
          {loadingRecommendations ? (
            <p className='text-xs font-black uppercase tracking-wider text-brand-charcoal/70 italic'>Loading recommendations...</p>
          ) : (
            recommendations.map((elem, index) => (
              <div
                key={index}
                className='flex flex-col w-full md:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)] rounded-none bg-brand-white border-2 border-brand-charcoal hover:border-brand-red hover:-translate-y-0.5 transition-all duration-200 justify-between shadow-[3px_3px_0px_0px_rgba(21,21,21,1)]'
              >
                {/* Card top — skill name + avatar */}
                <div className='flex justify-between items-center px-4 py-3.5 border-b-2 border-brand-charcoal bg-brand-cream/60'>
                  <div>
                    <p className='text-sm font-black uppercase tracking-wide text-brand-charcoal mb-1 truncate max-w-[130px]'>{elem.skill}</p>
                    <span className='text-[9px] font-black uppercase tracking-widest text-brand-white bg-brand-red border border-brand-charcoal px-2.5 py-0.5 rounded-none'>Suggested</span>
                  </div>
                  <div className='flex items-center justify-center w-9 h-9 text-xs font-black font-mono text-brand-charcoal bg-brand-cream border-2 border-brand-charcoal rounded-none shadow-[1px_1px_0px_0px_rgba(21,21,21,1)]'>
                    {elem.skill.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                {/* What it does */}
                <div className='px-4 py-3 border-b-2 border-brand-charcoal bg-brand-cream/10 text-left'>
                  <p className='text-[9px] font-black uppercase tracking-widest text-brand-red mb-1'>Description</p>
                  <p className='text-xs text-brand-charcoal/80 leading-relaxed font-bold uppercase tracking-wider truncate-3-lines'>{elem.whatItDoes}</p>
                </div>

                {/* Why learn */}
                <div className='px-4 py-3 border-b-2 border-brand-charcoal bg-brand-cream/10 text-left'>
                  <p className='text-[9px] font-black uppercase tracking-widest text-brand-red mb-1'>Why Learn It</p>
                  <p className='text-xs text-brand-charcoal/80 leading-relaxed font-bold uppercase tracking-wider truncate-3-lines'>{elem.whyLearn}</p>
                </div>

                {/* Generate button */}
                <div className='px-4 py-3 bg-brand-cream/40'>
                  <button
                    className='w-full py-2.5 bg-brand-red text-brand-white border-2 border-brand-charcoal rounded-none text-[10px] font-black tracking-widest uppercase hover:bg-brand-charcoal hover:border-brand-charcoal transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'
                    disabled={generating}
                    onClick={() => { setGenerating(elem.skill); generateRecommendation(elem.skill); }}
                  >
                    {generating === elem.skill ? 'Compiling AI Roadmap...' : 'Generate Roadmap'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Roadmaps

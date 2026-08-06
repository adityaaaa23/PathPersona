import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Roadmap = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await API.get(`/api/roadmap/${id}`);
        setRoadmap(response.data.roadmap);
      } catch (err) {
        console.log("Failed to fetch that particular roadmap", err);
      }
      setLoading(false);
    }
    fetchRoadmap();
  }, [])

  async function taskCompleted(dayIndex, subtaskIndex, completed) {
    try {
      const response = await API.patch(`/api/roadmap/progress/${id}`, { dayIndex, subtaskIndex, completed });
      setRoadmap(response.data.roadmap);
    } catch (err) {
      console.log("Failed to fetch the roadmap", err);
    }
  }

  if (loading) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide text-brand-red'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-8 h-8 bg-brand-red animate-spin' />
        <p className='text-xs font-black uppercase tracking-widest'>Loading roadmap...</p>
      </div>
    </div>
  )

  const completedDays = roadmap.roadmap?.filter(d => d.completed).length ?? 0;
  const totalDays = roadmap.roadmap?.length ?? 0;
  const progress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  return (
    <div className='min-h-screen w-full flex flex-col px-4 py-6 md:px-8 font-sans pt-28 pb-16 bg-brand-cream'>

      {/* Main Container constrained */}
      <div className='w-full max-w-3xl mx-auto flex flex-col gap-6'>

        {/* ── Header ── */}
        <div className='flex flex-col gap-4 border-b-2 border-brand-red pb-5 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-1 text-left'>
            <p className='text-xs font-black tracking-widest uppercase text-brand-red'>Your Roadmap</p>
            <h1 className='text-3xl font-black tracking-wide text-brand-charcoal uppercase capitalize'>{roadmap.skill}</h1>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-[10px] font-black tracking-widest px-3.5 py-1.5 bg-brand-red text-brand-white border-2 border-brand-charcoal rounded-none uppercase shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'>
              {roadmap.personalityType} Style
            </span>
            <button
              className='text-[10px] font-black tracking-widest uppercase px-4 py-2 bg-brand-cream text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream border-2 border-brand-charcoal rounded-none transition-all duration-200 cursor-pointer'
              onClick={() => navigate(`/roadmap/${id}/quiz`)}
            >
              Take Quiz →
            </button>
          </div>
        </div>

        {/* ── Overall Progress ── */}
        <div className='rounded-none bg-brand-white border-2 border-brand-charcoal shadow-lg swiss-shadow-red'>
          <div className='flex justify-between items-center px-5 py-3.5 border-b-2 border-brand-charcoal bg-brand-cream/60'>
            <span className='text-[10px] font-black tracking-wider uppercase text-brand-charcoal/70'>Overall Progress</span>
            <span className='text-[10px] font-black tracking-wider uppercase text-brand-red font-mono'>{completedDays}/{totalDays} Days Completed · {progress}%</span>
          </div>
          <div className='px-5 py-5 bg-brand-white'>
            <div className='h-3 rounded-none overflow-hidden bg-brand-cream border border-brand-charcoal'>
              <div
                className='h-full rounded-none bg-brand-red transition-all duration-500 shadow-inner'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Section header ── */}
        <div className='flex items-center mt-2'>
          <p className='text-[10px] font-black tracking-widest px-4 py-2 bg-brand-red text-brand-white border-2 border-brand-charcoal uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(21,21,21,1)]'>
            Learning Path
          </p>
        </div>

        {/* ── Day cards ── */}
        <div className='flex flex-col gap-4 pb-6'>
          {roadmap.roadmap.map((elem) => {
            const completedSubtasks = elem.subtasks.filter(t => t.completed).length;
            const totalSubtasks = elem.subtasks.length;

            return (
              <div
                key={elem._id}
                className={`rounded-none border-2 border-brand-charcoal transition-all duration-200 shadow-sm shadow-[2px_2px_0px_0px_rgba(21,21,21,1)] ${elem.completed ? 'bg-emerald-500/[0.03]' : 'bg-brand-white'}`}
              >
                {/* Day header */}
                <div className='flex items-center gap-3 px-5 py-4 border-b-2 border-brand-charcoal bg-brand-cream/40'>
                  <div className='flex-1 flex items-center gap-2.5 text-left'>
                    <span className='text-brand-white text-[9px] font-black uppercase tracking-widest bg-brand-red px-2.5 py-0.5 border border-brand-charcoal rounded-none'>
                      Day {elem.day}
                    </span>
                    <span className='text-brand-charcoal/40'>·</span>
                    <span className={`text-sm font-black tracking-wide uppercase leading-snug ${elem.completed ? 'line-through text-brand-charcoal/40' : 'text-brand-charcoal'}`}>
                      {elem.topic}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 flex-shrink-0'>
                    <span className='text-[10px] font-black tracking-wider text-brand-charcoal/60 bg-brand-cream border border-brand-charcoal px-2 py-0.5 rounded-none font-mono'>{completedSubtasks}/{totalSubtasks}</span>
                    <input
                      type='checkbox'
                      checked={elem.completed}
                      readOnly
                      className='w-4 h-4 accent-emerald-600 cursor-pointer pointer-events-none border-2 border-brand-charcoal rounded-none'
                    />
                  </div>
                </div>

                {/* Subtasks */}
                <div className='px-6 py-4 flex flex-col gap-3 bg-brand-white text-left'>
                  {elem.subtasks.map((task, index) => (
                    <div key={task._id} className='flex items-start justify-between gap-4 py-1 border-b border-brand-gray last:border-0 pb-2 last:pb-0'>
                      <span className={`text-xs md:text-sm leading-relaxed flex-1 uppercase tracking-wide font-bold ${task.completed ? 'line-through text-brand-charcoal/40 font-normal' : 'text-brand-charcoal/80'}`}>
                        {task.task}
                      </span>
                      <input
                        type='checkbox'
                        checked={task.completed}
                        onChange={(e) => taskCompleted(elem.day - 1, index, e.target.checked)}
                        className='w-4 h-4 mt-0.5 accent-brand-red cursor-pointer flex-shrink-0 border-2 border-brand-charcoal rounded-none'
                      />
                    </div>
                  ))}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Roadmap

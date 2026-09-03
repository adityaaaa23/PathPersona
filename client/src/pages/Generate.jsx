import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Generate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRoadmap = async (e) => {
    e.preventDefault();
    const trimmedSkill = skill.trim();
    if (!trimmedSkill) {
      setError("Please enter a skill or topic first");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await API.post("/api/roadmap/generate", {
        skill: trimmedSkill,
      });
      navigate("/dashboard");
    } catch (err) {
      console.log("Failed to generate roadmap", err);
      setError(err.response?.data?.message || "Failed to generate roadmap");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[85vh] w-full flex justify-center items-center px-4 py-8 pt-28 pb-16 bg-brand-cream font-sans">
      <div className="w-full max-w-xl rounded-none bg-brand-white border-2 border-brand-charcoal shadow-2xl p-6 sm:p-10 flex flex-col gap-6 swiss-shadow">
        <div className="text-center md:text-left">
          <p className="text-xs font-black tracking-widest uppercase text-brand-red mb-1.5">
            AI-Powered Roadmap
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal uppercase tracking-wider mb-3">
            What do you want to learn?
          </h1>
          <p className="text-xs md:text-sm text-brand-charcoal/80 leading-relaxed font-bold uppercase tracking-wider">
            Enter any topic or technical skill. AuraLearn will dynamically query
            the AI and compile a day-by-day learning structure tuned exactly to
            your{" "}
            <span className="text-brand-red font-black underline decoration-2">
              {user?.personalityType || "personality"}
            </span>{" "}
            profile.
          </p>
        </div>

        <form
          className="flex flex-col gap-5 mt-2"
          onSubmit={(e) => generateRoadmap(e)}
        >
          <div className="flex flex-col gap-2 text-left">
            <label className="text-[10px] font-black text-brand-charcoal uppercase tracking-widest ml-1">
              Skill / Topic Name
            </label>
            <input
              type="text"
              placeholder="e.g. Python Programming, UI Design, Public Speaking"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full bg-brand-cream border-2 border-brand-charcoal text-brand-charcoal text-sm px-4 py-3.5 rounded-none focus:outline-none focus:border-brand-red transition-all duration-200 placeholder-brand-charcoal/40 font-bold"
            />
          </div>

          {error && (
            <p className="text-brand-red text-xs font-black tracking-wider border-2 border-brand-red bg-brand-red/5 py-2 px-3 rounded-none text-center uppercase">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="mt-2 w-full bg-brand-red text-brand-white border-2 border-brand-charcoal py-4 rounded-none font-black tracking-widest uppercase hover:bg-brand-charcoal hover:text-brand-cream transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(21,21,21,1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Compiling AI Roadmap..." : "Generate Journey"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Generate;

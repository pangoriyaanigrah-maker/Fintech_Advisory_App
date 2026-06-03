'use client';

import { useState } from 'react';
import { Building, Compass, Landmark, Sparkles, X } from 'lucide-react';
import type { GoalId } from '@/types';
import { goalsDictionary } from '@/lib/data/goals';

const goalCards: {
  id: GoalId;
  alt: string;
  src: string;
  subtitle: string;
  progress: number;
}[] = [
  {
    id: 'home',
    alt: 'Home Sanctuary',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVmPD1vTDkqugT7SBBojdLdzNldKXK134CsB0GtdklJRKVOPTYP8sIpPW_4mAsB1lHZQeErvkiKlbFayeF04K0HT16SlhlXiHHxWdSoXLVgJcW53nMYlCsjosDy2LIE9N1OI3ZKgQmGyPUffG6j6q0AV0ZJyPLEYssDytEX_eWbGcXiF63l9h_LN393SCO2uipPIJL1uU6oRZiSJgiW5sSOSdZXn9-jg-j2iOVSBtaBMlNflga_QTeIMpVzFJRyAZr63EAtxxft4Ay',
    subtitle: 'Invest in your personal physical sanctuary with highly customized smart direct mortgage paths.',
    progress: 65,
  },
  {
    id: 'academy',
    alt: 'Future Academy',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK93lFQmOS5rcLfhF9D-_xO7-VIhkuRTgCuGCSvz7NE_bn0BWyGwPYjOdiHFcYoi7t3vVqwZjlG4Evmli2f5XuThhC5d3yOsFUe4r5g5mC6II6b5KEbOhXlTdgMrD20fK0rfCMgXeAsq6y7qktLEE_RZLkeBoqgYCYRMalXzyxaGqiQu6puysKM9vIUYNA9zq5Z64pngwXogriNP77ctoTYdw-CnCCE6HZvbYzJmr6VZhvTQMxrEgyDzA5JhyfP8AJMUJERRcoNjVv',
    subtitle: 'Secure an inflation-proof direct educational resource fund to fulfill global learning goals.',
    progress: 40,
  },
  {
    id: 'freedom',
    alt: 'Financial Freedom',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOwrCH2rq7KfIxyK3RJSJpOH3x0t3qx94mHDd5yCYak6kIq242XEzFhMz_q46IqyTLyZCv3XxRNE51wr2wvMhgkrV-I_7gxIZjAFjzw7ftRalQMcuWlUtR7BFTLJz1IKCJlCSj9Odc7_Y8cHyybSThTht7tHV5wPnbqwU-ttVOuJjBYm0xVfsYVNxT9z-IHEXm2Ms48uZkotA7OSPTZ64djrwO2tdc8dvzrPyiIrwkAEWdkN-HBoMG5J-QtxmyZoNbFFoET5R_JIpl',
    subtitle: 'Retire entirely on your absolute terms with a high-capacity resilient pension corpus.',
    progress: 22,
  },
];

const goalTitles: Record<GoalId, string> = {
  home: 'Home Ownership Sanctuary',
  academy: 'Future Global Academy',
  freedom: 'Ultimate Financial Freedom',
};

const iconMap: Record<string, React.ReactNode> = {
  building: <Building className="w-10 h-10 text-primary" />,
  landmark: <Landmark className="w-10 h-10 text-primary" />,
  compass: <Compass className="w-10 h-10 text-primary" />,
};

export default function Goals() {
  const [activeGoal, setActiveGoal] = useState<GoalId | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(65);
  const [dynamicSaved, setDynamicSaved] = useState('');

  function openGoalModal(id: GoalId) {
    const data = goalsDictionary[id];
    setActiveGoal(id);
    setSliderValue(data.progress);
    setDynamicSaved(data.saved);
    setIsModalOpen(true);
  }

  function closeGoalModal() {
    setIsModalOpen(false);
  }

  function updateGoalSliderValue(val: number) {
    setSliderValue(val);
    if (!activeGoal) return;
    const targetNum =
      activeGoal === 'home' ? 1.5 : activeGoal === 'academy' ? 0.75 : 4.2;
    const unit = activeGoal === 'academy' ? 'Lakhs' : 'Crores';
    const recalculated = (targetNum * (val / 100)).toFixed(2);
    setDynamicSaved(`₹${recalculated} ${unit}`);
  }

  function applyGoalOptimization() {
    alert(
      `Optimization coefficient locked at ${sliderValue}% path convergence factor. Strategies updated inside primary cache database!`
    );
    closeGoalModal();
  }

  const modalData = activeGoal ? goalsDictionary[activeGoal] : null;

  return (
    <section className="py-16 md:py-24 bg-surface grain-texture" id="goals">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div className="space-y-2 text-left">
            <span className="font-sans text-xs font-bold text-tertiary uppercase tracking-widest block">
              MILESTONE PLANNING
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold">
              Architect Your Sanctuary Goals
            </h2>
          </div>
          <button
            onClick={() =>
              alert(
                'Click on any card below to launch interactive optimization metrics and progress sliders.'
              )
            }
            className="font-sans text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-all"
          >
            How modeling tools work
          </button>
        </div>

        {/* Goal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {goalCards.map((card) => (
            <div
              key={card.id}
              onClick={() => openGoalModal(card.id)}
              className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-xl hover:shadow-[0_20px_50px_rgba(0,53,39,0.15)] transition-all duration-500 cursor-pointer border border-primary/5"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={card.alt}
                src={card.src}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent p-7 flex flex-col justify-end text-left" />
              <div className="absolute bottom-6 left-6 right-6 text-left text-white space-y-3 z-20">
                <h3 className="font-serif text-2xl font-bold tracking-tight">
                  {goalTitles[card.id]}
                </h3>
                <p className="text-white/80 font-sans text-xs line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>
                <div className="space-y-1.5 pt-1.5">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-tertiary-container rounded-full"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-white/90">Path Progress: {card.progress}%</span>
                    <span className="flex items-center gap-1 text-tertiary-container">
                      Optimize Path &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Goal optimization modal */}
      {isModalOpen && modalData && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-surface-lowest rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative border border-primary/5 max-h-[90vh] overflow-y-auto text-left">

            <button
              onClick={closeGoalModal}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-low text-primary transition-colors focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal header */}
            <div className="flex items-center gap-4 border-b border-primary/5 pb-5 mb-6">
              <div className="p-3.5 bg-primary/5 rounded-2xl shrink-0 text-primary">
                {iconMap[modalData.icon]}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-extrabold text-primary">
                  {modalData.title}
                </h3>
                <p className="text-xs text-on-surface/50 italic font-bold">{modalData.engine}</p>
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-surface-low rounded-xl">
                <p className="text-[9px] text-on-surface/50 font-bold uppercase tracking-wider">
                  Target Valuation Milestone
                </p>
                <p className="text-xl font-extrabold text-primary mt-1">{modalData.target}</p>
              </div>
              <div className="p-4 bg-surface-low rounded-xl">
                <p className="text-[9px] text-on-surface/50 font-bold uppercase tracking-wider">
                  Current Saved Balance
                </p>
                <p className="text-xl font-extrabold text-primary mt-1">
                  {dynamicSaved || modalData.saved}
                </p>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <label className="font-sans text-sm font-bold text-primary">
                  Simulation Optimization Coefficient
                </label>
                <span className="font-extrabold text-primary-container text-sm">
                  {sliderValue}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                value={sliderValue}
                onChange={(e) => updateGoalSliderValue(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[9px] text-on-surface/50 font-semibold tracking-wider">
                <span>Stagnant Progress</span>
                <span>Target Achieved</span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-5 bg-[#003527]/5 rounded-2xl border border-primary/10 relative space-y-2 mt-4">
              <p className="text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-tertiary" />
                Aarya Actionable Insight Recommendation
              </p>
              <p className="text-xs text-on-surface/85 leading-relaxed">
                {modalData.recommendation}
              </p>
            </div>

            <div className="pt-6 flex gap-3">
              <button
                onClick={applyGoalOptimization}
                className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container"
              >
                Lock Allocation Path
              </button>
              <button
                onClick={closeGoalModal}
                className="border border-primary/20 hover:bg-surface-low px-5 rounded-xl text-xs font-bold text-primary"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

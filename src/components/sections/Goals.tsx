'use client';

import { useState } from 'react';
import { Building, Compass, Landmark, Sparkles } from 'lucide-react';
import type { GoalId } from '@/types';
import { useActiveModal, useModalPayload, useOpenModal, useCloseModal } from '@/stores/modal-store';
import { useGoal, useSetOptimizationCoefficient, useLockAllocation } from '@/stores/goal-store';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

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
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOwrCH2rq7KfIxyK3RJSJpOH3x0t3qx94mHDd5yCYak6kIq242XEzFhMz_q46IqyTLyZCv3XxRNE51wr2wPmhgkrV-I_7gxIZjAFjzw7ftRalQMcuWlUtR7BFTLJz1IKCJlCSj9Odc7_Y8cHyybSThTht7tHV5wPnbqwU-ttVOuJjBYm0xVfsYVNxT9z-IHEXm2Ms48uZkotA7OSPTZ64djrwO2tdc8dvzrPyiIrwkAEWdkN-HBoMG5J-QtxmyZoNbFFoET5R_JIpl',
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

// Inner modal content — reads goal state from store
function GoalModalContent({ goalId }: { goalId: GoalId }) {
  const goalState = useGoal(goalId);
  const setOptimizationCoefficient = useSetOptimizationCoefficient();
  const lockAllocation = useLockAllocation();
  const closeModal = useCloseModal();
  const [locked, setLocked] = useState(false);

  if (!goalState) return null;

  const { data, optimizationCoefficient, dynamicSaved } = goalState;

  function applyGoalOptimization() {
    lockAllocation(goalId);
    setLocked(true);
    window.setTimeout(closeModal, 1400);
  }

  return (
    <>
      {/* Modal header */}
      <div className="flex items-center gap-4 border-b border-primary/5 pb-5 mb-6">
        <div className="p-3.5 bg-primary/5 rounded-2xl shrink-0 text-primary">
          {iconMap[data.icon]}
        </div>
        <div>
          <h3 className="font-serif text-2xl font-extrabold text-primary">
            {data.title}
          </h3>
          <p className="text-xs text-on-surface/50 italic font-bold">{data.engine}</p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-surface-low rounded-xl">
          <p className="text-[9px] text-on-surface/50 font-bold uppercase tracking-wider">
            Target
          </p>
          <p className="text-xl font-extrabold text-primary mt-1">{data.target}</p>
        </div>
        <div className="p-4 bg-surface-low rounded-xl">
          <p className="text-[9px] text-on-surface/50 font-bold uppercase tracking-wider">
            Saved so far
          </p>
          <p className="text-xl font-extrabold text-primary mt-1">
            {dynamicSaved || data.saved}
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <label className="font-sans text-sm font-bold text-primary">
            Optimization level
          </label>
          <span className="font-extrabold text-primary-container text-sm">
            {optimizationCoefficient}%
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          step="1"
          value={optimizationCoefficient}
          onChange={(e) => setOptimizationCoefficient(goalId, Number(e.target.value))}
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
          Recommendation
        </p>
        <p className="text-xs text-on-surface/85 leading-relaxed">
          {data.recommendation}
        </p>
      </div>

      {locked && (
        <div
          role="status"
          className="mt-4 flex items-center gap-2 text-xs font-bold text-primary bg-primary/5 border border-primary/15 rounded-xl px-4 py-3"
        >
          <Sparkles className="w-4 h-4 text-tertiary shrink-0" />
          Saved at {optimizationCoefficient}% — updating your plan…
        </div>
      )}

      <div className="pt-6 flex gap-3">
        <Button
          onClick={applyGoalOptimization}
          variant="primary"
          fullWidth
          className="py-3.5"
          disabled={locked}
        >
          {locked ? 'Saved' : 'Save plan'}
        </Button>
        <Button
          onClick={closeModal}
          variant="outline"
          className="px-5"
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

export default function Goals({ embedded = false }: { embedded?: boolean }) {
  const activeModal = useActiveModal();
  const payload = useModalPayload();
  const openModal = useOpenModal();
  const closeModal = useCloseModal();

  const isModalOpen = activeModal === 'goal';
  const activeGoalId = isModalOpen ? (payload.goalId as GoalId | undefined) : undefined;

  function openGoalModal(id: GoalId) {
    openModal('goal', { goalId: id });
  }

  const inner = (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <SectionHeading
          eyebrow="Goals"
          title="Plan your goals"
          spacing="sm"
        />
        <p className="font-sans text-xs font-semibold text-on-surface/60 max-w-xs sm:text-right">
          Tap any sanctuary card to open its interactive optimization metrics and progress slider.
        </p>
      </div>

      {/* Goal cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {goalCards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => openGoalModal(card.id)}
            aria-label={`Open ${goalTitles[card.id]} optimization`}
            className="group relative w-full text-left overflow-hidden rounded-[2rem] aspect-[4/5] shadow-xl hover:shadow-[0_20px_50px_rgba(0,53,39,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 transition-all duration-500 cursor-pointer border border-primary/5"
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
                  <span className="text-white/90">Progress: {card.progress}%</span>
                  <span className="flex items-center gap-1 text-tertiary-container">
                    Adjust &rarr;
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Goal optimization modal */}
      <Modal
        isOpen={isModalOpen && activeGoalId !== undefined}
        onClose={closeModal}
        size="lg"
      >
        {activeGoalId !== undefined && (
          <GoalModalContent goalId={activeGoalId} />
        )}
      </Modal>
    </>
  );

  if (embedded) {
    return <div>{inner}</div>;
  }

  return (
    <section className="py-16 md:py-24 bg-surface grain-texture" id="goals">
      <Container>
        {inner}
      </Container>
    </section>
  );
}

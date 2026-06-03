'use client';

import { useState } from 'react';
import { Award, BookOpen, CheckCircle2, Clock, Sparkles, X } from 'lucide-react';
import type { CourseId } from '@/types';
import { courseSyllabusData } from '@/lib/data/courses';

export default function LearningModules() {
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<CourseId | null>(null);

  function openSyllabusModal(id: CourseId) {
    setActiveCourse(id);
  }

  function closeSyllabusModal() {
    setActiveCourse(null);
  }

  const courseData = activeCourse ? courseSyllabusData[activeCourse] : null;

  return (
    <section className="py-16 md:py-24 bg-surface-highest grain-texture" id="academy_books">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="mb-12 text-left space-y-2">
          <span className="text-xs font-bold text-tertiary uppercase tracking-widest block">
            FINANCIAL ACADEMIA
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold leading-tight">
            Objective Learning Modules
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Featured article card */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row h-full border border-primary/5">

              <div className="md:w-1/2 relative overflow-hidden h-[240px] md:h-auto min-h-[220px]">
                <img
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Leather bound journal"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnxhG2EkX0fHl_UwzVqZc1bt88uiK3IlZ0ua5RK8Ha11hQOINWnWMsGE2cPLO0QvGmvaBCaX62_wxa3T3KiZ65mWntez3Goh7DvQ_gnq1UrPM7jLwYh5sBZMvw0ieQAS-l0ua7R-CfMey4wr8AmXxDrs12aIaidknAoV0vPh5CZjc3hgG6SBPNBve5F4Or4scyqc6VEZtEVOaj2NECMM-wLrrGYy47MHhoQK6SVx6arP2giZn2xOczw6aofZhXEoxXY8ewUevcMFIc"
                />
              </div>

              <div className="md:w-1/2 p-8 flex flex-col justify-center text-left">
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-2">
                  Featured Article
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary leading-tight mb-4">
                  Investing as Self-Care: The New Paradigm
                </h3>
                <p className="font-sans text-xs text-on-surface/70 leading-relaxed mb-6">
                  Discover why financial independence is the ultimate active self-care practice for
                  the modern Indian woman. High yield accounts are the new zen.
                </p>
                <button
                  onClick={() => setArticleModalOpen(true)}
                  className="text-primary font-sans text-xs font-bold flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer focus:outline-none"
                >
                  Read Full Article &rarr;
                </button>
              </div>

            </div>
          </div>

          {/* Course cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4 text-left">

            <div
              onClick={() => openSyllabusModal('mutual')}
              className="p-6 bg-surface-lowest rounded-3xl border border-primary/5 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-start gap-5"
            >
              <div className="p-3.5 bg-primary/5 rounded-2xl shrink-0 text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-primary">Mutual Funds 101</h4>
                <p className="text-xs text-on-surface/50 font-bold uppercase tracking-wider">
                  6 Modules &bull; 45 Mins
                </p>
                <p className="text-xs text-on-surface/70 leading-relaxed pt-2">
                  Demystifying compounding, direct fees, and tax shields in Indian markets.
                </p>
              </div>
            </div>

            <div
              onClick={() => openSyllabusModal('estate')}
              className="p-6 bg-surface-lowest rounded-3xl border border-primary/5 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-start gap-5"
            >
              <div className="p-3.5 bg-primary/5 rounded-2xl shrink-0 text-primary">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-primary">
                  Estate Planning Masterclass
                </h4>
                <p className="text-xs text-on-surface/50 font-bold uppercase tracking-wider">
                  4 Modules &bull; 30 Mins
                </p>
                <p className="text-xs text-on-surface/70 leading-relaxed pt-2">
                  Safeguarding legacy assets, nominations, and writing airtight legal Wills.
                </p>
              </div>
            </div>

            <div
              onClick={() => openSyllabusModal('insurance')}
              className="p-6 bg-surface-lowest rounded-3xl border border-primary/5 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-start gap-5"
            >
              <div className="p-3.5 bg-primary/5 rounded-2xl shrink-0 text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-primary">Insurance Mastery</h4>
                <p className="text-xs text-on-surface/50 font-bold uppercase tracking-wider">
                  5 Modules &bull; 1 Hour
                </p>
                <p className="text-xs text-on-surface/70 leading-relaxed pt-2">
                  Differentiating term vs endowments and evaluating safe co-payment limits.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Article modal */}
      {articleModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-surface-lowest rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative border border-primary/5 max-h-[90vh] overflow-y-auto text-left">

            <button
              onClick={() => setArticleModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-low text-primary transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest block mb-1">
              Wellness Hub Editorials
            </span>
            <h3 className="font-serif text-3xl font-extrabold text-primary leading-tight mb-4">
              Investing as Self-Care: The New Paradigm
            </h3>

            <div className="space-y-4 text-xs font-sans text-on-surface/80 leading-relaxed mt-4 border-t border-primary/5 pt-4">
              <p>
                For generations, the cultural script around self-care for Indian women has been
                dominated by superficial practices—unnecessary retail splurges or expensive weekend
                spa getaways. While these provide brief immediate dopamine rushes, they rarely
                deliver long-term peace of mind.
              </p>
              <p>
                Here is the truth: Wellness is not just spiritual hygiene or physical pampering;{' '}
                <strong>wellness is financial agency</strong>. The ultimate act of continuous
                self-care is moving structural assets into direct, high-capacity compounding
                instruments that buy you future time, decision buffers, and absolute independence.
              </p>
              <p className="italic text-primary border-l-4 border-tertiary-container/60 pl-3">
                &ldquo;When you automate a direct SIP index fund, you do not just acquire mutual share
                units; you buy the agency to say &lsquo;No&rsquo; to compromised conditions, bad workplace
                scripts, or outdated cultural compromises.&rdquo;
              </p>
              <p>Our recommendation heuristics are built around these parameters:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Direct Equity Indexing:</strong> For asset security and compound safety
                  margins.
                </li>
                <li>
                  <strong>Tax Shield Minimization:</strong> Utilizing ELSS to safeguard dynamic
                  income flows legally.
                </li>
                <li>
                  <strong>Zero Agency Drag:</strong> Choosing direct mutual funds over regular ones
                  to eliminate silent fees.
                </li>
              </ul>
              <p>
                True peace of mind is taking deliberate power over your compounding metrics. Start
                treating your investment portfolio not as a dry ledger, but as the primary sanctuary
                layout of your ultimate lifestyle.
              </p>
            </div>

            <div className="pt-6 border-t border-primary/5 mt-6 flex justify-end">
              <button
                onClick={() => setArticleModalOpen(false)}
                className="bg-primary text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container"
              >
                Acknowledge &amp; Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Syllabus modal */}
      {activeCourse && courseData && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-surface-lowest rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-primary/5 text-left">

            <button
              onClick={closeSyllabusModal}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-low text-primary transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[9px] font-bold text-tertiary uppercase tracking-widest block mb-1">
              Knowledge Course Curriculum
            </span>
            <h3 className="font-serif text-2xl font-black text-primary leading-tight mb-2">
              {courseData.title}
            </h3>
            <p className="text-xs text-on-surface/50 font-bold uppercase tracking-wider mb-4">
              {courseData.duration}
            </p>

            <div className="border-t border-primary/5 pt-4 space-y-3">
              {courseData.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 py-1">
                  <div className="p-1 bg-[#003527]/5 rounded-lg text-primary shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-on-surface/85 leading-relaxed pt-0.5">{item}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-primary/5 mt-6 flex justify-end">
              <button
                onClick={closeSyllabusModal}
                className="bg-primary text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Got It
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

'use client';

import { useState } from 'react';
import { ArrowUpRight, Award, Bell, Sparkles } from 'lucide-react';
import type { AdvisorTab } from '@/types';
import { advisorScenarios } from '@/lib/data/advisor';

export default function Advisor() {
  const [activeTab, setActiveTab] = useState<AdvisorTab>('surplus');
  const [quoteVisible, setQuoteVisible] = useState(true);

  const data = advisorScenarios[activeTab];

  function switchTab(tab: AdvisorTab) {
    if (tab === activeTab) return;
    setQuoteVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setQuoteVisible(true);
    }, 100);
  }

  const tabs: { id: AdvisorTab; label: string }[] = [
    { id: 'surplus', label: 'Investment Surplus' },
    { id: 'tax', label: 'Tax Saving (80C)' },
    { id: 'subs', label: 'Silent Subscriptions' },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-low overflow-hidden grain-texture" id="advisor">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Column A: Circular advisor image */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative aspect-square w-full max-w-[390px] md:max-w-[420px] transition-transform duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 rounded-full border-[10px] border-primary/5 -m-4 animate-pulse" />
              <div className="absolute inset-x-0 bottom-0 top-0 rounded-full border border-primary/15 bg-gradient-to-tr from-primary/10 via-transparent to-tertiary/15 -m-2" />

              <img
                alt="Aarya AI Advisor Representation"
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/60"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL2xRg9DVcg1F67i3qXUtJvsSlv01UBYpDBJejTDK99rImMMG7baPZjAtCdUkvRLkUVXuUGciQihjBI-vftn9PheA8ADFWE6jNly_yaqYc8isLjPfcJURVCLKlpUU6qzUOQUKoJbzaMT4G81ZZlNmbKpT89wA-czSPp91whpD9kdqf-Xi6L8o_zaNfy0_YhSy8YTEtUeqq0-BsAv5c8RfCzKDiVNXlxNVtKWnzHLNJmSRQaXIvoIDVafm_0GmHlDRRyYekIfpkm08g"
              />

              <div className="absolute bottom-1 -left-1 bg-primary text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-tertiary-container animate-spin" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest">
                  Active Analysis
                </span>
              </div>
            </div>
          </div>

          {/* Column B: Tabs + content */}
          <div className="lg:col-span-7 space-y-7 text-left order-1 lg:order-2">
            <div className="space-y-3">
              <span className="font-sans text-xs font-bold text-tertiary uppercase tracking-widest block">
                AI Companion
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight font-bold">
                Your Strategic Advisor Focus
              </h2>
              <p className="font-sans text-on-surface/70 text-base leading-relaxed">
                Aarya processes local trends and investment parameters in clear warmth, shifting your
                strategic capital layout toward modern efficiency.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-primary/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className={`py-3 px-4 text-xs font-bold uppercase tracking-wider relative cursor-pointer focus:outline-none transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-on-surface/60 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quote box */}
            <div className="p-6 bg-surface-lowest rounded-3xl shadow-sm border border-primary/5 relative space-y-4">
              <div className="absolute top-4 right-4 text-tertiary-container/40">
                <Sparkles className="w-8 h-8" />
              </div>

              <p
                className={`font-sans text-lg italic text-primary leading-relaxed transition-opacity duration-200 ${
                  quoteVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                &ldquo;{data.quote}&rdquo;
              </p>

              <div className="flex items-center gap-2.5 text-xs font-semibold text-on-surface/80 border-t border-primary/5 pt-4">
                <ArrowUpRight className="w-4 h-4 text-primary shrink-0" />
                <span>{data.projection}</span>
              </div>
            </div>

            {/* Alert cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-surface-lowest rounded-2xl shadow-sm border border-primary/5 flex items-start gap-3.5 hover:scale-[1.01] transition-transform duration-200">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-primary">Priority Alert</h4>
                  <p className="text-xs text-on-surface/70 mt-1.5 leading-relaxed">{data.alert1}</p>
                </div>
              </div>

              <div className="p-5 bg-surface-lowest rounded-2xl shadow-sm border border-primary/5 flex items-start gap-3.5 hover:scale-[1.01] transition-transform duration-200">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-primary">Wellness Booster</h4>
                  <p className="text-xs text-on-surface/70 mt-1.5 leading-relaxed">{data.alert2}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

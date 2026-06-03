'use client';

import { useState } from 'react';
import { Menu, Sparkles, X } from 'lucide-react';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';

const navLinks = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#advisor', label: 'Companion' },
  { href: '#portfolio_demo', label: 'Sandbox' },
  { href: '#goals', label: 'Milestones' },
  { href: '#wellness', label: 'Aura Chat' },
  { href: '#academy', label: 'SIP & Learn' },
];

export default function Navbar() {
  const { isScrolled } = useNavbarScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <header
      className={`sticky top-0 w-full z-40 transition-all duration-300 border-b backdrop-blur-md ${
        isScrolled
          ? 'shadow-md border-primary/5 bg-surface/95'
          : 'border-transparent bg-surface/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#portfolio" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/15">
            <Sparkles className="w-4 h-4 text-tertiary-container" />
          </div>
          <span className="font-serif text-2xl font-black text-primary tracking-tight">Aarya</span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-[#003527]/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#wellness"
            className="text-xs bg-primary text-white border border-[#064e3b] px-5 py-2.5 rounded-lg font-bold uppercase tracking-wider hover:bg-primary-container transition-all active:scale-[0.98]"
          >
            Open Chat
          </a>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden p-2 text-primary focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle Mobile Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed top-20 left-0 w-full bg-surface-low border-b border-primary/5 shadow-xl flex flex-col p-6 space-y-4 z-40 transition-all duration-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={toggleMobileMenu}
              className="text-sm font-bold uppercase tracking-wider text-primary py-2 border-b border-primary/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#wellness"
            onClick={toggleMobileMenu}
            className="w-full text-center bg-primary text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider"
          >
            Start Aura Concierge
          </a>
        </div>
      )}
    </header>
  );
}

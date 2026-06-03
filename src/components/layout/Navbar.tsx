'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sparkles, X } from 'lucide-react';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';
import { useIsMobileMenuOpen, useToggleMobileMenu, useCloseMobileMenu } from '@/stores/ui-store';
import { Container } from '@/components/layout/container';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

const navLinks = [
  { href: '/#portfolio',  label: 'Portfolio' },
  { href: '/#advisor',    label: 'Advisor' },
  { href: '/#features',   label: 'Features' },
  { href: '/dashboard',   label: 'Dashboard' },
  { href: '/assistant',   label: 'Aura Chat' },
];

export default function Navbar() {
  const { isScrolled } = useNavbarScroll();
  const isMobileMenuOpen = useIsMobileMenuOpen();
  const toggleMobileMenu = useToggleMobileMenu();
  const closeMobileMenu = useCloseMobileMenu();
  const pathname = usePathname();

  function isLinkActive(href: string) {
    if (href.startsWith('/#')) {
      return pathname === '/';
    }
    return pathname === href;
  }

  return (
    <header
      className={`sticky top-0 w-full z-40 transition-all duration-300 border-b backdrop-blur-md ${
        isScrolled
          ? 'shadow-md border-primary/5 bg-surface/95'
          : 'border-transparent bg-surface/80'
      }`}
    >
      <Container className="h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/#portfolio" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/15">
            <Sparkles className="w-4 h-4 text-tertiary-container" />
          </div>
          <span className="font-serif text-2xl font-black text-primary tracking-tight">Aarya</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-xs font-bold uppercase tracking-widest transition-colors',
                isLinkActive(link.href)
                  ? 'text-primary'
                  : 'text-[#003527]/70 hover:text-primary'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/assistant"
            className={cn(buttonVariants({ variant: 'primary', size: 'sm' }), 'border border-[#064e3b]')}
          >
            Open Chat
          </Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden p-2 text-primary focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 w-full bg-surface-low border-b border-primary/5 shadow-xl flex flex-col p-6 space-y-4 z-40 transition-all duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className={cn(
                'text-sm font-bold uppercase tracking-wider py-2 border-b border-primary/5',
                isLinkActive(link.href) ? 'text-primary' : 'text-primary/70'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assistant"
            onClick={closeMobileMenu}
            className="w-full text-center bg-primary text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider"
          >
            Start Aura Concierge
          </Link>
        </div>
      )}
    </header>
  );
}

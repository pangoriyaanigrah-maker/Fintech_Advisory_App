import Link from 'next/link'
import { LayoutDashboard, PieChart, Target, Sparkles, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHeading } from '@/components/ui/section-heading'

const features = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    title: 'Financial Dashboard',
    description: 'Real-time health score, spending breakdown, and smart AI insights in one calm overview.',
    color: 'bg-primary/5 text-primary',
  },
  {
    href: '/budgeting',
    icon: PieChart,
    title: 'Smart Budgeting',
    description: 'Category-wise budget tracking with automatic overspend alerts and monthly comparisons.',
    color: 'bg-tertiary-container/15 text-tertiary',
  },
  {
    href: '/goals',
    icon: Target,
    title: 'Goal Planner',
    description: 'Visualize compound growth, track milestones, and architect your financial sanctuary.',
    color: 'bg-primary/5 text-primary',
  },
  {
    href: '/assistant',
    icon: Sparkles,
    title: 'Aura AI',
    description: 'Your SEBI-supervised AI companion for portfolio questions, SIP guidance, and tax clarity.',
    color: 'bg-tertiary-container/15 text-tertiary',
  },
]

export default function ProductPreview() {
  return (
    <section className="py-16 md:py-24 bg-surface-low grain-texture" id="features">
      <Container>
        <SectionHeading
          eyebrow="PRODUCT MODULES"
          title="Everything you need in one place"
          description="Explore the full Aarya suite — built around your life, not spreadsheets."
          align="center"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group block p-6 bg-surface-lowest rounded-3xl border border-primary/5 hover:border-primary/15 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${feature.color}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-xs text-on-surface/60 font-sans leading-relaxed mb-5">{feature.description}</p>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary group-hover:gap-2.5 transition-all duration-200">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Advisor from '@/components/sections/Advisor'
import ProductPreview from '@/components/sections/ProductPreview'
import LearningModules from '@/components/sections/LearningModules'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Advisor />
        <ProductPreview />
        <LearningModules />
      </main>
      <Footer />
    </>
  )
}

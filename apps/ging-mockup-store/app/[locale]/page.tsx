import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="md:mr-[130px] px-5 md:px-[60px] py-20 md:py-20 pb-[90px] md:pb-[60px] transition-[margin-right] duration-300">
      <div className="max-w-[1000px] mx-auto">
        <Hero />
        <AboutUs />
        
        <section className="text-center py-10">
          <Link 
            href="/products"
            className="inline-block px-8 py-4 text-lg font-light text-white bg-black hover:bg-gray-800 transition-colors duration-300 tracking-wider"
          >
            浏览产品
          </Link>
        </section>
      </div>
    </main>
  );
}
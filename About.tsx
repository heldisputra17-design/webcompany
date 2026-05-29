import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textContent = section.querySelector('.about-text');
    const photo = section.querySelector('.about-photo');

    const ctx = gsap.context(() => {
      if (textContent) {
        gsap.from(textContent, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        });
      }

      if (photo) {
        gsap.from(photo, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#F8F9FE] py-20 md:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="about-text lg:w-1/2">
            <p className="font-heading text-sm uppercase tracking-[0.08em] text-[#64748B] mb-4">
              ABOUT US
            </p>
            <h2 className="font-heading text-3xl md:text-[40px] font-medium text-[#1E293B] leading-tight mb-6">
              Meet the Founder
            </h2>
            <p className="font-body text-base text-[#64748B] leading-relaxed mb-8">
              Heldi Saputra founded Dontah Project with a vision to provide
              accessible, high-quality digital services to businesses of all
              sizes. With expertise spanning design, technology, and customer
              service, we bring a holistic approach to every project.
            </p>
            <a
              href="https://www.linkedin.com/in/heldi-saputra-7731b43a8/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading font-medium text-[15px] text-[#8B5CF6] hover:text-[#7C3AED] transition-colors group"
            >
              Connect on LinkedIn
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Founder photo */}
          <div className="about-photo lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-[#8B5CF6] to-[#EDE9FE] rounded-[28px] opacity-60" />
              <img
                src="/images/founder_image.jpg"
                alt="Heldi Saputra - Founder of Dontah Project"
                className="relative w-full max-w-[480px] rounded-[20px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

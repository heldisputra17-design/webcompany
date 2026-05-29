import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { id: 1, src: '/images/client_1.jpg', alt: 'Partner 1' },
  { id: 2, src: '/images/client_2.jpg', alt: 'Partner 2' },
  { id: 3, src: '/images/client_3.jpg', alt: 'Partner 3' },
  { id: 4, src: '/images/client_4.jpg', alt: 'Partner 4' },
  { id: 5, src: '/images/client_5.jpg', alt: 'Partner 5' },
  { id: 6, src: '/images/client_6.jpg', alt: 'Partner 6' },
];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const logos = section.querySelectorAll('.client-logo');
    const ctx = gsap.context(() => {
      gsap.from(logos, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <p className="font-heading text-sm uppercase tracking-[0.08em] text-[#64748B] text-center mb-10">
          Trusted by innovative businesses
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {clients.map((client) => (
            <div key={client.id} className="client-logo">
              <img
                src={client.src}
                alt={client.alt}
                className="h-10 md:h-12 w-auto opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

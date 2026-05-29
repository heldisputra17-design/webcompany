import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Headset, Keyboard, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Palette,
    title: 'Graphic Design',
    description:
      'Logos, branding, social media graphics, and marketing materials that make your business stand out.',
    image: '/images/service_1.jpg',
  },
  {
    icon: Headset,
    title: 'Call Center & Customer Support',
    description:
      'Professional 24/7 support services. Your customers deserve the best experience, every time.',
    image: '/images/service_2.jpg',
  },
  {
    icon: Keyboard,
    title: 'Data Entry',
    description:
      'Accurate, fast, and reliable data processing. We handle the details so you can focus on growth.',
    image: '/images/service_3.jpg',
  },
  {
    icon: Brain,
    title: 'AI Engineering',
    description:
      'Cutting-edge AI solutions to automate workflows, analyze data, and drive smarter decisions.',
    image: '/images/service_4.jpg',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.services-heading');
    const cards = section.querySelectorAll('.service-card');

    const ctx = gsap.context(() => {
      if (heading) {
        gsap.from(heading, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        });
      }

      gsap.from(cards, {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#F8F9FE] py-20 md:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="services-heading text-center mb-16">
          <p className="font-heading text-sm uppercase tracking-[0.08em] text-[#64748B] mb-4">
            WHAT WE DO
          </p>
          <h2 className="font-heading text-3xl md:text-[40px] font-medium text-[#1E293B] leading-tight">
            Four Services, One Mission —
            <br className="hidden md:block" /> Your Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-2xl p-8 md:p-10 border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#EDE9FE] flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-[#8B5CF6]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-medium text-[#1E293B] mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-[15px] text-[#64748B] leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-36 object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

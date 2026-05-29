import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Consult',
    description: 'We listen to understand your needs and goals.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We design a tailored strategy for your project.',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Our team delivers with precision and care.',
  },
  {
    number: '04',
    title: 'Support',
    description: 'We stay with you even after the job is done.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textBlock = section.querySelector('.process-text');
    const stepEls = section.querySelectorAll('.process-step');

    const ctx = gsap.context(() => {
      if (textBlock) {
        gsap.from(textBlock, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        });
      }

      gsap.from(stepEls, {
        x: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left text block */}
          <div className="process-text lg:w-[40%] lg:sticky lg:top-32 lg:self-start">
            <p className="font-heading text-sm uppercase tracking-[0.08em] text-[#64748B] mb-4">
              HOW WE WORK
            </p>
            <h2 className="font-heading text-3xl md:text-[40px] font-medium text-[#1E293B] leading-tight mb-4">
              Simple Process,
              <br />
              Powerful Results
            </h2>
            <p className="font-body text-base text-[#64748B] leading-relaxed">
              From first contact to final delivery, we keep things clear,
              efficient, and focused on your goals.
            </p>
          </div>

          {/* Right steps */}
          <div className="lg:w-[60%] flex flex-col gap-0">
            {steps.map((step, index) => (
              <div key={index} className="process-step flex gap-6 relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-[23px] top-[72px] w-[2px] h-[calc(100%-48px)] bg-[#EDE9FE]"
                    aria-hidden="true"
                  />
                )}

                {/* Number circle */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center z-10">
                  <span className="font-heading text-lg font-bold text-[#8B5CF6]">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pb-10">
                  <h3 className="font-heading text-xl font-medium text-[#1E293B] mb-1">
                    {step.title}
                  </h3>
                  <p className="font-body text-[15px] text-[#64748B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Share2, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    icon: Phone,
    title: 'WhatsApp',
    detail: '+62 851-7440-7617',
    href: 'https://wa.me/6285174407617',
  },
  {
    icon: Share2,
    title: 'Social Media',
    detail: 'Follow us for updates',
    href: null,
    socials: [
      { label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61585721441485' },
      { label: 'Instagram', href: 'https://www.instagram.com/dontahproject.id/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/heldi-saputra-7731b43a8/' },
    ],
  },
  {
    icon: Mail,
    title: 'Direct Message',
    detail: 'Send us a message anytime',
    href: 'https://www.instagram.com/dontahproject.id/',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.contact-heading');
    const cards = section.querySelectorAll('.contact-card');

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
        duration: 0.7,
        stagger: 0.1,
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
      id="contact"
      className="bg-white py-20 md:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="contact-heading text-center mb-16">
          <p className="font-heading text-sm uppercase tracking-[0.08em] text-[#64748B] mb-4">
            GET IN TOUCH
          </p>
          <h2 className="font-heading text-3xl md:text-[40px] font-medium text-[#1E293B] leading-tight mb-4">
            Ready to Start? Let's Talk.
          </h2>
          <p className="font-body text-base text-[#64748B] max-w-xl mx-auto">
            Whether you need design, support, data services, or AI solutions —
            we're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="contact-card bg-[#F8F9FE] rounded-2xl p-10 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#EDE9FE] flex items-center justify-center mx-auto mb-5">
                <contact.icon className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <h3 className="font-heading text-lg font-medium text-[#1E293B] mb-2">
                {contact.title}
              </h3>

              {contact.href ? (
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[15px] text-[#64748B] hover:text-[#8B5CF6] transition-colors"
                >
                  {contact.detail}
                </a>
              ) : (
                <p className="font-body text-[15px] text-[#64748B] mb-3">
                  {contact.detail}
                </p>
              )}

              {/* Social links for the social media card */}
              {contact.socials && (
                <div className="flex flex-col gap-2 mt-3">
                  {contact.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

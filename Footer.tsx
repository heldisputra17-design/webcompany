import { Facebook, Instagram, Linkedin } from 'lucide-react';

const services = [
  'Graphic Design',
  'Call Center',
  'Data Entry',
  'AI Engineering',
];

const company = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
];

const socials = [
  {
    icon: Facebook,
    href: 'https://web.facebook.com/profile.php?id=61585721441485',
    label: 'Facebook',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/dontahproject.id/',
    label: 'Instagram',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/heldi-saputra-7731b43a8/',
    label: 'LinkedIn',
  },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#1E293B] pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/images/company_logo.png"
                alt="Dontah Project"
                className="h-9 w-auto brightness-0 invert"
              />
              <span className="font-heading font-medium text-base text-white">
                Dontah Project
              </span>
            </div>
            <p className="font-body text-sm text-[#94A3B8] leading-relaxed">
              Digital solutions for modern businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-medium text-sm text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="font-body text-sm text-[#94A3B8]">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-medium text-sm text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-body text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-medium text-sm text-white mb-4">
              Connect
            </h4>
            <p className="font-body text-sm text-[#94A3B8] mb-4">
              WhatsApp: +62 851-7440-7617
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[#94A3B8] hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-[#94A3B8]">
            2025 Dontah Project. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

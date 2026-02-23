import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Heart, ArrowUp, Code } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Connect', href: '#connect' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 bg-black border-t border-gray-medium"
    >
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime to-transparent" />

      <div className="footer-content w-full section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#hero');
                }}
                className="inline-block font-display text-4xl text-white hover:text-lime transition-colors"
              >
                RK
              </a>
              <p className="text-gray-light text-sm max-w-xs">
                Computer Science student passionate about AI, ML, and building impactful
                technology solutions.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-light">
                <Code className="w-4 h-4 text-lime" />
                <span>Made with passion & code</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-light hover:text-lime transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Get In Touch</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-light">risabh@example.com</p>
                <p className="text-gray-light">+91 98765 43210</p>
                <p className="text-gray-light">India</p>
              </div>
              <p className="text-lime text-sm">
                Open for opportunities and collaborations!
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-medium flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-light text-sm flex items-center gap-1">
              © {new Date().getFullYear()} Risabh Kumar. Made with{' '}
              <Heart className="w-4 h-4 text-lime fill-lime" /> and lots of coffee.
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-gray-light hover:text-lime transition-colors"
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 border border-gray-medium rounded-full flex items-center justify-center group-hover:border-lime group-hover:bg-lime group-hover:text-black transition-all">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

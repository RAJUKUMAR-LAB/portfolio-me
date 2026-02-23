import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, Lightbulb, Palette, Code, Rocket, CheckCircle } from 'lucide-react';

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description:
        'Understanding the problem space, researching requirements, and gathering insights to build a solid foundation.',
      icon: Search,
      color: '#C0F748',
    },
    {
      number: '02',
      title: 'Strategy',
      description:
        'Planning the approach, selecting the right technologies, and defining the architecture for optimal results.',
      icon: Lightbulb,
      color: '#60A5FA',
    },
    {
      number: '03',
      title: 'Design',
      description:
        'Creating intuitive interfaces and user experiences that make complex systems accessible and enjoyable.',
      icon: Palette,
      color: '#A78BFA',
    },
    {
      number: '04',
      title: 'Development',
      description:
        'Writing clean, efficient code with best practices, ensuring scalability and maintainability.',
      icon: Code,
      color: '#F472B6',
    },
    {
      number: '05',
      title: 'Deployment',
      description:
        'Launching the solution with proper testing, monitoring, and continuous improvement processes.',
      icon: Rocket,
      color: '#FB923C',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line draw animation
      if (lineRef.current) {
        const pathLength = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        });
      }

      // Node animations
      gsap.fromTo(
        '.process-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: nodesRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animations
      gsap.fromTo(
        '.process-content',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: nodesRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-dark to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-lime text-sm font-medium tracking-wider uppercase mb-4 block">
              How I Work
            </span>
            <h2 className="font-display text-section text-white mb-4">
              My <span className="text-lime">Process</span>
            </h2>
            <p className="text-gray-light max-w-2xl mx-auto">
              A structured approach to turning ideas into reality. Each step is carefully crafted
              to ensure quality and efficiency.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative" ref={nodesRef}>
            {/* SVG Connection Line - Desktop */}
            <svg
              className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 hidden lg:block"
              preserveAspectRatio="none"
            >
              <path
                ref={lineRef}
                d="M 8 0 L 8 100%"
                stroke="#C0F748"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="line-draw"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(192, 247, 72, 0.5))',
                }}
              />
            </svg>

            {/* Steps */}
            <div className="space-y-16 lg:space-y-24">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Node */}
                  <div className="process-node relative z-10 flex-shrink-0">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 hover:scale-110 animate-pulse-glow"
                      style={{
                        background: `${step.color}15`,
                        borderColor: step.color,
                        boxShadow: `0 0 30px ${step.color}30`,
                      }}
                    >
                      <step.icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>
                    {/* Step Number Badge */}
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: step.color,
                        color: '#000',
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`process-content flex-1 text-center ${
                      index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                    }`}
                  >
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                      style={{
                        background: `${step.color}10`,
                        border: `1px solid ${step.color}30`,
                      }}
                    >
                      <CheckCircle className="w-4 h-4" style={{ color: step.color }} />
                      <span className="text-sm" style={{ color: step.color }}>
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-white text-2xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-light max-w-md mx-auto lg:mx-0">{step.description}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-dark-card border border-gray-medium rounded-2xl">
              <div className="w-12 h-12 bg-lime/10 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-lime" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Ready to start your project?</p>
                <p className="text-gray-light text-sm">
                  Let&apos;s collaborate and bring your ideas to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

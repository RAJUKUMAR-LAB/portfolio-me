import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Code2, Brain, Database, Terminal, Cpu, Globe, Layers, Sparkles } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'Python', icon: Terminal },
    { name: 'JavaScript', icon: Code2 },
    { name: 'React', icon: Layers },
    { name: 'Machine Learning', icon: Brain },
    { name: 'Data Science', icon: Database },
    { name: 'TensorFlow', icon: Cpu },
    { name: 'Node.js', icon: Globe },
    { name: 'AI Research', icon: Sparkles },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title stroke draw animation
      gsap.fromTo(
        '.about-title-stroke',
        { strokeDashoffset: 1000, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Content cards animation
      gsap.fromTo(
        '.about-card',
        { rotateX: 20, opacity: 0, y: 50 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, borderRadius: '50%' },
        {
          scale: 1,
          opacity: 1,
          borderRadius: '1rem',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill tags animation
      gsap.fromTo(
        '.skill-tag',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden bg-black"
    >
      {/* Background Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          className="w-full max-w-7xl"
          viewBox="0 0 800 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="about-title-stroke"
            style={{
              fontSize: '180px',
              fontFamily: '"Bebas Neue", sans-serif',
              fill: 'none',
              stroke: '#C0F748',
              strokeWidth: '1',
              strokeDasharray: 1000,
              opacity: 0.1,
            }}
          >
            ABOUT ME
          </text>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-lime text-sm font-medium tracking-wider uppercase mb-4 block">
              Who I Am
            </span>
            <h2 ref={titleRef} className="font-display text-section text-white">
              About <span className="text-lime">Me</span>
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div ref={imageRef} className="relative">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                {/* Image Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-lime/20 to-transparent rounded-2xl overflow-hidden border border-gray-medium">
                  {/* Abstract Code Pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(192,247,72,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(192,247,72,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  </div>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-lime/10 border-2 border-lime flex items-center justify-center">
                        <span className="font-display text-5xl text-lime">RK</span>
                      </div>
                      <p className="text-white font-medium text-lg">Rishabh Kumar</p>
                      <p className="text-gray-light text-sm">CS Student & AI Enthusiast</p>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute top-4 left-4 px-4 py-2 bg-dark/80 backdrop-blur-sm rounded-lg border border-gray-medium">
                    <p className="text-lime text-2xl font-bold">2nd</p>
                    <p className="text-gray-light text-xs">Year</p>
                  </div>

                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-dark/80 backdrop-blur-sm rounded-lg border border-gray-medium">
                    <p className="text-lime text-2xl font-bold">CS</p>
                    <p className="text-gray-light text-xs">Major</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-lime/30 rounded-lg" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-lime/10 rounded-full" />
              </div>
            </div>

            {/* Right: Content */}
            <div ref={contentRef} className="space-y-8">
              {/* Description Cards */}
              <div className="about-card bg-dark-card border border-gray-medium rounded-xl p-6 hover:border-lime/50 transition-colors duration-300">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-lime/10 rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-lime" />
                  </span>
                  Passionate Coder
                </h3>
                <p className="text-gray-light leading-relaxed">
                  I&apos;m a 2nd-year Computer Science student with an insatiable curiosity for
                  technology. Coding isn&apos;t just a skill for me—it&apos;s a way of thinking,
                  problem-solving, and creating impactful solutions.
                </p>
              </div>

              <div className="about-card bg-dark-card border border-gray-medium rounded-xl p-6 hover:border-lime/50 transition-colors duration-300">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-lime/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-lime" />
                  </span>
                  AI & ML Enthusiast
                </h3>
                <p className="text-gray-light leading-relaxed">
                  Fascinated by the potential of Artificial Intelligence and Machine Learning,
                  I&apos;m constantly learning about neural networks, deep learning, and how AI can
                  transform industries and improve lives.
                </p>
              </div>

              <div className="about-card bg-dark-card border border-gray-medium rounded-xl p-6 hover:border-lime/50 transition-colors duration-300">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-lime/10 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-lime" />
                  </span>
                  Data Science Explorer
                </h3>
                <p className="text-gray-light leading-relaxed">
                  Currently diving deep into Data Science, learning to extract meaningful insights
                  from complex datasets. I believe data-driven decisions are the key to building
                  smarter applications.
                </p>
              </div>

              {/* Skills */}
              <div className="skills-container">
                <h4 className="text-white font-medium mb-4">Technologies I&apos;m Learning</h4>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-tag group flex items-center gap-2 px-4 py-2 bg-dark border border-gray-medium rounded-full hover:border-lime hover:bg-lime/10 transition-all duration-300 cursor-default"
                    >
                      <skill.icon className="w-4 h-4 text-gray-light group-hover:text-lime transition-colors" />
                      <span className="text-sm text-gray-light group-hover:text-lime transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

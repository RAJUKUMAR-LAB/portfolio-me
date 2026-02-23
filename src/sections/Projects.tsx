import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ExternalLink, Github, ArrowRight, Sparkles, Brain, BarChart3, Code } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  github?: string;
  demo?: string;
  features: string[];
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'AI Chat Assistant',
      description:
        'An intelligent conversational AI built using natural language processing techniques. Features context-aware responses and learning capabilities.',
      tags: ['Python', 'TensorFlow', 'NLP', 'React'],
      icon: Brain,
      color: '#C0F748',
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['Context Awareness', 'Multi-language Support', 'Custom Training'],
    },
    {
      id: 2,
      title: 'Data Visualization Dashboard',
      description:
        'Interactive dashboard for visualizing complex datasets. Includes real-time updates, filtering, and export capabilities.',
      tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      icon: BarChart3,
      color: '#60A5FA',
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['Real-time Updates', 'Interactive Charts', 'Data Export'],
    },
    {
      id: 3,
      title: 'Machine Learning Playground',
      description:
        'Educational platform for experimenting with ML algorithms. Visualize how different models work with interactive demos.',
      tags: ['Python', 'Scikit-learn', 'Flask', 'Vue.js'],
      icon: Sparkles,
      color: '#A78BFA',
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['Algorithm Visualization', 'Dataset Upload', 'Model Comparison'],
    },
    {
      id: 4,
      title: 'Code Snippet Manager',
      description:
        'A smart code organization tool with syntax highlighting, tagging, and search functionality for developers.',
      tags: ['TypeScript', 'Electron', 'SQLite', 'PrismJS'],
      icon: Code,
      color: '#F472B6',
      github: 'https://github.com',
      demo: 'https://demo.com',
      features: ['Syntax Highlighting', 'Smart Search', 'Cloud Sync'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.projects-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.project-card',
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden bg-black"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#C0F748 1px, transparent 1px), linear-gradient(90deg, #C0F748 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="section-padding mb-16">
          <div className="max-w-7xl mx-auto projects-header">
            <span className="text-lime text-sm font-medium tracking-wider uppercase mb-4 block">
              My Work
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="font-display text-section text-white mb-4">
                  Featured <span className="text-lime">Projects</span>
                </h2>
                <p className="text-gray-light max-w-xl">
                  A collection of projects I&apos;ve built while learning and exploring different
                  technologies. Each project represents a step in my journey as a developer.
                </p>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-lime hover:text-lime-dark transition-colors"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={trackRef} className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="project-card group relative"
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className={`relative bg-dark-card border border-gray-medium rounded-2xl overflow-hidden transition-all duration-500 ${
                      activeProject === project.id
                        ? 'border-lime/50 shadow-glow'
                        : 'hover:border-gray-light/50'
                    }`}
                    style={{
                      transform:
                        activeProject === project.id
                          ? 'translateY(-8px) rotateX(2deg)'
                          : 'translateY(0) rotateX(0)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Card Header */}
                    <div className="relative h-48 overflow-hidden">
                      {/* Gradient Background */}
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}20 0%, transparent 60%)`,
                        }}
                      />

                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                          style={{
                            background: `${project.color}15`,
                            border: `1px solid ${project.color}40`,
                          }}
                        >
                          <div style={{ color: project.color }}>
                            {(() => {
                              const IconComponent = project.icon;
                              return <IconComponent className="w-10 h-10" />;
                            })()}
                          </div>
                        </div>
                      </div>

                      {/* Project Number */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="font-display text-6xl opacity-20"
                          style={{ color: project.color } as React.CSSProperties}
                        >
                          0{index + 1}
                        </span>
                      </div>

                      {/* Links */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-lime hover:text-black transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-lime hover:text-black transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-lime transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-light text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs px-2 py-1 bg-dark rounded text-gray-light"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 border border-gray-medium rounded-full text-gray-light hover:border-lime hover:text-lime transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${project.color}10 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="section-padding mt-16">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-light mb-4">Want to see more of my work?</p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-lime text-lime rounded-full hover:bg-lime hover:text-black transition-all duration-300 hover:shadow-glow"
            >
              <Github className="w-5 h-5" />
              Check Out My GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Particle Network Background
const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const particleCount = 80;
  const connectionDistance = 2.5;

  const positions = new Float32Array(particleCount * 3);
  const velocities: THREE.Vector3[] = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, 0));
  }

  useFrame(() => {
    if (pointsRef.current && linesRef.current) {
      const positionAttribute = pointsRef.current.geometry.attributes.position;
      const posArray = positionAttribute.array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Boundary check
        if (Math.abs(posArray[i * 3]) > 10) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 10) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 5) velocities[i].z *= -1;
      }

      positionAttribute.needsUpdate = true;

      // Update connections
      const linePositions: number[] = [];
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePositions.push(
              posArray[i * 3],
              posArray[i * 3 + 1],
              posArray[i * 3 + 2],
              posArray[j * 3],
              posArray[j * 3 + 1],
              posArray[j * 3 + 2]
            );
          }
        }
      }

      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#C0F748" transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#C0F748" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
};

const Connect = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com', color: '#C0F748' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: '#60A5FA' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: '#38BDF8' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: '#F472B6' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'risabh@example.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: MapPin, label: 'Location', value: 'India' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.connect-header',
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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info animation
      gsap.fromTo(
        '.contact-info-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social links animation
      gsap.fromTo(
        '.social-link-item',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.social-links',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message Sent!', {
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden bg-black"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleNetwork />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="connect-header text-center mb-16">
            <span className="text-lime text-sm font-medium tracking-wider uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="font-display text-section text-white mb-4">
              Let&apos;s <span className="text-lime">Connect</span>
            </h2>
            <p className="text-gray-light max-w-2xl mx-auto">
              Have a project in mind or just want to chat about tech? I&apos;d love to hear from
              you. Drop me a message and let&apos;s create something amazing together.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Details */}
              <div className="contact-info space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="contact-info-item flex items-center gap-4 p-4 bg-dark-card border border-gray-medium rounded-xl hover:border-lime/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-lime/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-lime" />
                    </div>
                    <div>
                      <p className="text-gray-light text-sm">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="social-links">
                <p className="text-white font-medium mb-4">Follow Me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-item w-12 h-12 bg-dark-card border border-gray-medium rounded-xl flex items-center justify-center hover:border-lime transition-all duration-300 hover:scale-110 group"
                      style={{
                        boxShadow: `0 0 0 ${social.color}00`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 20px ${social.color}40`;
                        e.currentTarget.style.borderColor = social.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0 ${social.color}00`;
                        e.currentTarget.style.borderColor = '';
                      }}
                    >
                      <social.icon
                        className="w-5 h-5 text-gray-light group-hover:text-lime transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-lime/10 border border-lime/30 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-lime" />
                </span>
                <span className="text-lime text-sm font-medium">Available for opportunities</span>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-dark-card border border-gray-medium rounded-2xl p-8 space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-dark border-gray-medium text-white placeholder:text-gray-light focus:border-lime focus:ring-lime/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white text-sm font-medium">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-dark border-gray-medium text-white placeholder:text-gray-light focus:border-lime focus:ring-lime/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-white text-sm font-medium">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-dark border-gray-medium text-white placeholder:text-gray-light focus:border-lime focus:ring-lime/20 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-lime text-black font-medium rounded-xl hover:bg-lime-dark transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;

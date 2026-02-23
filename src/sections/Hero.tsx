import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

// Fluid Background Shader
const FluidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
  });

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth mouse follow
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse;
      
      // Create flowing noise
      float noise1 = snoise(uv * 3.0 + uTime * 0.15);
      float noise2 = snoise(uv * 5.0 - uTime * 0.1);
      float noise3 = snoise(uv * 2.0 + uTime * 0.08);
      
      // Mouse influence
      float dist = distance(uv, mouse);
      float mouseInfluence = smoothstep(0.5, 0.0, dist) * 0.3;
      
      // Combine noises
      float finalNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2 + mouseInfluence;
      
      // Colors
      vec3 black = vec3(0.0, 0.0, 0.0);
      vec3 lime = vec3(0.753, 0.969, 0.282); // #C0F748
      vec3 darkLime = vec3(0.659, 0.878, 0.188); // #A8E030
      
      // Create gradient with noise
      float gradient = smoothstep(-0.5, 1.0, finalNoise);
      vec3 color = mix(black, lime, gradient * 0.15);
      
      // Add subtle lime highlights
      float highlight = smoothstep(0.6, 0.8, finalNoise);
      color = mix(color, darkLime, highlight * 0.1);
      
      // Vignette
      float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5));
      color *= vignette * 0.5 + 0.5;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

// Animated Particles
const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 50;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#C0F748"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.hero-char',
        { y: 100, opacity: 0, rotateX: 90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: 'expo.out',
          delay: 0.3,
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      // CTA animation
      gsap.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'quad.out', delay: 1.2 }
      );

      // Social links animation
      gsap.fromTo(
        '.social-link',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 1.4 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const firstName = 'Rishabh';
  const lastName = 'Kumar';

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <FluidBackground />
          <Particles />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left: Text Content */}
            <div className="space-y-8">
              {/* Title */}
              <div className="space-y-2">
                <h1
                  ref={titleRef}
                  className="font-display text-hero text-white leading-none tracking-tight"
                  style={{ perspective: '1000px' }}
                >
                  <span className="block overflow-hidden">
                    {firstName.split('').map((char, index) => (
                      <span
                        key={index}
                        className="hero-char inline-block"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="block overflow-hidden text-lime">
                    {lastName.split('').map((char, index) => (
                      <span
                        key={index}
                        className="hero-char inline-block"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-lg md:text-xl text-gray-light max-w-md leading-relaxed"
              >
                Computer Science Student & Aspiring{' '}
                <span className="text-lime">AI/ML Engineer</span> passionate about
                building intelligent systems and exploring the frontiers of data science.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 hero-cta">
                <button
                  onClick={scrollToProjects}
                  className="group relative px-8 py-4 bg-lime text-black font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore My Work
                    <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </span>
                </button>
                <a
                  href="#connect"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#connect')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border border-gray-medium text-white font-medium rounded-full hover:border-lime hover:text-lime transition-all duration-300"
                >
                  Get In Touch
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link p-3 border border-gray-medium rounded-full text-gray-light hover:border-lime hover:text-lime hover:shadow-glow transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link p-3 border border-gray-medium rounded-full text-gray-light hover:border-lime hover:text-lime hover:shadow-glow transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link p-3 border border-gray-medium rounded-full text-gray-light hover:border-lime hover:text-lime hover:shadow-glow transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right: 3D Code Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={isLoaded ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Code Card */}
                <div className="relative w-[400px] h-[500px] bg-dark-card border border-gray-medium rounded-2xl overflow-hidden shadow-2xl">
                  {/* Card Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-medium bg-dark">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-xs text-gray-light">rishabh@portfolio:~</span>
                  </div>

                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm">
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-lime mr-2">1</span>
                        <span>
                          <span className="text-purple-400">const</span>{' '}
                          <span className="text-blue-400">developer</span> = {'{'}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">2</span>
                        <span className="pl-4">
                          <span className="text-cyan-400">name</span>:{' '}
                          <span className="text-orange-400">&quot;Rishabh Kumar&quot;</span>,
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">3</span>
                        <span className="pl-4">
                          <span className="text-cyan-400">role</span>:{' '}
                          <span className="text-orange-400">&quot;CS Student&quot;</span>,
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">4</span>
                        <span className="pl-4">
                          <span className="text-cyan-400">year</span>:{' '}
                          <span className="text-green-400">2</span>,
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">5</span>
                        <span className="pl-4">
                          <span className="text-cyan-400">passion</span>: [
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">6</span>
                        <span className="pl-8">
                          <span className="text-orange-400">&quot;AI/ML&quot;</span>,
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">7</span>
                        <span className="pl-8">
                          <span className="text-orange-400">&quot;Data Science&quot;</span>,
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">8</span>
                        <span className="pl-8">
                          <span className="text-orange-400">&quot;Coding&quot;</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">9</span>
                        <span className="pl-4">],</span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">10</span>
                        <span className="pl-4">
                          <span className="text-cyan-400">learning</span>:{' '}
                          <span className="text-blue-400">true</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">11</span>
                        <span>{'}'};</span>
                      </div>
                      <div className="flex">
                        <span className="text-lime mr-2">12</span>
                        <span className="animate-pulse">_</span>
                      </div>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-lime/20 via-transparent to-lime/20 blur-xl opacity-50" />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-8 -right-8 w-20 h-20 bg-lime/10 border border-lime/30 rounded-lg backdrop-blur-sm flex items-center justify-center"
                >
                  <span className="text-lime text-2xl font-bold">AI</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-lime/10 border border-lime/30 rounded-full backdrop-blur-sm flex items-center justify-center"
                >
                  <span className="text-lime text-xl">{'</>'}</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default Hero;

// components/AboutSection.jsx
import { JSX, useEffect} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useThree } from '@react-three/fiber';
import { Particles } from "../components/Particles";
import { FC,} from 'react';
import { CodeBracketIcon, SparklesIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import { OrbitControls, Stars } from '@react-three/drei';

// 3D Text Component
import React, { useRef } from 'react';
import { Text, Float } from '@react-three/drei';

interface Text3DProps {
  children: React.ReactNode;
}

const Text3D: React.FC<Text3DProps> = ({ children }) => {
  const ref = useRef(null);

  return (
    <Float 
      speed={4} 
      rotationIntensity={0.2} 
      floatIntensity={2}
    >
      <Text
        ref={ref}
        fontSize={0.5}
        color="#ffffff"
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="/fonts/Inter-Bold.woff"
      >
        {children}
      </Text>
    </Float>
  );
};
interface Skill {
    children: React.ReactNode;
  }
  

  
  import { IconType } from 'react-icons'; // or appropriate type if using Heroicons

  import { SVGProps } from 'react';
  
  // Define the prop types
  interface SkillProps {
      icon: React.ElementType<SVGProps<SVGSVGElement>>;
      name: string;
      description: string;
    }
  const Scene: FC = () => {
    return (
      <>
        {/* Starry background */}
        <Stars
          radius={100}       // Radius of the inner sphere (default=100)
          depth={50}         // Depth of area where stars appear (default=50)
          count={5000}       // Number of stars (default=5000)
          factor={4}         // Size factor (default=4)
          saturation={0}     // Color saturation (0 = grayscale)
          fade               // Faded edges
          speed={1}          // Speed of motion
        />
  
        {/* Optional: lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
  
        {/* Optional: interactive controls */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </>
    );
  };
  
  const Skill: FC<SkillProps> = ({ icon: Icon, name, description }) => (
    <motion.div
      className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 flex flex-col items-center"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 p-3 bg-zinc-800 rounded-full">
        <Icon className="h-8 w-8 text-purple-500" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
      <p className="text-zinc-400 text-center">{description}</p>
    </motion.div>
  );
  
 
  

  const AboutSection: FC = () => {
    const containerRef = useRef<HTMLElement | null>(null);
  
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ['start end', 'end start'],
    });
  
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
    return (
      <section
        ref={containerRef}
        className="relative bg-black min-h-screen w-full overflow-hidden"
      >
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Scene />
          </Canvas>
        </div>
  
        {/* Foreground Content */}
        <div className="relative z-10 container mx-auto">
          <motion.div style={{ opacity, scale }} className="flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
              About <span className="text-purple-500">Me</span>
            </h2>
  
            <div className="max-w-3xl mb-16">
              <p className="text-xl text-zinc-300 mb-6 leading-relaxed text-center">
                I'm a passionate developer focused on creating immersive digital experiences
                that blend cutting-edge technology with thoughtful design.
              </p>
              <p className="text-lg text-zinc-400 text-center">
                With expertise in front-end development and interactive animations,
                I strive to push boundaries and deliver memorable user experiences.
              </p>
            </div>
  
            {/* Skills Grid */}
            <h3 className="text-3xl font-bold mb-10 text-white">My Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
              <Skill
                icon={CodeBracketIcon}
                name="Development"
                description="Building robust applications with modern frameworks and best practices."
              />
              <Skill
                icon={SparklesIcon}
                name="Animation"
                description="Creating fluid motion and interactions that delight users."
              />
              <Skill
                icon={LightBulbIcon}
                name="Creative Coding"
                description="Exploring the intersection of code, art, and interactive experiences."
              />
            </div>
          </motion.div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
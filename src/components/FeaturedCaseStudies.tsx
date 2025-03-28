
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flag } from "lucide-react";
import Image from "./Image";

const FeaturedCaseStudies = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-8 md:mb-16">
        <motion.p 
          className="text-sm font-mono text-muted-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          FEATURED CASE STUDIES
        </motion.p>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Curated <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">work</span>
        </motion.h2>
      </div>

      {/* Case Study Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        {/* Featured Project Card - Left Side */}
        <motion.div 
          className="lg:col-span-7 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="rounded-2xl overflow-hidden group cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-purple-600/40"></div>
            
            {/* Main Card Content */}
            <div className="p-8 md:p-10 h-full w-full rounded-2xl bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-pink-900/90 border-[1px] border-purple-500/20 flex flex-col justify-between">
              {/* Top Text */}
              <div className="mb-6 md:mb-12">
                <h3 className="text-xl md:text-2xl font-semibold mb-3">Next Ventures</h3>
                <p className="text-base md:text-lg text-gray-300">
                  A online space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design.
                </p>
              </div>
              
              {/* Project Image */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/d6a17f57-e290-4c9f-8ecc-1e3cde07eb31.png" 
                  alt="Next Ventures project screenshot" 
                  className="w-full rounded-xl"
                />
                
                {/* Arrow Indicator */}
                <motion.div 
                  className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full"
                  animate={{ 
                    x: isHovered ? 5 : 0,
                    opacity: isHovered ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="text-white" size={20} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Details - Right Side */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-full flex flex-col justify-center">
            {/* Project Title with Icon */}
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-pink-500 p-1 rounded-md">
                <Flag size={16} className="text-white" />
              </span>
              <h3 className="text-2xl font-bold">Next Ventures</h3>
            </div>
            
            {/* Project Description */}
            <p className="text-gray-300 mb-8">
              Developed a platform for virtual pitch competitions 
              using Next.js 15, enabling smooth idea sharing and 
              exploration with optimal performance.
            </p>
            
            {/* Bullet Points */}
            <div className="space-y-4 mb-10">
              {[
                "Leveraged Partial Prerendering and After for faster loading.",
                "Simplified idea submission with a clean, intuitive design.",
                "Enhanced browsing with seamless performance optimization."
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold text-lg pt-1">+</span>
                  <p className="text-gray-300">
                    {point.split(' ').map((word, wordIndex) => {
                      const keyWords = ['Leveraged', 'Partial', 'Prerendering', 'After', 'Simplified', 'Enhanced', 'seamless'];
                      return keyWords.includes(word) 
                        ? <span key={wordIndex} className="font-semibold text-white">{word} </span> 
                        : <span key={wordIndex}>{word} </span>;
                    })}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Next.js", icon: "N" },
                { name: "React", icon: "⚛️" },
                { name: "Tailwind CSS", icon: "💨" },
                { name: "TypeScript", icon: "TS" },
                { name: "Framer Motion", icon: "🔄" },
                { name: "Sanity cms", icon: "S" },
                { name: "Auth.js", icon: "🔒" },
                { name: "markdown", icon: "📝" },
                { name: "GROQ", icon: "G" },
                { name: "Sentry", icon: "🛡️" }
              ].map((tech, index) => (
                <motion.span 
                  key={index}
                  className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-gray-800/50 border border-gray-700 text-sm transition-all hover:scale-105 hover:border-gray-600 hover:shadow-md hover:shadow-purple-900/20"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={`${index % 2 === 0 ? 'text-pink-500' : 'text-purple-400'}`}>{tech.icon}</span>
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;

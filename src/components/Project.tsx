
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Info } from "lucide-react";
import Image from "./Image";

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubLink: string;
  liveLink: string;
  onClick?: () => void;
  index: number;
}

const Project = ({ 
  title, 
  description, 
  technologies, 
  image = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", 
  githubLink,
  liveLink,
  onClick,
  index 
}: ProjectProps) => {
  return (
    <motion.div
      className="group rounded-xl overflow-hidden glass-card hover-glow border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <Image src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-xl font-medium group-hover:text-white transition-colors mb-2">{title}</h3>
        <p className="text-white/70 mb-6 flex-1">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech, techIndex) => (
            <span 
              key={techIndex} 
              className="inline-block text-xs font-mono py-1 px-2 rounded-full bg-white/10 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="inline-block text-xs font-mono py-1 px-2 rounded-full bg-white/10 text-white/80">
              +{technologies.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-auto gap-2">
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-1 flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <a 
            href={liveLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-1 flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
            <span>Live</span>
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
            className="flex items-center justify-center gap-1 flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
          >
            <Info size={16} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;


import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Image from "@/components/Image";
import Breadcrumb from "@/components/Breadcrumb";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Cinex - Movie ticket booking App",
    description: "A modern e-commerce platform with responsive design and Stripe integration.",
    longDescription: "A modern e-commerce platform with a responsive design, user authentication, product search and filtering, shopping cart, and checkout functionality. Built with React, Node.js, Express, and MongoDB, with Stripe integration for payments.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    githubLink: "https://github.com",
    liveLink: "https://demo-ecommerce.example.com",
    image: "src/Img/Cinex/image.png"
  },
  {
    title: "GetSchool - School Management System",
    description: "A full-stack task management application with drag-and-drop interface.",
    longDescription: "A full-stack task management application with drag-and-drop interface, user authentication, task categorization, and real-time updates. Features include task prioritization, due dates, and team collaboration tools.",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    githubLink: "https://github.com",
    liveLink: "https://demo-taskmanager.example.com",
    image: "src/Img/localhost_5173_ copy.png"
  },
  {
    title: "GetLearn - Online Learning Platform",
    description: "A minimalist portfolio website showcasing projects, skills, and experience.",
    longDescription: "A minimalist portfolio website showcasing projects, skills, and experience. Features responsive design, animations, and contact form. Built with Next.js for optimal performance and SEO.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    githubLink: "https://github.com",
    liveLink: "https://demo-portfolio.example.com",
    image: "src/Img/Screenshot 2025-09-03 134309.png"
  },
  {
    title: "GetPay - Payment Receiving App",
    description: "A weather dashboard that displays current weather conditions and forecasts.",
    longDescription: "A weather dashboard that displays current weather conditions and forecasts for multiple locations. Features interactive maps and charts, historical weather data comparisons, and custom alerts.",
    technologies: ["React", "Chart.js", "OpenWeather API", "Leaflet"],
    githubLink: "https://github.com",
    liveLink: "https://demo-weather.example.com",
    image: "src/Img/image.png"
  },
  {
    title: "FleetLink - Vehicle Booking System",
    description: "A dashboard for managing and analyzing social media accounts across platforms.",
    longDescription: "A dashboard for managing and analyzing social media accounts across multiple platforms. Features analytics, content scheduling, and engagement tracking with visual representations of trends and user engagement.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    githubLink: "https://github.com",
    liveLink: "https://demo-socialdashboard.example.com",
    image: "src/Img/image copy.png"
  },
  {
    title: "RajatTomar's_Recipes",
    description: "A recipe application that allows users to browse, search, save, and share recipes.",
    longDescription: "A recipe application that allows users to browse, search, save, and share recipes. Features user authentication, recipe categories, and a responsive design. Users can create shopping lists and meal plans based on selected recipes.",
    technologies: ["React", "Firebase", "CSS Modules", "Spoonacular API"],
    githubLink: "https://github.com",
    liveLink: "https://demo-recipes.example.com",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80"
  }
];

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  return (
    <motion.div
      className="group rounded-xl overflow-hidden glass-card hover-glow border border-white/10 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="h-44 overflow-hidden">
        <Image src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-medium group-hover:text-white transition-colors mb-2">{project.title}</h3>
        <p className="text-white/70 mb-4 text-sm flex-1">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span 
              key={techIndex} 
              className="inline-block text-xs font-mono py-0.5 px-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="inline-block text-xs font-mono py-0.5 px-1.5 rounded-full bg-white/10 text-white/80">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-auto gap-1">
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-1 flex-1 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-1 flex-1 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
            <span>Live</span>
          </a>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center justify-center gap-1 flex-1 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs"
          >
            <Info size={14} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectDetailsModal = ({ isOpen, onClose, project }: ProjectDetailsModalProps) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-xl glass-card p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div className="h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
          <Image src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-white/80 mb-6">{project.longDescription || project.description}</p>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="inline-block text-sm font-mono py-1 px-3 rounded-full bg-white/10 text-white/80">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
          >
            <Github size={18} />
            <span>View on GitHub</span>
          </a>
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
          >
            <ExternalLink size={18} />
            <span>View Live Demo</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const FloatingTechIcon = ({ icon, position }: { icon: string, position: { top: string; left: string } }) => {
  return (
    <motion.div
      className="absolute text-white/10 z-0"
      style={position}
      animate={{
        y: [0, 40, 0],
        x: [0, 20, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {icon}
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="relative min-h-screen pt-16 pb-16">
      {/* Background floating tech icons */}
      <FloatingTechIcon icon="⚛️" position={{ top: '15%', left: '5%' }} />
      <FloatingTechIcon icon="🔷" position={{ top: '40%', left: '90%' }} />
      <FloatingTechIcon icon="🅰️" position={{ top: '70%', left: '10%' }} />
      <FloatingTechIcon icon="🟢" position={{ top: '20%', left: '80%' }} />
      <FloatingTechIcon icon="🔵" position={{ top: '80%', left: '75%' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ title: "My Work" }]} />
        
        <SectionHeading 
          title="My Projects" 
          overlineText="03. WHAT I'VE BUILT"
          description="Explore my latest projects, built with modern web technologies to solve real-world problems."
        />
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {projects.map((project, index) => (
            <div key={index} onClick={() => openProjectDetails(project)} className="cursor-pointer">
              <ProjectCard 
                project={project}
                index={index}
                onClick={() => openProjectDetails(project)}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      <ProjectDetailsModal 
        isOpen={isModalOpen}
        onClose={closeProjectDetails}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsPage;

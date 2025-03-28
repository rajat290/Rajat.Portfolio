
import { motion } from "framer-motion";

interface ExperienceProps {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  index: number;
}

const Experience = ({ company, position, period, description, technologies, index }: ExperienceProps) => {
  return (
    <motion.div 
      className="mb-10 md:mb-12 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
        <div className="text-muted-foreground">
          <p className="font-mono text-sm">{period}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-1">{position}</h3>
          <p className="text-muted-foreground mb-4">{company}</p>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, techIndex) => (
              <span 
                key={techIndex} 
                className="inline-block text-xs font-mono py-1 px-2 rounded-full bg-secondary text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;

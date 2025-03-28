
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  overlineText?: string;
  subtitle?: string; // Added subtitle as an alias for overlineText
  description?: string;
  className?: string;
}

const SectionHeading = ({ 
  title, 
  overlineText, 
  subtitle, 
  description, 
  className 
}: SectionHeadingProps) => {
  // Use overlineText or subtitle, giving priority to overlineText if both are provided
  const displayOverline = overlineText || subtitle;
  
  return (
    <motion.div 
      className={cn("mb-8 md:mb-12 glass-card p-6 rounded-xl border border-white/10", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {displayOverline && (
        <p className="text-sm font-mono text-muted-foreground mb-2 tracking-wider uppercase gradient-text">{displayOverline}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>
      {description && (
        <p className="text-white/70 mt-3 max-w-3xl">{description}</p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

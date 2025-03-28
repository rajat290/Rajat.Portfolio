
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BreadcrumbProps {
  items: {
    title: string;
    href?: string;
  }[];
  className?: string;
}

const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
    <motion.nav 
      className={cn("flex items-center space-x-1 text-sm py-4 px-6 glass-card my-4 rounded-xl border border-white/10 backdrop-blur-md", className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="flex items-center text-white/70 hover:text-white transition-colors">
        <Home size={16} />
        <span className="sr-only">Home</span>
      </Link>
      <ChevronRight size={14} className="text-white/40" />
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center">
            {!isLast && item.href ? (
              <>
                <Link
                  to={item.href}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
                <ChevronRight size={14} className="ml-1 text-white/40" />
              </>
            ) : (
              <span className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{item.title}</span>
            )}
          </div>
        );
      })}
    </motion.nav>
  );
};

export default Breadcrumb;


import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isMenuOpen: boolean;
}

const MobileMenu = ({ isMenuOpen }: MobileMenuProps) => {
  const handleServiceClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          className="fixed inset-0 z-40 bg-[#1A1F2C]/95 backdrop-blur-md flex flex-col pt-20 px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col space-y-8 text-center mt-10">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-2xl font-medium ${isActive ? 'text-white' : 'text-white/70'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                `text-2xl font-medium ${isActive ? 'text-white' : 'text-white/70'}`
              }
            >
              Work
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-2xl font-medium ${isActive ? 'text-white' : 'text-white/70'}`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="#blog" 
              className="text-2xl font-medium text-white/70"
            >
              Blog
            </NavLink>
            <Link
              to="/#services"
              className="text-2xl font-medium text-white/70 cursor-pointer"
            >
              Services
            </Link>
            <NavLink 
              to="#contact" 
              className="text-2xl font-medium text-white/70"
            >
              Book a Call
            </NavLink>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

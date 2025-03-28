
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Navbar = ({ isScrolled, toggleMenu, isMenuOpen }: NavbarProps) => {
  const handleServiceClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`mx-auto max-w-5xl backdrop-blur-md bg-black/20 border border-white/5 rounded-full px-5 py-3 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}>
          <div className="flex justify-between items-center">
            <NavLink to="/" className="text-2xl font-medium tracking-tight text-white hover:opacity-80 transition-opacity">
              AB
            </NavLink>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/projects" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
                }
              >
                Work
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="#blog" 
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
              >
                Blog
              </NavLink>
              <button 
                onClick={handleServiceClick}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Services
              </button>

              <NavLink 
                to="#contact" 
                className="text-sm font-medium bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full transition-colors duration-300"
              >
                Book a Call
              </NavLink>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white/80 hover:text-white transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

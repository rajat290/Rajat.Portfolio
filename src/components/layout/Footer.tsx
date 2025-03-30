
import { NavLink } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 mt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#2A2C3E_0%,_transparent_70%)] opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section with Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Rajat Singh Tomar</h3>
            <p className="text-sm text-white/60 max-w-xs">
              Building remarkable digital experiences through creative development and thoughtful design.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://github/rajat290.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Github size={16} className="text-white/80" />
              </a>
              <a href="https://https://www.linkedin.com/in/rajat-singh-tomar-65727a185/" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Linkedin size={16} className="text-white/80" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter size={16} className="text-white/80" />
              </a>
              <a href="mailto:rajatsinghtomarofficial@gmail.com" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Mail size={16} className="text-white/80" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-white/60 hover:text-white transition-colors text-sm">Home</NavLink>
              </li>
              <li>
                <NavLink to="/projects" className="text-white/60 hover:text-white transition-colors text-sm">Work</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-white/60 hover:text-white transition-colors text-sm">About</NavLink>
              </li>
              <li>
                <NavLink to="#blog" className="text-white/60 hover:text-white transition-colors text-sm">Blog</NavLink>
              </li>
              <li>
                <NavLink to="#contact" className="text-white/60 hover:text-white transition-colors text-sm">Contact</NavLink>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Web Development</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">UI/UX Design</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Mobile Development</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Consulting</a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Code Review</a>
              </li>
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Get In Touch</h3>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 rounded-full text-white text-sm transition-all mb-4"
            >
              <span>Contact Me</span>
              <ArrowRight size={14} />
            </a>
            <p className="text-white/60 text-sm">hello@rajatsinghtomar.in</p>
          </div>
        </div>
        
        {/* Bottom Credits */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Rajat Singh Tomar. All rights reserved.
          </p>
          <p className="text-sm text-white/50 mt-2 sm:mt-0">
            Designed & Developed with ❤️ by Rajat Singh Tomar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

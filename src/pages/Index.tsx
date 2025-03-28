import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import Image from "@/components/Image";
import StudyJourneyExperience from "@/components/StudyJourneyExperience";
import TechStack from "@/components/TechStack";
import ContactForm from "@/components/ContactForm";
import Services from "@/components/Services";
import { useEffect, useState } from "react";

const Index = () => {
  // State for typing animation
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Array of texts for the typing effect
  const texts = ["Full Stack Developer", "Backend Developer", "MERN Stack Developer"];

  // Typing effect
  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const typeSpeed = isDeleting ? 50 : 100; // Faster when deleting

    if (!isDeleting && displayText === currentText) {
      // Pause before starting to delete
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    } else if (isDeleting && displayText === "") {
      // Move to next text when current is deleted
      setIsDeleting(false);
      setCurrentTextIndex((currentTextIndex + 1) % texts.length);
      return;
    }

    // Timer for typing/deleting effect
    const timer = setTimeout(() => {
      setDisplayText(isDeleting ? currentText.substring(0, displayText.length - 1) : currentText.substring(0, displayText.length + 1));
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, currentTextIndex, isDeleting, texts]);

  // For resume download
  const handleDownloadResume = () => {
    // Create anchor element
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Assuming resume.pdf is in the public folder
    link.download = 'Rajat_Singh_Tomar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#1A1F2C] overflow-hidden">
        {/* Radial gradient glow */}
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top,_#2A2C3E_0%,_transparent_70%)]"></div>
        
        {/* Light streak 1 */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 0.3
      }} transition={{
        duration: 2,
        delay: 0.5
      }} className="absolute -top-20 -left-20 w-80 h-[500px] bg-purple-700/20 blur-[80px] rounded-full transform -rotate-45"></motion.div>
        
        {/* Light streak 2 */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 0.2
      }} transition={{
        duration: 2,
        delay: 0.8
      }} className="absolute top-40 right-0 w-96 h-[600px] bg-indigo-700/20 blur-[100px] rounded-full transform rotate-45"></motion.div>
        
        {/* Bottom curve */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1.5,
        delay: 2
      }} className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10">
          <svg className="w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20C0 20 345.5 -40 720 20C1094.5 80 1440 20 1440 20V100H0V20Z" fill="#1A1F2C" fillOpacity="0.4" />
          </svg>
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 z-10 pt-20 py-[64px]">
        {/* "New" Badge */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="mb-10">
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 mx-0 px-[20px] my-[21px] py-[8px]">
            <span className="text-xs font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-white px-2 py-0.5 rounded-full">New</span>
            <span className="text-sm text-white/90">See my latest projects</span>
            <ArrowRight size={14} className="text-white/70" />
          </Link>
        </motion.div>

        {/* Main Heading */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="max-w-4xl mx-auto mb-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight py-0">
            Building Scalable Backends, 
            <br className="py-0 px-0 mx-0" /> Crafting <span className="italic bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">End-to-End Applications</span> & Deploying Seamless Solutions
          </h1>
        </motion.div>

        {/* Developer Info - Updated layout */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="flex flex-col items-center gap-2 mb-12">
          {/* Name with profile image */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl text-white/90">Hello, I'm Rajat Singh Tomar</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img alt="Profile" className="w-full h-full object-cover" src="/lovable-uploads/75afff90-7862-469d-a238-8b020403cf73.jpg" />
              </div>
            </div>
          </div>
          
          {/* Position with typing animation on new line */}
          <div className="flex items-center">
            <span className="text-xl text-white/90">a </span>
            <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-semibold ml-1">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="flex flex-col sm:flex-row gap-4 items-center">
          <motion.a href="#contact" whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(155, 135, 245, 0.3)"
        }} whileTap={{
          scale: 0.98
        }} className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
            <span className="text-white font-medium">Let's Connect</span>
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
              <ArrowRight size={14} className="text-white" />
            </div>
          </motion.a>
          
          <motion.button onClick={handleDownloadResume} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.98
        }} className="flex items-center gap-2 px-6 py-3 text-white/90 hover:text-white transition-colors duration-300 bg-white/5 rounded-full border border-white/10">
            <Download size={18} />
            <span>My Resume</span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Study Journey & Experience Section */}
      <StudyJourneyExperience />
      
      {/* Services Section - New addition */}
      <div className="relative z-10">
        <Services />
      </div>
      
      {/* Featured Case Studies Section */}
      <div className="relative z-10">
        <FeaturedCaseStudies />
      </div>
      
      {/* Tech Stack Section */}
      <div className="relative z-10">
        <TechStack />
      </div>

      {/* Contact Form Section */}
      <div className="relative z-10">
        <ContactForm />
      </div>
    </div>;
};

export default Index;

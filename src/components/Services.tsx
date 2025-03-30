
import { motion } from "framer-motion";
import { ArrowRight, Globe, Code, Database, Server, School, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  price?: string;
  ctaText: string;
  ctaLink: string;
}

const ServiceCard = ({ icon, title, description, price, ctaText, ctaLink }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl border border-white/10 p-6 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70 mb-4 min-h-[80px]">{description}</p>
      
      {price && (
        <div className="mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{price}</span>
          {price !== "Custom" && <span className="text-white/70 ml-1">/project</span>}
        </div>
      )}
      
      <Link 
        to={ctaLink} 
        className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
      >
        <span>{ctaText}</span>
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-16 container px-4 mx-auto">
      <SectionHeading
        title="Services Offered"
        subtitle="03. MY SERVICES"
        description="I offer a range of development services to help bring your digital ideas to life."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <ServiceCard
          icon={<Globe className="text-purple-400" size={24} />}
          title="Custom Website Development"
          description="Bespoke responsive websites built with modern frameworks like React and Next.js, optimized for performance and user experience."
          price="$1,200+"
          ctaText="Get started"
          ctaLink="#contact"
        />
        
        <ServiceCard
          icon={<Code className="text-purple-400" size={24} />}
          title="MERN Stack Applications"
          description="Full-stack web applications built with MongoDB, Express, React, and Node.js, perfect for complex interactive projects."
          price="$2,500+"
          ctaText="Discuss your project"
          ctaLink="#contact"
        />
        
        <ServiceCard
          icon={<School className="text-purple-400" size={24} />}
          title="Complete School & College Management Systems"
          description="Comprehensive systems for educational institutions to manage students, staff, classes, fee, and administrative tasks efficiently."
          price="$3,000+"
          ctaText="Learn more"
          ctaLink="#contact"
        />
        
        <ServiceCard
          icon={<Database className="text-purple-400" size={24} />}
          title="Complete Restaurant & Hotel Management Systems"
          description="Reservation Management, Order Processing, Customer Relationship Management, Reporting and Analytics"
          price="$1,000+"
          ctaText="Get a quote"
          ctaLink="#contact"
        />
        
        <ServiceCard
          icon={<Server className="text-purple-400" size={24} />}
          title="API Development"
          description="Robust, secure, and well-documented REST or GraphQL APIs to power your web and mobile applications."
          price="$1,500+"
          ctaText="Discuss requirements"
          ctaLink="#contact"
        />
        
        <ServiceCard
          icon={<Users className="text-purple-400" size={24} />}
          title="Custom Enterprise Solutions"
          description="Tailored enterprise-grade applications designed specifically for your business needs and workflow requirements."
          price="Custom"
          ctaText="Request consultation"
          ctaLink="#contact"
        />
      </div>
    </section>
  );
};

export default Services;

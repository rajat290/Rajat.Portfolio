
import { motion } from "framer-motion";
import { ArrowRight, Globe, Code, Database, Server, School, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import SectionHeading from "./SectionHeading";

// API call to fetch services data
const fetchServices = async () => {
  const response = await apiClient.get('/services');
  return response.data.data || [];
};

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
  // Fetch services data from API
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Icon mapping based on service icon string
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Globe': <Globe className="text-purple-400" size={24} />,
      'Code': <Code className="text-purple-400" size={24} />,
      'Database': <Database className="text-purple-400" size={24} />,
      'Server': <Server className="text-purple-400" size={24} />,
      'School': <School className="text-purple-400" size={24} />,
      'Users': <Users className="text-purple-400" size={24} />,
    };
    return iconMap[iconName] || <Globe className="text-purple-400" size={24} />;
  };

  // Show loading state
  if (isLoading) {
    return (
      <section id="services" className="py-16 container px-4 mx-auto">
        <SectionHeading
          title="Services Offered"
          subtitle="03. MY SERVICES"
          description="I offer a range of development services to help bring your digital ideas to life."
        />
        <div className="flex justify-center items-center h-64 mt-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="services" className="py-16 container px-4 mx-auto">
        <SectionHeading
          title="Services Offered"
          subtitle="03. MY SERVICES"
          description="I offer a range of development services to help bring your digital ideas to life."
        />
        <div className="flex justify-center items-center h-64 mt-12">
          <p className="text-red-400">Failed to load services. Please try again later.</p>
        </div>
      </section>
    );
  }

  // Don't render if no services
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-16 container px-4 mx-auto">
      <SectionHeading
        title="Services Offered"
        subtitle="03. MY SERVICES"
        description="I offer a range of development services to help bring your digital ideas to life."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {services.map((service: any, index: number) => (
          <ServiceCard
            key={service._id || index}
            icon={getIcon(service.icon)}
            title={service.title}
            description={service.description}
            price={service.price}
            ctaText={service.ctaText}
            ctaLink={service.ctaLink}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;

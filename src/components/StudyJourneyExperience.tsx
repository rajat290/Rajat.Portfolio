
import { motion } from "framer-motion";
import { BookOpen, Briefcase } from "lucide-react";

type TimelineEntryProps = {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  index: number;
};

const TimelineEntry = ({ title, subtitle, date, description, index }: TimelineEntryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="relative pl-7 mb-8 group"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 
        shadow-[0_0_10px_rgba(155,135,245,0.7)] transition-all duration-300 group-hover:scale-125 
        group-hover:shadow-[0_0_15px_rgba(155,135,245,0.9)]" />
      
      {/* Timeline line */}
      {index !== 0 && (
        <div className="absolute left-1.5 top-[-12px] w-0.5 h-5 bg-gradient-to-b from-transparent to-purple-400/50" />
      )}
      
      <div className="glass p-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,135,245,0.2)] border border-white/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <span className="text-sm font-mono text-white/70">{date}</span>
        </div>
        <p className="text-white/80 font-medium mb-1">{subtitle}</p>
        {description && (
          <p className="text-sm text-white/60 mt-2">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

const StudyJourneyExperience = () => {
  // Education timeline data
  const education = [
    {
      title: "Master of Computer Applications",
      subtitle: "University of Delhi",
      date: "2018 - 2021",
      description: "Focused on advanced programming, system design, and data structures"
    },
    {
      title: "Bachelor of Computer Applications",
      subtitle: "University of Delhi",
      date: "2015 - 2018",
      description: "Foundation in programming languages, database management, and web development"
    },
    {
      title: "Higher Secondary Education",
      subtitle: "Delhi Public School",
      date: "2013 - 2015",
      description: "Computer Science, Mathematics, and Physics"
    }
  ];

  // Work experience timeline data
  const experience = [
    {
      title: "Senior Full Stack Developer",
      subtitle: "Tech Innovations Inc.",
      date: "2021 - Present",
      description: "Leading development of scalable web applications using modern technologies"
    },
    {
      title: "Frontend Developer",
      subtitle: "Digital Solutions Ltd.",
      date: "2019 - 2021",
      description: "Built responsive user interfaces with React, Next.js, and Tailwind CSS"
    },
    {
      title: "Web Developer Intern",
      subtitle: "CreativeTech Studios",
      date: "2018 - 2019",
      description: "Assisted in developing and maintaining client websites and applications"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  return (
    <section className="py-16 relative z-10" id="experience">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-10"
        >
          <motion.h2 
            variants={sectionVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-2"
          >
            My <span className="gradient-text">Journey</span> So Far
          </motion.h2>
          <motion.p 
            variants={sectionVariants}
            className="text-white/70 text-center mb-12"
          >
            Education and professional experiences that shaped my skills
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Academic Journey */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-xl p-6 backdrop-blur-md border border-white/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={24} className="text-purple-400" />
              <h3 className="text-2xl font-bold">
                Academic <span className="gradient-text">Journey</span>
              </h3>
            </div>
            <div className="space-y-1">
              {education.map((item, index) => (
                <TimelineEntry
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  date={item.date}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Professional Experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-xl p-6 backdrop-blur-md border border-white/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={24} className="text-pink-400" />
              <h3 className="text-2xl font-bold">
                Professional <span className="gradient-text">Experience</span>
              </h3>
            </div>
            <div className="space-y-1">
              {experience.map((item, index) => (
                <TimelineEntry
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  date={item.date}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudyJourneyExperience;

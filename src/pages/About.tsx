
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Image from "@/components/Image";
import { Briefcase, GraduationCap, Code, User, Heart } from "lucide-react";
import StudyJourneyExperience from "@/components/StudyJourneyExperience";
import TechStack from "@/components/TechStack";
import Breadcrumb from "@/components/Breadcrumb";

const About = () => {
  const technologies = [
    "JavaScript", "TypeScript", "React", "Next.js",
    "Node.js", "Express", "MongoDB", "PostgreSQL",
    "Tailwind CSS", "Framer Motion", "Git", "RESTful APIs"
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="container px-4 mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ title: "About Me" }]} />

      {/* Hero Section */}
      <SectionHeading
        title="About Me"
        subtitle="01. WHO I AM"
        description="I build accessible, inclusive products and digital experiences for the web."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-10">
        {/* Left Column - Image & Bio */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col space-y-6"
        >
          <div className="w-80 h-Full md:h-96 overflow-hidden rounded-xl border border-gray-800 relative">
            <Image
              src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
              alt="Professional portrait"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {["#FullStackDeveloper", "#FreeLanceDeveloper", "#OpentoWorkwithWorldwideClients", "#UI/UXDesigner", "#ProblemSolver",].map((tag, index) => (
              <span
                key={index}
                className="bg-secondary/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Text */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="flex flex-col space-y-6"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <User size={20} className="text-purple-400" />
              <h3 className="text-xl font-bold">Who I Am</h3>
            </motion.div>

            <p className="text-white/80 leading-relaxed">
              I'm a Strong Full Stack Developer with experience building scalable web applications, SaaS platforms, and API-driven systems using Node.js, Express.js, React.js, Next.js, and MongoDB. Skilled in architecting secure backends, implementing authentication/authorization (JWT, RBAC), integrating payment gateways (Razorpay), and designing optimized REST APIs.
              Proficient in building responsive, production-ready frontends with React, Next.js, Tailwind CSS, and component-driven design.
            </p>
            <p className="text-white/80 leading-relaxed">
              <b>My journey in technology </b> I have Hands-on experience delivering 10+ client projects, collaborating with cross-functional teams, leading developers, and deploying high-quality full-stack solutions.
              Strong understanding of system design, microservices concepts, Docker, cloud deployments (AWS/GCP), and database modeling. Passionate about solving complex technical problems, improving performance, and delivering seamless user experiences end-to-end.
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <Code size={20} className="text-purple-400" />
              <h3 className="text-xl font-bold">My Approach</h3>
            </motion.div>

            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                <span>User-centered design approach</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                <span>Clean, maintainable code</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                <span>Responsive and accessible interfaces</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                <span>Performance optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                <span>Continuous learning and improvement</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <Heart size={20} className="text-purple-400" />
              <h3 className="text-xl font-bold">When I'm Not Coding</h3>
            </motion.div>

            <p className="text-white/80 leading-relaxed">
              When I'm not in front of a computer screen, I enjoy exploring new technologies,
              reading about design principles, and spending time outdoors. I'm also passionate
              about Gym,Travelling, playing Sports, and trying new Places.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Technologies Section */}
      <TechStack />

      {/* Education & Experience Journey */}
      <StudyJourneyExperience />
    </div>
  );
};

export default About;

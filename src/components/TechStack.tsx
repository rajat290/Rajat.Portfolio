import { motion } from "framer-motion";
import { Code2, Database, Server, Laptop, Globe, BrainCircuit } from "lucide-react";

// Tech stack data organized by category
const techStackData = [{
  category: "Frontend",
  icon: <Laptop className="w-5 h-5 text-blue-400" />,
  technologies: [{
    name: "HTML",
    icon: "👩‍💻",
    color: "bg-orange-500"
  }, {
    name: "CSS",
    icon: "🎨",
    color: "bg-blue-500"
  }, {
    name: "JavaScript",
    icon: "⚡",
    color: "bg-yellow-500"
  }, {
    name: "TypeScript",
    icon: "📘",
    color: "bg-blue-600"
  }, {
    name: "React.JS",
    icon: "⚛️",
    color: "bg-cyan-500"
  }, {
    name: "Next.JS",
    icon: "N",
    color: "bg-black"
  }, {
    name: "Tailwind CSS",
    icon: "💨",
    color: "bg-cyan-400"
  }]
}, {
  category: "Backend",
  icon: <Server className="w-5 h-5 text-pink-400" />,
  technologies: [{
    name: "Node.JS",
    icon: "🟢",
    color: "bg-green-600"
  }, {
    name: "Express.JS",
    icon: "🚀",
    color: "bg-gray-700"
  }, {
    name: "Prisma",
    icon: "▲",
    color: "bg-purple-700"
  }, {
    name: "Zustand",
    icon: "🐻",
    color: "bg-yellow-600"
  }, {
    name: "Zod",
    icon: "Z",
    color: "bg-purple-500"
  }, {
    name: "Shadcn",
    icon: "◼️",
    color: "bg-gray-900"
  }]
}, {
  category: "Databases",
  icon: <Database className="w-5 h-5 text-green-400" />,
  technologies: [{
    name: "MongoDB",
    icon: "🍃",
    color: "bg-green-700"
  }, {
    name: "MySQL",
    icon: "🐬",
    color: "bg-blue-700"
  }, {
    name: "PostgreSQL",
    icon: "🐘",
    color: "bg-indigo-600"
  }]
}, {
  category: "Tools & DevOps",
  icon: <BrainCircuit className="w-5 h-5 text-violet-400" />,
  technologies: [{
    name: "Git",
    icon: "🔄",
    color: "bg-orange-600"
  }, {
    name: "GitHub",
    icon: "🐱",
    color: "bg-gray-800"
  }, {
    name: "Vercel",
    icon: "▲",
    color: "bg-gray-900"
  }, {
    name: "Postman",
    icon: "📬",
    color: "bg-orange-500"
  }, {
    name: "Linux",
    icon: "🐧",
    color: "bg-yellow-700"
  }, {
    name: "pnpm",
    icon: "📦",
    color: "bg-yellow-500"
  }, {
    name: "Java",
    icon: "☕",
    color: "bg-red-600"
  }]
}];

// Keywords for the scrolling banner
const scrollingKeywords = ["INTERACTIVE ✦", "SECURE ✦", "RELIABLE ✦", "ENGAGING ✦", "ACCESSIBLE ✦", "RESPONSIVE ✦", "DYNAMIC ✦", "SCALABLE ✦"];
const TechStack = () => {
  return <section className="py-20 md:py-28 relative overflow-hidden" id="skills">
      {/* Background 3D-like element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content container with glass effect */}
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <p className="text-sm font-mono text-muted-foreground mb-2 tracking-wider gradient-text">
            I CONSTANTLY TRY TO IMPROVE
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            My Tech Stack
          </h2>
        </motion.div>

        {/* Tech stack categories */}
        <div className="space-y-10 py-0 my-0 mx-0 px-0">
          {techStackData.map((category, index) => <motion.div key={category.category} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} viewport={{
          once: true
        }} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/5 p-2 rounded-md">
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="flex flex-wrap gap-3 py-[24px]">
                {category.technologies.map(tech => <motion.div key={tech.name} whileHover={{
              y: -5,
              boxShadow: `0 0 20px 0 ${tech.color === 'bg-black' ? 'rgba(0, 0, 0, 0.5)' : tech.color.replace('bg-', 'rgba(')})`
            }} className={`px-4 py-2 rounded-full ${tech.color === 'bg-black' ? 'bg-black' : tech.color} bg-opacity-20 border border-gray-700 flex items-center gap-2 transition-all duration-300`}>
                    <span className="text-lg">{tech.icon}</span>
                    <span className="font-medium">{tech.name}</span>
                  </motion.div>)}
              </div>
            </motion.div>)}
        </div>
      </div>

      {/* Scrolling banner */}
      <div className="mt-24 relative">
        <div className="relative w-full h-28 overflow-hidden">
          {/* Tilted banner */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 -skew-y-3 transform -translate-y-10"></div>
          
          {/* Keywords container */}
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <motion.div className="flex whitespace-nowrap text-white font-semibold text-xl" animate={{
            x: '-50%'
          }} transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}>
              {/* Duplicate keywords for seamless looping */}
              {[...scrollingKeywords, ...scrollingKeywords].map((keyword, index) => <span key={index} className="mx-4">{keyword}</span>)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
};
export default TechStack;
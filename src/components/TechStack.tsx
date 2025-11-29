import { motion, AnimatePresence, wrap } from "framer-motion";
import { Database, Server, Laptop, BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";

/* ---------- Tech Stack Data ---------- */
const techStackData = [
  {
    category: "Frontend",
    icon: <Laptop className="w-5 h-5 text-blue-400" />,
    technologies: [
      { name: "HTML", icon: "👩‍💻", color: "bg-orange-500" },
      { name: "CSS", icon: "🎨", color: "bg-blue-500" },
      { name: "React.JS", icon: "⚛️", color: "bg-cyan-500" },
      { name: "Next.JS", icon: "N", color: "bg-black" },
      { name: "Tailwind CSS", icon: "💨", color: "bg-cyan-400" },
      { name: "Framer Motion", icon: "🎉", color: "bg-green-500" },
      { name: "Three.JS", icon: "🎉", color: "bg-gray-800" },
      { name: "Bootstrap", icon: "🔄", color: "bg-pink-500" }
    ]
  },

  {
    category: "Backend",
    icon: <Server className="w-5 h-5 text-pink-400" />,
    technologies: [
      { name: "Node.JS", icon: "🟢", color: "bg-green-600" },
      { name: "Express.JS", icon: "🚀", color: "bg-gray-700" },
      { name: "Prisma", icon: "▲", color: "bg-purple-700" },
      { name: "Zustand", icon: "🐻", color: "bg-yellow-600" },
      { name: "Zod", icon: "Z", color: "bg-purple-500" },
      { name: "Shadcn", icon: "◼️", color: "bg-gray-900" }
    ]
  },

  {
    category: "Programming",
    icon: <Server className="w-5 h-5 text-pink-400" />,
    technologies: [
      { name: "JavaScript", icon: "⚡", color: "bg-green-600" },
      { name: "TypeScript", icon: "📘", color: "bg-gray-700" },
      { name: "OOPs", icon: "📚", color: "bg-purple-700" },
      { name: "Design Patterns", icon: "🧩", color: "bg-yellow-600" },
      { name: "Dependency Injection", icon: "🛠️", color: "bg-purple-500" },
      {
        name: "Problem Solving, Debugging & Error Handling",
        icon: "💡",
        color: "bg-gray-900"
      }
    ]
  },

  {
    category: "Databases",
    icon: <Database className="w-5 h-5 text-green-400" />,
    technologies: [
      { name: "MongoDB", icon: "🍃", color: "bg-green-700" },
      { name: "MySQL", icon: "🐬", color: "bg-blue-700" },
      { name: "PostgreSQL", icon: "🐘", color: "bg-indigo-600" }
    ]
  },

  {
    category: "Tools & DevOps",
    icon: <BrainCircuit className="w-5 h-5 text-violet-400" />,
    technologies: [
      { name: "Git", icon: "🔄", color: "bg-orange-600" },
      { name: "GitHub", icon: "🐱", color: "bg-gray-800" },
      { name: "Vercel", icon: "▲", color: "bg-gray-900" },
      { name: "Postman", icon: "📬", color: "bg-orange-500" },
      { name: "Linux", icon: "🐧", color: "bg-yellow-700" },
      { name: "Docker", icon: "📦", color: "bg-yellow-500" },
      { name: "RESTful APIs", icon: "☕", color: "bg-red-600" }
    ]
  }
];

/* ---------- Reusable Card ---------- */
const CategoryCard = ({ category }) => (
  <div className="border border-gray-700 rounded-xl p-5 bg-white/5 backdrop-blur">
    <div className="flex items-center gap-2 mb-4">
      <span className="bg-white/10 p-2 rounded-md">{category.icon}</span>
      <h3 className="text-xl font-semibold">{category.category}</h3>
    </div>

    <div className="flex flex-wrap gap-3 py-[24px]">
      {category.technologies.map((tech) => (
        <motion.div
          key={tech.name}
          whileHover={{ y: -5 }}
          className={`px-4 py-2 rounded-full ${tech.color} bg-opacity-20 border border-gray-700 flex items-center gap-2 transition-all duration-300`}
        >
          <span className="text-lg">{tech.icon}</span>
          <span className="font-medium">{tech.name}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ---------- MAIN COMPONENT ---------- */
const TechStack = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const index = wrap(0, techStackData.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 3000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="skills">
      <div className="container relative z-10">
        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">My Tech Stack</h2>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block space-y-10">
          {techStackData.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>

        {/* MOBILE CAROUSEL */}
        {/* MOBILE CAROUSEL */}
<div className="md:hidden relative w-full min-h-[430px] overflow-hidden flex items-center">
  <AnimatePresence initial={false} custom={direction}>
    <motion.div
      key={page}
      custom={direction}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.35}
      onDragEnd={(e, { offset }) => {
        if (offset.x < -120) paginate(1);
        else if (offset.x > 120) paginate(-1);
      }}
      initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="absolute w-full px-2"
    >
      <CategoryCard category={techStackData[index]} />
    </motion.div>
  </AnimatePresence>
</div>


        {/* Pagination dots */}
        <div className="md:hidden flex justify-center gap-2 mt-6">
          {techStackData.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                index === i ? "bg-blue-500 scale-125" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

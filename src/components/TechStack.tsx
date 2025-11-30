import { motion, AnimatePresence, wrap } from "framer-motion";
import { Database, Server, Laptop, BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

// API call to fetch tech stack data
const fetchTechStack = async () => {
  const response = await apiClient.get('/techstack');
  return response.data.data || [];
};

/* ---------- Reusable Card ---------- */
const CategoryCard = ({ category }) => (
  <div className="border border-gray-700 rounded-xl p-5 bg-white/5 backdrop-blur">
    <div className="flex items-center gap-2 mb-4">
      <span className="bg-white/10 p-2 rounded-md">{category.icon}</span>
      <h3 className="text-xl font-semibold">{category.category}</h3>
    </div>

    <div className="flex flex-wrap gap-3 py-[20px]">
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

  // Fetch tech stack data from API
  const { data: techStackData = [], isLoading, error } = useQuery({
    queryKey: ['techstack'],
    queryFn: fetchTechStack,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const index = wrap(0, techStackData.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 3000);
    return () => clearInterval(timer);
  }, [page]);

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 md:py-28 relative overflow-hidden" id="skills">
        <div className="container relative z-10">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">My Tech Stack</h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 md:py-28 relative overflow-hidden" id="skills">
        <div className="container relative z-10">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">My Tech Stack</h2>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-400">Failed to load tech stack. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no data
  if (!techStackData || techStackData.length === 0) {
    return null;
  }

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

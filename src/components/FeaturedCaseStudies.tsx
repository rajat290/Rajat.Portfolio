import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowRight, Flag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Style B — Fancy UI:
 * - small arrows inside image
 * - gradient fade edges
 * - hover zoom animation
 *
 * Behavior:
 * - inner swiper autoplays through all images (no loop)
 * - when inner swiper reaches the last slide (onReachEnd), we call nextSlide()
 * - outer carousel (Framer Motion) remains for layout/drag animations
 */

const DRAG_DISTANCE_THRESHOLD = 180;

// API call to fetch featured projects
const fetchFeaturedProjects = async () => {
  const response = await apiClient.get('/projects?featured=true');
  return response.data.data || [];
};

const FeaturedCaseStudies = () => {
  const [current, setCurrent] = useState(0);
  const x = useMotionValue(0);

  // Fetch featured projects from API
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: fetchFeaturedProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const nextSlide = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const handleDragEnd = () => {
    const draggedDistance = x.get();
    if (draggedDistance < -DRAG_DISTANCE_THRESHOLD) nextSlide();
    else if (draggedDistance > DRAG_DISTANCE_THRESHOLD) prevSlide();
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <div className="mb-8 md:mb-16">
          <p className="text-sm font-mono text-muted-foreground mb-2">
            FEATURED CASE STUDIES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Curated{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              work
            </span>
          </h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 md:py-24">
        <div className="mb-8 md:mb-16">
          <p className="text-sm font-mono text-muted-foreground mb-2">
            FEATURED CASE STUDIES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Curated{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              work
            </span>
          </h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-400">Failed to load featured projects. Please try again later.</p>
        </div>
      </section>
    );
  }

  // Don't render if no projects
  if (!projects || projects.length === 0) {
    return null;
  }

  const project = projects[current];

  const innerSwiperRef = useRef(null);

  return (
    <section className="py-16 md:py-24">
      {/* HEADER */}
      <div className="mb-8 md:mb-16">
        <p className="text-sm font-mono text-muted-foreground mb-2">
          FEATURED CASE STUDIES
        </p>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Curated{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            work
          </span>
        </h2>
      </div>

      <div className="relative">
        <button
          onClick={prevSlide}
          aria-label="Previous project"
          className="absolute -left-3 md:-left-10 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full z-30"
        >
          <ArrowRight className="rotate-180 text-white" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next project"
          className="absolute -right-3 md:-right-10 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full z-30"
        >
          <ArrowRight className="text-white" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.45 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT: IMAGE SLIDES */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-purple-600/40 z-[-1]" />

                <div className="p-6 md:p-10 bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-pink-900/90 border border-purple-500/20 rounded-2xl">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 mb-6">{project.description}</p>

                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <Swiper
                      key={current}
                      modules={[Autoplay, Navigation, Pagination]}
                      autoplay={{
                        delay: 1800,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      loop={false}
                      navigation={{
                        nextEl: `.inner-next-${current}`,
                        prevEl: `.inner-prev-${current}`,
                      }}
                      pagination={{ clickable: true }}
                      onSwiper={(swiper) => (innerSwiperRef.current = swiper)}
                      onReachEnd={() => {
                        setTimeout(() => nextSlide(), 600);
                      }}
                      className="w-full"
                    >
                      {project.images.map((src, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="relative w-full h-[320px] md:h-[420px]">
                            <motion.img
                              src={src}
                              alt=""
                              className="object-cover w-full h-full rounded-xl"
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}

                      <div
                        className={`inner-prev-${current} absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-2 rounded-full hover:bg-black/60`}
                        style={{ display: "flex" }}
                      >
                        <ArrowRight className="rotate-180 text-white" size={16} />
                      </div>

                      <div
                        className={`inner-next-${current} absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-2 rounded-full hover:bg-black/60`}
                        style={{ display: "flex" }}
                      >
                        <ArrowRight className="text-white" size={16} />
                      </div>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-pink-500 p-1 rounded-md">
                  <Flag size={16} className="text-white" />
                </span>
                <h3 className="text-2xl font-bold">{project.title}</h3>
              </div>

              <p className="text-gray-300 mb-8">{project.longDescription}</p>

              <div className="space-y-4 mb-10">
                {(project.points || []).map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold text-lg pt-1">+</span>
                    <p className="text-gray-300">{point}</p>
                  </div>
                ))}
              </div>

              {/* TECH STACK */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(project.tech || []).map((tech, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-gray-800/50 border border-gray-700 text-sm"
                  >
                    <span className="text-pink-400">{tech.icon}</span>
                    {tech.name}
                  </motion.span>
                ))}
              </div>

              {/* ⭐⭐⭐ LINKS SECTION — NEW ⭐⭐⭐ */}
              {project.links && project.links.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Project Links
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.07, x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg 
                        bg-gradient-to-r from-pink-600/40 via-purple-600/40 to-pink-600/40
                        border border-pink-500/40
                        text-pink-200 font-medium
                        backdrop-blur-md shadow-md
                        hover:shadow-pink-500/40 transition"
                      >
                        {link.name}
                        <ArrowRight size={16} className="text-pink-300" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* PAGINATION */}
        <div className="flex justify-center mt-10 gap-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current
                  ? "bg-pink-500 scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;

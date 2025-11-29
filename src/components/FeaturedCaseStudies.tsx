import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowRight, Flag } from "lucide-react";

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

const DRAG_DISTANCE_THRESHOLD = 80;

const projects = [
  {
    title: "Next Ventures",
    description:
      "A online space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design.",
    longDescription:
      "Developed a platform for virtual pitch competitions using Next.js 15, enabling smooth idea sharing and exploration with optimal performance.",
    images: [
      "/dummy/next1.png",
      "/dummy/next2.png",
      "/dummy/next3.png",
      "/dummy/next4.png",
      "/dummy/next5.png",
    ],
    points: [
      "Leveraged Partial Prerendering and After for faster loading.",
      "Simplified idea submission with a clean, intuitive design.",
      "Enhanced browsing with seamless performance optimization.",
    ],
    tech: [
      { name: "Next.js", icon: "N" },
      { name: "React", icon: "⚛️" },
      { name: "Tailwind CSS", icon: "💨" },
      { name: "TypeScript", icon: "TS" },
      { name: "Framer Motion", icon: "🔄" },
    ],
  },

  {
    title: "CineX — Movie Booking App",
    description:
      "Cinex is a full-featured movie booking platform with responsive design.",
    longDescription:
      "Cinex is a full-featured movie booking platform that allows users to browse movies with advanced filtering, book seats, make secure payments via Razorpay, and receive confirmations via email.",
    images: [
      "/dummy/cinex1.png",
      "/dummy/cinex2.png",
      "/dummy/cinex3.png",
      "/dummy/cinex4.png",
      "/dummy/cinex5.png",
    ],
    points: [
      "Real-time seat booking with optimized backend performance.",
      "Secure online payments integrated using Razorpay.",
      "Automated email notifications using Nodemailer.",
    ],
    tech: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Razorpay", icon: "💳" },
    ],
  },

  {
    title: "Tech Learning Portal",
    description:
      "A sleek online portal for students to access tutorials, quizzes, and structured learning paths.",
    longDescription:
      "Created an adaptive learning UI with personalized progress tracking and interactive components.",
    images: [
      "/dummy/learn1.png",
      "/dummy/learn2.png",
      "/dummy/learn3.png",
      "/dummy/learn4.png",
      "/dummy/learn5.png",
    ],
    points: [
      "Gamified UI for better engagement.",
      "Fast, SEO-friendly performance.",
      "Clean modular design system.",
    ],
    tech: [
      { name: "Next.js", icon: "N" },
      { name: "Tailwind", icon: "💨" },
      { name: "ShadCN UI", icon: "⚙️" },
    ],
  },
];

const FeaturedCaseStudies = () => {
  const [current, setCurrent] = useState(0);
  const x = useMotionValue(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const handleDragEnd = () => {
    const draggedDistance = x.get();
    if (draggedDistance < -DRAG_DISTANCE_THRESHOLD) nextSlide();
    else if (draggedDistance > DRAG_DISTANCE_THRESHOLD) prevSlide();
  };

  const project = projects[current];

  // ref to inner swiper so we can control it if needed (optional)
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

      {/* WRAPPER */}
      <div className="relative">
        {/* OUTER ARROWS */}
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

        {/* OUTER SLIDE (Framer Motion) */}
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
            {/* LEFT: IMAGE CAROUSEL (Swiper) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden relative">
                {/* gradient border behind card */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-purple-600/40 z-[-1]" />

                <div className="p-6 md:p-10 bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-pink-900/90 border border-purple-500/20 rounded-2xl">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 mb-6">{project.description}</p>

                  {/* IMAGE CAROUSEL BOX */}
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    {/* gradient fade edges (left + right) */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-pink-900/80 to-transparent z-20" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-pink-900/80 to-transparent z-20" />

                    <Swiper
                      key={current} // remount on outer change so autoplay resets
                      modules={[Autoplay, Navigation, Pagination]}
                      autoplay={{
                        delay: 1800,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      loop={false} // we want to detect reachEnd
                      navigation={{
                        nextEl: `.inner-next-${current}`,
                        prevEl: `.inner-prev-${current}`,
                      }}
                      pagination={{ clickable: true }}
                      onSwiper={(swiper) => {
                        innerSwiperRef.current = swiper;
                      }}
                      onReachEnd={() => {
                        // when inner reaches the last slide, move outer forward
                        // small timeout to let the user see the last slide briefly
                        setTimeout(() => {
                          nextSlide();
                        }, 600);
                      }}
                      className="w-full"
                    >
                      {project.images.map((src, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="relative w-full h-[320px] md:h-[420px]">
                            {/* Hover zoom via Framer Motion */}
                            <motion.img
                              src={src}
                              alt={`${project.title} screenshot ${idx + 1}`}
                              className="object-cover w-full h-full rounded-xl"
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}

                      {/* Inner navigation arrows (small, inside image) */}
                      <div
                        className={`inner-prev-${current} absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-2 rounded-full transform transition hover:bg-black/60`}
                        style={{ display: "flex" }}
                      >
                        <ArrowRight className="rotate-180 text-white" size={16} />
                      </div>

                      <div
                        className={`inner-next-${current} absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-2 rounded-full transform transition hover:bg-black/60`}
                        style={{ display: "flex" }}
                      >
                        <ArrowRight className="text-white" size={16} />
                      </div>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-pink-500 p-1 rounded-md">
                  <Flag size={16} className="text-white" />
                </span>
                <h3 className="text-2xl font-bold">{project.title}</h3>
              </div>

              <p className="text-gray-300 mb-8">{project.longDescription}</p>

              {/* POINTS */}
              <div className="space-y-4 mb-10">
                {(project.points || []).map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold text-lg pt-1">+</span>
                    <p className="text-gray-300">{point}</p>
                  </div>
                ))}
              </div>

              {/* TECH STACK */}
              <div className="flex flex-wrap gap-2">
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
            </div>
          </motion.div>
        </AnimatePresence>

        {/* OUTER PAGINATION */}
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

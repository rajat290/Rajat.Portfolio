
import SectionHeading from "@/components/SectionHeading";
import ExperienceItem from "@/components/Experience";

const experiences = [
  {
    company: "Tech Innovation Labs",
    position: "Senior Frontend Developer",
    period: "2022 - Present",
    description: "Lead the frontend development team in designing and implementing user interfaces for various web applications. Collaborated with UX designers and backend engineers to deliver high-quality products.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
  },
  {
    company: "Digital Solutions Inc.",
    position: "Full Stack Developer",
    period: "2020 - 2022",
    description: "Developed and maintained full-stack web applications. Implemented responsive designs and integrated RESTful APIs. Participated in code reviews and mentored junior developers.",
    technologies: ["JavaScript", "React", "Node.js", "Express", "MongoDB"]
  },
  {
    company: "WebCraft Agency",
    position: "UI/UX Developer",
    period: "2018 - 2020",
    description: "Created responsive and intuitive user interfaces for clients across various industries. Collaborated with designers to implement pixel-perfect designs and improve user experience.",
    technologies: ["HTML", "CSS", "JavaScript", "Figma", "Adobe XD"]
  }
];

const ExperiencePage = () => {
  return (
    <div>
      <SectionHeading title="Experience" subtitle="02. WHERE I'VE WORKED" />
      
      <div className="mt-10">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            company={exp.company}
            position={exp.position}
            period={exp.period}
            description={exp.description}
            technologies={exp.technologies}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;

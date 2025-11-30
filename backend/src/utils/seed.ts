import mongoose from 'mongoose';
import Project from '../models/Project';
import TechStack from '../models/TechStack';
import Service from '../models/Service';
import Experience from '../models/Experience';
import About from '../models/About';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Project.deleteMany({});
    await TechStack.deleteMany({});
    await Service.deleteMany({});
    await Experience.deleteMany({});
    await About.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Seed Projects (Featured Case Studies)
    const featuredProjects = [
      {
        title: "PaddleLift",
        description: "A Noida Based HR Company Who provides resources to another companies and post their jobs on their portal.",
        longDescription: "Developed a user-friendly website and job portal platform where the company can showcase its statistics, presence, portfolio, industries served, and contact details. The integrated job portal with RBAC authentication that allows them to list open positions and share new job openings directly with potential candidates. and also accept applications from candidates and their resumes.",
        technologies: ["Next.js", "Redux", "Tailwind CSS", "TypeScript", "Node.JS", "Express.JS", "PostgreSQL", "Prisma"],
        images: [
          "src/Img/PaddleLift/Hero.png",
          "src/Img/PaddleLift/Hero2.png",
          "src/Img/PaddleLift/jobPortal.png",
          "src/Img/PaddleLift/JobOpening.png",
          "src/Img/jobApply.png"
        ],
        points: [
          "Leveraged Partial Prerendering and After for faster loading.",
          "Simplified idea submission with a clean, intuitive design.",
          "Enhanced browsing with seamless performance optimization."
        ],
        githubLink: "https://github.com",
        liveLink: "https://paddlelift.com/",
        featured: true
      },
      {
        title: "CommunityLink — CakePHP Volunteer Platform",
        description: "A comprehensive volunteer management platform developed for One of my Australian Client to run a non-profit organization to connect community partners with volunteers.",
        longDescription: "CommunityLink is a robust web application designed for non-profit organizations to manage volunteer programs efficiently. Built with CakePHP 5, it features a complete CRUD system, advanced search functionality using QueryBuilder, secure file uploads, and a comprehensive dashboard with business intelligence insights. The application follows Australian standards with proper timezone configuration and professional branding.",
        technologies: ["CakePHP 5", "PHP 8.2", "MySQL", "Bootstrap 5", "JavaScript", "jQuery", "Composer", "Apache"],
        images: [
          "src/Img/CommunityLInk/Screenshot 2025-11-15 122237.png",
          "src/Img/CommunityLInk/Screenshot 2025-11-15 152743.png",
          "src/Img/CommunityLInk/Screenshot 2025-11-15 152812.png",
          "src/Img/CommunityLInk/Screenshot 2025-11-15 152833.png",
          "src/Img/CommunityLInk/Screenshot 2025-11-15 152855.png"
        ],
        points: [
          "Implemented MVC architecture with proper separation of concerns.",
          "Developed server-side search using CakePHP QueryBuilder with multi-field filtering.",
          "Created secure file upload system for document management with validation.",
          "Built responsive UI with Bootstrap 5 and custom CommunityLink branding.",
          "Configured Australian localization with proper timezone and date formatting.",
          "Designed relational database schema with 8 interconnected tables."
        ],
        githubLink: "https://github.com",
        liveLink: "https://demo-communitylink.example.com",
        featured: true
      }
    ];

    // Seed Regular Projects
    const regularProjects = [
      {
        title: "Cinex - Movie ticket booking App",
        description: "A modern e-commerce platform with responsive design and Stripe integration.",
        longDescription: "A modern e-commerce platform with a responsive design, user authentication, product search and filtering, shopping cart, and checkout functionality. Built with React, Node.js, Express, and MongoDB, with Stripe integration for payments.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
        githubLink: "https://github.com",
        liveLink: "https://demo-ecommerce.example.com",
        image: "src/Img/Cinex/image.png",
        featured: false
      },
      {
        title: "GetSchool - School Management System",
        description: "A full-stack task management application with drag-and-drop interface.",
        longDescription: "A full-stack task management application with drag-and-drop interface, user authentication, task categorization, and real-time updates. Features include task prioritization, due dates, and team collaboration tools.",
        technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
        githubLink: "https://github.com",
        liveLink: "https://demo-taskmanager.example.com",
        image: "src/Img/localhost_5173_ copy.png",
        featured: false
      },
      {
        title: "GetLearn - Online Learning Platform",
        description: "A minimalist portfolio website showcasing projects, skills, and experience.",
        longDescription: "A minimalist portfolio website showcasing projects, skills, and experience. Features responsive design, animations, and contact form. Built with Next.js for optimal performance and SEO.",
        technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
        githubLink: "https://github.com",
        liveLink: "https://demo-portfolio.example.com",
        image: "src/Img/Screenshot 2025-09-03 134309.png",
        featured: false
      },
      {
        title: "GetPay - Payment Receiving App",
        description: "A weather dashboard that displays current weather conditions and forecasts.",
        longDescription: "A weather dashboard that displays current weather conditions and forecasts for multiple locations. Features interactive maps and charts, historical weather data comparisons, and custom alerts.",
        technologies: ["React", "Chart.js", "OpenWeather API", "Leaflet"],
        githubLink: "https://github.com",
        liveLink: "https://demo-weather.example.com",
        image: "src/Img/image.png",
        featured: false
      },
      {
        title: "FleetLink - Vehicle Booking System",
        description: "A dashboard for managing and analyzing social media accounts across platforms.",
        longDescription: "A dashboard for managing and analyzing social media accounts across multiple platforms. Features analytics, content scheduling, and engagement tracking with visual representations of trends and user engagement.",
        technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
        githubLink: "https://github.com",
        liveLink: "https://demo-socialdashboard.example.com",
        image: "src/Img/image copy.png",
        featured: false
      },
      {
        title: "RajatTomar's_Recipes",
        description: "A recipe application that allows users to browse, search, save, and share recipes.",
        longDescription: "A recipe application that allows users to browse, search, save, and share recipes. Features user authentication, recipe categories, and a responsive design. Users can create shopping lists and meal plans based on selected recipes.",
        technologies: ["React", "Firebase", "CSS Modules", "Spoonacular API"],
        githubLink: "https://github.com",
        liveLink: "https://demo-recipes.example.com",
        image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
        featured: false
      }
    ];

    await Project.insertMany([...featuredProjects, ...regularProjects]);
    console.log('✅ Projects seeded successfully');

    // Seed Tech Stack
    const techStackData = [
      {
        category: "Frontend",
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
        technologies: [
          { name: "JavaScript", icon: "⚡", color: "bg-green-600" },
          { name: "TypeScript", icon: "📘", color: "bg-gray-700" },
          { name: "OOPs", icon: "📚", color: "bg-purple-700" },
          { name: "Design Patterns", icon: "🧩", color: "bg-yellow-600" },
          { name: "Dependency Injection", icon: "🛠️", color: "bg-purple-500" },
          { name: "Problem Solving, Debugging & Error Handling", icon: "💡", color: "bg-gray-900" }
        ]
      },
      {
        category: "Databases",
        technologies: [
          { name: "MongoDB", icon: "🍃", color: "bg-green-700" },
          { name: "MySQL", icon: "🐬", color: "bg-blue-700" },
          { name: "PostgreSQL", icon: "🐘", color: "bg-indigo-600" }
        ]
      },
      {
        category: "Tools & DevOps",
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

    await TechStack.insertMany(techStackData);
    console.log('✅ Tech Stack seeded successfully');

    // Seed Services
    const servicesData = [
      {
        title: "Custom Website Development",
        description: "Responsive websites built with modern frameworks and as Client Requirements, optimized for performance and user experience.",
        icon: "Globe",
        price: "$25/Hours",
        ctaText: "Get started",
        ctaLink: "#contact"
      },
      {
        title: "Complete Web/Mobile Applications",
        description: "Full-stack web applications built with client requirements with a focus on performance,and dedicated Android and iOS Application perfect for complex interactive growth incentive businesses.",
        icon: "Code",
        price: "$2,500+",
        ctaText: "Discuss your project",
        ctaLink: "#contact"
      },
      {
        title: "Complete Management Systems for Any Industries",
        description: "Comprehensive Management systems for Business to manage students, staff,worker, inventory, classes, fee, and administrative tasks and many more things efficiently.",
        icon: "School",
        price: "$3,000+",
        ctaText: "Learn more",
        ctaLink: "#contact"
      },
      {
        title: "Complete Restaurant & Hotel Management Systems",
        description: "Reservation Management, Order Processing, Customer Relationship Management, Reporting and Analytics",
        icon: "Database",
        price: "$1,000+",
        ctaText: "Get a quote",
        ctaLink: "#contact"
      },
      {
        title: "API Development",
        description: "Robust, secure, and well-documented REST or GraphQL APIs to power your web and mobile applications.",
        icon: "Server",
        price: "$1,500+",
        ctaText: "Discuss requirements",
        ctaLink: "#contact"
      },
      {
        title: "Custom Enterprise Solutions",
        description: "Tailored enterprise-grade applications designed specifically for your business needs and workflow requirements.",
        icon: "Users",
        price: "Custom",
        ctaText: "Request consultation",
        ctaLink: "#contact"
      }
    ];

    await Service.insertMany(servicesData);
    console.log('✅ Services seeded successfully');

    // Seed Experience
    const experienceData = [
      {
        title: "Full Stack Developer",
        subtitle: "Getsetdeployed (Remote)",
        date: "2024 - Present",
        description: "Developing full-stack web applications using React, Node.js, and MongoDB. Leading development of scalable SaaS platforms and implementing modern web technologies.",
        type: "work"
      },
      {
        title: "Freelance Full Stack Developer",
        subtitle: "Self-Employed",
        date: "2023 - Present",
        description: "Building custom web applications for clients worldwide. Specializing in React, Next.js, Node.js, and database design. Managing end-to-end project delivery from concept to deployment.",
        type: "work"
      },
      {
        title: "MASTER IN COMPUTER APPLICATIONS",
        subtitle: "Galgotias University",
        date: "2022 - 2024",
        description: "Focused on Advanced programming, system design, and data structures and Data Analytics",
        type: "education"
      },
      {
        title: "BACHELOR IN COMPUTER APPLICATIONS",
        subtitle: "BBD University",
        date: "2019 - 2022",
        description: "Foundation in programming languages, Networking, Cyber Security, and web development",
        type: "education"
      },
      {
        title: "Higher Secondary Education",
        subtitle: "SVMIC",
        date: "2013 - 2018",
        description: "Physics, Chemistry and Mathematics",
        type: "education"
      }
    ];

    await Experience.insertMany(experienceData);
    console.log('✅ Experience seeded successfully');

    // Seed About
    const aboutData = {
      name: "Rajat Tomar",
      title: "Full Stack Developer",
      bio: "I'm a Strong Full Stack Developer with experience building scalable web applications, SaaS platforms, and API-driven systems using Node.js, Express.js, React.js, Next.js, and MongoDB. Skilled in architecting secure backends, implementing authentication/authorization (JWT, RBAC), integrating payment gateways (Razorpay), and designing optimized REST APIs. Proficient in building responsive, production-ready frontends with React, Next.js, Tailwind CSS, and component-driven design.",
      journey: "My journey in technology I have Hands-on experience delivering 10+ client projects, collaborating with cross-functional teams, leading developers, and deploying high-quality full-stack solutions. Strong understanding of system design, microservices concepts, Docker, cloud deployments (AWS/GCP), and database modeling. Passionate about solving complex technical problems, improving performance, and delivering seamless user experiences end-to-end.",
      approach: [
        "User-centered design approach",
        "Clean, maintainable code",
        "Responsive and accessible interfaces",
        "Performance optimization",
        "Continuous learning and improvement"
      ],
      interests: "When I'm not in front of a computer screen, I enjoy exploring new technologies, reading about design principles, and spending time outdoors. I'm also passionate about Gym, Travelling, playing Sports, and trying new Places.",
      image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      tags: ["#FullStackDeveloper", "#FreeLanceDeveloper", "#OpentoWorkwithWorldwideClients", "#UI/UXDesigner", "#ProblemSolver"],
      technologies: [
        "JavaScript", "TypeScript", "React", "Next.js",
        "Node.js", "Express", "MongoDB", "PostgreSQL",
        "Tailwind CSS", "Framer Motion", "Git", "RESTful APIs"
      ]
    };

    await About.create(aboutData);
    console.log('✅ About seeded successfully');

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

export default seedDatabase;

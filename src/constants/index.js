export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#home",
    to: "home",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
    to: "about",
  },
  {
    id: 3,
    name: "Projects",
    href: "#projects",
    to: "projects",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
    to: "contact",
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    // deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskScale: isSmall ? -0.08 : isMobile ? -0.08 : -0.12,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall
      ? [-0.3, -2, 0]
      : isMobile
      ? [-0.3, -2, 0]
      : isTablet
      ? [-0.3, -2, 0]
      : [-0.3, -2.5, 0],
    pinkCubePosition: isSmall
      ? [-4, -5, 0]
      : isMobile
      ? [-7, -5, 0]
      : isTablet
      ? [-9, -5, 0]
      : [-9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
      ? [5, 4, 0]
      : isTablet
      ? [9, 4, 0]
      : [12, 5, 0],
    ringPosition: isSmall
      ? [-5, 7, 0]
      : isMobile
      ? [-10, 10, 0]
      : isTablet
      ? [-12, 10, 0]
      : [-24, 10, 0],
    greenRingPosition: isSmall
      ? [-11, 1.7, 0]
      : isMobile
      ? [-10, -1.1, 0]
      : isTablet
      ? [-16, -1.1, 0]
      : [-24, -1.1, 0],
    targetPosition: isSmall
      ? [5, -12, -10]
      : isMobile
      ? [9, -12, -10]
      : isTablet
      ? [11, -7, -10]
      : [13, -13, -10],
    dronePosition: isSmall
      ? [-5, 2, -10]
      : isMobile
      ? [-9, 5, -10]
      : isTablet
      ? [-12, 5, -10]
      : [-13, 7, -10],
  };
};

export const myProjects = [
  {
    title: "Legal Accounting System for SMEs",
    desc: "This project delivers a robust and user-friendly accounting system tailored for small legal firms, enhancing their operational efficiency and allowing them to better manage their finances, cases, and clients.",
    subdesc:
      "Build using PHP Laravel framework, Tailwind CSS, Vue JS, and MySQL for database. Hosted on Vercel",
    href: "https://legal-ace-sme.vercel.app/",
    github: "https://github.com/chairielazizi/legal-ace-sme",
    texture: "/textures/project/project-accounting.webm",
    logo: "/assets/project-logo4.png",
    logoStyle: {
      // backgroundColor: "#2A1816",
      // border: "0.2px solid #36201D",
      // boxShadow: "0px 0px 60px 0px #AA3C304D",
      backgroundColor: "#0E1F38",
      border: "0.2px solid #0E2D58",
      boxShadow: "0px 0px 60px 0px #2F67B64D",
    },
    spotlight: "/assets/spotlight4.png",
    tags: [
      {
        id: 1,
        name: "PHP",
        path: "/assets/php.svg",
      },
      {
        id: 2,
        name: "Laravel",
        path: "/assets/laravel.svg",
      },
      {
        id: 3,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 4,
        name: "Vue JS",
        path: "/assets/vuejs.svg",
      },
      {
        id: 5,
        name: "MySQL",
        path: "/assets/mysql.svg",
      },
    ],
  },
  {
    title: "IMDB Like App",
    desc: "An simple IMDB like website ",
    subdesc:
      "Built using Next.js(A React framework), Tailwind CSS, MongoDB Atlas for database, and Clerk for authentication and authorization",
    href: "https://nextjs-imdb-rosy.vercel.app/",
    github: "https://github.com/chairielazizi/nextjs_imdb",
    texture: "/textures/project/project-imdb.webm",
    logo: "/assets/project-logo1.png",
    logoStyle: {
      // backgroundColor: "#13202F",
      // border: "0.2px solid #17293E",
      // boxShadow: "0px 0px 60px 0px #2F6DB54D",
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
    tags: [
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
      {
        id: 4,
        name: "Next JS",
        path: "/assets/nextjs.svg",
      },
      {
        id: 5,
        name: "MongoDB",
        path: "/assets/mongodb.svg",
      },
    ],
  },
  {
    title: "Expense Tracker System",
    desc: "A very simple expense tracker system",
    subdesc:
      "Build using ASP.NET Core MVC stack, Bootstrap 5, Syncfusion component, Microsoft SQL Server for the database and hosted on Microsoft Azure.",
    // href: "https://airielexpensetracker.azurewebsites.net/",
    href: "http://expense-tracker.runasp.net/",
    github: "https://github.com/chairielazizi/ExpenseTracker",
    texture: "/textures/project/project-expense.webm",
    logo: "/assets/project-logo2.png",
    logoStyle: {
      // backgroundColor: "#60f5a1",
      // background:
      //   "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      // border: "0.2px solid rgba(208, 213, 221, 1)",
      // boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight2.png",
    tags: [
      {
        id: 1,
        name: "C#",
        path: "/assets/c-sharp.svg",
      },
      {
        id: 2,
        name: "Bootstrap",
        path: "assets/bootstrap5.svg",
      },
      {
        id: 3,
        name: "Microsoft Azure",
        path: "/assets/azure.svg",
      },
      {
        id: 4,
        name: "Microsoft SQL Server",
        path: "/assets/microsoft-sql-server.svg",
      },
    ],
  },
  {
    title: "Product Management System",
    desc: "A very simple product management system to manage products, to test the framework of Java Spring Boot",
    subdesc:
      "Built using Java Spring Boot for the backend, React.js, Typescript and Tailwind for the frontend, PostgreSQL for the database, hosted using Docker and Render.",
    href: "https://springboot-product-management-system.onrender.com/",
    github:
      "https://github.com/chairielazizi/springboot_product_management_system",
    texture: "/textures/project/project-product_spring.webm",
    logo: "/assets/project-logo3.png",
    logoStyle: {
      // backgroundColor: "#0E1F38",
      // border: "0.2px solid #0E2D58",
      // boxShadow: "0px 0px 60px 0px #2F67B64D",
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 1,
        name: "Java",
        path: "/assets/java.svg",
      },
      {
        id: 2,
        name: "Spring Boot",
        path: "/assets/spring.svg",
      },
      {
        id: 3,
        name: "PostgreSQL",
        path: "assets/postgresql.svg",
      },
      {
        id: 4,
        name: "Docker",
        path: "/assets/docker.svg",
      },
      {
        id: 5,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 6,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
    ],
  },
  // {
  //   title: "Imaginify - AI Photo Manipulation App",
  //   desc: "Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.",
  //   subdesc:
  //     "Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business.",
  //   href: "https://www.youtube.com/watch?v=Ahwoks_dawU",
  //   texture: "/textures/project/project5.mp4",
  //   logo: "/assets/project-logo5.png",
  //   logoStyle: {
  //     backgroundColor: "#1C1A43",
  //     border: "0.2px solid #252262",
  //     boxShadow: "0px 0px 60px 0px #635BFF4D",
  //   },
  //   spotlight: "/assets/spotlight5.png",
  //   tags: [
  //     {
  //       id: 1,
  //       name: "React.js",
  //       path: "/assets/react.svg",
  //     },
  //     {
  //       id: 2,
  //       name: "TailwindCSS",
  //       path: "assets/tailwindcss.png",
  //     },
  //     {
  //       id: 3,
  //       name: "TypeScript",
  //       path: "/assets/typescript.png",
  //     },
  //     {
  //       id: 4,
  //       name: "Framer Motion",
  //       path: "/assets/framer.png",
  //     },
  //   ],
  // },
];

export const workExperiences = [
  {
    id: 1,
    name: "SimplifyQA Sdn Bhd",
    position: "Software Test Engineer (Part time)",
    duration: "March 2023 - May 2024",
    title: [
      "● Execute manual testing and bug tracking with Jira",
      "● Create test scripts for automation testing with Selenium with Java and TestNG framework",
      "● Create test cases based on clients’ requirements; Test plan and strategy",
    ],
    icon: "/assets/simplifyqa.svg",
    animation: "victory",
  },
  {
    id: 2,
    name: "Top Glove Corporation Berhad",
    position: "Software Developer Intern",
    duration: "June 2021 - January 2022",
    title: [
      "● Develop an application to handle the logistics and inventory system for factories.",
      "● Develop an Android application using Java as the frontend and C# and ASP.NET as the backend",
      "● Test new version of Top Glove’s website and perform User Acceptance Testing",
    ],
    icon: "/assets/topglove.webp",
    animation: "clapping",
  },
];

// export const clientReviews = [
//   {
//     id: 1,
//     name: "Emily Johnson",
//     position: "Marketing Director at GreenLeaf",
//     img: "assets/review1.png",
//     review:
//       "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
//   },
//   {
//     id: 2,
//     name: "Mark Rogers",
//     position: "Founder of TechGear Shop",
//     img: "assets/review2.png",
//     review:
//       "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.",
//   },
//   {
//     id: 3,
//     name: "John Dohsas",
//     position: "Project Manager at UrbanTech ",
//     img: "assets/review3.png",
//     review:
//       "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
//   },
//   {
//     id: 4,
//     name: "Ether Smith",
//     position: "CEO of BrightStar Enterprises",
//     img: "assets/review4.png",
//     review:
//       "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.",
//   },
// ];

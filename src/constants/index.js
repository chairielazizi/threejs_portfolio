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
    name: "Skills",
    href: "#skills",
    to: "skills",
  },
  {
    id: 4,
    name: "Projects",
    href: "#projects",
    to: "projects",
  },
  {
    id: 5,
    name: "Work",
    href: "#work",
    to: "work",
  },
  {
    id: 6,
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
      ? [-5, 0, -10]
      : isMobile
        ? [-9, 2, -10]
        : isTablet
          ? [-12, 2, -10]
          : [-13, 3, -10],
  };
};

export const myProjects = [
  {
    title: "MyZakaTax - Kira Cukai dan Zakat Malaysia",
    desc: "A smart Malaysian tax and zakat calculator based on Budget 2025, designed to help users accurately calculate income tax, zakat on income, and zakat on savings.",
    subdesc:
      "Built using Next.js, React, Tailwind CSS, and TypeScript. Hosted on Vercel.",
    href: "https://myzakatax.airiel.space/",
    github: "https://github.com/chairielazizi/quran-hadis-search",
    texture: "/textures/project/project-myzakatax.webm",
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
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "/assets/tailwindcss.png",
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
    ],
  },
  {
    title: "Quran and Hadis AI Semantic Search",
    desc: "An AI-powered semantic search engine that allows users to ask any question or life situation and find the most relevant Quran verses and Hadith without altering original texts.",
    subdesc:
      "Built with Next.js, React, TypeScript, Tailwind CSS, and PostgreSQL. Hosted on Vercel.",
    href: "https://quranhadis.airiel.space/",
    github: "https://github.com/chairielazizi/quran-hadis-search",
    texture: "/textures/project/project-quranhadis.webm",
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
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "/assets/tailwindcss.png",
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
        name: "PostgreSQL",
        path: "/assets/postgresql.svg",
      },
    ],
  },
  // {
  //   title: "Legal Accounting System for SMEs",
  //   desc: "This project delivers a robust and user-friendly accounting system tailored for small legal firms, enhancing their operational efficiency and allowing them to better manage their finances, cases, and clients.",
  //   subdesc:
  //     "Build using PHP Laravel framework, Tailwind CSS, Vue JS, and MySQL for database. Hosted on Vercel",
  //   href: "https://legal-ace-sme.vercel.app/",
  //   github: "https://github.com/chairielazizi/legal-ace-sme",
  //   texture: "/textures/project/project-accounting.webm",
  //   logo: "/assets/project-logo4.png",
  //   logoStyle: {
  //     // backgroundColor: "#2A1816",
  //     // border: "0.2px solid #36201D",
  //     // boxShadow: "0px 0px 60px 0px #AA3C304D",
  //     backgroundColor: "#0E1F38",
  //     border: "0.2px solid #0E2D58",
  //     boxShadow: "0px 0px 60px 0px #2F67B64D",
  //   },
  //   spotlight: "/assets/spotlight4.png",
  //   tags: [
  //     {
  //       id: 1,
  //       name: "PHP",
  //       path: "/assets/php.svg",
  //     },
  //     {
  //       id: 2,
  //       name: "Laravel",
  //       path: "/assets/laravel.svg",
  //     },
  //     {
  //       id: 3,
  //       name: "TailwindCSS",
  //       path: "/assets/tailwindcss.png",
  //     },
  //     {
  //       id: 4,
  //       name: "Vue JS",
  //       path: "/assets/vuejs.svg",
  //     },
  //     {
  //       id: 5,
  //       name: "MySQL",
  //       path: "/assets/mysql.svg",
  //     },
  //   ],
  // },
  {
    title: "IMDB Like App",
    desc: "A lightweight, IMDB-inspired movie database application featuring trending and top-rated movies, search functionality, and user authentication.",
    subdesc:
      "Built using Next.js, Tailwind CSS, MongoDB Atlas for the database, and Clerk for authentication.",
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
        path: "/assets/tailwindcss.png",
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
    desc: "A comprehensive expense tracking dashboard featuring income and expense summaries, categorized donut charts, spline charts for transaction tracking, and recent transactions.",
    subdesc:
      "Built using ASP.NET Core MVC stack, Bootstrap 5, Syncfusion UI components, and Microsoft SQL Server. Hosted on Microsoft Azure / runasp.net.",
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
        path: "/assets/bootstrap5.svg",
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
  // {
  //   title: "Product Management System",
  //   desc: "A very simple product management system to manage products, to test the framework of Java Spring Boot",
  //   subdesc:
  //     "Built using Java Spring Boot for the backend, React.js, Typescript and Tailwind for the frontend, PostgreSQL for the database, hosted using Docker and Render.",
  //   href: "https://springboot-product-management-system.onrender.com/",
  //   github:
  //     "https://github.com/chairielazizi/springboot_product_management_system",
  //   texture: "/textures/project/project-product_spring.webm",
  //   logo: "/assets/project-logo3.png",
  //   logoStyle: {
  //     // backgroundColor: "#0E1F38",
  //     // border: "0.2px solid #0E2D58",
  //     // boxShadow: "0px 0px 60px 0px #2F67B64D",
  //     backgroundColor: "#60f5a1",
  //     background:
  //       "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
  //     border: "0.2px solid rgba(208, 213, 221, 1)",
  //     boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
  //   },
  //   spotlight: "/assets/spotlight3.png",
  //   tags: [
  //     {
  //       id: 1,
  //       name: "Java",
  //       path: "/assets/java.svg",
  //     },
  //     {
  //       id: 2,
  //       name: "Spring Boot",
  //       path: "/assets/spring.svg",
  //     },
  //     {
  //       id: 3,
  //       name: "PostgreSQL",
  //       path: "/assets/postgresql.svg",
  //     },
  //     {
  //       id: 4,
  //       name: "Docker",
  //       path: "/assets/docker.svg",
  //     },
  //     {
  //       id: 5,
  //       name: "React.js",
  //       path: "/assets/react.svg",
  //     },
  //     {
  //       id: 6,
  //       name: "TailwindCSS",
  //       path: "/assets/tailwindcss.png",
  //     },
  //   ],
  // },
];

export const workExperiences = [
  {
    id: 1,
    name: "Accenture Southeast Asia",
    position: "Packaged App Developer",
    duration: "April 2025 - Present",
    title: [
      "● Currently working with Roche, a global pharmaceutical company, to develop and maintain their web applications",
      "● Focusing on backend development using Java and Spring Boot",
      "● Using Angular for front-end development and Oracle SQL for database management",
      "● Unit testing with JUnit, Mockito and Groovy",
      "● Handle user issues and provide technical support for clients through ServiceNow",
      "● Front-end development using React.js and TailwindCSS",
      "● Developing and maintaining web applications for clients",
    ],
    icon: "/assets/accenture.png",
    animation: "victory",
  },
  {
    id: 2,
    name: "SimplifyQA Sdn Bhd",
    position: "Software Test Engineer",
    duration: "March 2023 - April 2024",
    title: [
      "● Execute manual testing and bug tracking with Jira",
      "● Create test scripts for automation testing with Selenium with Java and TestNG framework",
      "● Create test cases based on clients’ requirements; Test plan and strategy",
    ],
    icon: "/assets/simplifyqa.svg",
    animation: "clapping",
  },
  {
    id: 3,
    name: "Top Glove Corporation Berhad",
    position: "Software Developer Intern",
    duration: "June 2021 - January 2022",
    title: [
      "● Develop an application to handle the logistics and inventory system for factories.",
      "● Develop an Android application using Java as the frontend and C# and ASP.NET as the backend",
      "● Test new version of Top Glove’s website and perform User Acceptance Testing",
    ],
    icon: "/assets/topglove.webp",
    animation: "victory",
  },
];

// All real content for the portfolio — edit this file to update site content

export const personal = {
  name: 'Pushkar Bankar',
  initials: 'PB',
  email: 'pushkarbankar.sit.comp@gmail.com',
  github: 'https://github.com/thepushkarB',
  linkedin: 'https://www.linkedin.com/in/pushkar-bankar/',
  twitter: 'https://x.com/thepushkarb',
  medium: 'https://medium.com/@pushkarbankar05',
  resume: 'https://drive.google.com/file/d/1N4yCWVM8fREZmYOz1nCBcUKTM1UsUo9C/view',
  role: 'Full-Stack Developer',
  summary:
    'Backend-focused Full-Stack Dev building scalable MERN applications & AI-powered systems. Experienced w/ real-time architectures, semantic search, AI agents, MCP & media processing pipelines.',
  stats: {
    projects: '8+',
    skills: '20+',
    experience: '2+',
  },
};

export const experience = [
  {
    id: 'waybeyond',
    role: 'Full Stack Developer',
    company: 'Waybeyond Tech',
    period: 'Nov 2025 — Apr 2026',
    remote: false,
    bullets: [
      'Built Vibe Query — vector-based semantic search using embeddings, Pinecone, and REST APIs',
      'Implemented media pipelines with validation, image compression, and chunked video uploads → AWS S3',
      'Refactored media storage from public URLs to metadata-based architecture using UUIDs and object keys',
      'Built onboarding workflows with email verification, authentication, and user activation flows',
      'Developed search, filtering, pagination, and sorting APIs for product datasets',
    ],
    tags: ['Next.js', 'Hapi.js', 'Node.js', 'FastAPI', 'MongoDB', 'AWS S3', 'Pinecone'],
  },
  {
    id: 'alhansat',
    role: 'Front End Developer',
    company: 'Alhansat Solutions',
    period: 'Dec 2022 — Feb 2023',
    remote: true,
    bullets: [
      'Developed responsive UI using HTML, TailwindCSS, and JavaScript',
      'Improved engagement by 40% through cross-device responsive design',
    ],
    tags: ['HTML', 'TailwindCSS', 'JavaScript', 'Figma'],
  },
];

// export const projects = {
//   featured: [
//     {
//       id: 'overwatcher',
//       title: 'Overwatcher',
//       type: 'Personal',
//       description:
//         'Guarded AI agent platform with dynamic tool discovery and function calling. Built a policy engine that intercepts every tool call with human-in-the-loop execution and full audit logging.',
//       bullets: [
//         'Google Gemini + MCP with dynamic tool discovery and function calling',
//         'Policy engine intercepting every tool call with human-in-the-loop execution',
//         'MCP client supporting local stdio and Streamable HTTP with runtime policy updates',
//       ],
//       tags: ['Node.js', 'Google Gemini', 'MCP', 'FastAPI'],
//       link: 'https://github.com/thepushkarB/Overwatcher',
//       accent: 'violet',
//     },
//     {
//       id: 'ticket-tamer',
//       title: 'Ticket Tamer',
//       type: 'Personal',
//       description:
//         'AI-powered full-stack customer support ticketing system with role-based access and automated background workflows.',
//       bullets: [
//         'JWT authentication with role-based access control (admin / agent / user)',
//         'Automated background ticket workflows using Inngest event-driven jobs',
//         'AI-based ticket analysis and routing via Google Gemini',
//       ],
//       tags: ['React', 'Node.js', 'MongoDB', 'Inngest', 'Gemini', 'JWT'],
//       link: 'https://github.com/thepushkarB/ticket-tamer',
//       accent: 'green',
//     },
//   ],
//   work: [
//     {
//       id: 'collaborator',
//       title: 'Collaborator',
//       type: 'Waybeyond Tech',
//       description:
//         'Mobile-first service communication platform enabling real-time updates between staff and customers throughout vehicle servicing.',
//       tags: ['Next.js', 'Hapi.js', 'Node.js', 'MongoDB', 'AWS S3', 'Server-Sent Events (SSE)'],
//       link: null,
//       accent: 'amber',
//     },
//     {
//       id: 'rayib',
//       title: 'RAYIB',
//       type: 'Waybeyond Tech',
//       description:
//         'Investor-founder platform with outreach, communication, and internal user management. Email-based onboarding with identity verification and account activation.',
//       tags: ['Next.js', 'FastAPI', 'MongoDB', 'AWS S3', 'Server-Sent Events (SSE)'],
//       link: null,
//       accent: 'cyan',
//     },
//     {
//       id: 'catalogue',
//       title: 'Catalogue Management System',
//       type: 'Waybeyond Tech',
//       description:
//         'Product search with debouncing, pagination, filtering, and sorting APIs. AWS S3 integration for multimedia storage and product asset management.',
//       tags: ['Next.js', 'Hapi.js', 'Node.js', 'AWS S3', 'MongoDB'],
//       link: null,
//       accent: 'violet',
//     },
//   ],
//   archive: [
//     {
//       id: 'lit-lib',
//       title: 'Lit Lib',
//       description: 'Full-stack bookstore app with CRUD, JWT auth, and responsive UI.',
//       tags: ['React', 'Express', 'MongoDB'],
//       link: 'https://github.com/thepushkarB/lit-lib',
//     },
//     {
//       id: 'freaky-pixel',
//       title: 'Freaky Pixel Machine',
//       description: 'React app generating AI images from text prompts via HuggingFace Spaces.',
//       tags: ['React', 'HuggingFace', 'Netlify'],
//       link: 'https://github.com/thepushkarB/freaky-pixel-machine',
//     },
//     {
//       id: 'forbidden-bulk',
//       title: 'Forbidden Bulk',
//       description: 'Fitness journey web app with clean UI and workout tracking.',
//       tags: ['React', 'TailwindCSS'],
//       link: 'https://github.com/thepushkarB/forbiddenBulk',
//     },
//   ],
// };
export const projects = {
  featured: [
    {
      id: 'overwatcher',
      title: 'Overwatcher',
      type: 'Personal',
      description:
        'An AI agent that doesn’t do things without asking first. Every tool call passes through policy, approval, and audit.',
      bullets: [
        'Dynamic MCP tool discovery + function calling',
        'Human-in-the-loop tool execution',
        'Full tool-call audit trail',
      ],
      tags: ['Vite-React', 'Express.js', 'Zod', 'Node.js', 'Google GenAI SDK', 'MCP SDK(local + remote)'],
      link: 'https://github.com/thepushkarB/Overwatcher',
      accent: 'violet',
    },
    {
      id: 'ticket-tamer',
      title: 'Ticket Tamer',
      type: 'Personal',
      description:
        'AI-powered customer support ticketing system w/ automated workflows and AI-based ticket analysis & routing.',
      bullets: [
        'JWT authentication & role-based access control (admin / agent / user)',
        'Inngest-powered background ticket workflows',
        'AI-based ticket analysis & routing via Google Gemini',
      ],
      tags: ['Vite-React', 'React Router', 'Notistack', 'Express.js', 'Node.js', 'MongoDB', 'Inngest', 'Gemini', 'JWT'],
      link: 'https://github.com/thepushkarB/ticket-tamer',
      accent: 'green',
    },
  ],
  work: [
    {
      id: 'collaborator',
      title: 'Collaborator',
      type: 'Waybeyond Tech',
      description:
        'Mobile-first vehicle service communication platform connecting customers & staff throughout vehicle servicing, with internal staff communication & management.',
      bullets: [
        'WhatsApp-style multimedia chat with image grids, PDFs & videos.',
        'Swipe-to-reply, typing indicators & online/recently-online presence.',
        'Media pipeline with validation, compression & chunked video uploads -> AWS S3.',
      ],
      tags: ['Next.js', 'JWT', 'Hapi.js', 'Tesseract', 'Xlsx', 'Twilio', 'Node.js', 'MongoDB', 'AWS S3', 'Server-Sent Events (SSE)'],
      link: null,
      accent: 'amber',
    },
    {
      id: 'rayib',
      title: 'RAYIB',
      type: 'Waybeyond Tech',
      description:
        'Investor-founder platform for discovering, connecting, and communicating with investors, managing pitches, and tracking founder outreach.',
      bullets: [
        'Email-based onboarding with identity verification & account activation.',
        'Real-time chat & Kanban-based founder workflows.',
        'Investor discovery, filtering, outreach & pitch management.',
      ],
      tags: ['Next.js', 'JWT', 'Twilio', 'FastAPI', 'MongoDB', 'AWS S3', 'Server-Sent Events (SSE)'],
      link: null,
      accent: 'cyan',
    },
    {
      id: 'catalogue',
      title: 'Catalogue Management System',
      type: 'Waybeyond Tech',
      description:
        'Product search with debouncing, pagination, filtering, and sorting APIs. AWS S3 integration for multimedia storage and product asset management.',
      bullets: [
        'Product search with debouncing, pagination, filtering, and sorting APIs.',
        'AI-generated product descriptions and review sentiment summaries.',
        'AWS S3 integration for multimedia storage and product asset management.',
      ],
      tags: ['Next.js', 'JWT', 'OpenAI Platform', 'Hapi.js', 'Node.js', 'AWS S3', 'Stripe', 'MongoDB'],
      link: null,
      accent: 'violet',
    },
  ],
  archive: [
    {
      id: 'lit-lib',
      title: 'Lit Lib',
      description: 'Full-stack bookstore app with CRUD, JWT auth, and responsive UI.',
      tags: ['Vite-React', 'JWT', 'Express.js', 'Node.js', 'MongoDB'],
      link: 'https://github.com/thepushkarB/lit-lib',
    },
    {
      id: 'freaky-pixel',
      title: 'Freaky Pixel Machine',
      description: 'React app generating AI images from text prompts via HuggingFace Spaces.',
      tags: ['Vite-React', 'HuggingFace', 'Gradio', 'Netlify'],
      link: 'https://github.com/thepushkarB/freaky-pixel-machine',
    },
    {
      id: 'forbidden-bulk',
      title: 'Forbidden Bulk',
      description: 'Fitness journey web app with clean UI and workout guidance/routines.',
      tags: ['Vite-React', 'Tailwind CSS', 'Netlify'],
      link: 'https://github.com/thepushkarB/forbiddenBulk',
    },
  ],
};


export const skills = [
  {
    dir: 'languages/',
    items: ['JavaScript', 'Java', 'Python', 'HTML', 'CSS'],
  },
  {
    dir: 'frontend/',
    items: ['React.js', 'Next.js', 'Vite', 'Tailwind CSS'],
  },
  {
    dir: 'backend/',
    items: ['Node.js', 'Express.js', 'Hapi.js', 'FastAPI', 'REST APIs'],
  },
  {
    dir: 'databases/',
    items: ['MongoDB'],
  },
  {
    dir: 'ai-genai/',
    items: ['Google Gemini', 'MCP', 'Pinecone', 'HuggingFace', 'Prompt Engineering', 'Antigravity', 'Claude Code'],
  },
  {
    dir: 'tools/',
    items: ['AWS S3', 'Git', 'GitHub', 'Postman', 'Netlify', 'Swagger/OpenAPI'],
  },
];

export const certifications = [
  {
    title: 'Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
    issuer: 'Oracle',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=119DBED9B53AB6282D2FB157D3B902C2033D25BA16AFBD6F962C29C74F57DE7E',
  },
  {
    title: 'ChatGPT Prompt Engineering for Developers',
    issuer: 'DeepLearning.AI',
    link: 'https://www.deeplearning.ai/accomplishments/45040854-73a4-45c7-8735-2085a4c94673?usp=sharing',
  },
  {
    title: 'Introducing Multimodal Llama 3.2',
    issuer: 'DeepLearning.AI',
    link: 'https://www.deeplearning.ai/accomplishments/b2178689-5b5c-4095-8ff6-53e374165827?usp=sharing',
  },
];

export const education = {
  degree: 'B.E. in Computer Science',
  institution: 'Sinhgad Institute of Technology, Lonavla',
  period: '2020 — 2024',
};

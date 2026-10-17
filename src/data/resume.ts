// All resume content lives here — edit this file to update the game.

export const profile = {
  name: 'Amir Mohammad Abdollahi',
  firstName: 'Amir Mohammad',
  lastName: 'Abdollahi',
  tag: 'AMIR',
  title: 'Frontend Engineer',
  subtitle: 'AI Researcher',
  stack: ['React', 'Next.js', 'TypeScript'],
  location: 'Tehran, Iran',
  phone: '+98 903 969 8070',
  phoneHref: 'tel:+989039698070',
  email: 'amirmuhaammaadd@gmail.com',
  portfolio: 'https://portfolio-2-beta-ochre.vercel.app/',
  cv: '/AmirMohammad_Abdollahi_Resume.docx',
  years: '4+',
  domains: ['Fintech', 'Food-tech', 'Transportation'],
  summary:
    'Frontend Engineer with over 4 years of experience building scalable, high-performance web applications using React, Next.js, and TypeScript. Experienced in production-grade dashboards, PWAs, real-time systems, and map-based applications. Strong background in performance optimization, component-based architecture, responsive UI and modern state management — and at home in cross-functional, agile product teams.',
}

export const LEVELS = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'] as const

export type Skill = { label: string; level: 1 | 2 | 3 | 4 | 5; items: string[] }

export const skills: Skill[] = [
  { label: 'Frontend', level: 5, items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
  { label: 'UI & Styling', level: 5, items: ['Tailwind CSS', 'Ant Design', 'Mantine UI', 'Material UI', 'ShadCN UI', 'Styled Components'] },
  { label: 'State', level: 4, items: ['Redux Toolkit', 'Zustand', 'Context API'] },
  { label: 'Data', level: 4, items: ['TanStack Query', 'Axios', 'Fetch API', 'REST APIs'] },
  { label: 'Performance', level: 4, items: ['Code Splitting', 'Lazy Loading', 'Memoization', 'Virtualization'] },
  { label: 'Architecture', level: 4, items: ['SSR / SSG / ISR', 'PWA', 'DDD', 'SOLID', 'Clean Architecture'] },
  { label: 'Tooling', level: 4, items: ['Vite', 'Webpack', 'npm', 'Docker', 'Git', 'GitHub / GitLab'] },
  { label: 'Testing', level: 3, items: ['Jest', 'React Testing Library'] },
]

export type Job = {
  company: string
  role: string
  period: string
  year: string
  color: string
  /** Optional logo in /public — falls back to the first letter of the company. */
  logo?: string
  highlights: string[]
  tech: string[]
  details: string[]
}

// Chronological — the player walks from the first job to the current one.
export const jobs: Job[] = [
  {
    company: 'Keykavoos',
    role: 'Frontend Developer',
    period: 'Nov 2022 – Jul 2023',
    year: '2022',
    color: '#8e44ad',
    highlights: [
      'Shipped multiple client-facing web apps',
      'Reusable component library across projects',
      'Mobile-first, cross-browser responsive UIs',
    ],
    tech: ['React', 'JavaScript', 'Tailwind', 'Context API'],
    details: [
      'Developed and maintained multiple client-facing web applications using React.js, JavaScript, and Tailwind CSS.',
      'Built reusable and maintainable UI components, improving development consistency across multiple projects.',
      'Managed application state using Context API and applied modular architecture principles to improve code organization and maintainability.',
      'Integrated RESTful APIs and collaborated with backend developers to deliver end-to-end features.',
      'Optimized application performance through component reuse, lazy loading, and rendering optimizations.',
      'Developed responsive and cross-browser compatible user interfaces with a mobile-first approach.',
    ],
  },
  {
    company: 'Fara Ofoq',
    role: 'Frontend Developer',
    period: 'Nov 2023 – Feb 2025',
    year: '2023',
    color: '#16a085',
    highlights: [
      'Real-time fleet monitoring platform',
      'GIS dashboards with live vehicle tracking',
      'SignalR streams + Zustand for high-frequency data',
    ],
    tech: ['React', 'TypeScript', 'MapLibre GL', 'SignalR', 'Zustand'],
    details: [
      'Developed and maintained a real-time fleet monitoring platform for tracking vehicles and operational assets using React, TypeScript, Tailwind CSS, and Zustand.',
      'Built interactive GIS-based dashboards with MapLibre GL, providing live vehicle tracking, route visualization, and location-aware monitoring capabilities.',
      'Integrated SignalR to enable real-time bidirectional communication, live vehicle status updates, and instant event notifications.',
      'Developed scalable state management solutions using Zustand to efficiently handle high-frequency real-time data.',
      'Collaborated with backend engineers to integrate RESTful APIs and real-time streaming services, ensuring reliable synchronization between frontend and backend systems.',
      'Improved application performance through lazy loading, code splitting, custom hooks, memoization, and efficient rendering strategies.',
      'Built reusable UI components and contributed to a modular frontend architecture, improving maintainability and feature development speed.',
    ],
  },
  {
    company: 'Bank Mellat TSP (Vosouq)',
    role: 'Frontend Developer',
    period: 'Feb 2025 – May 2025',
    year: '2025',
    color: '#c0392b',
    highlights: [
      "Enterprise apps for Bank Mellat's Tax Service Provider",
      'Contract lifecycle & approval workflow system',
      'Taxpayer portal for contracts & e-invoicing',
    ],
    tech: ['React', 'TypeScript', 'Ant Design', 'Tailwind'],
    details: [
      "Developed enterprise web applications for Bank Mellat's Tax Service Provider (TSP), supporting digital tax compliance and taxpayer management processes.",
      'Built and maintained an internal workflow management system for company employees using React, TypeScript, Ant Design, and Tailwind CSS, enabling contract lifecycle management and approval workflows across multiple departments.',
      'Developed a taxpayer portal that allows customers to manage tax-related services, contracts, and electronic invoicing processes through a unified web interface.',
      'Collaborated with backend engineers to integrate RESTful APIs and deliver secure, reliable, and scalable frontend solutions.',
      'Implemented business workflows for contract registration, review, approval, and status tracking within employee work queues.',
      'Developed reusable UI components and optimized user experience across enterprise dashboards and administrative panels.',
      'Participated in Agile development, feature planning, bug fixing, and production deployments.',
    ],
  },
  {
    company: 'SnappFood',
    role: 'Frontend Engineer',
    period: 'Apr 2025 – May 2026',
    year: '2025',
    color: '#e6007e',
    logo: '/logos/snappfood.jpg',
    highlights: [
      'Wallet & Cashback features and payment flows',
      'Snapp Pay, Saman IPG & YeCard Wallet integrations',
      'OCR receipt parsing, PWA & list virtualization',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'React Virtuoso', 'PWA'],
    details: [
      'Developed and maintained payment and wallet flows for a large-scale food ordering platform using Next.js, TypeScript, and Tailwind CSS.',
      'Designed and implemented Wallet and Cashback features, improving payment flexibility, promotional campaigns, and customer retention.',
      'Integrated multiple payment solutions, including Snapp Pay, Bank Saman Internet Payment Gateway (IPG), and YeCard Wallet, ensuring secure, reliable, and seamless payment experiences.',
      'Architected and implemented an OCR-powered invoice parsing feature that automatically extracts invoice amounts from captured receipt images, reducing manual input and improving payment workflow efficiency.',
      'Integrated Balad Maps services to improve location-based restaurant discovery and delivery experiences.',
      'Built and enhanced Progressive Web App (PWA) capabilities with a mobile-first approach, improving installability, responsiveness, and overall user experience.',
      'Optimized rendering performance for large vendor datasets using React Virtuoso, reducing rendering overhead and improving list virtualization performance.',
      'Introduced Domain-Driven Design (DDD) concepts to organize business domains, improve code maintainability, and support long-term scalability.',
      'Collaborated closely with backend engineers, QA, designers, and product managers to deliver production-ready features in an Agile development environment.',
    ],
  },
  {
    company: 'SnappStore',
    role: 'Frontend Engineer',
    period: 'May 2026 – Present',
    year: 'NOW',
    color: '#00ada8',
    logo: '/logos/snappstore.png',
    highlights: [
      'Multi-tenant SaaS for restaurant operations',
      'Per-restaurant subdomains with isolated branding',
      'Plan-based modules + 2 internal admin dashboards',
    ],
    tech: ['Next.js', 'TypeScript', 'Mantine', 'Ant Design', 'React Query'],
    details: [
      'Developed and maintained a multi-tenant SaaS platform that enables restaurants to manage daily operations through subscription-based management panels.',
      'Built scalable frontend applications using Next.js, React, TypeScript, Mantine UI, Styled Components, and SSR.',
      'Developed a vendor-facing web application where each restaurant is served through its own dedicated subdomain, providing isolated branding and customized business configurations.',
      'Implemented configurable management modules — Order, Customer, Delivery, Inventory and Staff Management, Reports, and Business Settings — enabled per subscription plan.',
      'Built and maintained two internal Admin Channel dashboards using React, Vite, TypeScript, Ant Design, and React Query, enabling operational teams to manage restaurants, subscriptions, vendors, and platform configurations.',
      'Optimized application performance through lazy loading, code splitting, memoization, and efficient rendering strategies.',
      'Collaborated with backend engineers to integrate RESTful APIs, authentication flows, and role-based access control for restaurant owners and administrators.',
    ],
  },
]

export const education = {
  degree: "Bachelor's Degree",
  field: 'Computer Engineering',
  school: 'Islamic Azad University',
  city: 'Tehran',
}

export const softSkills = [
  { icon: '🧩', label: 'Problem Solving' },
  { icon: '🤝', label: 'Team Collaboration' },
  { icon: '💬', label: 'Communication' },
  { icon: '🔄', label: 'Adaptability' },
  { icon: '⏱️', label: 'Time Management' },
  { icon: '🔍', label: 'Attention to Detail' },
  { icon: '📚', label: 'Continuous Learning' },
]

export const aiTools = [
  { icon: '⭐', label: 'Cursor' },
  { icon: '⭐', label: 'Claude' },
  { icon: '⭐', label: 'ChatGPT' },
  { icon: '⭐', label: 'Copilot' },
]

export const aiUses = 'AI-assisted coding · debugging · refactoring · docs · code review'

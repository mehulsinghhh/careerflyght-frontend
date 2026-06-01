import {
  Factory,
  HardHat,
  Truck,
  Palette,
  Utensils,
  Banknote,
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  Leaf,
  Zap,
  Laptop,
  Megaphone,
  Briefcase
} from "lucide-react";

export interface CareerCluster {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  bgGradient: string;
  tint: string;
  border: string;
  skills: string[];
  pathways: string[];
  subClusters: string[];
  outcomes: string[];
  relatedIndustries: string[];
  ring: string;
}

export const CAREER_CLUSTERS: CareerCluster[] = [
  {
    id: "advanced-manufacturing",
    title: "Advanced Manufacturing",
    description: "The synthesis of high-tech production and digital intelligence. Design and produce products using robotics, 3D printing, and automated systems.",
    icon: Factory,
    color: "text-orange-600",
    glowColor: "rgba(249, 115, 22, 0.3)",
    bgGradient: "from-orange-500 to-amber-500",
    tint: "bg-orange-50/40",
    border: "border-orange-100/50",
    skills: ["Robotics & Automation", "Digital Twin Tech", "Additive Manufacturing", "IoT Systems"],
    pathways: ["Production Engineering", "Process Development", "Maintenance & Operations", "Quality Assurance"],
    subClusters: ["Aerospace Systems", "Advanced Automotive", "Smart Electronics", "Biotech Hardware"],
    outcomes: ["Automation Architect", "Robotics Engineer", "Systems Integrator"],
    relatedIndustries: ["Engineering", "Technology", "Logistics"],
    ring: "Building & Moving"
  },
  {
    id: "construction",
    title: "Construction",
    description: "Architecting the physical world. Design, plan, and build the infrastructure of tomorrow, from sustainable cities to modular skyscrapers.",
    icon: HardHat,
    color: "text-amber-600",
    glowColor: "rgba(234, 179, 8, 0.3)",
    bgGradient: "from-yellow-500 to-orange-500",
    tint: "bg-amber-50/40",
    border: "border-amber-100/50",
    skills: ["BIM Modeling", "Sustainable Materials", "Structural Analysis", "Project Engineering"],
    pathways: ["Design & Pre-Construction", "Construction Management", "Maintenance & Operations"],
    subClusters: ["Urban Planning", "Commercial Infrastructure", "Civil Engineering", "Green Building"],
    outcomes: ["Project Manager", "Structural Engineer", "Sustainability Consultant"],
    relatedIndustries: ["Real Estate", "Architecture", "Engineering"],
    ring: "Building & Moving"
  },
  {
    id: "supply-chain",
    title: "Supply Chain & Transportation",
    description: "The global nervous system. Orchestrate the flow of goods and services across the world using autonomous logistics and smart routing.",
    icon: Truck,
    color: "text-amber-700",
    glowColor: "rgba(217, 119, 6, 0.3)",
    bgGradient: "from-amber-600 to-yellow-600",
    tint: "bg-amber-50/50",
    border: "border-amber-100/60",
    skills: ["Logistics Optimization", "Blockchain Supply Chain", "Autonomous Fleet Ops", "Global Trade"],
    pathways: ["Operations Management", "Logistics Planning", "Warehousing & Distribution"],
    subClusters: ["Maritime Logistics", "Cargo Aviation", "Global Rail Networks", "Autonomous Delivery"],
    outcomes: ["Operations Director", "Logistics Analyst", "Supply Chain Architect"],
    relatedIndustries: ["E-commerce", "Manufacturing", "Retail"],
    ring: "Building & Moving"
  },
  {
    id: "arts-design",
    title: "Arts & Design",
    description: "Defining human experience through creative expression. Produce visual arts, digital media, and immersive performances that shape global culture.",
    icon: Palette,
    color: "text-purple-600",
    glowColor: "rgba(168, 85, 247, 0.3)",
    bgGradient: "from-purple-500 to-pink-500",
    tint: "bg-purple-50/40",
    border: "border-purple-100/50",
    skills: ["Generative Design", "Immersive Media", "Creative Direction", "Motion Graphics"],
    pathways: ["Visual Arts", "Digital Production", "Performing Arts", "Design Communication"],
    subClusters: ["UX/UI Design", "Film & Visual Effects", "Game Development", "Industrial Design"],
    outcomes: ["Creative Director", "Experience Designer", "Visual Storyteller"],
    relatedIndustries: ["Media", "Advertising", "Technology"],
    ring: "Creating & Experiencing"
  },
  {
    id: "hospitality-tourism",
    title: "Hospitality & Tourism",
    description: "Designing world-class human connections. Manage premium lodging, food services, and travel experiences for a global audience.",
    icon: Utensils,
    color: "text-rose-600",
    glowColor: "rgba(244, 63, 94, 0.3)",
    bgGradient: "from-rose-500 to-pink-500",
    tint: "bg-rose-50/40",
    border: "border-rose-100/50",
    skills: ["Experience Design", "Cultural Intelligence", "Strategic Revenue Mgmt", "Global Operations"],
    pathways: ["Luxury Lodging", "Travel & Tourism", "Recreation & Attractions", "Culinary Innovation"],
    subClusters: ["Boutique Resorts", "Eco-Tourism", "High-End Events", "Gastronomy Strategy"],
    outcomes: ["Global Experience Manager", "Hotel Strategist", "Travel Designer"],
    relatedIndustries: ["Service Industry", "Business", "Entertainment"],
    ring: "Connecting & Supporting"
  },
  {
    id: "financial-services",
    title: "Financial Services",
    description: "The engine of global growth. Manage capital, risk, and investment strategies using algorithmic finance and decentralized systems.",
    icon: Banknote,
    color: "text-yellow-700",
    glowColor: "rgba(202, 138, 4, 0.3)",
    bgGradient: "from-yellow-600 to-emerald-600",
    tint: "bg-yellow-50/40",
    border: "border-yellow-100/50",
    skills: ["Quantitative Analysis", "Risk Management", "FinTech Systems", "Algorithmic Trading"],
    pathways: ["Investment Banking", "Corporate Finance", "Insurance & Risk", "Asset Management"],
    subClusters: ["Venture Capital", "DeFi / Blockchain", "Personal Wealth", "Market Regulation"],
    outcomes: ["Investment Analyst", "Financial Engineer", "Portfolio Manager"],
    relatedIndustries: ["Banking", "Real Estate", "Technology"],
    ring: "Investing in the Future"
  },
  {
    id: "education",
    title: "Education",
    description: "Empowering the next generation of intelligence. Lead and innovate in schools, universities, and corporate learning environments.",
    icon: GraduationCap,
    color: "text-indigo-600",
    glowColor: "rgba(99, 102, 241, 0.3)",
    bgGradient: "from-indigo-500 to-blue-500",
    tint: "bg-indigo-50/40",
    border: "border-indigo-100/50",
    skills: ["Learning Science", "Instructional Design", "EdTech Integration", "Educational Data"],
    pathways: ["Teaching & Training", "Academic Administration", "Professional Support"],
    subClusters: ["Adaptive Learning", "Higher Education", "Corporate Reskilling", "EdTech Innovation"],
    outcomes: ["Learning Architect", "Education Lead", "Instructional Designer"],
    relatedIndustries: ["Social Services", "Government", "Technology"],
    ring: "Caring for Communities"
  },
  {
    id: "healthcare",
    title: "Healthcare & Human Services",
    description: "Pioneering human longevity and wellness. Deliver clinical care and medical breakthroughs while providing essential community support.",
    icon: Stethoscope,
    color: "text-teal-600",
    glowColor: "rgba(20, 184, 166, 0.3)",
    bgGradient: "from-teal-500 to-cyan-500",
    tint: "bg-teal-50/40",
    border: "border-teal-100/50",
    skills: ["Biotechnology", "Health Informatics", "Precision Medicine", "Patient Advocacy"],
    pathways: ["Therapeutic Services", "Diagnostic Services", "Health Informatics", "Biotech R&D"],
    subClusters: ["Genomics", "Public Health Policy", "Mental Health Tech", "Clinical Operations"],
    outcomes: ["Medical Lead", "Health Tech Analyst", "Clinical Researcher"],
    relatedIndustries: ["Science", "Insurance", "Technology"],
    ring: "Caring for Communities"
  },
  {
    id: "public-service",
    title: "Public Service & Safety",
    description: "Guardians of the social contract. Protect the public, enforce legal frameworks, and maintain the integrity of civic infrastructure.",
    icon: ShieldCheck,
    color: "text-blue-700",
    glowColor: "rgba(37, 99, 235, 0.3)",
    bgGradient: "from-blue-600 to-indigo-600",
    tint: "bg-blue-50/40",
    border: "border-blue-100/50",
    skills: ["Crisis Management", "Public Policy Design", "Cyber Defense", "Legal Reasoning"],
    pathways: ["Emergency Management", "Law Enforcement", "Legal Services", "Public Governance"],
    subClusters: ["Homeland Security", "Civic Tech", "International Relations", "Justice Systems"],
    outcomes: ["Public Policy Advisor", "Cybersecurity Specialist", "Legal Counsel"],
    relatedIndustries: ["Government", "Law", "Healthcare"],
    ring: "Connecting & Supporting"
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description: "The future of food and fiber. Revolutionize food production and natural resource management using AgTech and sustainable systems.",
    icon: Leaf,
    color: "text-green-600",
    glowColor: "rgba(34, 197, 94, 0.3)",
    bgGradient: "from-green-500 to-emerald-500",
    tint: "bg-green-50/40",
    border: "border-green-100/50",
    skills: ["Vertical Farming", "AgTech Systems", "Genetics & Breeding", "Regenerative Systems"],
    pathways: ["Agribusiness", "Food Processing", "Environmental Services", "Animal Sciences"],
    subClusters: ["Hydroponics", "Food Engineering", "Conservation Science", "Precision Farming"],
    outcomes: ["AgTech Specialist", "Sustainability Lead", "Food Scientist"],
    relatedIndustries: ["Food Production", "Science", "Manufacturing"],
    ring: "Cultivating Resources"
  },
  {
    id: "energy-resources",
    title: "Energy & Natural Resources",
    description: "Powering the global transition. Manage and innovate in energy production, water systems, and environmental stewardship.",
    icon: Zap,
    color: "text-lime-600",
    glowColor: "rgba(132, 204, 22, 0.3)",
    bgGradient: "from-lime-500 to-green-500",
    tint: "bg-lime-50/40",
    border: "border-lime-100/50",
    skills: ["Renewable Systems", "Grid Management", "Environmental Compliance", "Geospatial Data"],
    pathways: ["Energy Production", "Mining & Extraction", "Conservation Management"],
    subClusters: ["Solar & Wind Infrastructure", "Hydrogen Energy", "Water Systems", "Mineral Science"],
    outcomes: ["Energy Strategist", "Sustainability Engineer", "Grid Architect"],
    relatedIndustries: ["Utility", "Government", "Engineering"],
    ring: "Cultivating Resources"
  },
  {
    id: "digital-technology",
    title: "Digital Technology",
    description: "Architecting the digital frontier. Build the software, hardware, and AI systems that define the modern human experience.",
    icon: Laptop,
    color: "text-blue-600",
    glowColor: "rgba(59, 130, 246, 0.3)",
    bgGradient: "from-blue-500 to-indigo-500",
    tint: "bg-blue-50/40",
    border: "border-blue-100/50",
    skills: ["Software Engineering", "Artificial Intelligence", "Cloud Architecture", "Cybersecurity"],
    pathways: ["Software Development", "Information Systems", "Network Security", "Data Science"],
    subClusters: ["AI & Machine Learning", "Distributed Systems", "Full Stack Dev", "Cyber Ops"],
    outcomes: ["Solutions Architect", "AI Engineer", "CTO"],
    relatedIndustries: ["Everything", "Telecommunications", "Science"],
    ring: "Investing in the Future"
  },
  {
    id: "marketing-sales",
    title: "Marketing & Sales",
    description: "Driving growth through digital persuasion. Connect brands with global audiences using data-driven storytelling and strategic communication.",
    icon: Megaphone,
    color: "text-pink-600",
    glowColor: "rgba(236, 72, 153, 0.3)",
    bgGradient: "from-pink-500 to-rose-500",
    tint: "bg-pink-50/40",
    border: "border-pink-100/50",
    skills: ["Performance Marketing", "Brand Strategy", "Data Analytics", "Content Engineering"],
    pathways: ["Marketing Management", "Digital Strategy", "Sales Leadership", "Market Research"],
    subClusters: ["Social Engineering", "Growth Hacking", "Brand Architecture", "E-commerce Strategy"],
    outcomes: ["Growth Lead", "Brand Strategist", "Marketing Director"],
    relatedIndustries: ["Business", "Media", "Technology"],
    ring: "Creating & Experiencing"
  },
  {
    id: "management-entrepreneurship",
    title: "Management & Entrepreneurship",
    description: "The vanguard of innovation. Launch new ventures and lead organizations through strategic operations and economic leadership.",
    icon: Briefcase,
    color: "text-violet-700",
    glowColor: "rgba(124, 58, 237, 0.3)",
    bgGradient: "from-violet-600 to-purple-600",
    tint: "bg-violet-50/40",
    border: "border-violet-100/50",
    skills: ["Strategic Leadership", "Venture Building", "Operational Design", "Innovation Mgmt"],
    pathways: ["General Management", "Operations", "Business Information", "HR Systems"],
    subClusters: ["Startup Operations", "Corporate Strategy", "Project Leadership", "Organizational Design"],
    outcomes: ["CEO / Founder", "Operations Lead", "Innovation Consultant"],
    relatedIndustries: ["Business", "Finance", "Government"],
    ring: "Creating & Experiencing"
  }
];

export const METHODOLOGY_PHASES = [
  {
    id: "assessment",
    title: "Assessment",
    description: "A deep dive into your natural talents, interests, and potential using proprietary psychometric frameworks.",
    details: "We go beyond simple questionnaires to map your cognitive strengths and personality traits to emerging industry needs.",
    color: "from-indigo-600 to-blue-600",
    tint: "bg-indigo-50/40",
    border: "border-indigo-100/50"
  },
  {
    id: "gap-analysis",
    title: "Gap Analysis",
    description: "Identifying the specific skills and experiences you need to bridge the distance between today and your dream future.",
    details: "Real-time market data compares your current profile with high-demand career requirements to pinpoint your learning priorities.",
    color: "from-violet-600 to-purple-600",
    tint: "bg-violet-50/40",
    border: "border-violet-100/50"
  },
  {
    id: "solution-design",
    title: "Solution Design",
    description: "Engineering a personalized roadmap of education, experiences, and connections tailored to your unique trajectory.",
    details: "We architect a multi-year plan that balances academic rigor with practical experience and industry certifications.",
    color: "from-fuchsia-600 to-pink-600",
    tint: "bg-fuchsia-50/40",
    border: "border-fuchsia-100/50"
  },
  {
    id: "implementation",
    title: "Implementation",
    description: "Executing your plan with high-performance tools, expert mentorship, and a supportive community of peers.",
    details: "Daily action plans and milestone tracking keep you focused on progress while our mentor network provides critical guidance.",
    color: "from-amber-600 to-orange-600",
    tint: "bg-amber-50/40",
    border: "border-amber-100/50"
  },
  {
    id: "measurement",
    title: "Measurement",
    description: "Continuous monitoring of progress and market shifts to refine your path and ensure long-term career resilience.",
    details: "A dynamic feedback loop that adjusts your strategy as you grow and as the professional landscape evolves.",
    color: "from-emerald-600 to-teal-600",
    tint: "bg-emerald-50/40",
    border: "border-emerald-100/50"
  }
];

export const ECOSYSTEM_RINGS = [
  {
    name: "Building & Moving",
    color: "text-orange-500",
    description: "Infrastructure, construction, and the physical flow of goods."
  },
  {
    name: "Cultivating Resources",
    color: "text-green-500",
    description: "Natural resources, energy, and environmental sustainability."
  },
  {
    name: "Caring for Communities",
    color: "text-cyan-500",
    description: "Health, education, and human-centric support systems."
  },
  {
    name: "Connecting & Supporting",
    color: "text-blue-500",
    description: "Safety, public services, and hospitality experiences."
  },
  {
    name: "Investing in the Future",
    color: "text-indigo-500",
    description: "Financial systems, digital infrastructure, and technology."
  },
  {
    name: "Creating & Experiencing",
    color: "text-purple-500",
    description: "Arts, design, marketing, and leadership innovation."
  }
];

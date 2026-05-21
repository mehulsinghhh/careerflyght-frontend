export interface Career {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  demand: "Low" | "Medium" | "High";
  category: string;
  featured?: boolean;
  growthRate?: string;
  skills?: string[];
}

export const MOCK_CAREERS: Career[] = [
  {
    id: "1",
    title: "AI Engineer",
    description: "Develop and deploy artificial intelligence models and systems that can perform tasks requiring human intelligence.",
    salaryRange: "$120k - $250k",
    difficulty: "Advanced",
    demand: "High",
    category: "Software Engineering",
    featured: true,
    growthRate: "+35%",
    skills: ["Python", "PyTorch", "TensorFlow", "NLP"]
  },
  {
    id: "2",
    title: "Full Stack Developer",
    description: "Build both the front-end and back-end of web applications, managing everything from databases to user interfaces.",
    salaryRange: "$80k - $160k",
    difficulty: "Intermediate",
    demand: "High",
    category: "Software Engineering",
    featured: true,
    growthRate: "+22%",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"]
  },
  {
    id: "3",
    title: "Cloud Engineer",
    description: "Design and manage cloud-based infrastructure and services to ensure scalable and reliable application deployments.",
    salaryRange: "$100k - $180k",
    difficulty: "Intermediate",
    demand: "High",
    category: "Infrastructure",
    growthRate: "+28%",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"]
  },
  {
    id: "4",
    title: "Data Analyst",
    description: "Interpret complex data sets to provide actionable insights and help organizations make data-driven decisions.",
    salaryRange: "$70k - $130k",
    difficulty: "Beginner",
    demand: "Medium",
    category: "Data Science",
    growthRate: "+15%",
    skills: ["SQL", "Tableau", "Python", "Statistics"]
  },
  {
    id: "5",
    title: "Cybersecurity Specialist",
    description: "Protect organization's computer networks and systems from cyberattacks and data breaches.",
    salaryRange: "$90k - $170k",
    difficulty: "Advanced",
    demand: "High",
    category: "Security",
    featured: true,
    growthRate: "+31%",
    skills: ["Network Security", "Ethical Hacking", "SIEM", "Cryptography"]
  },
  {
    id: "6",
    title: "UX/UI Designer",
    description: "Create intuitive and visually appealing digital experiences by focusing on user needs and interface aesthetics.",
    salaryRange: "$75k - $140k",
    difficulty: "Beginner",
    demand: "Medium",
    category: "Design",
    growthRate: "+12%",
    skills: ["Figma", "User Research", "Prototyping", "Visual Design"]
  },
  {
    id: "7",
    title: "Product Manager",
    description: "Lead the development and strategy of products, bridging the gap between business, design, and engineering.",
    salaryRange: "$110k - $190k",
    difficulty: "Intermediate",
    demand: "High",
    category: "Business & Management",
    growthRate: "+18%",
    skills: ["Agile", "Strategy", "Roadmapping", "Market Analysis"]
  },
  {
    id: "8",
    title: "Blockchain Developer",
    description: "Design and implement secure and decentralized blockchain-based applications and protocols.",
    salaryRange: "$130k - $220k",
    difficulty: "Advanced",
    demand: "Medium",
    category: "Software Engineering",
    growthRate: "+45%",
    skills: ["Solidity", "Smart Contracts", "Ethereum", "Cryptography"]
  }
];

export interface Career {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  demand: "Low" | "Medium" | "High";
  category: string;
}

export const MOCK_CAREERS: Career[] = [
  {
    id: "1",
    title: "AI Engineer",
    description: "Develop and deploy artificial intelligence models and systems that can perform tasks requiring human intelligence.",
    salaryRange: "$120k - $250k",
    difficulty: "Advanced",
    demand: "High",
    category: "Software Engineering"
  },
  {
    id: "2",
    title: "Full Stack Developer",
    description: "Build both the front-end and back-end of web applications, managing everything from databases to user interfaces.",
    salaryRange: "$80k - $160k",
    difficulty: "Intermediate",
    demand: "High",
    category: "Software Engineering"
  },
  {
    id: "3",
    title: "Cloud Engineer",
    description: "Design and manage cloud-based infrastructure and services to ensure scalable and reliable application deployments.",
    salaryRange: "$100k - $180k",
    difficulty: "Intermediate",
    demand: "High",
    category: "Infrastructure"
  },
  {
    id: "4",
    title: "Data Analyst",
    description: "Interpret complex data sets to provide actionable insights and help organizations make data-driven decisions.",
    salaryRange: "$70k - $130k",
    difficulty: "Beginner",
    demand: "Medium",
    category: "Data Science"
  },
  {
    id: "5",
    title: "Cybersecurity Specialist",
    description: "Protect organization's computer networks and systems from cyberattacks and data breaches.",
    salaryRange: "$90k - $170k",
    difficulty: "Advanced",
    demand: "High",
    category: "Security"
  },
  {
    id: "6",
    title: "UX/UI Designer",
    description: "Create intuitive and visually appealing digital experiences by focusing on user needs and interface aesthetics.",
    salaryRange: "$75k - $140k",
    difficulty: "Beginner",
    demand: "Medium",
    category: "Design"
  }
];

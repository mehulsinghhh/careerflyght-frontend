export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastActivity: string;
  activityHistory: { date: string; count: number }[];
}

export interface Recommendation {
  id: string;
  title: string;
  type: "career" | "skill" | "event";
  description: string;
  matchScore: number;
}

export interface Activity {
  id: string;
  type: "milestone" | "skill" | "mentorship";
  title: string;
  timestamp: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: "completed" | "active" | "locked";
  date?: string;
  type: "education" | "skill" | "experience";
}

export const MOCK_DASHBOARD_DATA = {
  streak: {
    currentStreak: 5,
    bestStreak: 12,
    lastActivity: "2024-05-20",
    activityHistory: [
      { date: "2024-05-16", count: 1 },
      { date: "2024-05-17", count: 3 },
      { date: "2024-05-18", count: 2 },
      { date: "2024-05-19", count: 5 },
      { date: "2024-05-20", count: 4 },
    ]
  },
  stats: [
    { label: "Active Pathways", value: 2, icon: "BookOpen" },
    { label: "Skills Acquired", value: 14, icon: "Award" },
    { label: "Mentor Sessions", value: 3, icon: "Users" },
    { label: "Resources Saved", value: 28, icon: "Bookmark" },
  ],
  recommendations: [
    {
      id: "rec1",
      title: "Advanced NLP Workshop",
      type: "event",
      description: "Based on your interest in AI Engineering",
      matchScore: 98
    },
    {
      id: "rec2",
      title: "Full Stack Portfolio Project",
      type: "skill",
      description: "Build a real-world SaaS application",
      matchScore: 92
    },
    {
      id: "rec3",
      title: "Cloud Architect Path",
      type: "career",
      description: "Your background in Infrastructure is a great fit",
      matchScore: 85
    }
  ],
  activities: [
    {
      id: "act1",
      type: "skill",
      title: "Learned TypeScript Fundamentals",
      timestamp: "2 hours ago",
      status: "completed"
    },
    {
      id: "act2",
      type: "milestone",
      title: "Started 'Backend API' module",
      timestamp: "Yesterday",
      status: "in-progress"
    },
    {
      id: "act3",
      type: "mentorship",
      title: "Session with David Chen",
      timestamp: "2 days ago",
      status: "completed"
    }
  ],
  roadmap: [
    {
      id: "m1",
      title: "Foundation of Web Dev",
      description: "HTML, CSS, and Modern JavaScript",
      status: "completed",
      date: "Mar 2024",
      type: "education"
    },
    {
      id: "m2",
      title: "React & State Management",
      description: "Building complex UIs with React and Redux",
      status: "completed",
      date: "Apr 2024",
      type: "skill"
    },
    {
      id: "m3",
      title: "Full Stack Integration",
      description: "Connecting Node.js backends with SQL databases",
      status: "active",
      type: "skill"
    },
    {
      id: "m4",
      title: "System Design Prep",
      description: "Architecting scalable cloud applications",
      status: "locked",
      type: "skill"
    },
    {
      id: "m5",
      title: "First Engineering Internship",
      description: "Hands-on experience in a professional team",
      status: "locked",
      type: "experience"
    }
  ]
};

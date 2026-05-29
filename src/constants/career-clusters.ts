import {
  Cpu,
  HardHat,
  Truck,
  Palette,
  Utensils,
  Coins,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  Sprout,
  Zap,
  Laptop,
  TrendingUp,
  Briefcase
} from "lucide-react";

export interface SubCluster {
  title: string;
  pathways: string[];
}

export interface CareerCluster {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  category: "Building & Moving" | "Cultivating Resources" | "Caring for Communities" | "Connecting & Supporting" | "Investing in the Future" | "Creating & Experiencing";
  subClusters: SubCluster[];
}

export const CAREER_CLUSTERS: CareerCluster[] = [
  {
    id: "manufacturing",
    title: "Advanced Manufacturing",
    description: "Shape the physical world through cutting-edge production and automation.",
    icon: Cpu,
    color: "from-indigo-500/20 to-blue-500/20",
    glow: "rgba(79, 70, 229, 0.1)",
    category: "Building & Moving",
    subClusters: [
      { title: "Industrial Machinery", pathways: [] },
      { title: "Production & Automation", pathways: [] },
      { title: "Robotics", pathways: [] },
      { title: "Safety & Quality Assurance", pathways: [] }
    ]
  },
  {
    id: "construction",
    title: "Construction",
    description: "Design and build the infrastructure of tomorrow.",
    icon: HardHat,
    color: "from-orange-500/20 to-amber-500/20",
    glow: "rgba(249, 115, 22, 0.1)",
    category: "Building & Moving",
    subClusters: [
      { title: "Architecture & Civil Engineering", pathways: [] },
      { title: "Construction Planning & Development", pathways: [] },
      { title: "Equipment Operation & Maintenance", pathways: [] },
      { title: "Skilled Trades", pathways: [] }
    ]
  },
  {
    id: "supply-chain",
    title: "Supply Chain & Transportation",
    description: "Manage the global flow of goods and people across every horizon.",
    icon: Truck,
    color: "from-slate-500/20 to-blue-500/20",
    glow: "rgba(71, 85, 105, 0.1)",
    category: "Building & Moving",
    subClusters: [
      { title: "Air & Space Transportation", pathways: [] },
      { title: "Ground & Rail Transportation", pathways: [] },
      { title: "Maintenance & Repair", pathways: [] },
      { title: "Marine Transportation", pathways: [] },
      { title: "Planning & Logistics", pathways: [] },
      { title: "Purchasing & Warehousing", pathways: [] }
    ]
  },
  {
    id: "arts-design",
    title: "Arts, Entertainment & Design",
    description: "Create immersive experiences and express the human spirit.",
    icon: Palette,
    color: "from-purple-500/20 to-pink-500/20",
    glow: "rgba(168, 85, 247, 0.1)",
    category: "Creating & Experiencing",
    subClusters: [
      { title: "Design & Digital Arts", pathways: [] },
      { title: "Fashion & Interiors", pathways: [] },
      { title: "Fine Arts", pathways: [] },
      { title: "Lighting & Sound Technology", pathways: [] },
      { title: "Media Production & Broadcasting", pathways: [] },
      { title: "Performing Arts", pathways: [] }
    ]
  },
  {
    id: "hospitality",
    title: "Hospitality, Events & Tourism",
    description: "Curate unforgettable moments and global connections.",
    icon: Utensils,
    color: "from-rose-500/20 to-pink-500/20",
    glow: "rgba(244, 63, 94, 0.1)",
    category: "Connecting & Supporting",
    subClusters: [
      { title: "Accommodations", pathways: [] },
      { title: "Conferences & Events", pathways: [] },
      { title: "Culinary & Food Services", pathways: [] },
      { title: "Travel & Leisure", pathways: [] }
    ]
  },
  {
    id: "finance",
    title: "Financial Services",
    description: "Master the mechanics of value, investment, and global markets.",
    icon: Coins,
    color: "from-amber-400/20 to-yellow-600/20",
    glow: "rgba(251, 191, 36, 0.1)",
    category: "Investing in the Future",
    subClusters: []
  },
  {
    id: "education",
    title: "Education",
    description: "Empower the next generation and drive lifelong learning.",
    icon: GraduationCap,
    color: "from-blue-400/20 to-indigo-500/20",
    glow: "rgba(96, 165, 250, 0.1)",
    category: "Caring for Communities",
    subClusters: []
  },
  {
    id: "healthcare",
    title: "Healthcare & Human Services",
    description: "Innovate for human wellness and provide essential care.",
    icon: HeartPulse,
    color: "from-teal-400/20 to-emerald-500/20",
    glow: "rgba(45, 212, 191, 0.1)",
    category: "Caring for Communities",
    subClusters: []
  },
  {
    id: "public-service",
    title: "Public Service & Safety",
    description: "Protect society and lead with a commitment to the public good.",
    icon: ShieldCheck,
    color: "from-red-500/20 to-orange-600/20",
    glow: "rgba(239, 68, 68, 0.1)",
    category: "Caring for Communities",
    subClusters: []
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description: "Pioneer sustainable ways to feed and clothe the world.",
    icon: Sprout,
    color: "from-green-500/20 to-emerald-600/20",
    glow: "rgba(34, 197, 94, 0.1)",
    category: "Cultivating Resources",
    subClusters: []
  },
  {
    id: "energy",
    title: "Energy & Natural Resources",
    description: "Power the world responsibly and manage our natural legacy.",
    icon: Zap,
    color: "from-yellow-400/20 to-orange-500/20",
    glow: "rgba(250, 204, 21, 0.1)",
    category: "Cultivating Resources",
    subClusters: []
  },
  {
    id: "digital-tech",
    title: "Digital Technology",
    description: "Architect the digital landscape and create the future of tech.",
    icon: Laptop,
    color: "from-cyan-400/20 to-blue-600/20",
    glow: "rgba(34, 211, 238, 0.1)",
    category: "Investing in the Future",
    subClusters: []
  },
  {
    id: "marketing",
    title: "Marketing & Sales",
    description: "Bridge the gap between products and people through persuasion and data.",
    icon: TrendingUp,
    color: "from-orange-400/20 to-rose-500/20",
    glow: "rgba(251, 146, 60, 0.1)",
    category: "Connecting & Supporting",
    subClusters: []
  },
  {
    id: "management",
    title: "Management & Entrepreneurship",
    description: "Lead organizations and build ventures that change the world.",
    icon: Briefcase,
    color: "from-violet-500/20 to-fuchsia-600/20",
    glow: "rgba(139, 92, 246, 0.1)",
    category: "Investing in the Future",
    subClusters: []
  }
];

export const ECOSYSTEM_CATEGORIES = [
  "Building & Moving",
  "Cultivating Resources",
  "Caring for Communities",
  "Connecting & Supporting",
  "Investing in the Future",
  "Creating & Experiencing"
];

import { 
  Laptop, 
  BrainCircuit, 
  Palette, 
  Stethoscope, 
  Leaf, 
  Briefcase, 
  Megaphone, 
  Rocket 
} from "lucide-react";

const categories = [
  {
    title: "Technology",
    description: "Build the infrastructure of the digital world.",
    icon: Laptop,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence and insights.",
    icon: BrainCircuit,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Design & Creative",
    description: "Create experiences that inspire and engage.",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness and longevity.",
    icon: Stethoscope,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Sustainability",
    description: "Solve the planet's most pressing challenges.",
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Business & Finance",
    description: "Drive the economy and master the markets.",
    icon: Briefcase,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Marketing & Media",
    description: "Tell stories that move people and brands.",
    icon: Megaphone,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Entrepreneurship",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "from-fuchsia-500 to-purple-500",
  },
];

export default function CareerCategories() {
  return (
    <section className="py-24 px-6 bg-black/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Explore Infinite Possibilities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover a wide range of industries and specializations. Dive into the details of every role and find where you belong.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.title} 
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              {/* Glow Effect */}
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`} />
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

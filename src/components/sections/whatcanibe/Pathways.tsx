import { Search, Map, Users, Target } from "lucide-react";

const steps = [
  {
    title: "Discovery",
    description: "Take AI-powered assessments to match your personality and skills with potential careers.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Mapping",
    description: "Visualize step-by-step roadmaps from where you are now to your first day on the job.",
    icon: Map,
    color: "bg-violet-500",
  },
  {
    title: "Mentorship",
    description: "Connect with professionals who have walked the path before and get real-world advice.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Growth",
    description: "Access curated internships, projects, and certifications to build your professional profile.",
    icon: Target,
    color: "bg-fuchsia-500",
  },
];

export default function Pathways() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Roadmap to Your <span className="text-violet-400">Success</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We've decoded the journey from student to professional. No more guessing—just clear, actionable steps tailored to your unique goals.
            </p>
            
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={step.title} className="flex gap-6 p-6 rounded-2xl border border-white/5 hover:border-white/10 bg-white/5 transition-colors">
                  <div className={`shrink-0 w-12 h-12 rounded-full ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 flex items-center justify-center overflow-hidden">
               {/* Visual representation of a roadmap */}
               <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                    <path d="M50 350 C 150 350, 150 50, 350 50" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
                    <circle cx="50" cy="350" r="10" fill="white" />
                    <circle cx="350" cy="50" r="10" fill="white" />
                  </svg>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl translate-y-8">
                    <p className="text-xs text-violet-400 font-bold mb-2 uppercase tracking-widest">Year 1</p>
                    <p className="font-bold text-white">Fundamentals</p>
                    <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-violet-500" />
                    </div>
                  </div>
                  <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl -translate-y-8">
                    <p className="text-xs text-purple-400 font-bold mb-2 uppercase tracking-widest">Year 2</p>
                    <p className="font-bold text-white">Specialization</p>
                    <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-purple-500" />
                    </div>
                  </div>
                  <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl translate-y-8">
                    <p className="text-xs text-fuchsia-400 font-bold mb-2 uppercase tracking-widest">Year 3</p>
                    <p className="font-bold text-white">Practical Exp.</p>
                    <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[30%] bg-fuchsia-500" />
                    </div>
                  </div>
                  <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl -translate-y-8 opacity-50">
                    <p className="text-xs text-gray-500 font-bold mb-2 uppercase tracking-widest">Final</p>
                    <p className="font-bold text-white/50">Dream Job</p>
                    <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-gray-500" />
                    </div>
                  </div>
               </div>
            </div>
            
            {/* Background blur */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-600/20 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

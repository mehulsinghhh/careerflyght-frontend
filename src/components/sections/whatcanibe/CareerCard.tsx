import { Career } from "@/constants/careers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, BarChart3 } from "lucide-react";

interface CareerCardProps {
  career: Career;
}

export default function CareerCard({ career }: CareerCardProps) {
  const difficultyColor = {
    Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
    Intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
  }[career.difficulty];

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-violet-500/50 hover:bg-white/10 overflow-hidden">
      {/* Background glow on hover */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl transition-all group-hover:bg-violet-600/20" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className={`${difficultyColor} font-medium`}>
            {career.difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
            <TrendingUp className="h-3 w-3 text-violet-400" />
            Demand: {career.demand}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
          {career.title}
        </h3>

        <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
          {career.description}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Briefcase className="h-4 w-4 text-violet-400" />
            <span>{career.salaryRange}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <BarChart3 className="h-4 w-4 text-violet-400" />
            <span>{career.category}</span>
          </div>
        </div>

        <Button className="w-full bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 transition-all rounded-xl">
          View Pathway
        </Button>
      </div>
    </div>
  );
}

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function AdminErrorState({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again later.",
  onRetry
}: AdminErrorStateProps) {
  return (
    <div className="bg-white border border-red-100 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
      <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
      <p className="text-sm text-zinc-500 mt-1 max-w-xs">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-6 border-zinc-200 hover:bg-zinc-50 font-bold gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

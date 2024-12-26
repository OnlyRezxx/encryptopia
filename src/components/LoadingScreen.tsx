import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-navy flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-mint animate-spin mx-auto" />
        <p className="text-mint text-lg">Loading encryption tools...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
import { Code, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-8 py-4 border-t border-mint/20">
      <div className="flex items-center justify-center gap-2 text-mint">
        <p>Made with</p>
        <Heart className="w-4 h-4 text-red-500 animate-pulse" />
        <p>by Rezzx</p>
      </div>
    </footer>
  );
};

export default Footer;
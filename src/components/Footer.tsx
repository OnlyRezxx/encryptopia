import { Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-8 py-4 border-t border-mint/20">
      <div className="flex items-center justify-center gap-2 text-mint">
        <Code className="w-4 h-4" />
        <p>Created by Rezzx</p>
      </div>
    </footer>
  );
};

export default Footer;
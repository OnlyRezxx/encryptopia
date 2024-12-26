import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/6282256925572', '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg animate-bounce"
      size="icon"
    >
      <MessageCircle className="w-5 h-5" />
    </Button>
  );
};

export default WhatsAppButton;
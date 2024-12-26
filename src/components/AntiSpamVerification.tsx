import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AntiSpamVerificationProps {
  onVerified: (verified: boolean) => void;
}

const AntiSpamVerification = ({ onVerified }: AntiSpamVerificationProps) => {
  const [answer, setAnswer] = useState("");
  const [num1] = useState(() => Math.floor(Math.random() * 10));
  const [num2] = useState(() => Math.floor(Math.random() * 10));

  const handleVerify = () => {
    const isCorrect = parseInt(answer) === num1 + num2;
    onVerified(isCorrect);
    if (!isCorrect) {
      setAnswer("");
    }
  };

  return (
    <div className="flex items-center gap-4 my-4">
      <Shield className="w-5 h-5 text-mint" />
      <span className="text-gray-300">Verify: What is {num1} + {num2}?</span>
      <Input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-20 bg-navy-light border-mint/20"
        placeholder="?"
      />
      <Button onClick={handleVerify} variant="outline" className="border-mint/20 text-mint hover:bg-mint hover:text-navy">
        Verify
      </Button>
    </div>
  );
};

export default AntiSpamVerification;
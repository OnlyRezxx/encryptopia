import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: (verified: boolean) => void;
}

const VerificationDialog = ({ open, onOpenChange, onVerified }: VerificationDialogProps) => {
  const [answer, setAnswer] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  useEffect(() => {
    if (open) {
      setNum1(Math.floor(Math.random() * 10));
      setNum2(Math.floor(Math.random() * 10));
      setAnswer("");
    }
  }, [open]);

  const handleVerify = () => {
    const isCorrect = parseInt(answer) === num1 + num2;
    onVerified(isCorrect);
    if (isCorrect) {
      onOpenChange(false);
    } else {
      setAnswer("");
      setNum1(Math.floor(Math.random() * 10));
      setNum2(Math.floor(Math.random() * 10));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-navy border-mint/20">
        <DialogHeader>
          <DialogTitle className="text-mint flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Verify Human
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-300">What is {num1} + {num2}?</p>
          <div className="flex gap-4">
            <Input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-navy-light border-mint/20"
              placeholder="?"
            />
            <Button onClick={handleVerify} variant="outline" className="border-mint/20 text-mint hover:bg-mint hover:text-navy">
              Verify
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
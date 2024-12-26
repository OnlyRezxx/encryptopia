import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Trash2, AlertTriangle } from "lucide-react";
import Footer from "@/components/Footer";
import Instructions from "@/components/Instructions";
import VerificationDialog from "@/components/VerificationDialog";
import WhatsAppButton from "@/components/WhatsAppButton";
import EncryptionMethodSelector from "@/components/EncryptionMethodSelector";
import LoadingScreen from "@/components/LoadingScreen";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { encryptText, decryptText } from "@/utils/encryption";

const Index = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [method, setMethod] = useState("base64");
  const [showVerification, setShowVerification] = useState(false);
  const [pendingAction, setPendingAction] = useState<'encrypt' | 'decrypt' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEncryptDecrypt = (action: 'encrypt' | 'decrypt') => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to " + action,
        variant: "destructive",
      });
      return;
    }
    setShowVerification(true);
    setPendingAction(action);
  };

  const handleVerified = (verified: boolean) => {
    if (verified && pendingAction) {
      performOperation(pendingAction);
      setPendingAction(null);
    }
    setShowVerification(false);
  };

  const performOperation = (action: 'encrypt' | 'decrypt') => {
    try {
      const result = action === 'encrypt' 
        ? encryptText(input, method)
        : decryptText(input, method);
      setOutput(result);
      toast({
        title: `${action === 'encrypt' ? 'Encryption' : 'Decryption'} Successful`,
        description: "Operation completed successfully",
      });
    } catch (error) {
      toast({
        title: `${action === 'encrypt' ? 'Encryption' : 'Decryption'} Error`,
        description: `Failed to ${action} the text. Please check your input.`,
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setPendingAction(null);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-navy p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-mint animate-glow">Code Encryption</h1>
          <p className="text-gray-300">Encrypt and decrypt your code using various methods</p>
        </div>

        <Alert className="bg-yellow-500/10 border-yellow-500/50 text-yellow-300">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please ensure your code is functional before encryption. The encryption process may affect code execution if not properly handled.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          <EncryptionMethodSelector value={method} onChange={setMethod} />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encrypt/decrypt..."
              className="h-40 bg-navy-light border-mint/20 text-gray-200 placeholder:text-gray-500"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => handleEncryptDecrypt('encrypt')}
              className="bg-mint text-navy hover:bg-mint-dark transition-colors"
            >
              Encrypt
            </Button>
            <Button
              onClick={() => handleEncryptDecrypt('decrypt')}
              className="bg-mint text-navy hover:bg-mint-dark transition-colors"
            >
              Decrypt
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Output</label>
            <Textarea
              value={output}
              readOnly
              className="h-40 bg-navy-light border-mint/20 text-gray-200"
            />
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              onClick={handleCopy}
              className="bg-navy-light border border-mint/20 text-mint hover:bg-mint hover:text-navy transition-colors"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              onClick={handleClear}
              variant="destructive"
              className="bg-red-500/20 text-red-300 hover:bg-red-500/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        <Instructions />
        <Footer />
      </div>

      <VerificationDialog
        open={showVerification}
        onOpenChange={setShowVerification}
        onVerified={handleVerified}
      />
      
      <WhatsAppButton phoneNumber="+6282256925572" />
    </div>
  );
};

export default Index;
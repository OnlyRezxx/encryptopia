import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Trash2 } from "lucide-react";
import Footer from "@/components/Footer";
import Instructions from "@/components/Instructions";
import VerificationDialog from "@/components/VerificationDialog";
import WhatsAppButton from "@/components/WhatsAppButton";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [method, setMethod] = useState("base64");
  const [language, setLanguage] = useState("javascript");
  const [showVerification, setShowVerification] = useState(false);
  const [pendingAction, setPendingAction] = useState<'encrypt' | 'decrypt' | null>(null);
  const { toast } = useToast();

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
  };

  const performOperation = (action: 'encrypt' | 'decrypt') => {
    try {
      let result = "";
      const isEncrypt = action === 'encrypt';
      
      switch (method) {
        case "base64":
          result = isEncrypt ? btoa(input) : atob(input);
          break;
        case "caesar":
          result = input
            .split("")
            .map((char) => {
              if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = char === char.toUpperCase();
                const base = isUpperCase ? 65 : 97;
                const shift = isEncrypt ? 3 : -3;
                return String.fromCharCode(((code - base + shift + 26) % 26) + base);
              }
              return char;
            })
            .join("");
          break;
        case "url":
          result = isEncrypt ? encodeURIComponent(input) : decodeURIComponent(input);
          break;
        case "rot13":
          result = input
            .split("")
            .map((char) => {
              if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = char === char.toUpperCase();
                const base = isUpperCase ? 65 : 97;
                return String.fromCharCode(((code - base + 13) % 26) + base);
              }
              return char;
            })
            .join("");
          break;
      }
      setOutput(result);
    } catch (error) {
      toast({
        title: `${isEncrypt ? 'Encryption' : 'Decryption'} Error`,
        description: `Failed to ${isEncrypt ? 'encrypt' : 'decrypt'} the text. Please check your input.`,
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

  return (
    <div className="min-h-screen bg-navy p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-mint animate-glow">Code Encryption</h1>
          <p className="text-gray-300">Encrypt and decrypt your code using various methods</p>
        </div>

        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Encryption Method</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="bg-navy-light border-mint/20 text-gray-200">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent className="bg-navy-light border-mint/20">
                <SelectItem value="base64">Base64</SelectItem>
                <SelectItem value="caesar">Caesar Cipher</SelectItem>
                <SelectItem value="url">URL Encoding</SelectItem>
                <SelectItem value="rot13">ROT13</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <LanguageSelector value={language} onChange={setLanguage} />

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
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;
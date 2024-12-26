import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Key, Hash, Globe, FileType, Binary, Shield } from "lucide-react";

interface EncryptionMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const EncryptionMethodSelector = ({ value, onChange }: EncryptionMethodSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">Encryption Method</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-navy-light border-mint/20 text-gray-200">
          <SelectValue placeholder="Select method" />
        </SelectTrigger>
        <SelectContent className="bg-navy-light border-mint/20">
          <SelectItem value="base64">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Base64</span>
            </div>
          </SelectItem>
          <SelectItem value="caesar">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              <span>Caesar Cipher</span>
            </div>
          </SelectItem>
          <SelectItem value="url">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>URL Encoding</span>
            </div>
          </SelectItem>
          <SelectItem value="rot13">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              <span>ROT13</span>
            </div>
          </SelectItem>
          <SelectItem value="hex">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4" />
              <span>Hexadecimal</span>
            </div>
          </SelectItem>
          <SelectItem value="morse">
            <div className="flex items-center gap-2">
              <FileType className="w-4 h-4" />
              <span>Morse Code</span>
            </div>
          </SelectItem>
          <SelectItem value="binary">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4" />
              <span>Binary</span>
            </div>
          </SelectItem>
          <SelectItem value="aes">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>AES-256</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EncryptionMethodSelector;
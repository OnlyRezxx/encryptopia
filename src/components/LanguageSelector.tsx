import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Javascript, Python, Java } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">Programming Language</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-navy-light border-mint/20 text-gray-200">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="bg-navy-light border-mint/20">
          <SelectItem value="javascript">
            <div className="flex items-center gap-2">
              <Javascript className="w-4 h-4" />
              <span>JavaScript</span>
            </div>
          </SelectItem>
          <SelectItem value="python">
            <div className="flex items-center gap-2">
              <Python className="w-4 h-4" />
              <span>Python</span>
            </div>
          </SelectItem>
          <SelectItem value="java">
            <div className="flex items-center gap-2">
              <Java className="w-4 h-4" />
              <span>Java</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
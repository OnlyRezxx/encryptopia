import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Terminal, Brackets, Hash, FileJson, Database, Globe, Braces, FileType, Binary } from "lucide-react";

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
              <Code className="w-4 h-4" />
              <span>JavaScript</span>
            </div>
          </SelectItem>
          <SelectItem value="python">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Python</span>
            </div>
          </SelectItem>
          <SelectItem value="java">
            <div className="flex items-center gap-2">
              <Brackets className="w-4 h-4" />
              <span>Java</span>
            </div>
          </SelectItem>
          <SelectItem value="csharp">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              <span>C#</span>
            </div>
          </SelectItem>
          <SelectItem value="php">
            <div className="flex items-center gap-2">
              <FileType className="w-4 h-4" />
              <span>PHP</span>
            </div>
          </SelectItem>
          <SelectItem value="ruby">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4" />
              <span>Ruby</span>
            </div>
          </SelectItem>
          <SelectItem value="sql">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>SQL</span>
            </div>
          </SelectItem>
          <SelectItem value="html">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>HTML</span>
            </div>
          </SelectItem>
          <SelectItem value="json">
            <div className="flex items-center gap-2">
              <FileJson className="w-4 h-4" />
              <span>JSON</span>
            </div>
          </SelectItem>
          <SelectItem value="typescript">
            <div className="flex items-center gap-2">
              <Braces className="w-4 h-4" />
              <span>TypeScript</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
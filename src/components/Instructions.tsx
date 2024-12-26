import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Instructions = () => {
  return (
    <div className="mb-8 text-left">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-mint" />
        <h2 className="text-xl font-semibold text-mint">Instructions & Information</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="what-is">
          <AccordionTrigger>What is Code Encryption?</AccordionTrigger>
          <AccordionContent>
            Code encryption is a process of converting code into an encoded format to protect it from unauthorized access. It helps secure sensitive code and intellectual property by making it unreadable without the proper decryption method.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-to">
          <AccordionTrigger>How to Use</AccordionTrigger>
          <AccordionContent>
            1. Select your encryption method
            2. Choose your programming language (if applicable)
            3. Enter your code in the input field
            4. Complete the anti-spam verification
            5. Click Encrypt/Decrypt
            6. Copy the result using the copy button
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="methods">
          <AccordionTrigger>Available Encryption Methods</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Base64 - Basic encoding suitable for any text</li>
              <li>Caesar Cipher - Simple substitution cipher</li>
              <li>URL Encoding - Safe for URLs and special characters</li>
              <li>ROT13 - Letter substitution</li>
              <li>Programming Language Specific - Optimized for code syntax</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Instructions;
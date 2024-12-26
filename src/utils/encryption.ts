import CryptoJS from 'crypto-js';

export const encryptText = (text: string, method: string): string => {
  try {
    switch (method) {
      case "base64":
        return btoa(text);
      case "caesar":
        return text
          .split("")
          .map((char) => {
            if (char.match(/[a-z]/i)) {
              const code = char.charCodeAt(0);
              const isUpperCase = char === char.toUpperCase();
              const base = isUpperCase ? 65 : 97;
              return String.fromCharCode(((code - base + 3) % 26) + base);
            }
            return char;
          })
          .join("");
      case "url":
        return encodeURIComponent(text);
      case "rot13":
        return text
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
      case "hex":
        return text.split('').map(char => char.charCodeAt(0).toString(16)).join('');
      case "morse":
        const morseCode: { [key: string]: string } = {
          'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
          'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
          'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
          'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
          'Y': '-.--', 'Z': '--..', ' ': '/'
        };
        return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
      case "binary":
        return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      case "aes":
        return CryptoJS.AES.encrypt(text, 'secret-key').toString();
      default:
        return text;
    }
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt text");
  }
};

export const decryptText = (text: string, method: string): string => {
  try {
    switch (method) {
      case "base64":
        return atob(text);
      case "caesar":
        return text
          .split("")
          .map((char) => {
            if (char.match(/[a-z]/i)) {
              const code = char.charCodeAt(0);
              const isUpperCase = char === char.toUpperCase();
              const base = isUpperCase ? 65 : 97;
              return String.fromCharCode(((code - base - 3 + 26) % 26) + base);
            }
            return char;
          })
          .join("");
      case "url":
        return decodeURIComponent(text);
      case "rot13":
        return text
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
      case "hex":
        return text.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || '';
      case "morse":
        const morseCode: { [key: string]: string } = {
          '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
          '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
          '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
          '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
          '-.--': 'Y', '--..': 'Z', '/': ' '
        };
        return text.split(' ').map(char => morseCode[char] || char).join('');
      case "binary":
        return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      case "aes":
        const bytes = CryptoJS.AES.decrypt(text, 'secret-key');
        return bytes.toString(CryptoJS.enc.Utf8);
      default:
        return text;
    }
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt text");
  }
};
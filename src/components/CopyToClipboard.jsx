import { useState } from "react";

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState({});

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);  // Copy the text
      setCopied((prevCopied) => ({ ...prevCopied, [textToCopy]: true }));  // Set copied state to true for the specific text

      // Reset the "Copied!" state after 2 seconds
      setTimeout(() => {
        setCopied((prevCopied) => ({ ...prevCopied, [textToCopy]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return { copied, handleCopy };
};

export default useCopyToClipboard;
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import "./../App.css";

const FloatingText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);

  return (
    <Box
      className="floating-text"
      display="inline-block"
      fontSize="6xl"
      fontWeight="bold"
      color="#F78104"
    >
      {displayText}
    </Box>
  );
};

export default FloatingText;

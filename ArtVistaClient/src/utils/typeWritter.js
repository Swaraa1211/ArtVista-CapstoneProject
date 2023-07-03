import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, text]);

  return <Box as="span" fontSize="2xl" fontWeight="bold" color="#F78104">{displayText}</Box>;
};

export default TypewriterEffect;

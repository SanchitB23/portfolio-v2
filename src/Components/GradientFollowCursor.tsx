"use client"

// components/MotionGradientFollowCursor.js
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MotionGradientFollowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}

    >
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-blue-950"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent, rgba(29, 78, 216, 0.05) 100%)`,
          translateX: position.x-25,
          translateY: position.y-25,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 10 }}
      />
    </motion.div>
  );
};

export default MotionGradientFollowCursor;

"use client";

// components/MotionGradientFollowCursor.js
import { useEffect, useState } from "react";

const MotionGradientFollowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: { clientX: any; clientY: any }) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      className={
        "pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
      }
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
};

export default MotionGradientFollowCursor;

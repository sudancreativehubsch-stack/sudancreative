"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function GlassHeroArt({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);
      setTilt({
        x: Math.max(-8, Math.min(8, -deltaY * 7)),
        y: Math.max(-10, Math.min(10, deltaX * 9)),
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`glass-hero-art ${className}`}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 1, ease: "easeOut" },
        scale: { duration: 1, ease: "easeOut" },
        y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
      }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Background ambient glowing light ribbons with Framer Motion breathing pulse */}
      <motion.div
        className="glass-hero-art__ambient-blue"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.75, 0.95, 0.75],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="glass-hero-art__ambient-orange"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />

      {/* 3D Isometric Glass Crystal Artwork */}
      <svg
        viewBox="0 0 540 540"
        className="glass-hero-art__svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="3D Glowing Glass Crystal Artwork"
      >
        <defs>
          <linearGradient id="neonCyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#0080ff" />
            <stop offset="100%" stopColor="#0030aa" />
          </linearGradient>

          <linearGradient id="neonOrangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb300" />
            <stop offset="50%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#d93800" />
          </linearGradient>

          <linearGradient id="blueGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 220, 255, 0.42)" />
            <stop offset="100%" stopColor="rgba(0, 100, 240, 0.16)" />
          </linearGradient>

          <linearGradient id="blueGlassLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 140, 255, 0.35)" />
            <stop offset="100%" stopColor="rgba(5, 20, 90, 0.58)" />
          </linearGradient>

          <linearGradient id="blueGlassRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 60, 180, 0.14)" />
          </linearGradient>

          <linearGradient id="orangeGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 200, 50, 0.48)" />
            <stop offset="100%" stopColor="rgba(255, 100, 0, 0.22)" />
          </linearGradient>

          <linearGradient id="orangeGlassLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 140, 0, 0.42)" />
            <stop offset="100%" stopColor="rgba(140, 40, 0, 0.38)" />
          </linearGradient>

          <linearGradient id="orangeGlassRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 180, 50, 0.38)" />
            <stop offset="100%" stopColor="rgba(200, 60, 0, 0.2)" />
          </linearGradient>

          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background light streaks */}
        <g opacity="0.9">
          <path
            d="M 500 40 C 420 120, 360 220, 240 380 C 180 460, 90 490, 20 510"
            stroke="url(#neonCyanGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#cyanGlow)"
            opacity="0.8"
          />
          <path
            d="M 120 480 C 240 460, 340 430, 420 360 C 480 300, 520 220, 540 160"
            stroke="url(#neonOrangeGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#orangeGlow)"
            opacity="0.85"
          />
        </g>

        {/* Primary 3D Isometric Blue Glass Crystal Prism */}
        <g className="glass-crystal-blue">
          <polygon
            points="270,70 390,140 390,290 270,220"
            fill="url(#blueGlassRight)"
            opacity="0.6"
          />
          <polygon
            points="270,70 150,140 150,290 270,220"
            fill="url(#blueGlassLeft)"
            opacity="0.75"
          />

          <polygon
            points="270,120 170,180 170,360 270,300"
            fill="url(#blueGlassLeft)"
            stroke="#00f0ff"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="270,120 370,180 370,360 270,300"
            fill="url(#blueGlassRight)"
            stroke="#00c8ff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="270,60 370,120 270,180 170,120"
            fill="url(#blueGlassTop)"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <line x1="270" y1="60" x2="270" y2="300" stroke="#00f0ff" strokeWidth="3" filter="url(#cyanGlow)" />
          <line x1="170" y1="120" x2="170" y2="360" stroke="#00b4ff" strokeWidth="2.5" />
          <line x1="370" y1="120" x2="370" y2="360" stroke="#0080ff" strokeWidth="2" />
        </g>

        {/* Secondary 3D Isometric Orange Glass Crystal Prism */}
        <g className="glass-crystal-orange">
          <polygon
            points="340,190 440,250 340,310 240,250"
            fill="url(#orangeGlassTop)"
            stroke="#fff2b3"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="340,310 240,250 240,410 340,470"
            fill="url(#orangeGlassLeft)"
            stroke="#ff9900"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="340,310 440,250 440,410 340,470"
            fill="url(#orangeGlassRight)"
            stroke="#ff6a00"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          <line x1="340" y1="190" x2="340" y2="470" stroke="#ffb300" strokeWidth="3.5" filter="url(#orangeGlow)" />
          <line x1="240" y1="250" x2="240" y2="410" stroke="#ff7700" strokeWidth="2.5" />
          <line x1="440" y1="250" x2="440" y2="410" stroke="#ff5500" strokeWidth="2.5" />
        </g>

        {/* Floating Neon Light Particles & Reflections */}
        <circle cx="270" cy="60" r="4.5" fill="#ffffff" filter="url(#cyanGlow)" />
        <circle cx="340" cy="190" r="4.5" fill="#fff5cc" filter="url(#orangeGlow)" />
        <circle cx="240" cy="250" r="3.5" fill="#ffaa00" />
        <circle cx="170" cy="120" r="3.5" fill="#00f0ff" />
        <circle cx="370" cy="360" r="3" fill="#00c8ff" />
      </svg>
    </motion.div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

const TRANSACTION_MESSAGES = [
  "Agent #A392 • Transferred 18,420 USDC on Base",
  "Treasury Agent settled • 91,750 USDC",
  "x402 Agent • Paid 12,900 USDC to Merchant",
  "Autonomous payment • 4,280 USDC executed",
  "Agent #T17 • Routed 287,500 USDC",
  "Invoice #8812 settled • 33,140 USDC",
  "Treasury Agent • Transferred 142,800 USDC",
  "Agent #K44 • Paid 9,650 USDC on Solana",
];

export default function ComingSoonPage() {
  const handleInquiry = () => {
    window.location.href =
      "mailto:inquiry@agentfi.com?subject=AgentFi.com%20%7C%20Confidential%20Acquisition%20Request";
  };

  const canvasRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const transactionIndexRef = useRef(0);

  // Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 20000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.1 + 0.9,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.45 + 0.3,
      });
    }

    let animationFrame;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00D69F";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Floating Transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const text = TRANSACTION_MESSAGES[transactionIndexRef.current % TRANSACTION_MESSAGES.length];
      transactionIndexRef.current++;

      const newTx = {
        id: Date.now(),
        text,
        x: Math.random() * 92 + 4,
        y: Math.random() * 78 + 8,
      };

      setTransactions((prev) => [...prev.slice(-2), newTx]);

      setTimeout(() => {
        setTransactions((prev) => prev.filter((t) => t.id !== newTx.id));
      }, 5300);
    }, 2300);

    return () => clearInterval(interval);
  }, []);

  // Class για τα transaction cards (για να μην σπάει το string)
  const transactionCardClass =
    "absolute px-4 py-1.5 rounded-lg text-[10px] font-mono tracking-[0.5px] " +
    "bg-black/70 border border-[#00D69F]/35 text-[#00D69F]/95 " +
    "shadow-[0_0_14px_rgba(0,214,159,0.18)] backdrop-blur-md " +
    "animate-[fadeInOut_5.3s_ease-in-out_forwards]";

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex flex-col">
      {/* Canvas Particles Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.38 }}
      />

      {/* Floating Transaction Cards */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className={transactionCardClass}
            style={{
              left: `${tx.x}%`,
              top: `${tx.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {tx.text}
          </div>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 relative z-20">
        <div className="w-full max-w-3xl text-center">
          <h1 className="font-inter font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 sm:mb-8 tracking-[-0.02em] opacity-0 animate-fadeInUp">
            <span className="text-[#00D69F]">AgentFi</span>
            <span className="text-white">.com</span>
          </h1>

          <p
            className="font-inter font-normal text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 sm:mb-5 opacity-0 animate-fadeInUp leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            The Infrastructure of Autonomous Finance
          </p>

          <p
            className="font-inter font-light text-sm sm:text-base text-white/50 mb-12 sm:mb-16 opacity-0 animate-fadeInUp italic"
            style={{ animationDelay: "0.5s" }}
          >
            Institutional acquisition only. Pricing available upon qualified inquiry.
          </p>

          <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            <button
              onClick={handleInquiry}
              className="font-inter font-semibold text-sm sm:text-base uppercase tracking-[0.25em] px-10 sm:px-12 py-4 sm:py-5 bg-white text-black rounded-full hover:bg-white/95 active:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-100 shadow-[0_0_30px_rgba(0,214,159,0.3)] hover:shadow-[0_0_40px_rgba(0,214,159,0.5)]"
            >
              Confidential Inquiry
            </button>

            <p className="font-inter text-[10px] sm:text-xs text-white/25 mt-6 sm:mt-8 font-light italic tracking-wide">
              All inquiries are handled with the utmost discretion.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-20 py-12 px-6 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.9s" }}>
        <div className="flex flex-col items-center justify-center">
          <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium text-center">
            AGENTFI.COM © 2026
          </span>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: -0.01em;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
          10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          82% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.97); }
        }
      `}</style>
    </div>
  );
}
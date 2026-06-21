"use client";

import React, { useState, useEffect } from "react";

// Λίστα με πιθανά νομίσματα και θεσμικές ενέργειες για τους agents
const assets = ['USDC', 'ETH', 'BTC'];
const actions = ['exec', 'rebalance', 'allocate_liquidity', 'secure_treasury'];

// Συνάρτηση δημιουργίας τυχαίας συναλλαγής
const generateTransaction = (id) => {
  const asset = assets[Math.floor(Math.random() * assets.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const amount = (Math.random() * (250000 - 1000) + 1000).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  // Τυχαία θέση στην οθόνη (αποφεύγοντας το ακριβές κέντρο)
  const top = Math.floor(Math.random() * 85) + 5;
  const left = Math.floor(Math.random() * 85) + 5;

  let textDisplay = '';
  if (action === 'exec') {
    textDisplay = `[Agent_0x${Math.floor(Math.random()*1000)}] exec: ${amount} ${asset}`;
  } else {
    textDisplay = `[System_Agent] ${action.toUpperCase()}: ${amount} ${asset}`;
  }

  return {
    id,
    text: textDisplay,
    top: `${top}%`,
    left: `${left}%`,
  };
};

export default function ComingSoonPage() {
  const [transactions, setTransactions] = useState([]);

  // Μηχανισμός που προσθέτει και αφαιρεί συναλλαγές ομαλά
  useEffect(() => {
    const interval = setInterval(() => {
      const newTx = generateTransaction(Date.now());
      setTransactions((current) => [...current, newTx]);

      // Αφαίρεση της συναλλαγής μετά από 5 δευτερόλεπτα
      setTimeout(() => {
        setTransactions((current) => current.filter((tx) => tx.id !== newTx.id));
      }, 5000);

    }, 2000); // Κάθε 2 δευτερόλεπτα εμφανίζεται μια νέα συναλλαγή

    return () => clearInterval(interval);
  }, []);

  const handleInquiry = () => {
    window.location.href =
      "mailto:inquiry@agentfi.com?subject=AgentFi.com%20%7C%20Confidential%20Acquisition%20Request";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex flex-col">
      
      {/* 1. Subtle Dot Grid Background (ΝΕΟ - Για το Coinbase effect) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 214, 159, 0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. Floating AI Agent Transactions (ΝΕΟ) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="absolute text-[#00D69F] text-[10px] sm:text-xs font-mono tracking-widest opacity-0 animate-fadeInOutTx"
            style={{ top: tx.top, left: tx.left }}
          >
            {tx.text}
          </div>
        ))}
      </div>

      {/* 3. Animated gradient background - subtle green variations (ΤΟ ΔΙΚΟ ΣΟΥ) */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D69F] rounded-full mix-blend-screen filter blur-[128px] animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00B885] rounded-full mix-blend-screen filter blur-[128px] animate-[pulse_6s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00F5B8] rounded-full mix-blend-screen filter blur-[128px] animate-[pulse_6s_ease-in-out_infinite]"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main content (ΤΟ ΔΙΚΟ ΣΟΥ) */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 relative z-10 pointer-events-none">
        <div className="w-full max-w-3xl text-center pointer-events-auto">
          {/* Brand name */}
          <h1 className="font-inter font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 sm:mb-8 tracking-[-0.02em] opacity-0 animate-fadeInUp">
            <span className="text-[#00D69F]">AgentFi</span>
            <span className="text-white">.com</span>
          </h1>

          {/* Tagline */}
          <p
            className="font-inter font-normal text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 sm:mb-5 opacity-0 animate-fadeInUp leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            The Infrastructure of Autonomous Finance
          </p>

          {/* Sub-tagline */}
          <p
            className="font-inter font-light text-sm sm:text-base text-white/50 mb-12 sm:mb-16 opacity-0 animate-fadeInUp italic"
            style={{ animationDelay: "0.5s" }}
          >
            Institutional acquisition only. Pricing available upon qualified
            inquiry.
          </p>

          {/* CTA Section */}
          <div
            className="opacity-0 animate-fadeInUp"
            style={{ animationDelay: "0.7s" }}
          >
            <button
              onClick={handleInquiry}
              className="font-inter font-semibold text-sm sm:text-base uppercase tracking-[0.25em] px-10 sm:px-12 py-4 sm:py-5 bg-white text-black rounded-full hover:bg-white/95 active:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-100 shadow-[0_0_30px_rgba(0,214,159,0.3)] hover:shadow-[0_0_40px_rgba(0,214,159,0.5)]"
            >
              Confidential Inquiry
            </button>

            {/* Discretion notice - subtle and elegant */}
            <p className="font-inter text-[10px] sm:text-xs text-white/25 mt-6 sm:mt-8 font-light italic tracking-wide">
              All inquiries are handled with the utmost discretion.
            </p>
          </div>
        </div>
      </main>

      {/* Footer (ΤΟ ΔΙΚΟ ΣΟΥ) */}
      <footer
        className="relative z-10 py-12 px-6 opacity-0 animate-fadeInUp pointer-events-none"
        style={{ animationDelay: "0.9s" }}
      >
        <div className="flex flex-col items-center justify-center pointer-events-auto">
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* ΝΕΟ: Animation για τις συναλλαγές στο background */
        @keyframes fadeInOutTx {
          0% { opacity: 0; transform: translateY(10px); }
          15% { opacity: 0.25; transform: translateY(0); }
          85% { opacity: 0.25; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        
        .animate-fadeInOutTx {
          animation: fadeInOutTx 5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
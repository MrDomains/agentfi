"use client";

import React from "react";

// Δεδομένα για το Institutional Ticker
const tickerData = [
  { agent: "AGENT_0x8F", action: "EXEC_SWAP", amount: "145.50 ETH" },
  { agent: "SYSTEM_CORE", action: "LIQUIDITY_REBALANCE", amount: "$1.2M USDC" },
  { agent: "AGENT_0x2A", action: "MEV_CAPTURE", amount: "+4.20 SOL" },
  { agent: "ORACLE_NODE", action: "PRICE_UPDATE", amount: "0.0005 ETH" },
  { agent: "AGENT_0x9C", action: "TREASURY_ALLOC", amount: "$450K USDC" },
  { agent: "CONTRACT_V3", action: "AUTO_STAKE", amount: "12,500 ARB" },
  { agent: "AGENT_0x11", action: "CROSS_CHAIN_BRIDGE", amount: "55.00 wBTC" },
  { agent: "ROUTER_0x4", action: "YIELD_HARVEST", amount: "$84,200 USDC" },
];

// Διπλασιάζουμε το array για να γίνει ομαλό το infinite scroll (CSS Marquee)
const tickerItems = [...tickerData, ...tickerData, ...tickerData];

export default function ComingSoonPage() {
  const handleInquiry = () => {
    window.location.href =
      "mailto:inquiry@agentfi.com?subject=AgentFi.com%20%7C%20Confidential%20Acquisition%20Request";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex flex-col">
      
      {/* 1. TOP TICKER (Institutional Level) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden border-b border-[#00D69F]/20 bg-[#0A0A0A]/80 backdrop-blur-md z-50 py-2">
        <div className="flex whitespace-nowrap animate-tickerScroll w-max">
          {tickerItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 mx-6 font-mono text-[10px] sm:text-xs tracking-wider">
              <span className="text-[#00D69F]/70 px-2 py-0.5 rounded bg-[#00D69F]/10 border border-[#00D69F]/20">
                {item.agent}
              </span>
              <span className="text-white/60">{item.action}</span>
              <span className="text-[#00D69F] font-semibold">{item.amount}</span>
              <span className="text-white/20 ml-6">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Animated gradient background (Το αρχικό σου, χωρίς αλλαγές) */}
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

      {/* 3. Main content */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 relative z-10">
        <div className="w-full max-w-3xl text-center pt-10">
          
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

            {/* Discretion notice */}
            <p className="font-inter text-[10px] sm:text-xs text-white/25 mt-6 sm:mt-8 font-light italic tracking-wide">
              All inquiries are handled with the utmost discretion.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 py-12 px-6 opacity-0 animate-fadeInUp"
        style={{ animationDelay: "0.9s" }}
      >
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

        /* Ticker Animation */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%); /* Μετακίνηση κατά το 1/3 επειδή διπλασιάσαμε τα δεδομένα x3 */
          }
        }
        
        .animate-tickerScroll {
          animation: scroll 25s linear infinite;
        }
        
        /* Pause on hover (Προαιρετικό αλλά δίνει ωραία αίσθηση) */
        .animate-tickerScroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
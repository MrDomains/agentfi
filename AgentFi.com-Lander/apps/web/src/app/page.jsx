"use client";

import React, { useMemo } from "react";

// Υποθετικά δεδομένα (Institutional Level) για το Ticker
const FAKE_TRANSACTIONS = [
  { chain: "ETH", job_type: "LIQUIDITY_ALLOC", agent_from: "Treasury_Core", agent_to: "Curve_Fi_Pool", amount: 25400000.00, time: "12s" },
  { chain: "BASE", job_type: "MEV_CAPTURE", agent_from: "Seeker_0x9A", agent_to: "Vault_v3", amount: 482500.50, time: "14s" },
  { chain: "SOL", job_type: "ARBITRAGE", agent_from: "Arb_Node_7", agent_to: "Jupiter_Agg", amount: 1250000.00, time: "21s" },
  { chain: "ARB", job_type: "YIELD_HARVEST", agent_from: "Strat_Engine", agent_to: "Aave_V3", amount: 8400500.00, time: "35s" },
  { chain: "OP", job_type: "CROSS_CHAIN", agent_from: "Bridge_Agent", agent_to: "Base_Relay", amount: 15500000.00, time: "42s" },
  { chain: "ETH", job_type: "FLASH_LOAN", agent_from: "Liq_Provider", agent_to: "Exec_Contract", amount: 100000000.00, time: "55s" },
  { chain: "BASE", job_type: "AUTO_STAKE", agent_from: "Agent_0x44", agent_to: "Lido_Fi", amount: 3200000.25, time: "1m" },
  { chain: "SOL", job_type: "STAKE_REWARD", agent_from: "Validator_AI", agent_to: "Treasury_Core", amount: 850000.00, time: "2m" },
  { chain: "ETH", job_type: "REBALANCE", agent_from: "Risk_Manager", agent_to: "Maker_DAO", amount: 12000000.00, time: "3m" },
  { chain: "BASE", job_type: "INFERENCE", agent_from: "Model_Orchestrator", agent_to: "Compute_Node", amount: 15420.00, time: "3m" },
];

function formatAmount(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000) return '$' + (n / 1000).toFixed(1) + 'K';
  return '$' + n.toFixed(2);
}

const CSS =
  '@keyframes tk{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}' +
  '.tk-track{display:flex;width:max-content;animation:tk 60s linear infinite;will-change:transform;transform:translateZ(0);backface-visibility:hidden;perspective:1000px;-webkit-font-smoothing:antialiased;}' +
  '@media (hover: hover) and (pointer: fine) { .tk-wrap:hover .tk-track{animation-play-state:paused!important;} }';

function TickerItem({ tx }) {
  const amount = formatAmount(tx.amount);

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="inline-flex items-center gap-2 mx-5 px-3 py-1 rounded hover:bg-white/5 transition-colors shrink-0 group/item cursor-default"
    >
      <span className="text-[8px] font-black px-1.5 py-0.5 rounded border text-white/60 border-white/20 bg-white/5">
        {tx.chain}
      </span>
      <span className="text-[9px] font-bold text-white/50 tracking-wider">
        {tx.job_type}
      </span>
      <span className="text-white text-[11px] font-semibold max-w-[120px] truncate">
        {tx.agent_from}
      </span>
      <span className="text-[#00D69F]/40 text-[10px]">to</span>
      <span className="text-slate-300 text-[11px] max-w-[120px] truncate">
        {tx.agent_to}
      </span>
      <span className="text-[13px] font-bold text-[#00D69F]">
        {amount}
      </span>
      <span className="text-slate-600 text-[10px]">
        {tx.time}
      </span>
      {/* Inline SVG for ExternalLink to avoid missing lucide-react dependency */}
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00D69F] opacity-0 group-hover/item:opacity-100 transition-opacity">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </a>
  );
}

export default function ComingSoonPage() {
  const handleInquiry = () => {
    window.location.href =
      "mailto:inquiry@agentfi.com?subject=AgentFi.com%20%7C%20Confidential%20Acquisition%20Request";
  };

  // Διπλασιάζουμε το array για το infinite scroll (όπως ακριβώς το είχες)
  const tickerItems = useMemo(() => {
    return [...FAKE_TRANSACTIONS, ...FAKE_TRANSACTIONS, ...FAKE_TRANSACTIONS, ...FAKE_TRANSACTIONS];
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* TOP TICKER - Θεσμικό στυλ βασισμένο στο agentfi.news */}
      <div className="w-full h-11 border-b border-[#00D69F]/10 overflow-hidden flex items-center relative select-none z-50 bg-[#0A0A0A]">
        
        {/* Αριστερό σταθερό μπλοκ (A2A NETWORK LIVE) */}
        <div className="flex absolute left-0 top-0 bottom-0 z-30 items-center gap-1.5 md:gap-2 px-2 md:px-4 bg-[#0A0A0A] border-r border-[#00D69F]/10">
          <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D69F] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-[#00D69F]" />
          </span>
          <span className="text-[9px] md:text-[10px] font-black text-white tracking-widest whitespace-nowrap">
            <span className="inline md:hidden">A2A LIVE</span>
            <span className="hidden md:inline">A2A NETWORK LIVE</span>
          </span>
        </div>

        {/* Κυλιόμενο Ticker Track */}
        <div className="flex-1 overflow-hidden ml-[75px] md:ml-[172px] tk-wrap">
          <div className="tk-track items-center whitespace-nowrap font-mono">
            {tickerItems.map((tx, i) => (
              <TickerItem key={i} tx={tx} />
            ))}
          </div>
        </div>

        {/* Gradient fades για ομαλό σβήσιμο στις άκρες (ταιριασμένα στο #0A0A0A bg) */}
        <div className="absolute left-[75px] md:left-[172px] top-0 bottom-0 w-6 md:w-10 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 md:w-16 bg-gradient-to-l from-[#0A0A0A]/40 md:from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Animated gradient background - subtle green variations */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0 mt-11">
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

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 relative z-10">
        <div className="w-full max-w-3xl text-center">
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
      `}</style>
    </div>
  );
}
"use client";

import React, { useMemo } from "react";

const FAKE_TRANSACTIONS = [
  { chain: "ETH", job_type: "LIQUIDITY_ALLOC", agent_from: "Treasury_Core", agent_to: "Curve_Fi_Pool", amount: 25400000.00 },
  { chain: "BASE", job_type: "MEV_CAPTURE", agent_from: "Seeker_0x9A", agent_to: "Vault_v3", amount: 482500.50 },
  { chain: "SOL", job_type: "INTENT_EXECUTION", agent_from: "Intent_Solver_1", agent_to: "Jupiter_Agg", amount: 1250000.00 },
  { chain: "ARB", job_type: "YIELD_HARVEST", agent_from: "Strat_Engine", agent_to: "Aave_V3", amount: 8400500.00 },
  { chain: "OP", job_type: "CROSS_CHAIN", agent_from: "Bridge_Agent", agent_to: "Base_Relay", amount: 15500000.00 },
  { chain: "ETH", job_type: "FLASH_LOAN", agent_from: "Liq_Provider", agent_to: "Exec_Contract", amount: 150000000.00 },
  { chain: "BASE", job_type: "AUTO_STAKE", agent_from: "Agent_0x44", agent_to: "Lido_Fi", amount: 3200000.25 },
  { chain: "SOL", job_type: "LIQUIDATION_EXEC", agent_from: "Keeper_Node_8", agent_to: "Mango_Markets", amount: 940500.00 },
  { chain: "ETH", job_type: "PREDICTIVE_SWAP", agent_from: "Alpha_Bot_v2", agent_to: "Uniswap_V3", amount: 12400000.00 },
  { chain: "AVAX", job_type: "SMART_ROUTING", agent_from: "Router_AI", agent_to: "Trader_Joe", amount: 5100000.00 },
  { chain: "ARB", job_type: "PORTFOLIO_REBAL", agent_from: "Risk_Manager", agent_to: "Maker_DAO", amount: 45000000.00 },
  { chain: "ETH", job_type: "SENTIMENT_TRADE", agent_from: "Social_Oracle", agent_to: "1inch_Router", amount: 2800000.00 },
  { chain: "BASE", job_type: "INFERENCE", agent_from: "Model_Orchestrator", agent_to: "Compute_Node", amount: 15420.00 },
  { chain: "SOL", job_type: "YIELD_OPTIMIZE", agent_from: "Vault_Manager", agent_to: "Kamino_Fi", amount: 4500000.00 },
  { chain: "OP", job_type: "AUTO_COMPOUND", agent_from: "Compounder_v2", agent_to: "Velodrome", amount: 880000.00 },
  { chain: "ETH", job_type: "RISK_HEDGE", agent_from: "Delta_Neutral_Bot", agent_to: "Deribit_Sync", amount: 18500000.00 },
  { chain: "MATIC", job_type: "DATA_ORACLE", agent_from: "Price_Feeder", agent_to: "Aave_Oracle", amount: 4500.00 },
  { chain: "BASE", job_type: "MEV_PROTECTION", agent_from: "Shield_Agent", agent_to: "Private_Mempool", amount: 350000.00 },
  { chain: "SOL", job_type: "ARBITRAGE", agent_from: "Arb_Node_7", agent_to: "Raydium_Pool", amount: 620000.00 },
  { chain: "ETH", job_type: "DEBT_REFINANCE", agent_from: "Credit_Manager", agent_to: "Compound_V3", amount: 9200000.00 },
  { chain: "ARB", job_type: "TOKEN_BUYBACK", agent_from: "DAO_Treasury_Bot", agent_to: "Camelot_DEX", amount: 1500000.00 },
  { chain: "ETH", job_type: "GOVERNANCE_VOTE", agent_from: "Gov_Agent_0x", agent_to: "Snapshot_Relay", amount: 50000.00 },
  { chain: "BASE", job_type: "LIQUIDITY_PROV", agent_from: "Market_Maker_AI", agent_to: "Aerodrome", amount: 7300000.00 },
  { chain: "SOL", job_type: "FLASH_LOAN", agent_from: "Liq_Sniper", agent_to: "Solend", amount: 55000000.00 },
  { chain: "OP", job_type: "FEE_COLLECTION", agent_from: "Protocol_Keeper", agent_to: "Treasury_Core", amount: 245000.00 },
  { chain: "ETH", job_type: "INTENT_EXECUTION", agent_from: "Solver_Network", agent_to: "Cow_Swap", amount: 33400000.00 },
  { chain: "BASE", job_type: "SMART_ROUTING", agent_from: "Pathfinder_AI", agent_to: "Base_Swap", amount: 1120000.00 },
  { chain: "AVAX", job_type: "YIELD_HARVEST", agent_from: "Strat_Engine_X", agent_to: "Benqi", amount: 2900000.00 },
  { chain: "ETH", job_type: "MEV_CAPTURE", agent_from: "Seeker_Prime", agent_to: "Builder_0x66", amount: 890500.00 },
  { chain: "ARB", job_type: "LIQUIDITY_ALLOC", agent_from: "Treasury_Core", agent_to: "GMX_Vault", amount: 18500000.00 }
];

function formatAmount(n) {
  if (n >= 1000000000) return '$' + parseFloat((n / 1000000000).toFixed(2)) + 'B';
  if (n >= 1000000) return '$' + parseFloat((n / 1000000).toFixed(2)) + 'M';
  if (n >= 1000) return '$' + parseFloat((n / 1000).toFixed(1)) + 'K';
  return '$' + parseFloat(n.toFixed(2));
}

function TickerItem({ tx }) {
  const amount = formatAmount(tx.amount);

  return (
    <div className="inline-flex items-center gap-3 pr-8 shrink-0 cursor-default">
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
      {/* Διακριτικό separator για καλύτερη αναγνωσιμότητα */}
      <span className="text-white/10 ml-4 text-[10px]">•</span>
    </div>
  );
}

export default function ComingSoonPage() {
  const handleInquiry = () => {
    window.location.href =
      "mailto:inquiry@agentfi.com?subject=AgentFi.com%20%7C%20Confidential%20Acquisition%20Request";
  };

  // Μόνο x2 για σωστό και αποδοτικό CSS Translate Loop
  const tickerItems = useMemo(() => {
    return [...FAKE_TRANSACTIONS, ...FAKE_TRANSACTIONS];
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex flex-col">
      
      {/* TOP TICKER - Full Width (aria-hidden added for screen readers) */}
      <div 
        className="w-full h-11 border-b border-[#00D69F]/10 overflow-hidden flex items-center relative select-none z-50 bg-[#0A0A0A] shrink-0"
        aria-hidden="true"
      >
        <div className="flex-1 overflow-hidden tk-wrap w-full">
          <div className="tk-track items-center whitespace-nowrap font-mono">
            {tickerItems.map((tx, i) => (
              <TickerItem key={i} tx={tx} />
            ))}
          </div>
        </div>

        {/* Gradient fades για ομαλό σβήσιμο στις άκρες */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Animated gradient background - (Αφαιρέθηκε το mt-11, το αφήνουμε να κάτσει από κάτω) */}
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
            Institutional acquisition only <span className="mx-3 text-white/20">•</span> Pricing available upon qualified inquiry
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

      {/* Ενιαίο Style Block με όλες τις διορθώσεις */}
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

        /* Ticker Animation (150s για ιδανική ταχύτητα) */
        @keyframes tk {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        
        .tk-track {
          display: flex;
          width: max-content;
          animation: tk 150s linear infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
}
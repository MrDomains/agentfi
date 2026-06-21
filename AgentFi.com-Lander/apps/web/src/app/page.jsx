"use client";

import React, { useEffect, useRef } from "react";

export default function ComingSoonPage() {
  const canvasRef = useRef(null);

  const handleInquiry = () => {
    window.location.href =
      "mailto:inquiry@agentfi.com?subject=AgentFi.com%20%7C%20Confidential%20Acquisition%20Request";
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const DOT_SPACING = 38;
    const BASE_COLOR  = [0, 100, 75];
    const PEAK_COLOR  = [0, 214, 159];

    const AGENTS  = ["Nexus-7","AlphaCore","QuantX","Orbit-AI","Helix-AI","Sigma-0","Apex-9","Vega-AI"];
    const ACTIONS = [
      "Yield rebalance executed",
      "Flash loan arbitrage",
      "Delta-neutral hedge",
      "Cross-chain bridge swap",
      "Collateral ratio adjusted",
      "MEV capture executed",
      "Liquidity provision",
      "Options strategy deployed",
    ];

    let W, H, dots = [];
    let cards = [];
    let lastCardTime = 0;
    const CARD_INTERVAL = 2800;
    const MAX_CARDS = 2;

    const rand = (a, b) => Math.random() * (b - a) + a;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const lerp = (a, b, t) => a + (b - a) * t;

    function shortHash() {
      const h = "0123456789abcdef";
      let s = "0x";
      for (let i = 0; i < 6; i++) s += h[Math.floor(Math.random() * 16)];
      return s + "…" + h[Math.floor(Math.random() * 16)] + h[Math.floor(Math.random() * 16)];
    }

    function makeAmount() {
      const pos = Math.random() > 0.3;
      const usd = rand(800, 480000).toLocaleString("en-US", { maximumFractionDigits: 0 });
      return pos ? `+$${usd}` : `-$${usd}`;
    }

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildDots();
    }

    function buildDots() {
      dots = [];
      const cols = Math.ceil(W / DOT_SPACING) + 1;
      const rows = Math.ceil(H / DOT_SPACING) + 1;
      for (let r = 0; r <= rows; r++)
        for (let c = 0; c <= cols; c++)
          dots.push({ x: c * DOT_SPACING, y: r * DOT_SPACING });
    }

    function drawDots(ts) {
      const cx = W / 2, cy = H / 2;
      dots.forEach((d) => {
        const dist   = Math.hypot(d.x - cx, d.y - cy);
        const maxR   = Math.hypot(cx, cy);
        const radial = Math.max(0, 1 - dist / (maxR * 0.72));
        const ripple = (Math.sin(ts * 0.0005 - dist * 0.016) * 0.5 + 0.5) * 0.35;
        const bright = Math.min(1, radial * 0.65 + ripple * radial + 0.03);

        const r = Math.round(lerp(BASE_COLOR[0], PEAK_COLOR[0], bright));
        const g = Math.round(lerp(BASE_COLOR[1], PEAK_COLOR[1], bright));
        const b = Math.round(lerp(BASE_COLOR[2], PEAK_COLOR[2], bright));
        const a = 0.08 + bright * 0.52;

        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.1 + bright * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();
      });
    }

    function spawnCard() {
      if (cards.length >= MAX_CARDS) return;
      const side  = Math.random() > 0.5 ? "left" : "right";
      const cardW = 210;
      const margin = 24;
      const x = side === "left" ? margin : W - cardW - margin;
      const y = rand(H * 0.12, H * 0.78);
      const amount = makeAmount();
      cards.push({
        x, y, cardW,
        alpha: 0,
        state: "in",
        t: 0,
        data: {
          agent:    pick(AGENTS),
          action:   pick(ACTIONS),
          amount,
          negative: amount.startsWith("-"),
          hash:     shortHash(),
          time:     `${Math.floor(rand(2, 55))}s ago`,
        },
      });
    }

    function drawCard(card) {
      const { x, y, alpha, cardW, data } = card;
      if (alpha <= 0) return;

      ctx.save();
      ctx.globalAlpha = alpha;

      const cardH = 76;
      const r = 9;

      ctx.beginPath();
      ctx.roundRect(x, y, cardW, cardH, r);
      ctx.fillStyle = "rgba(8,18,14,0.78)";
      ctx.fill();

      ctx.beginPath();
      ctx.roundRect(x, y, cardW, cardH, r);
      ctx.strokeStyle = `rgba(0,214,159,${0.13 * alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      const pad = 11;
      const tx  = x + pad;
      let   ty  = y + pad + 10;

      ctx.beginPath();
      ctx.arc(tx + 3, ty - 3, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#00D69F";
      ctx.fill();

      ctx.font = "600 10px Inter, sans-serif";
      ctx.fillStyle = "#00D69F";
      ctx.fillText(data.agent.toUpperCase(), tx + 10, ty);

      ty += 16;
      ctx.font = "400 10.5px Inter, sans-serif";
      ctx.fillStyle = "rgba(200,230,220,0.75)";
      ctx.fillText(data.action, tx, ty);

      ty += 15;
      ctx.font = "700 12px Inter, sans-serif";
      ctx.fillStyle = data.negative ? "#ff6b7a" : "#e8f5f0";
      ctx.fillText(data.amount, tx, ty);

      ctx.font = "400 9px Inter, sans-serif";
      ctx.fillStyle = "rgba(100,150,130,0.6)";
      ctx.fillText(data.time, x + cardW - pad - ctx.measureText(data.time).width, ty);

      ty += 13;
      ctx.font = "400 9px 'Courier New', monospace";
      ctx.fillStyle = "rgba(80,120,100,0.55)";
      ctx.fillText(data.hash, tx, ty);

      ctx.restore();
    }

    function updateCards(ts, dt) {
      if (ts - lastCardTime > CARD_INTERVAL && cards.length < MAX_CARDS) {
        spawnCard();
        lastCardTime = ts;
      }

      const FADE_IN  = 600;
      const HOLD     = 4200;
      const FADE_OUT = 700;

      cards = cards.filter((c) => {
        c.t += dt;
        if (c.state === "in") {
          c.alpha = Math.min(1, c.t / FADE_IN);
          if (c.t >= FADE_IN) { c.state = "hold"; c.t = 0; }
        } else if (c.state === "hold") {
          c.alpha = 1;
          if (c.t >= HOLD) { c.state = "out"; c.t = 0; }
        } else if (c.state === "out") {
          c.alpha = Math.max(0, 1 - c.t / FADE_OUT);
          if (c.t >= FADE_OUT) return false;
        }
        return true;
      });
    }

    let prev = 0;
    let raf;

    function loop(ts) {
      const dt = ts - prev;
      prev = ts;
      ctx.clearRect(0, 0, W, H);
      drawDots(ts);
      updateCards(ts, dt);
      cards.forEach(drawCard);
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex flex-col">

      {/* ── Canvas background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* ── Soft radial glow blobs (original) ── */}
      <div className="absolute inset-0 opacity-25" style={{ zIndex: 1 }}>
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

      {/* ── Main content (αμετάβλητο) ── */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 relative z-10">
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

            <p className="font-inter text-[10px] sm:text-xs text-white/25 mt-6 sm:mt-8 font-light italic tracking-wide">
              All inquiries are handled with the utmost discretion.
            </p>
          </div>
        </div>
      </main>

      {/* ── Footer (αμετάβλητο) ── */}
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

        .font-playfair {
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.25em;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
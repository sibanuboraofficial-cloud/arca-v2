"use client";

export default function BackgroundElements() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] h-screen w-full overflow-hidden">
      {/* ── Concentric orbiting circles ── */}
      <div className="hidden md:block">
        {/* Circle 1 — 500px, CW 120s */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "40%",
            left: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            animation: "orbit-cw 120s linear infinite",
          }}
        >
          {/* Orbital dot — top */}
          <div
            className="absolute rounded-full"
            style={{
              width: 5,
              height: 5,
              top: -2.5,
              left: "50%",
              marginLeft: -2.5,
              background: "rgba(255,255,255,0.25)",
            }}
          />
          {/* Orbital dot — right */}
          <div
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              top: "50%",
              right: -3,
              marginTop: -3,
              background: "rgba(255,255,255,0.35)",
            }}
          />
        </div>

        {/* Circle 2 — 700px, CCW 90s */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "40%",
            left: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            animation: "orbit-ccw 90s linear infinite",
          }}
        >
          {/* Orbital dot — bottom-left */}
          <div
            className="absolute rounded-full"
            style={{
              width: 5,
              height: 5,
              bottom: "14%",
              left: "7%",
              background: "rgba(255,255,255,0.25)",
            }}
          />
          {/* Orbital dot — top-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: 7,
              height: 7,
              top: "12%",
              right: "10%",
              background: "rgba(255,255,255,0.25)",
            }}
          />
        </div>

        {/* Circle 3 — 900px, CW 150s */}
        <div
          className="absolute rounded-full"
          style={{
            width: 900,
            height: 900,
            top: "40%",
            left: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            animation: "orbit-cw 150s linear infinite",
          }}
        >
          {/* Orbital dot — left */}
          <div
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              top: "50%",
              left: -3,
              marginTop: -3,
              background: "rgba(255,255,255,0.25)",
            }}
          />
        </div>
      </div>

      {/* ── Crosshair / plus marks ── */}
      {[
        { top: "15%", right: "12%", duration: "18s", delay: "0s", rotate: true },
        { top: "45%", left: "6%", duration: "22s", delay: "3s", rotate: false },
        { bottom: "20%", right: "8%", duration: "16s", delay: "1.5s", rotate: true },
        { top: "8%", left: "18%", duration: "25s", delay: "5s", rotate: false },
      ].map((c, i) => (
        <div
          key={`cross-${i}`}
          className="absolute"
          style={{
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
            animation: `float-slow ${c.duration} ease-in-out ${c.delay} infinite${c.rotate ? `, spin-slow 60s linear infinite` : ""}`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="13" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </svg>
        </div>
      ))}

      {/* ── Small scattered dots ── */}
      {[
        { top: "30%", left: "3%", size: 3, duration: "20s", delay: "2s" },
        { top: "65%", right: "5%", size: 4, duration: "17s", delay: "0s" },
        { top: "80%", left: "8%", size: 3, duration: "23s", delay: "4s" },
        { top: "52%", right: "15%", size: 4, duration: "19s", delay: "1s" },
      ].map((d, i) => (
        <div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            width: d.size,
            height: d.size,
            background: "rgba(255,255,255,0.1)",
            animation: `float-slow ${d.duration} ease-in-out ${d.delay} infinite`,
          }}
        />
      ))}

      {/* ── Thin connecting lines ── */}
      <svg className="absolute inset-0 hidden h-full w-full md:block" fill="none">
        <line
          x1="8%"
          y1="12%"
          x2="42%"
          y2="45%"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
        />
        <line
          x1="58%"
          y1="50%"
          x2="92%"
          y2="78%"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}

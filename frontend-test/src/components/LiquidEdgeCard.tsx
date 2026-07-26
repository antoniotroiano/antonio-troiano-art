"use client";

import React from "react";

export default function LiquidEdgeCard() {
  return (
    <div className="liquid-edge">
      {/* SVG Filter wird nur als Overlay genutzt */}
      <svg className="liquid-edge__svg" width="0" height="0" aria-hidden="true">
        <filter id="wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="2">
            <animate attributeName="baseFrequency" dur="4.5s" values="0.010;0.016;0.010" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </svg>

      <div className="liquid-edge__content">
        <h3 style={{ margin: 0 }}>Liquid Edge</h3>
        <p style={{ margin: "8px 0 0" }}>
          Kein Snapshot. Kanten/Highlights wirken „flüssig“ durch SVG-Displacement.
        </p>
      </div>
    </div>
  );
}

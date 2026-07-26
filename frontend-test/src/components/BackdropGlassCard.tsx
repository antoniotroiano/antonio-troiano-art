"use client";

import React from "react";

export default function BackdropGlassCard() {
  return (
    <div className="glass-backdrop">
      <div className="glass-backdrop__content">
        <h3 style={{ margin: 0 }}>Shop Highlight</h3>
        <p style={{ margin: "8px 0 0" }}>
          Das ist die „Apple-ish“ Glass-Card mit Blur, Specular-Highlight & Noise.
        </p>
        <button className="glass-btn" type="button" style={{ marginTop: 12 }}>
          CTA
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { LiquidGlass, type LiquidGlassRef } from "@specy/liquid-glass-react";

export default function Page() {
  const glassRef = useRef<LiquidGlassRef>(null);

  const glassStyle = useMemo(
    () => ({
        depth: 20,
        segments: 120,
        radius: 20,
        tint: null,
        reflectivity: 1,
        thickness: 40,
        dispersion: 10,
        roughness: 0.4,
    }),
    []
  );

  useEffect(() => {
    const t = setTimeout(() => glassRef.current?.updateScreenshot(), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: "200vh",
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Leafy_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      <div style={{ padding: "48px 24px", color: "white" }}>
        <h1>Liquid Glass</h1>
        <div style={{ height: 900 }} />
      </div>

      <LiquidGlass
              ref={glassRef}
              glassStyle={glassStyle}
              wrapperStyle={{
                position: "fixed",
                left: "50%",
                bottom: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
              }}
              style="padding: 16px 20px; border-radius: 20px;"
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 20 }}>Hello</h2>
                <p style={{ margin: "6px 0 0", opacity: 0.8 }}>
                  Jetzt sollten Kanten/Refraction deutlich “liquider” wirken.
                </p>
              </div>
            </LiquidGlass>
    </div>
  );
}

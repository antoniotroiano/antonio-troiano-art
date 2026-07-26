"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { LiquidGlass, type LiquidGlassRef } from "@specy/liquid-glass-react";

type Props = {
  title: string;
  text: string;
  captureAttrValue: string;
};

const glassStyle = {
  depth: 20,
  segments: 120,
  radius: 20,
  tint: null,
  reflectivity: 1,
  thickness: 40,
  dispersion: 10,
  roughness: 0.3,
};

export default function LiquidGlassBlock({ title, text, captureAttrValue }: Props) {
  const glassRef = useRef<LiquidGlassRef>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const rafId = useRef<number | null>(null);
  const updateScreenshot = useCallback(() => {
    if (rafId.current != null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      glassRef.current?.updateScreenshot();
    });
  }, []);

  useEffect(() => {
    const selector = `[data-lg-capture="${captureAttrValue}"]`;
    const el = hostRef.current?.closest(selector) as HTMLElement | null;
    setTargetElement(el);
  }, [captureAttrValue]);

  useEffect(() => {
    if (!targetElement) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = !!entry?.isIntersecting;
        setIsVisible(nowVisible);
        if (nowVisible) updateScreenshot();
      },
      { threshold: 0.15 }
    );

    io.observe(targetElement);
    return () => io.disconnect();
  }, [targetElement, updateScreenshot]);

  useEffect(() => {
    if (!isVisible) return;

    const onScroll = () => updateScreenshot();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const t1 = setTimeout(updateScreenshot, 100);
    const t2 = setTimeout(updateScreenshot, 300);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [isVisible, updateScreenshot]);

  if (!targetElement) {
    return <div ref={hostRef} style={{ marginTop: 16 }} />;
  }

  return (
    <div ref={hostRef} style={{ marginTop: 16 }}>
      <LiquidGlass ref={glassRef} glassStyle={glassStyle} targetElement={targetElement}
        wrapperStyle={{
          zIndex: 1
        }}
        style="padding: 16px 20px; border-radius: 20px;"
        onReady={updateScreenshot}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>{title}</h2>
          <p style={{ margin: "6px 0 0", opacity: 0.8 }}>{text}</p>
        </div>
      </LiquidGlass>
    </div>
  );
}

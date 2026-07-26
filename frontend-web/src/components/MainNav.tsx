"use client";

import React, { useEffect, useRef, useState } from "react";

type MainNavProps = {
  initial?: boolean;
};

export default function MainNav({ initial = false }: MainNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initial) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [initial]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const wrap = wrapperRef.current;
      if (!wrap) return;
      if (open && !wrap.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const effectiveScrolled = initial || scrolled;

  const navClass = [
    "main-nav",
    effectiveScrolled ? "nav-scrolled" : "nav-top",
    initial ? "nav-initial" : "",
    open ? "nav-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const close = () => setOpen(false);

  return (
    <div ref={wrapperRef} className={`nav-shell ${effectiveScrolled ? "is-scrolled" : ""} ${initial ? "is-initial" : ""}`}>
      <nav className={navClass} id="mainNav">
        <a href="..#" className="logo" onClick={close}>
          Antonio Troiano Art
        </a>

        <div className="nav-links">
          <a className="nav-link" href="..#portfolio"><span>Portfolio</span></a>
          <a className="nav-link" href="..#shop"><span>Shop</span></a>
          <a className="nav-link" href="..#blog"><span>Blog</span></a>
          <a className="nav-link" href="..#kontakt"><span>Kontakt</span></a>
          <a className="nav-link" href="..#künstler"><span>Künstler</span></a>
        </div>

        <button type="button" className="nav-burger" aria-label="Menü öffnen" aria-controls="navMobileMenu" aria-expanded={open}
          onClick={() => setOpen((v) => !v)}>
          <span className="nav-burger__lines" aria-hidden="true" />
        </button>
      </nav>

      <div id="navMobileMenu" className={`nav-mobile ${open ? "open" : ""}`} aria-hidden={!open}>
        <a className="nav-mobile__link" href="..#portfolio" onClick={close}><span>Portfolio</span></a>
        <a className="nav-mobile__link" href="..#shop" onClick={close}><span>Shop</span></a>
        <a className="nav-mobile__link" href="..#blog" onClick={close}><span>Blog</span></a>
        <a className="nav-mobile__link" href="..#kontakt" onClick={close}><span>Kontakt</span></a>
        <a className="nav-mobile__link" href="..#künstler" onClick={close}><span>Künstler</span></a>
      </div>
    </div>
  );
}
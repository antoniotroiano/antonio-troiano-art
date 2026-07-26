"use client";

import { useEffect } from "react";

export default function SubpageScrollEffects() {
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    const NAV_INITIAL_CLASS = "nav-initial";
    const NAV_SCROLLED_CLASS = "nav-scrolled";

    const onScroll = () => {
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add(NAV_SCROLLED_CLASS);
          nav.classList.remove(NAV_INITIAL_CLASS);
        } else {
          nav.classList.add(NAV_INITIAL_CLASS);
          nav.classList.remove(NAV_SCROLLED_CLASS);
        }
      }

      if (scrollTopBtn) {
        if (window.scrollY > 300) scrollTopBtn.classList.add("show");
        else scrollTopBtn.classList.remove("show");
      }
    };

    const onTopClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

    window.addEventListener("scroll", onScroll);
    onScroll();

    if (scrollTopBtn) scrollTopBtn.addEventListener("click", onTopClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTopBtn) scrollTopBtn.removeEventListener("click", onTopClick);
    };
  }, []);

  return null;
}

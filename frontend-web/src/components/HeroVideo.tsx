"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPlay(true);
                    video?.play();
                }
            },
            { threshold: 0.4 }
        );

        if (video) observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* <img src="https://ik.imagekit.io/atart/HeroPoster.webp?w-2400,q-60,f-avif" fetchPriority="high"
                loading="eager" className={`hero-poster ${play ? "hero-poster-hidden" : ""}`} alt="Abstrakte Kunst Hero" /> */}
            <video ref={videoRef} playsInline muted loop preload="none" id="hero-video">
                <source src="https://ik.imagekit.io/atart/HeroVideo1280x720v3.mp4" type="video/mp4" />
            </video>
        </>
    );
}
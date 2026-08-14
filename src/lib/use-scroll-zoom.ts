"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks an element's vertical position in the viewport and returns a scale
 * + vertical offset that animate together as it scrolls from the bottom of
 * the viewport toward its center — the picture starts smaller and sits lower
 * ("on the ground"), then rises and grows as it scrolls into view. Modeled
 * on the "Nowhere to go but up" section of jobyaviation.com.
 */
export function useScrollZoom<T extends HTMLElement>({
  min = 1,
  max = 1.3,
  riseFrom = 64,
} = {}) {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState({ scale: min, y: riseFrom });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return; // display:none (e.g. hidden responsive twin)
      const vh = window.innerHeight || 1;
      // progress: 0 when element top is at viewport bottom, 1 when element
      // center reaches viewport center; clamps past that range.
      const center = rect.top + rect.height / 2;
      const raw = 1 - center / vh;
      const progress = Math.min(1, Math.max(0, raw));
      setState({
        scale: min + progress * (max - min),
        y: riseFrom * (1 - progress),
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [min, max, riseFrom]);

  return { ref, ...state };
}

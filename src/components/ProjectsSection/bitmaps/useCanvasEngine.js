/*
┌─────────────────────────────────────────────────────────────────────────┐
│                          USE CANVAS ENGINE                              │
│                                                                         │
│  Reusable Loop & Lifecycle Hook for Project Bitmap Canvases    │
│                                                                         │
│  Architecture & Performance Guarantees:                                 │
│  1. Zero-teardown callback refs: updates/renders never reset the loop   │
│  2. Viewport Freezing (IntersectionObserver): 0% CPU when off-screen    │
│  3. Delta-time accumulator: Capped at 15 FPS (touch) / 30 FPS (desktop) │
│  4. Screen sleep & tab switch guard (Page Visibility API)               │
│  5. Auto-resizing coordinate sync                                       │
└─────────────────────────────────────────────────────────────────────────┘
*/

import { useEffect, useRef } from "react";

export function useCanvasEngine({ onUpdate, onRender }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Store callbacks in refs so changing them never re-triggers the effect or resets the game loop
  const onUpdateRef = useRef(onUpdate);
  const onRenderRef = useRef(onRender);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
    onRenderRef.current = onRender;
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect touch / coarse pointer devices (iPads, tablets, phones)
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    // Frame rate budget: 15 FPS on touch (battery saving), 30 FPS on desktop fine pointer
    const targetFPS = isTouchDevice ? 15 : 30;
    const frameInterval = 1000 / targetFPS;

    let animationFrameId = null;
    let isVisible = false;
    let lastTime = performance.now();

    // Sync physical canvas buffer dimensions with CSS client width/height
    const syncDimensions = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      return { width: w, height: h };
    };

    syncDimensions();

    const handleResize = () => {
      syncDimensions();
    };
    window.addEventListener("resize", handleResize);

    // ── LOOP ──────────────────────────────────────────────
    const loop = (currentTime) => {
      if (!isVisible) return;

      const elapsed = currentTime - lastTime;
      if (elapsed >= frameInterval) {
        // Accumulator offset to prevent clock drift
        lastTime = currentTime - (elapsed % frameInterval);

        const dims = { width: canvas.width, height: canvas.height };

        if (onUpdateRef.current) {
          onUpdateRef.current(elapsed, dims, isTouchDevice);
        }
        if (onRenderRef.current) {
          onRenderRef.current(ctx, dims, isTouchDevice);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // ── VIEWPORT VISIBILITY GUARD (IntersectionObserver) ───────────────
    // Completely halts requestAnimationFrame when the card is scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(loop);
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // ── TAB VISIBILITY GUARD (Page Visibility API) ─────────────────────
    // Pauses when user switches browser tabs or locks mobile screen
    const handleVisibilityChange = () => {
      if (document.hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (isVisible && !animationFrameId) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return { containerRef, canvasRef };
}

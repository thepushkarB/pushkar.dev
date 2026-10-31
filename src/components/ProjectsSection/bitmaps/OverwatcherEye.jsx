/*
┌─────────────────────────────────────────────────────────────────────────┐
│                          OVERWATCHER EYE                                │
│                                                                         │
│  Techno-brutalist 1-bit procedural halftone eye for Overwatcher card.   │
│                                                                         │
│  High-density edition:                                                  │
│  - Dense 6px micro-grid quantization for crisp readability              │
│  - Defined eyelid contour line & distinct almond silhouette             │
│  - Specular glint (#ffffff), deep pupil void, and striated iris ring    │
│  - Concentric radar shockwaves radiating outward                        │
│  - Responsive desktop cursor tracking & mobile saccadic wander loop     │
└─────────────────────────────────────────────────────────────────────────┘
*/

import { useEffect, useRef } from "react";
import { useCanvasEngine } from "./useCanvasEngine";
import styles from "./ProjectBitmap.module.css";

const GRID_STEP = 6; // High density 6px grid for crisp, readable halftone art
const COLOR_VIOLET = "rgba(200, 181, 255, 0.95)";
const COLOR_VIOLET_MID = "rgba(200, 181, 255, 0.45)";
const COLOR_VIOLET_DIM = "rgba(200, 181, 255, 0.12)";
const COLOR_GLINT = "#ffffff";

export default function OverwatcherEye({ isHovered }) {
  const stateRef = useRef({
    cx: 0,
    cy: 0,
    pupilX: 0,
    pupilY: 0,
    targetX: 0,
    targetY: 0,
    openFactor: 0.88,
    targetOpen: 0.88,
    rippleRadius: -1,
    blinkTimer: 0,
    wanderTimer: 0,
    time: 0,
    initialized: false,
  });

  // ── PHYSICS & SIMULATION UPDATE ───────────────────────────────────────
  const updatePhysics = (delta, dims, isTouchDevice) => {
    const s = stateRef.current;
    s.time += delta * 0.001;

    const cx = dims.width / 2;
    const cy = dims.height / 2;
    s.cx = cx;
    s.cy = cy;

    if (!s.initialized) {
      s.pupilX = s.targetX = cx;
      s.pupilY = s.targetY = cy;
      s.initialized = true;
    }

    // Mobile / Touch Autonomous Saccades (darting eye movements every 2.4s)
    if (isTouchDevice) {
      s.wanderTimer += delta;
      if (s.wanderTimer > 2400) {
        s.wanderTimer = 0;
        const wanderAngle = Math.random() * Math.PI * 2;
        const wanderDist = 8 + Math.random() * 24;
        s.targetX = cx + Math.cos(wanderAngle) * wanderDist;
        s.targetY = cy + Math.sin(wanderAngle) * wanderDist * 0.55;
      }
    }

    // Muscle inertia (lerp) toward target
    s.pupilX += (s.targetX - s.pupilX) * 0.12;
    s.pupilY += (s.targetY - s.pupilY) * 0.12;

    // Natural 2-frame blink every 3.8 seconds
    s.blinkTimer += delta;
    if (s.blinkTimer > 3800) {
      s.targetOpen = 0.04; // Blink closed
      if (s.blinkTimer > 3960) {
        s.targetOpen = isHovered ? 1.0 : 0.88; // Snap back open
        s.blinkTimer = 0;
      }
    } else {
      s.targetOpen = isHovered ? 1.0 : 0.88;
    }
    s.openFactor += (s.targetOpen - s.openFactor) * 0.25;

    // Expanding concentric radar wave
    if (isHovered || (isTouchDevice && Math.sin(s.time * 1.5) > 0.96)) {
      if (s.rippleRadius < 0) {
        s.rippleRadius = 12;
      }
    }
    if (s.rippleRadius >= 0) {
      s.rippleRadius += delta * 0.12;
      if (s.rippleRadius > Math.max(dims.width, dims.height) * 0.85) {
        s.rippleRadius = -1;
      }
    }
  };

  // ── DENSE HALFTONE RENDER ENGINE ─────────────────────────────────────
  const renderHalftoneEye = (ctx, dims) => {
    ctx.clearRect(0, 0, dims.width, dims.height);

    const s = stateRef.current;
    const cx = s.cx;
    const cy = s.cy;

    // Scaled proportions for a generous, readable eye on the 210px header
    const eyeRadiusX = 84;
    const eyeRadiusY = 52;

    const cols = Math.ceil(dims.width / GRID_STEP);
    const rows = Math.ceil(dims.height / GRID_STEP);

    for (let c = 0; c < cols; c++) {
      const x = c * GRID_STEP;

      // Normalized horizontal distance from eye center [-1 to 1]
      const nx = (x - cx) / eyeRadiusX;
      const insideX = Math.abs(nx) <= 1.0;

      // Parabolic eyelid curve limit
      const limitY = insideX ? eyeRadiusY * s.openFactor * (1 - nx * nx) : 0;

      for (let r = 0; r < rows; r++) {
        const y = r * GRID_STEP;
        const dy = y - cy;
        const absDy = Math.abs(dy);
        const isInsideEyelid = insideX && absDy <= limitY;

        // Eyelid contour line detection (dots right on the lid boundary)
        const isEyelidContour = insideX && Math.abs(absDy - limitY) < 3.2 && absDy <= limitY + 2.5;

        // Distance from current pupil center
        const distPupil = Math.hypot(x - s.pupilX, y - s.pupilY);

        // Distance from overall center for radar waves
        const distCenter = Math.hypot(x - cx, y - cy);

        // Radar wave shockwave ring
        const isRipple =
          s.rippleRadius >= 0 && Math.abs(distCenter - s.rippleRadius) < 7;

        // 1. SPECULAR HIGHLIGHT: Pure white glint dot
        const isGlint =
          isInsideEyelid &&
          Math.hypot(x - (s.pupilX - 6), y - (s.pupilY - 6)) < 5.8;

        if (isGlint) {
          ctx.fillStyle = COLOR_GLINT;
          ctx.beginPath();
          ctx.arc(x, y, 2.4, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // 2. PUPIL VOID: Distinct dark hollow center (masks underlying CSS dots)
        if (isInsideEyelid && distPupil < 15) {
          ctx.fillStyle = "#0a0712";
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // 3. IRIS RING: High-density violet dot texture
        if (isInsideEyelid && distPupil <= 38) {
          ctx.fillStyle = COLOR_VIOLET;
          ctx.beginPath();
          const irisDotRadius = isHovered ? 2.3 : 1.9;
          ctx.arc(x, y, irisDotRadius, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // 4. EYELID CONTOUR: Crisp defining border for the eye silhouette
        if (isEyelidContour) {
          ctx.fillStyle = COLOR_VIOLET;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // 5. SCLERA (Eyeball white): Medium stippled halftone dots
        if (isInsideEyelid) {
          ctx.fillStyle = COLOR_VIOLET_MID;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // 6. RADAR SHOCKWAVE: Concentric illuminated ring through background
        if (isRipple) {
          ctx.fillStyle = COLOR_VIOLET;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // Outside the eye and ripple: DO NOT draw ambient dots!
        // Leaving this transparent lets the authentic, deep CSS .halftoneViolet background show through cleanly.
      }
    }
  };

  const { containerRef, canvasRef } = useCanvasEngine({
    onUpdate: updatePhysics,
    onRender: renderHalftoneEye,
  });

  // ── DESKTOP MOUSE INTERACTION ────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track mouse position over the entire parent project card
    const parentCard = container.closest("article") || container.parentElement;
    if (!parentCard) return;

    const handleMouseMove = (e) => {
      const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (isTouch) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy), 36); // Expressive pupil motion

      stateRef.current.targetX = cx + Math.cos(angle) * dist;
      stateRef.current.targetY = cy + Math.sin(angle) * dist * 0.6;
    };

    const handleMouseLeave = () => {
      const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (isTouch) return;

      const rect = container.getBoundingClientRect();
      stateRef.current.targetX = rect.width / 2;
      stateRef.current.targetY = rect.height / 2;
    };

    parentCard.addEventListener("mousemove", handleMouseMove);
    parentCard.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parentCard.removeEventListener("mousemove", handleMouseMove);
      parentCard.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`${styles.canvasContainer} ${styles.bgViolet}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

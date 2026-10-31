/*
┌─────────────────────────────────────────────────────────────────────────┐
│                          TICKET TAMER CANVAS                            │
│                                                                         │
│  Techno-brutalist 1-bit procedural ticket shredder for Ticket Tamer.   │
│                                                                         │
│  Features:                                                              │
│  - 6px micro-grid phosphor green (#00ff9f) halftone matrix              │
│  - Solid incoming ticket with notched edges, barcode & priority stamp   │
│  - Rotating mechanical roller cutter teeth & white spark particles      │
│  - 10-ribbon cloth/streamer sine-wave flutter simulation                │
│  - Interactive cursor wind: moving mouse blows ribbons like a draft     │
│  - Mobile autonomous feed-shred-recycle loop (no touch triggers needed) │
└─────────────────────────────────────────────────────────────────────────┘
*/

import { useEffect, useRef } from "react";
import { useCanvasEngine } from "./useCanvasEngine";
import styles from "./ProjectBitmap.module.css";

const GRID_STEP = 6;
const COLOR_GREEN = "rgba(0, 255, 159, 0.95)";
const COLOR_GREEN_MID = "rgba(0, 255, 159, 0.45)";
const COLOR_GREEN_DIM = "rgba(0, 255, 159, 0.12)";
const COLOR_SPARK = "#ffffff";

const NUM_RIBBONS = 10;
const RIBBON_WIDTH = 12; // 2 dots wide per ribbon
const TICKET_WIDTH = NUM_RIBBONS * RIBBON_WIDTH; // 120px wide ticket
const TICKET_HEIGHT = 80;

export default function TicketTamerCanvas({ isHovered }) {
  const stateRef = useRef({
    cx: 0,
    cy: 0,
    slotY: 0,
    feedProgress: 0.35, // 0 = fresh ticket, 1 = fully shredded
    targetFeedProgress: 0.35,
    rollerAngle: 0,
    wind: 0,
    targetWind: 0,
    time: 0,
    scanY: 0,
    // Zero-allocation particle pools
    sparks: Array.from({ length: 6 }, () => ({
      x: 0,
      y: 0,
      life: 0,
      speedX: 0,
      speedY: 0,
    })),
    confetti: Array.from({ length: 14 }, () => ({
      x: 0,
      y: 0,
      speedY: 1 + Math.random() * 1.5,
      driftX: (Math.random() - 0.5) * 0.8,
      wobbleOffset: Math.random() * Math.PI * 2,
    })),
    initialized: false,
  });

  // ── PHYSICS & SHREDDER SIMULATION ─────────────────────────────────────
  const updatePhysics = (delta, dims, isTouchDevice) => {
    const s = stateRef.current;
    const dt = delta * 0.001;
    s.time += dt;

    const cx = dims.width / 2;
    const cy = dims.height / 2;
    s.cx = cx;
    s.cy = cy;
    s.slotY = cy - 4; // Roller teeth positioned slightly above center

    if (!s.initialized) {
      s.confetti.forEach((c) => {
        c.x = cx - TICKET_WIDTH / 2 + Math.random() * TICKET_WIDTH;
        c.y = s.slotY + 20 + Math.random() * 60;
      });
      s.initialized = true;
    }

    // Shredder feed motor speed: idle hum vs active shred on hover/touch
    const motorSpeed = isHovered ? 2.4 : isTouchDevice ? 1.4 : 0.4;
    s.rollerAngle += dt * 8.0 * motorSpeed;

    // Optical laser scanline sweep on ticket
    s.scanY = (s.time * 60 * motorSpeed) % TICKET_HEIGHT;

    // Feed progression
    if (isTouchDevice || isHovered) {
      s.feedProgress += dt * 0.3 * motorSpeed;
      if (s.feedProgress > 1.25) {
        s.feedProgress = 0.05; // Drop in next fresh ticket
      }
    } else {
      // Desktop idle: gentle breathing feed
      s.feedProgress = 0.38 + Math.sin(s.time * 1.5) * 0.04;
    }

    // Smooth wind inertia (lerp) toward mouse target
    s.wind += (s.targetWind - s.wind) * 0.1;

    // Spark generation at the roller teeth contact points
    if (isHovered || isTouchDevice) {
      s.sparks.forEach((sp) => {
        sp.life -= dt * 4.0;
        sp.x += sp.speedX;
        sp.y += sp.speedY;

        if (sp.life <= 0 && Math.random() < 0.25) {
          sp.life = 1.0;
          sp.x = cx - TICKET_WIDTH / 2 + Math.random() * TICKET_WIDTH;
          sp.y = s.slotY + (Math.random() - 0.5) * 4;
          sp.speedX = (Math.random() - 0.5) * 2.5;
          sp.speedY = 0.8 + Math.random() * 2.0;
        }
      });
    }

    // Confetti particles fluttering below the ribbons
    s.confetti.forEach((c) => {
      c.y += c.speedY * (isHovered ? 2.2 : 1.2);
      c.x += c.driftX + s.wind * 0.4 + Math.sin(s.time * 3 + c.wobbleOffset) * 0.5;

      // Recycle when falling past bottom
      if (c.y > dims.height + 10) {
        c.y = s.slotY + 45 + Math.random() * 15;
        c.x = cx - TICKET_WIDTH / 2 + Math.random() * TICKET_WIDTH;
      }
    });
  };

  // ── DENSE HALFTONE SHREDDER RENDER ENGINE ────────────────────────────
  const renderShredder = (ctx, dims) => {
    ctx.clearRect(0, 0, dims.width, dims.height);

    const s = stateRef.current;
    const cx = s.cx;
    const cy = s.cy;
    const slotY = s.slotY;

    const ticketLeft = cx - TICKET_WIDTH / 2;
    const ticketRight = cx + TICKET_WIDTH / 2;

    // Top ticket bottom edge feeding into slot
    const ticketTopY = slotY - TICKET_HEIGHT * (1 - s.feedProgress * 0.7);

    // Maximum hanging length of shredded ribbons
    const ribbonMaxLen = 65 + s.feedProgress * 30;

    const cols = Math.ceil(dims.width / GRID_STEP);
    const rows = Math.ceil(dims.height / GRID_STEP);

    for (let c = 0; c < cols; c++) {
      const x = c * GRID_STEP;

      for (let r = 0; r < rows; r++) {
        const y = r * GRID_STEP;

        // ─────────────────────────────────────────────────────────────────
        // 1. INTAKE ROLLER CUTTER BAR & SERRATED TEETH (y ≈ slotY)
        // ─────────────────────────────────────────────────────────────────
        const isSlotBar = Math.abs(y - slotY) <= 3 && Math.abs(x - cx) <= TICKET_WIDTH / 2 + 18;
        if (isSlotBar) {
          // Interlocking spinning roller teeth
          const toothPattern = Math.sin(x * 0.55 + s.rollerAngle);
          const isTooth = toothPattern > 0.2;

          ctx.fillStyle = isTooth ? COLOR_GREEN : COLOR_GREEN_MID;
          ctx.beginPath();
          ctx.arc(x, y, isTooth ? 2.3 : 1.4, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // ─────────────────────────────────────────────────────────────────
        // 2. TOP INCOMING SOLID TICKET (y < slotY)
        // ─────────────────────────────────────────────────────────────────
        if (y < slotY && y >= ticketTopY && x >= ticketLeft && x <= ticketRight) {
          // Classic ticket notch cutouts on the sides
          const isNotch =
            Math.abs(y - (ticketTopY + 36)) < 10 &&
            (Math.abs(x - ticketLeft) < 7 || Math.abs(x - ticketRight) < 7);

          if (isNotch) {
            // Cutout notch: render ambient background dot
            ctx.fillStyle = COLOR_GREEN_DIM;
            ctx.beginPath();
            ctx.arc(x, y, 0.85, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          // Ticket perimeter border
          const isBorder =
            Math.abs(x - ticketLeft) < 3.5 ||
            Math.abs(x - ticketRight) < 3.5 ||
            Math.abs(y - ticketTopY) < 3.5;

          if (isBorder) {
            ctx.fillStyle = COLOR_GREEN;
            ctx.beginPath();
            ctx.arc(x, y, 1.9, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          // Optical Laser Scanline Bar (sweeping across ticket)
          const currentScanY = ticketTopY + s.scanY;
          const isLaserScan = Math.abs(y - currentScanY) < 4;
          if (isLaserScan) {
            ctx.fillStyle = COLOR_SPARK;
            ctx.beginPath();
            ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          // Barcode stripes (near top of ticket)
          const isBarcodeZone = y >= ticketTopY + 10 && y <= ticketTopY + 22;
          if (isBarcodeZone) {
            const barcodeStripe = Math.sin(x * 1.2) > 0.1;
            ctx.fillStyle = barcodeStripe ? COLOR_GREEN : COLOR_GREEN_DIM;
            ctx.beginPath();
            ctx.arc(x, y, barcodeStripe ? 1.7 : 0.85, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          // Ticket Text/Data Rows (#TKT-404 / Priority)
          const isDataZone = y >= ticketTopY + 28 && y <= ticketTopY + 44;
          if (isDataZone) {
            const dataDot = Math.sin(x * 0.8) > -0.2 && Math.sin(y * 0.9) > -0.2;
            ctx.fillStyle = dataDot ? COLOR_GREEN : COLOR_GREEN_MID;
            ctx.beginPath();
            ctx.arc(x, y, dataDot ? 1.6 : 1.0, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          // Solid Ticket Halftone Paper Body
          ctx.fillStyle = COLOR_GREEN_MID;
          ctx.beginPath();
          ctx.arc(x, y, 1.3, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // ─────────────────────────────────────────────────────────────────
        // 3. BOTTOM SHREDDED RIBBONS (y > slotY) - Cloth/Streamer Simulation
        // ─────────────────────────────────────────────────────────────────
        if (y > slotY && y <= slotY + ribbonMaxLen && x >= ticketLeft - 15 && x <= ticketRight + 15) {
          const dy = y - slotY;

          // Determine which of the 10 ribbons corresponds to this X coordinate
          // Reverse-calculate horizontal sine-wave sway for each ribbon
          let isInsideAnyRibbon = false;
          let ribbonDistanceToCenter = 0;

          for (let i = 0; i < NUM_RIBBONS; i++) {
            const ribbonBaseX = ticketLeft + i * RIBBON_WIDTH + RIBBON_WIDTH / 2;

            // Cloth wave flutter equation: increases with distance below slot
            const flutter =
              Math.sin(s.time * 3.5 + i * 0.75 + dy * 0.055) * (dy * 0.12) +
              s.wind * (dy * 0.28);

            const ribbonCenterX = ribbonBaseX + flutter;
            const distToRibbonCenter = Math.abs(x - ribbonCenterX);

            // Ribbon strip thickness is ~4px (leaves a clean cut gap between ribbons)
            if (distToRibbonCenter <= 3.8) {
              isInsideAnyRibbon = true;
              ribbonDistanceToCenter = distToRibbonCenter;
              break;
            }
          }

          if (isInsideAnyRibbon) {
            // Jagged/Torn tips at bottom edge
            const isTip = dy > ribbonMaxLen - 8;
            ctx.fillStyle = isTip ? COLOR_GREEN_MID : COLOR_GREEN;
            ctx.beginPath();
            const ribbonDotRadius = isTip ? 1.2 : 1.85;
            ctx.arc(x, y, ribbonDotRadius, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }
        }

        // Outside the ticket and shredder ribbons: DO NOT draw ambient dots!
        // Leaving this transparent lets the authentic, clean CSS .halftoneGreen background show through.
      }
    }

    // ─────────────────────────────────────────────────────────────────────
    // 5. SPARK PARTICLES (Biting roller teeth)
    // ─────────────────────────────────────────────────────────────────────
    s.sparks.forEach((sp) => {
      if (sp.life > 0) {
        ctx.fillStyle = COLOR_SPARK;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 2.2 * sp.life, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // ─────────────────────────────────────────────────────────────────────
    // 6. TUMBLING CONFETTI PARTICLES (Drifting below ribbons)
    // ─────────────────────────────────────────────────────────────────────
    s.confetti.forEach((c) => {
      ctx.fillStyle = COLOR_GREEN;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const { containerRef, canvasRef } = useCanvasEngine({
    onUpdate: updatePhysics,
    onRender: renderShredder,
  });

  // ── DESKTOP MOUSE BREEZE INTERACTION ─────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const parentCard = container.closest("article") || container.parentElement;
    if (!parentCard) return;

    const handleMouseMove = (e) => {
      const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (isTouch) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const cx = rect.width / 2;

      // Mouse X creates a wind force swaying ribbons left or right (-1.0 to 1.0)
      const windForce = (mouseX - cx) / (rect.width / 2);
      stateRef.current.targetWind = Math.max(-1.0, Math.min(1.0, windForce));
    };

    const handleMouseLeave = () => {
      stateRef.current.targetWind = 0;
    };

    parentCard.addEventListener("mousemove", handleMouseMove);
    parentCard.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parentCard.removeEventListener("mousemove", handleMouseMove);
      parentCard.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`${styles.canvasContainer} ${styles.bgGreen}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

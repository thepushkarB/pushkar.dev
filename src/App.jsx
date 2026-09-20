/*
┌─────────────────────────────────────────────────────────────────────────┐
│                             APP.JSX                                     │
│                                                                         │
│  Full routing + global keyboard bus + easter eggs:                      │
│                                                                         │
│  Routes:                                                                │
│    /         → Portfolio (all sections)                                 │
│    /secret   → BIOS boot easter egg                                     │
│    *         → 404 NotFound                                             │
│                                                                         │
│  Global hooks (all in Portfolio component):                             │
│    useReveal()        — IntersectionObserver scroll reveal              │
│    useKeyboardNav()   — Tab, G+key, /, ? navigation                     │
│    useKonamiCode()    — Konami → FSOCIETY modal                         │
│    useSudoDetect()    — type "sudo" → permission denied toast           │
│                                                                         │
│  Easter eggs:                                                           │
│    [CLASSIFIED] hover → "fsociety clearance required"  (AboutSection)  │
│    DEBT: CLASSIFIED hover → fsociety clearance required  (AboutSection)            │
│    Konami code → FSOCIETY modal (Mr. Robot)                             │
│    type `sudo` → permission denied toast                               │
│    /secret → BIOS boot screen                                           │
└─────────────────────────────────────────────────────────────────────────┘
*/

import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";

/* Sections */
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutSection from "./components/AboutSection/AboutSection";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import SkillsSection from "./components/SkillsSection/SkillsSection";
import ContactSection from "./components/ContactSection/ContactSection";
import Footer from "./components/Footer/Footer";

/* Modals */
import KeyboardModal from "./components/Modals/KeyboardModal";
import ResumeModal from "./components/Modals/ResumeModal";

/* Pages */
import Secret from "./pages/Secret/Secret";
import NotFound from "./pages/NotFound/NotFound";

/* ── Scroll reveal hook ──────────────────────────────────────────────────────── */
/*
  Finds all elements with className="reveal" and adds "visible" when they
  enter the viewport. Fires once per element (observer.unobserve after trigger).
*/
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* Keyboard navigation hook */
/*
  Handles:
    Tab / Shift+Tab  → cycle sections
    G + A/E/P/S/C   → Vim-style jump (1s timeout between G and next key)
    /                → jump to contact
    ?                → toggle keyboard modal (callback)
*/
const SECTIONS = ["hero", "about", "experience", "projects", "skills", "contact"];

function useKeyboardNav(onToggleHelp, onOpenResume) {
  const gPressed = useRef(false);
  const gTimer = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentSectionIndex = () =>
    SECTIONS.findIndex((id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom > 100;
    });

  useEffect(() => {
    const handler = (e) => {
      /* Skip when user is typing in a form field */
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      /* ? → toggle keyboard shortcuts modal */
      if (e.key === "?") {
        onToggleHelp();
        return;
      }

      /* G → start Vim-style jump sequence (1 second window for second key) */
      if (e.key === "g" || e.key === "G") {
        gPressed.current = true;
        clearTimeout(gTimer.current);
        gTimer.current = setTimeout(() => {
          gPressed.current = false;
        }, 1000);
        return;
      }

      /* Second key after G → jump to mapped section */
      if (gPressed.current) {
        // check for resume trigger - if 2nd keydown is 'r'
        if(e.key.toLowerCase() === 'r') {
            onOpenResume();
            gPressed.current = false;
            clearTimeout(gTimer.current);
            return;
        }

        // else
        const map = {
          a: "about",
          e: "experience",
          p: "projects",
          s: "skills",
          c: "contact",
        };
        const target = map[e.key.toLowerCase()];
        if (target) {
          scrollTo(target);
          gPressed.current = false;
          clearTimeout(gTimer.current);
          return;
        }
      }

      /* Tab / Shift+Tab → cycle sections sequentially */
      if (e.key === "Tab") {
        e.preventDefault();
        const idx = currentSectionIndex();
        const next = e.shiftKey
          ? Math.max(0, idx - 1)
          : Math.min(SECTIONS.length - 1, idx + 1);
        scrollTo(SECTIONS[next]);
        return;
      }

      /* / → jump to contact */
      if (e.key === "/") {
        e.preventDefault();
        scrollTo("contact");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onToggleHelp, onOpenResume]);
}

/* Konami code hook */
/*
  ↑↑↓↓←→←→BA → fires `callback`
*/
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

function useKonamiCode(callback) {
  const seq = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length);
      if (seq.current.join(",") === KONAMI.join(",")) callback();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callback]);
}

/* sudo detect hook */
/*
  Buffers the last 6 keypresses globally. If the buffer contains "sudo",
  fires `callback`. Skips input / textarea elements.
*/
function useSudoDetect(callback) {
  const buf = useRef("");

  useEffect(() => {
    const handler = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key.length === 1) {
        buf.current = (buf.current + e.key).slice(-6);
        if (buf.current.toLowerCase().includes("sudo")) {
          callback();
          buf.current = "";
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callback]);
}

/* FSOCIETY Modal */
/*
  Appears on Konami code. Mr. Robot reference.
  Dismiss: click backdrop or any key.
*/
function FsocietyModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" || e.key !== undefined) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(6px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="FSOCIETY Easter Egg"
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.72rem, 1.8vw, 0.88rem)",
          color: "#00ff9f",
          lineHeight: 1.8,
          textAlign: "left",
          textShadow: "0 0 12px rgba(0,255,159,0.5)",
          maxWidth: "440px",
          border: "1px solid rgba(0,255,159,0.3)",
          padding: "2rem 2.5rem",
          borderRadius: "4px",
          background: "#050505",
          boxShadow: "0 0 60px rgba(0,255,159,0.12)",
          whiteSpace: "pre",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {`╔══════════════════════════════════╗
║   F  S  O  C  I  E  T  Y         ║
║   ─────────────────────          ║
║   Hello, friend.                 ║
║                                  ║
║   You found the konami code.     ║
║   The system is rigged.          ║
║   npm install revolution         ║
║                                  ║
║   // elliot would be proud       ║
╚══════════════════════════════════╝`}
      </div>
    </div>
  );
}

/* sudo Permission Denied Toast */
/*
  Appears at the bottom of the screen for 3 seconds when user types "sudo".
*/
function SudoToast() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--surface)",
        border: "1px solid rgba(0,255,159,0.35)",
        borderRadius: "4px",
        padding: "0.65rem 1.25rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        color: "#00ff9f",
        zIndex: 3000,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,159,0.1)",
        whiteSpace: "nowrap",
        animation: "fadeInUp 0.2s ease",
        letterSpacing: "0.04em",
      }}
      role="status"
      aria-live="polite"
    >
      sudo: nice try, human. Permission denied. 😉
    </div>
  );
}




/* Portfolio page (all sections) */
function Portfolio() {
    const [showKeyboardModal, setShowKeyboardModal] = useState(false);
    const [showFsocietyModal, setShowFsocietyModal] = useState(false);
    const [showSudoToast, setShowSudoToast] = useState(false);

    // Resume modal
    const [ showResumeModal, setShowResumeModal ] = useState(false);
    const openResume  = useCallback(() => setShowResumeModal(true), []);

  /* Toggle keyboard modal — called by useKeyboardNav on `?` key */
  const toggleHelp = useCallback(
    () => setShowKeyboardModal((prev) => !prev),
    []
  );

  /* Scroll reveal — fires IntersectionObserver for .reveal elements */
  useReveal();

  /* Keyboard navigation */
  useKeyboardNav(toggleHelp, openResume);

  /* Easter egg: Konami code → FSOCIETY modal */
  useKonamiCode(useCallback(() => setShowFsocietyModal(true), []));

  /* Easter egg: type `sudo` → permission denied toast for 3s */
  useSudoDetect(
    useCallback(() => {
      setShowSudoToast(true);
      setTimeout(() => setShowSudoToast(false), 3000);
    }, [])
  );

  /* Esc closes all modals */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setShowKeyboardModal(false);
        setShowFsocietyModal(false);
        setShowResumeModal(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Navbar onResumeClick={openResume}/>
      <main>
        <HeroSection />
        <AboutSection onResumeClick={openResume} />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection onResumeClick={openResume} />
      </main>
      <Footer />

      {/* Conditional overlays */}
      {showKeyboardModal && (
        <KeyboardModal onClose={() => setShowKeyboardModal(false)} />
      )}
      {showFsocietyModal && (
        <FsocietyModal onClose={() => setShowFsocietyModal(false)} />
      )}
      {showSudoToast && <SudoToast />}
      {/* Resume Modal */}
      {showResumeModal && (
        <ResumeModal onClose={() => setShowResumeModal(false)}/>
      )}
    </>
  );
}


/* App root — routing */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/secret" element={<Secret />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
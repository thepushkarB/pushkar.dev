/*
  SECRET PAGE — /secret
  BIOS boot sequence easter egg.
  Lines type in one by one via useEffect + setTimeout.
  Any keypress or click → navigate back to '/'.
*/

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Secret.module.css";

/* All boot lines in order, each with optional status tag */
const BOOT_LINES = [
  { text: "> Booting PUSHKAR OS...",                         tag: null },
  { text: "> Loading modules.......................",          tag: "OK" },
  { text: "> Mounting /dev/brain...................",          tag: "OK" },
  { text: "> Initializing caffeine subsystem......",          tag: "OK" },
  { text: "> Starting creativity daemon...........",          tag: "OK" },
  { text: "> Loading Stack Overflow cache.........",          tag: "WARN: outdated" },
  { text: "> Connecting to GitHub.................",          tag: "OK" },
  { text: "> Scanning for bugs....................",           tag: "FOUND: 1] [IGNORING" },
  { text: "> Syncing with production..............",          tag: "OK" },
  { text: "", tag: null }, /* blank line separator */
  { text: "SYSTEM SPECS:", tag: null },
];

const SPECS = [
  "  CPU:     4 cores, 0 sleep",
  "  RAM:     64GB coffee",
  "  STORAGE: ∞ ideas  (disk full anyway)",
  "  GPU:     Overclocked imagination",
  "  OS:      PushkarOS v26.0 LTS \"Deadline Edition\"",
  "  UPTIME:  Grinding since 2020",
];

/* Delay between each line appearing (ms) */
const LINE_DELAY = 280;

/* Tag → CSS class map */
function tagClass(tag) {
  if (!tag) return null;
  if (tag.startsWith("WARN")) return styles.warn;
  if (tag.startsWith("FOUND") || tag.startsWith("ERR")) return styles.err;
  return styles.ok;
}

export default function Secret() {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);
  const [done, setDone] = useState(false);

  /* Navigate home on any key or click */
  const goHome = useCallback(() => navigate("/"), [navigate]);

  useEffect(() => {
    window.addEventListener("keydown", goHome);
    return () => window.removeEventListener("keydown", goHome);
  }, [goHome]);

  /* Drip-feed lines one at a time */
  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      /* Show specs block after a short pause */
      const t = setTimeout(() => {
        setShowSpecs(true);
        setTimeout(() => setDone(true), SPECS.length * LINE_DELAY + 300);
      }, 300);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setVisibleLines((n) => n + 1),
      LINE_DELAY
    );
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    /* Click anywhere to exit */
    <div className={styles.secret} onClick={goHome} role="main">
      <div className={styles.content}>

        {/* BIOS header */}
        <div className={styles.biosHeader}>
          NAKZ BIOS v2.0.26 (C) 2026 PUSHKAR SYSTEMS
        </div>

        {/* Boot lines — appear one by one */}
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={styles.line}>
            {line.text}
            {line.tag && (
              <span className={tagClass(line.tag)}>
                {" "}[{line.tag}]
              </span>
            )}
          </div>
        ))}

        {/* Specs block — appears after all boot lines */}
        {showSpecs && (
          <div className={styles.specs}>
            {SPECS.map((spec, i) => (
              <div
                key={i}
                className={styles.specLine}
                style={{ animationDelay: `${i * LINE_DELAY}ms` }}
              >
                {spec}
              </div>
            ))}
          </div>
        )}

        {/* Final line + cursor — appears when all is done */}
        {done && (
          <div className={styles.line} style={{ marginTop: "1rem" }}>
            {"> Boot complete. Welcome, friend."}{" "}
            <span className={styles.cursor}>█</span>
          </div>
        )}

        {/* Dismiss hint */}
        {done && (
          <div className={styles.dismiss}>
            [Press any key or click to return]
          </div>
        )}

      </div>
    </div>
  );
}

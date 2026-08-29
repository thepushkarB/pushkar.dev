/*
  KEYBOARD MODAL
  Triggered by pressing `?` anywhere on the page.
  Shows all keyboard navigation shortcuts.
  Closed by pressing Esc, ?, or clicking the backdrop.
*/

import { useEffect } from "react";
import styles from "./KeyboardModal.module.css";

/* All shortcuts in display order */
const SHORTCUTS = [
  {
    group: "navigation",
    items: [
      { keys: ["Tab"],           desc: "Next section" },
      { keys: ["Shift", "Tab"], desc: "Previous section" },
      { keys: ["/"],             desc: "Jump to Contact" },
    ],
  },
  {
    group: "vim-jumps",
    items: [
      { keys: ["G", "A"],        desc: "Jump to About" },
      { keys: ["G", "E"],        desc: "Jump to Experience" },
      { keys: ["G", "P"],        desc: "Jump to Projects" },
      { keys: ["G", "S"],        desc: "Jump to Skills" },
      { keys: ["G", "C"],        desc: "Jump to Contact" },
    ],
  },
  {
    group: "meta",
    items: [
      { keys: ["?"],             desc: "Toggle this help" },
      { keys: ["Esc"],           desc: "Close modal" },
    ],
  },
];

export default function KeyboardModal({ onClose }) {
  /* Close on backdrop click */
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  /* Prevent scroll while modal is open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts"
    >
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.title}>KEYBOARD_SHORTCUTS</span>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close keyboard shortcuts modal"
          >
            [ESC]
          </button>
        </div>

        {/* Shortcut rows */}
        <div className={styles.list}>
          {SHORTCUTS.map((group, gi) => (
            <div key={group.group}>
              {gi > 0 && <div className={styles.divider} aria-hidden="true" />}
              {group.items.map((item) => (
                <div key={item.keys.join("+")} className={styles.row}>
                  <div className={styles.keys}>
                    {item.keys.map((k, ki) => (
                      <span key={ki} className={styles.key}>{k}</span>
                    ))}
                  </div>
                  <span className={styles.desc}>{item.desc}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className={styles.footer}>
          [Press ? or Esc to close]
        </div>

      </div>
    </div>
  );
}

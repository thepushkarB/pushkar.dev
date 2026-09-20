/*
  FOOTER
  Minimal 2-line: git quip + copyright.
  Press ? hint to surface keyboard shortcuts.
*/

import styles from "./Footer.module.css";
import { Coffee } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className="container">
        {/* Nerdy git quip — a nod to the profession */}
        <p className={styles.quip}>one does not simply push to main</p>

        {/* Copyright + stack attribution */}
        <p className={styles.copy}>
          © 2026 Baka Tech · Made w/ <Coffee size={10} color="var(--green)" /> · v2.1
        </p>

        {/* Keyboard shortcut discovery hint */}
        <p className={styles.hint}>
          press <kbd>?</kbd> for keyboard shortcuts
        </p>
      </div>
    </footer>
  );
}

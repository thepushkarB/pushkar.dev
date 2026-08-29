/*
┌─────────────────────────────────────────────────────────────────────────┐
│                        CONTACT SECTION                                  │
│                                                                         │
│  Visual: Terminal prompt card.                                          │
│  `$ connect --with pushkar`                                             │
│                                                                         │
│  Layout:                                                                │
│  > sudo send-email pushkar@   ← humor, not clickable                   │
│  ┌──────────────────────────────────────────┐                           │
│  │ $ connect --with pushkar                 │                           │
│  │ > [mail]     pushkarbankar...         ↗  │                           │
│  │ > [github]   github.com/thepushkarB  ↗  │                           │
│  │ > [linkedin] linkedin.com/in/...     ↗  │                           │
│  │  // currently: open to opportunities     │                           │
│  └──────────────────────────────────────────┘                           │
└─────────────────────────────────────────────────────────────────────────┘
*/

import { personal } from "../../data/content";
import styles from "./ContactSection.module.css";

/* Contact link definitions — built from real data in content.js */
const LINKS = [
  {
    id: "mail",
    label: "[mail]",
    display: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    id: "github",
    label: "[github]",
    display: "github.com/thepushkarB",
    href: personal.github,
  },
  {
    id: "linkedin",
    label: "[linkedin]",
    display: "linkedin.com/in/pushkar-bankar",
    href: personal.linkedin,
  },
];

export default function ContactSection() {
  return (
    /* Section id="contact" required for keyboard nav & scroll-spy */
    <section
      id="contact"
      className={styles.contactSection}
      aria-label="Contact Section"
    >
      <div className="container">

        {/* Section header */}
        <header className={styles.sectionHeader}>
          <div className={styles.sectionTag}>OPEN_CHANNEL</div>
          <h2 className={styles.sectionTitle}>CONTACT</h2>
        </header>

        {/* Humor line — sudo easter egg (does not trigger real sudo hook) */}
        <div className={styles.humorLine} aria-hidden="true">
          sudo send-email pushkar@
        </div>

        {/* Terminal card */}
        <div className={styles.terminalCard}>

          {/* Card header: `$ connect --with pushkar` */}
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderDollar}>$</span>
            <span>connect --with pushkar</span>
          </div>

          {/* Contact rows */}
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={styles.contactRow}
              target={link.id !== "mail" ? "_blank" : undefined}
              rel={link.id !== "mail" ? "noopener noreferrer" : undefined}
              aria-label={`Contact via ${link.label}`}
            >
              <span className={styles.rowPrompt}>{">"}</span>
              <span className={styles.rowKey}>{link.label}</span>
              <span className={styles.rowVal}>{link.display}</span>
              <span className={styles.rowArrow} aria-hidden="true">↗</span>
            </a>
          ))}

          {/* Status lines */}
          <div className={styles.statusLines}>
            <span className={styles.statusLine}>
              currently: open to opportunities
            </span>
            <span className={styles.statusLine}>
              response_time: {"<"} 24h
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

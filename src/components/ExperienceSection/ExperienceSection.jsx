/*
┌─────────────────────────────────────────────────────────────┐
│                    EXPERIENCE SECTION                       │
│                                                             │
│  <section #experience>                                      │
│    └── <div .container>                                     │
│          ├── <header .sectionHeader>                        │
│          │     ├── .sectionTag   (// CAREER_TIMELINE)       │
│          │     └── .sectionTitle (EXPERIENCE)               │
│          │                                                  │
│          └── <div .timeline> (glowing vertical rail)        │
│                ├── <div .timelineItem>                      │
│                │     ├── .node (glowing anchor dot)         │
│                │     └── <article .expCard>                 │
│                │           ├── .cardHeader (role, date)     │
│                │           └── .cardBody (bullets, tags)    │
│                └── <div .nextChapterItem> (loading node)    │
└─────────────────────────────────────────────────────────────┘
*/

import { experience } from "../../data/content";
import styles from "./ExperienceSection.module.css";

export default function ExperienceSection() {
  return (
    /* Outer section container with id="experience" for navbar scrolling */
    <section
      id="experience"
      className={styles.experienceSection}
      aria-label="Work Experience Section"
    >
      <div className="container">
        
        {/* 1. SECTION HEADER */}
        <header className={styles.sectionHeader}>
          <div className={styles.sectionTag}>CAREER_TIMELINE</div>
          <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
        </header>

        {/* 2. VERTICAL TIMELINE CONTAINER */}
        <div className={styles.timeline}>
          
          {/* Map through all experience entries from data/content.js */}
          {experience.map((exp) => (
            <div key={exp.id} className={styles.timelineItem}>
              
              {/* Glowing anchor node on the vertical connection rail */}
              <div className={styles.node} aria-hidden="true" />

              {/* Terminal Career Card */}
              <article className={styles.expCard}>
                
                {/* Card Header: Role, Remote Badge, Company & Period */}
                <div className={styles.cardHeader}>
                  <div className={styles.headerMain}>
                    <h3 className={styles.roleTitle}>
                      {exp.role}
                      {exp.remote && (
                        <span className={styles.remoteBadge}>REMOTE</span>
                      )}
                    </h3>
                    <div className={styles.companyMeta}>
                      <span className={styles.companyName}>@ {exp.company}</span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <time className={styles.periodBadge}>{exp.period}</time>
                </div>

                {/* Card Body: Achievement Bullets & Tech Tags */}
                <div className={styles.cardBody}>
                  
                  {/* Achievement Bullets with terminal '▸' prefix */}
                  <ul className={styles.bulletList}>
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className={styles.bulletItem}>
                        <span className={styles.bulletGlyph} aria-hidden="true">
                          ▸
                        </span>
                        <span className={styles.bulletText}>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Tags */}
                  <div className={styles.tagsRow} aria-label="Technologies used">
                    {exp.tags.map((tag) => (
                      <span key={tag} className={styles.tagChip}>
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </article>

            </div>
          ))}

          {/* 3. NEXT CHAPTER TERMINAL NODE */}
          <div className={styles.nextChapterItem}>
            <div className={styles.nextChapterNode} aria-hidden="true" />
            <div className={styles.nextChapterCard}>
              <span className={styles.nextChapterText}>
                // LOADING_NEXT_CHAPTER...
              </span>
              <span className={styles.cursor} aria-hidden="true">
                █
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

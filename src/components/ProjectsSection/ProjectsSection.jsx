/*
┌─────────────────────────────────────────────────────────────┐
│                     PROJECTS SECTION                        │
│                                                             │
│  <section #projects>                                        │
│    └── <div .container>                                     │
│          ├── <header .sectionHeader>                        │
│          │     ├── .sectionTag   (// INDEX_OF_BUILDS)       │
│          │     └── .sectionTitle (PROJECTS)                 │
│          │                                                  │
│          ├── // FEATURED (2 Flagship AI & Systems Cards)    │
│          │     └── <div .projectsGrid> (Halftone headers)   │
│          │                                                  │
│          ├── // PRODUCTION_WORK (3 Industry builds)         │
│          │     └── <div .projectsGrid> (Work cards)         │
│          │                                                  │
│          └── // ARCHIVE (Collapsible toggle button & grid)  │
└─────────────────────────────────────────────────────────────┘
*/

import { useState } from "react";
import { projects } from "../../data/content";
import styles from "./ProjectsSection.module.css";

// Dynamic map connecting project accent token to the halftone dot matrix CSS class
const ACCENT_MAP = {
  green: styles.halftoneGreen,
  violet: styles.halftoneViolet,
  amber: styles.halftoneAmber,
  cyan: styles.halftoneCyan,
};

export default function ProjectsSection() {
  // Collapsible toggle state for older archive builds
  const [showArchive, setShowArchive] = useState(false);

  return (
    /* Outer section container with id="projects" for smooth scroll navigation */
    <section
      id="projects"
      className={styles.projectsSection}
      aria-label="Projects Section"
    >
      <div className="container">
        
        {/* 1. SECTION HEADER */}
        <header className={styles.sectionHeader}>
          <div className={styles.sectionTag}>INDEX_OF_BUILDS</div>
          <h2 className={styles.sectionTitle}>PROJECTS</h2>
        </header>

        {/* 2. FEATURED FLAGSHIP PROJECTS (Overwatcher, Ticket Tamer) */}
        <div className={styles.groupHeader}>
          <span className={styles.groupLabel}>FEATURED</span>
          <div className={styles.groupDivider} aria-hidden="true" />
        </div>

        <div className={styles.projectsGrid}>
          {projects.featured.map((proj) => {
            const halftoneClass = ACCENT_MAP[proj.accent] || styles.halftoneGreen;

            return (
              <article key={proj.id} className={styles.projectCard}>
                
                {/* Pure Halftone Dot-Matrix Header Zone with CRT Scan-Sweep */}
                <div className={`${styles.cardHeaderZone} ${halftoneClass}`}>
                  <span className={styles.typeBadge}>{proj.type}</span>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLinkBtn}
                      aria-label={`View ${proj.title} on GitHub`}
                    >
                      ↗
                    </a>
                  )}
                </div>

                {/* Card Content Body */}
                <div className={styles.cardBodyZone}>
                  <div className={styles.titleArea}>
                    <h3 className={styles.projectTitle}>{proj.title}</h3>
                  </div>

                  <p className={styles.description}>{proj.description}</p>

                  {/* Bullet Highlights for Featured Cards */}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className={styles.featuredBullets}>
                      {proj.bullets.map((bullet, idx) => (
                        <li key={idx} className={styles.featuredBulletItem}>
                          <span className={styles.bulletGlyph} aria-hidden="true">
                            ▸
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack Chips */}
                  <div className={styles.tagsRow} aria-label="Technologies used">
                    {proj.tags.map((tag) => (
                      <span key={tag} className={styles.tagChip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* 3. PRODUCTION WORK PROJECTS (Waybeyond Tech builds) */}
        <div className={styles.groupHeader}>
          <span className={styles.groupLabel}>PRODUCTION_WORK</span>
          <div className={styles.groupDivider} aria-hidden="true" />
        </div>

        <div className={styles.projectsGrid}>
          {projects.work.map((proj) => {
            const halftoneClass = ACCENT_MAP[proj.accent] || styles.halftoneViolet;

            return (
              <article key={proj.id} className={styles.projectCard}>
                
                {/* Pure Halftone Dot-Matrix Header Zone */}
                <div className={`${styles.cardHeaderZone} ${halftoneClass}`}>
                  <span className={styles.typeBadge}>{proj.type}</span>
                  <span className={styles.internalBadge}>[INTERNAL / WORK]</span>
                </div>

                {/* Card Content Body */}
                <div className={styles.cardBodyZone}>
                  <div className={styles.titleArea}>
                    <h3 className={styles.projectTitle}>{proj.title}</h3>
                  </div>

                  <p className={styles.description}>{proj.description}</p>

                  {/* Tech Stack Chips */}
                  <div className={styles.tagsRow} aria-label="Technologies used">
                    {proj.tags.map((tag) => (
                      <span key={tag} className={styles.tagChip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* 4. COLLAPSIBLE ARCHIVE BUILDS */}
        <div className={styles.archiveToggleArea}>
          <button
            onClick={() => setShowArchive((prev) => !prev)}
            className={styles.archiveToggleBtn}
            aria-expanded={showArchive}
          >
            <span className={styles.togglePrefix}>
              [ {showArchive ? "-" : "+"}
            </span>
            <span>
              {showArchive ? "hide archive" : `show archive (${projects.archive.length})`}
            </span>
            <span className={styles.togglePrefix}>]</span>
          </button>
        </div>

        {/* Compact Archive Grid */}
        {showArchive && (
          <div className={styles.archiveGrid} aria-label="Archived Projects">
            {projects.archive.map((proj) => (
              <article key={proj.id} className={styles.archiveCard}>
                <div className={styles.archiveTop}>
                  <h4 className={styles.archiveTitle}>{proj.title}</h4>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.archiveLink}
                      aria-label={`View ${proj.title} on GitHub`}
                    >
                      ↗
                    </a>
                  )}
                </div>

                <p className={styles.archiveDesc}>{proj.description}</p>

                <div className={styles.tagsRow}>
                  {proj.tags.map((tag) => (
                    <span key={tag} className={styles.tagChip}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

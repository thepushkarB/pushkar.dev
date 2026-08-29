/*
┌─────────────────────────────────────────────────────────────────────────┐
│                          SKILLS SECTION                                 │
│                                                                         │
│  Visual: Terminal `ls -la ~/skills/` output.                            │
│  Each category = a drwxr-xr-x directory entry.                         │
│  Skills animate in with staggered transitionDelay via                   │
│  IntersectionObserver on the section root.                              │
└─────────────────────────────────────────────────────────────────────────┘
*/

import { useEffect, useRef } from "react";
import { skills } from "../../data/content";
import styles from "./SkillsSection.module.css";

export default function SkillsSection() {
  /* Ref to the section element — used to trigger stagger animation */
  const sectionRef = useRef(null);

  useEffect(() => {
    /* When the section enters the viewport, add .visible to all .skillTag els */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tags = entry.target.querySelectorAll(`.${styles.skillTag}`);
          tags.forEach((tag) => tag.classList.add(styles.visible));
          observer.unobserve(entry.target); /* fire once */
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    /* Section id="skills" required for keyboard nav scroll target */
    <section
      id="skills"
      className={styles.skillsSection}
      ref={sectionRef}
      aria-label="Skills Section"
    >
      <div className="container">

        {/* Section header */}
        <header className={styles.sectionHeader}>
          <div className={styles.sectionTag}>CAPABILITY_MAP</div>
          <h2 className={styles.sectionTitle}>SKILLS</h2>
        </header>

        {/* Terminal prompt line: `$ ls -la ~/skills/` */}
        <div className={styles.terminalPrompt} aria-hidden="true">
          <span className={styles.promptDollar}>$</span>
          <span className={styles.promptCmd}>ls -la</span>
          <span className={styles.promptPath}>~/skills/</span>
        </div>

        {/* Directory entries — one per skill group */}
        <div className={styles.dirList} role="list">
          {skills.map((group, groupIdx) => (
            <div
              key={group.dir}
              className={styles.dirEntry}
              role="listitem"
            >
              {/* `drwxr-xr-x  dirname/` row */}
              <div className={styles.dirRow} aria-hidden="true">
                <span className={styles.dirPerms}>drwxr-xr-x</span>
                <span className={styles.dirName}>{group.dir}</span>
              </div>

              {/* Skill tags row with staggered fade-in */}
              <div className={styles.tagRow} aria-label={`${group.dir} skills`}>
                {group.items.map((skill, itemIdx) => (
                  <span
                    key={skill}
                    className={styles.skillTag}
                    /* Stagger: each tag delays proportional to its global index */
                    style={{
                      "--stagger-delay": `${(groupIdx * group.items.length + itemIdx) * 20}ms`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Blinking cursor — terminal "still listening" signal */}
        <div className={styles.cursor} aria-hidden="true">█</div>

      </div>
    </section>
  );
}

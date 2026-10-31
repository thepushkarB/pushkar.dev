import { useState } from "react";
import styles from "./TechStackTags.module.css";

/**
 * TechStackTags - Progressive disclosure tag container for project cards.
 * Displays up to `limit` hero tags directly, with an interactive, hardware-accelerated
 * monospace drawer for remaining tags.
 *
 * @param {Object} props
 * @param {string[]} props.tags - List of technology name strings
 * @param {number} [props.limit=3] - Max tags to show in the primary row
 */
export default function TechStackTags({ tags = [], limit = 3 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!tags || tags.length === 0) return null;

  // Statically render if total tags fit inside limit
  if (tags.length <= limit) {
    return (
      <div className={styles.tagsContainer} aria-label="Technologies used">
        <div className={styles.tagsRow}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tagChip}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const heroTags = tags.slice(0, limit);
  const extraTags = tags.slice(limit);

  return (
    <div className={styles.tagsContainer} aria-label="Technologies used">
      {/* Primary Hero Row */}
      <div className={styles.tagsRow}>
        {heroTags.map((tag) => (
          <span key={tag} className={styles.tagChip}>
            {tag}
          </span>
        ))}

        {/* When collapsed, show [+N MORE] at the end of the hero tags */}
        {!isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className={styles.toggleBtn}
            aria-expanded={false}
            aria-label={`Show ${extraTags.length} more technologies`}
          >
            <span>+{extraTags.length} MORE</span>
          </button>
        )}
      </div>

      {/* Hardware-accelerated CSS Grid drawer for remaining tags */}
      <div
        className={`${styles.drawer} ${isExpanded ? styles.drawerOpen : ""}`}
        aria-hidden={!isExpanded}
      >
        <div className={styles.drawerInner}>
          {extraTags.map((tag) => (
            <span key={tag} className={styles.tagChip}>
              {tag}
            </span>
          ))}

          {/* When expanded, show [- LESS] at the very end, at the bottom */}
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className={styles.toggleBtn}
            aria-expanded={true}
            aria-label="Collapse technologies"
          >
            <span>− LESS</span>
          </button>
        </div>
      </div>
    </div>
  );
}

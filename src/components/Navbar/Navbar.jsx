import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import { personal } from '../../data/content';

const NAV_LINKS = [
  { label: 'About',      href: '#about',      key: 'a' },
  { label: 'Experience', href: '#experience', key: 'e' },
  { label: 'Projects',   href: '#projects',   key: 'p' },
  { label: 'Skills',     href: '#skills',     key: 's' },
  { label: 'Contact',    href: '#contact',    key: 'c' },
];

export default function Navbar() {
  const [active, setActive]     = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = NAV_LINKS.map(l => document.querySelector(l.href));
      const current = sections.reduce((acc, el) => {
        /*
        * explanation:
        current = ""

        for each section:

            if section doesn't exist:
                continue

            if section.top <= 120px:
                current = section.id

        return current
         */

        // if ele == null then whatever is accumulated- defence so hte site wont crash on null values
        if (!el) return acc;
        if (el.getBoundingClientRect().top <= 120) return el.id;
        return acc;
      }, '');

      // updates the active navigation section
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
        <div className={`${styles.inner} container`}>
          {/* Logo */}
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            aria-label="Back to top"
          >
            <span className={styles.logoBracket}>[</span>
            <span className={styles.logoText}>{personal.initials}</span>
            <span className={styles.logoBracket}>]</span>
            <span className={styles.logoCursor} aria-hidden="true" />
          </a>

          {/* Desktop nav */}
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ label, href, key }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.link} ${active === href.slice(1) ? styles.linkActive : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  aria-current={active === href.slice(1) ? 'true' : undefined}
                  title={`Press G then ${key.toUpperCase()} to jump here`}
                >
                  <span className={styles.linkDot} aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.drawerLinks} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={styles.drawerLink}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className={styles.drawerPrompt}>&gt;</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

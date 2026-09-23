import styles from './Navbar.module.css';
import { useState, useEffect, useRef } from 'react';
import { personal } from '../../data/content';
import { User, Briefcase, Code2, Terminal, Mail, FileText } from 'lucide-react';

const NAV_LINKS = [
    { index:'01', label: 'About', href: '#about', key: 'a', icon: User },
    { index:'02', label: 'Experience', href: '#experience', key: 'e', icon: Briefcase },
    { index:'03', label: 'Projects', href: '#projects', key: 'p', icon: Terminal },
    { index:'04', label: 'Skills', href: '#skills', key: 's', icon: Code2 },
    { index:'05', label: 'Contact', href: '#contact', key: 'c', icon: Mail },
];

export default function Navbar({ onResumeClick }) {
    const [active, setActive] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const dockRef = useRef(null);
    const [pillOffset, setPillOffset] = useState(null);

    // find active section
    const activeSection = NAV_LINKS.find(l => l.href.slice(1) === active);

    // update pill position wheever 'active' changes
    useEffect(() => {
        if (!active || !dockRef.current) {
            setPillOffset(null);
            return;
        }

        // find the active anchor tag inside the dock
        const activeEl = dockRef.current.querySelector(`[data-section="${active}"]`);

        if(activeEl) {
            // Absolute geometric center: (Icon Center X) - (Dock Left X)
            const dockRect = dockRef.current.getBoundingClientRect();
            const activeRect = activeEl.getBoundingClientRect();
            // center of active icon realtive to dock
            const offset = (activeRect.left - dockRect.left) + (activeRect.width / 2);
            setPillOffset(offset);
        }


    }, [active]);

    
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    // Auto-hide dock when mobile keyboard pops up for contact inputs
    useEffect(() => {
        const onFocusIn = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) setKeyboardOpen(true);
        };
        const onFocusOut = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) setKeyboardOpen(false);
        };
        window.addEventListener('focusin', onFocusIn);
        window.addEventListener('focusout', onFocusOut);
        return () => {
            window.removeEventListener('focusin', onFocusIn);
            window.removeEventListener('focusout', onFocusOut);
        };
    }, []);


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

    // Defensive haptic feedback (Android works, gracefully skipped on iOS)
    const triggerHaptic = () => {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            try {
                navigator.vibrate(30);
            } catch {
                // ignore
            }
        }
    };

    const handleNavClick = (href) => {
        triggerHaptic();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleResumeClick = () => {
        triggerHaptic();
        onResumeClick();
    };

    return (
        <>
            <nav 
                className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} 
                role="navigation" aria-label="Main navigation"
            >
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

                        {/* Resume Datashard Trigger */}
                        <li>
                            <button
                                className={styles.resumeBtn}
                                onClick={handleResumeClick}
                                aria-label="Open resume download"
                                id="navbar-resume-btn"
                            >
                                <span className={styles.resumeBtnBracket}>[./</span>
                                resume
                                <span className={styles.resumeBtnBracket}>]</span>
                            </button>
                        </li>

                    </ul>

                    {/* Mobile hamburger */}
                    {/* <button
                        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        <span /><span /><span />
                    </button> */}

                </div>
            </nav>
            
            {/* //* NEW FLOATING DOCK  */}
            <nav
                className={`${styles.dock} ${keyboardOpen ? styles.dockHidden : ''}`} 
                aria-label="Mobile quick navigation"
                ref={dockRef}
            >
                {/* Dynamic Sliding Micro-HUD Pill */}
                <div
                    className={`${styles.dockHud} ${activeSection && pillOffset !== null ? styles.dockHudVisible : ''}`}
                    style={{ left: `${pillOffset || 0}px` }}
                    aria-hidden="true"
                >
                    <span className={styles.dockHudPrompt}>&gt;</span>
                    <span className={styles.dockHudIndex}>{activeSection ? `${activeSection.index}.` : ''}</span>
                    <span className={styles.dockHudLabel}>{activeSection ? activeSection.label.toUpperCase() : ''}</span>

                    {/* Downward pointing caret */}
                    <span className={styles.dockHudCaret} />
                </div>

                <div className={styles.dockContainer}>
                    {NAV_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isActive = active === link.href.slice(1);
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                data-section={link.href.slice(1)}
                                className={`${styles.dockItem} ${isActive ? styles.dockItemActive : ''}`}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                aria-label={link.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.75} />
                                {isActive && <span className={styles.dockPip} aria-hidden="true" />}
                            </a>
                        );
                    })}
                    <div className={styles.dockDivider} aria-hidden="true" />
                    <button
                        className={styles.dockResumeBtn}
                        onClick={handleResumeClick}
                        aria-label="Open resume modal"
                    >
                        <FileText size={18} strokeWidth={1.75} />
                        {/* <span className={styles.dockResumeBadge}>CV</span> */}
                    </button>
                </div>
            </nav>
        </>
    );
}

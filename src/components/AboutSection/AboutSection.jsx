/*
┌─────────────────────────────────────────────────────────────┐
│                      ABOUT SECTION                          │
│                                                             │
│  <section #about>                                           │
│    └── <div .container>                                     │
│          ├── <header .sectionHeader>                        │
│          │     ├── .sectionTag   (// SUBJECT_FILE_A-01)     │
│          │     └── .sectionTitle (ABOUT)                    │
│          │                                                  │
│          └── <article .dossierCard>                         │
│                ├── <div .cardHeader> (classified titlebar)  │
│                └── <div .cardBody>                          │
│                      ├── <div .profileGrid>                 │
│                      │     ├── .avatarWrapper (PB + scan)   │
│                      │     └── .dossierData   (aligned rows)│
│                      ├── <div .statsRow>      (stat chips)  │
│                      ├── <div .telemetrySection> (LIVE RSS) │
│                      └── <div .credentialsGrid> (certs/edu) │
└─────────────────────────────────────────────────────────────┘
*/

import { useState, useEffect } from "react";
import { personal, certifications, education } from "../../data/content";
import styles from "./AboutSection.module.css";

/**
 * Custom Hook: useSystemTelemetry
 * Generates dynamic, live-updating telemetry readings for:
 * - STATUS: Active system state (ONLINE with pulsing green dot)
 * - UPTIME: High availability metric (99.9%)
 * - LATENCY: Real-time network jitter oscillating between 38ms - 45ms
 * - COFFEE: Dynamic ASCII progress gauge (████████░░ 80%)
 */
function useSystemTelemetry() {
    const [telemetry, setTelemetry] = useState({
        status: "ONLINE",
        uptime: "99.9%",
        latency: 42,
        coffeePercent: 80,
    });

    useEffect(() => {
        // Ticker interval: updates ping latency & coffee levels periodically
        const interval = setInterval(() => {
            setTelemetry((prev) => {
                // Jitter latency slightly (simulating active telemetry round-trip ping)
                const nextLatency = Math.floor(38 + Math.random() * 8);
                // Subtle coffee consumption fluctuation (75% to 85%)
                const coffeeLevels = [75, 80, 85];
                const nextCoffee = coffeeLevels[Math.floor(Math.random() * coffeeLevels.length)];

                return {
                    ...prev,
                    latency: nextLatency,
                    coffeePercent: nextCoffee,
                };
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    // Compute ASCII bar (10 segments total, e.g. 8 filled '█' + 2 empty '░')
    const filledCount = Math.round(telemetry.coffeePercent / 10);
    const emptyCount = 10 - filledCount;
    const coffeeBar = "█".repeat(filledCount) + "░".repeat(emptyCount);

    return {
        ...telemetry,
        coffeeBar,
    };
}

export default function AboutSection() {
    // Mr. Robot Easter Egg state: hovering over [CLASSIFIED] reveals clearance text
    const [isClassifiedHovered, setIsClassifiedHovered] = useState(false);

    // Live dynamic telemetry values
    const telemetry = useSystemTelemetry();

    return (
        /* Outer section container with id="about" for navbar scrolling */
        <section id="about" className={styles.aboutSection} aria-label="About Section">
            <div className="container">

                {/* 1. SECTION HEADER */}
                <header className={styles.sectionHeader}>
                    <div className={styles.sectionTag}>SUBJECT_FILE_A-01</div>
                    <h2 className={styles.sectionTitle}>ABOUT</h2>
                </header>

                {/* 2. CLASSIFIED DOSSIER CARD */}
                <article className={styles.dossierCard}>

                    {/* 2.1 Window Title Bar (Subject Code + Classified Badge + Mr. Robot Easter Egg) */}
                    <div className={styles.cardHeader}>
                        <div className={styles.headerLeft}>
                            <span className={styles.subjectCode}>SUBJECT A-01</span>
                            
                            {/* Mr. Robot Easter Egg: changes text to 'fsociety clearance required' on hover */}
                            <span
                                className={`${styles.classifiedBadge} ${
                                    isClassifiedHovered ? styles.classifiedBadgeAlert : ""
                                }`}
                                onMouseEnter={() => setIsClassifiedHovered(true)}
                                onMouseLeave={() => setIsClassifiedHovered(false)}
                                // title="Mr. Robot Reference"
                                role="status"
                            >
                                {isClassifiedHovered ? "fsociety clearance required" : "[CLASSIFIED]"}
                            </span>
                        </div>
                        
                        {/* Legacy window control buttons preserved for future reference */}
                        {/* <div className={styles.windowControls} aria-hidden="true">
                            <span className={styles.windowBtn}>[ _ ]</span>
                            <span className={styles.windowBtn}>[ □ ]</span>
                            <span className={styles.windowBtn}>[ ✕ ]</span>
                        </div> */}
                    </div>

                    {/* 2.2 Dossier Card Body (wraps all content with uniform padding & gaps) */}
                    <div className={styles.cardBody}>

                        {/* PROFILE GRID: 2 Columns on desktop (Avatar Box + Aligned Data Rows) */}
                        <div className={styles.profileGrid}>

                            {/* Left Column: Avatar Box with laser scanline sweep */}
                            <div className={styles.avatarWrapper}>
                                <div className={styles.avatarBox} aria-label={`Avatar initials ${personal.initials}`}>
                                    <span className={styles.avatarInitials}>{personal.initials}</span>
                                    {/* Animated vertical laser line */}
                                    <div className={styles.avatarScanline} aria-hidden="true" />
                                </div>
                                <span className={styles.avatarId}>SYS_ID: {personal.initials}-2026</span>
                            </div>

                            {/* Right Column: Key-Value Dossier Data (Aligned via 3-Column CSS Grid) */}
                            <div className={styles.dossierData}>

                                {/* Row: Name */}
                                <div className={styles.dataRow}>
                                    <span className={styles.dataKey}>NAME</span>
                                    <span className={styles.dataLeader} aria-hidden="true" />
                                    <span className={`${styles.dataVal} ${styles.highlightGreen}`}>
                                        {personal.name.toUpperCase()}
                                    </span>
                                </div>

                                {/* Row: Function / Role */}
                                <div className={styles.dataRow}>
                                    <span className={styles.dataKey}>FUNCTION</span>
                                    <span className={styles.dataLeader} aria-hidden="true" />
                                    <span className={styles.dataVal}>{personal.role}</span>
                                </div>

                                {/* Row: Status */}
                                <div className={styles.dataRow}>
                                    <span className={styles.dataKey}>STATUS</span>
                                    <span className={styles.dataLeader} aria-hidden="true" />
                                    <span className={`${styles.dataVal} ${styles.highlightGreen}`}>
                                        BUILDING COOL STUFF
                                    </span>
                                </div>

                                {/* Row: Stack */}
                                <div className={styles.dataRow}>
                                    <span className={styles.dataKey}>STACK</span>
                                    <span className={styles.dataLeader} aria-hidden="true" />
                                    <span className={`${styles.dataVal} ${styles.highlightViolet}`}>
                                        MERN + FASTAPI + AI / AGENTS
                                    </span>
                                </div>

                                {/* Row: Threat Level (Humor bar meter: 3 filled, 3 empty) */}
                                <div className={styles.dataRow}>
                                    <span className={styles.dataKey}>THREAT_LEVEL</span>
                                    <span className={styles.dataLeader} aria-hidden="true" />
                                    <span className={styles.dataVal}>
                                        <span className={styles.threatContainer}>
                                            <span className={styles.threatBar} aria-label="Threat level: Medium (3 of 6)">
                                                {[...Array(6)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`${styles.threatSegment} ${
                                                            i < 3 ? styles.threatFilled : styles.threatEmpty
                                                        }`}
                                                    />
                                                ))}
                                            </span>
                                            <span className={styles.threatLabel}>MEDIUM</span>
                                        </span>
                                    </span>
                                </div>

                                {/* Row: Special Skills */}
                                <div className={styles.dataRow}>
                                    <span className={styles.dataKey}>SPECIAL_SKILLS</span>
                                    <span className={styles.dataLeader} aria-hidden="true" />
                                    <span className={styles.dataVal}>{"Converts coffee -> code"}</span>
                                </div>

                                {/* Full-Width Summary Block with Clean Divider */}
                                <div className={styles.summaryBlock}>
                                    <div className={styles.summaryHeader}>
                                        <span className={styles.summaryLabel}>SUMMARY</span>
                                        <div className={styles.summaryDivider} aria-hidden="true" />
                                    </div>
                                    <p className={styles.summaryText}>
                                        {personal.summary}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* QUICK STATS ROW (Projects, Skills, Experience badges) */}
                        <div className={styles.statsRow}>
                            {Object.entries(personal.stats).map(([key, val]) => (
                                <div key={key} className={styles.statBadge}>
                                    <span className={styles.statKey}>[{key.toUpperCase()}:</span>
                                    <span className={styles.statVal}>{val}</span>
                                    <span className={styles.statKey}>]</span>
                                </div>
                            ))}
                        </div>

                        {/* DYNAMIC SYSTEM TELEMETRY (Live updating values + heartbeat)*/}
                        <div className={styles.telemetrySection} aria-label="System Telemetry Live Panel">
                            <div className={styles.telemetryHeader}>
                                <span>// SYSTEM_TELEMETRY</span>
                                <span className={styles.telemetryLiveIndicator}>
                                    <span className={styles.telemetryDot}>●</span> LIVE FEED
                                </span>
                            </div>
                            
                            <div className={styles.telemetryGrid}>
                                {/* Telemetry: Status */}
                                <div className={styles.telemetryItem}>
                                    <span className={styles.telemetryKey}>STATUS</span>
                                    <span className={styles.telemetryValOnline}>
                                        <span className={styles.telemetryDot}>●</span> {telemetry.status}
                                    </span>
                                </div>

                                {/* Telemetry: Uptime */}
                                <div className={styles.telemetryItem}>
                                    <span className={styles.telemetryKey}>UPTIME</span>
                                    <span className={styles.telemetryVal}>{telemetry.uptime}</span>
                                </div>

                                {/* Telemetry: Live Ping Latency */}
                                <div className={styles.telemetryItem}>
                                    <span className={styles.telemetryKey}>LATENCY</span>
                                    <span className={styles.telemetryValGreen}>{telemetry.latency}ms</span>
                                </div>

                                {/* Telemetry: Coffee ASCII Bar */}
                                <div className={styles.telemetryItem}>
                                    <span className={styles.telemetryKey}>COFFEE</span>
                                    <span className={styles.telemetryCoffee}>
                                        <span className={styles.coffeeBar}>{telemetry.coffeeBar}</span>
                                        <span className={styles.coffeePercent}>{telemetry.coffeePercent}%</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* BIOSCAN SVG waveform preserved for future reference */}
                        {/* <div className={styles.bioscanContainer} aria-hidden="true">
                            <div className={styles.bioscanHeader}>
                                <span>// BIOMETRIC_TELEMETRY</span>
                                <span className={styles.bioscanStatus}>STABLE · 72 BPM</span>
                            </div>
                            <svg
                                className={styles.bioscanSvg}
                                viewBox="0 0 800 28"
                                preserveAspectRatio="none"
                            >
                                <path
                                    className={styles.waveformPath}
                                    d="M0,14 L120,14 L135,4 L145,24 L155,2 L165,22 L175,14 L380,14 L395,6 L405,22 L415,3 L425,25 L435,14 L640,14 L655,5 L665,23 L675,2 L685,24 L695,14 L800,14"
                                />
                            </svg>
                        </div> */}

                        {/* CREDENTIALS GRID (Certifications + Education cards) */}
                        <div className={styles.credentialsGrid}>

                            {/* Card 1: Certifications */}
                            <div className={styles.credentialCard}>
                                <div className={styles.cardSubHeader}>CERTIFICATIONS</div>
                                <div className={styles.certList}>

                                    {certifications.map((cert, idx) => (
                                        <div key={idx} className={styles.certItem}>
                                            <span className={styles.certBullet}>&gt;</span>
                                            <div className={styles.certContent}>
                                                <span className={styles.certTitle}>{cert.title}</span>
                                                <span className={styles.certIssuer}>{cert.issuer}</span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* //! commented out for now, dont wanna show certification links */}
                                    {/* open certification link */}
                                    {/* {certifications.map((cert, idx) => {
                                        const content = (
                                            <>
                                                <span className={styles.certBullet}>&gt;</span>
                                                <div className={styles.certContent}>
                                                    <span className={styles.certTitle}>
                                                        {cert.title}
                                                        {cert.link && (
                                                            <span className={styles.certExternal} aria-hidden="true"> ↗</span>
                                                        )}
                                                    </span>
                                                    <span className={styles.certIssuer}>{cert.issuer}</span>
                                                </div>
                                            </>
                                        );
                                        return cert.link ? (
                                            <a
                                                key={idx}
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${styles.certItem} ${styles.certLink}`}
                                                aria-label={`View certificate: ${cert.title}`}
                                            >
                                                {content}
                                            </a>
                                        ) : (
                                            <div key={idx} className={styles.certItem}>
                                                {content}
                                            </div>
                                        );
                                    })} */}
                                    
                                </div>
                            </div>

                            {/* Card 2: Education (with Status, Specialization & Debt metadata) */}
                            <div className={styles.credentialCard}>
                                <div className={styles.cardSubHeader}>EDUCATION</div>
                                <div className={styles.eduContent}>
                                    <span className={styles.eduDegree}>{education.degree}</span>
                                    <span className={styles.eduInstitution}>{education.institution}</span>
                                    <span className={styles.eduPeriod}>{education.period}</span>

                                    {/* Education Dossier Metadata */}
                                    <div className={styles.eduDivider} aria-hidden="true" />
                                    <div className={styles.eduMetaList}>
                                        <div className={styles.eduMetaRow}>
                                            <span className={styles.eduMetaKey}>STATUS:</span>
                                            <span className={styles.eduMetaValGreen}>GRADUATED</span>
                                        </div>
                                        <div className={styles.eduMetaRow}>
                                            <span className={styles.eduMetaKey}>SPECIALIZATION:</span>
                                            <span className={styles.eduMetaVal}>COMPUTER SCIENCE</span>
                                        </div>
                                        {/* Easter Egg: DEBT switches from CLASSIFIED to fsociety clearance required on hover */}
                                        <div className={styles.eduMetaRow}>
                                            <span className={styles.eduMetaKey}>DEBT:</span>
                                            <span className={styles.debtClassified} role="status">
                                                <span className={styles.debtDefault}>CLASSIFIED</span>
                                                <span className={styles.debtHover}>fsociety clearance required</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </article>

            </div>
        </section>
    );
}

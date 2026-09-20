import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { personal } from '../../data/content';
import styles from "./ResumeModal.module.css";



// animate phases after delay 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LABELS = {
    idle: '[⬇ DOWNLOAD DIRECT PDF]',
    init: '[███░░░░░░░░░] 25% INITIALIZING...',
    extracting: '[███████░░░░░] 60% EXTRACTING...',
    bypassing: '[██████████░░] 85% BYPASSING...',
    done: '[████████████] 100% [✓ SHARD SECURED]',
};

/* Matrix glyphs used for random character replacement */
const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#░▒▓01';
/* 40 frames at 60fps ≈ 660ms animation duration */
// lower the frames, faster the scramble animation
const TOTAL_FRAMES = 30;
/*
 * Custom Hook: useScramble
 * Progressively decrypts text from left to right using requestAnimationFrame.
*/
function useScramble(finalText, startDelay = 80) {
    // 1. Reactive state: Every time `output` changes, React re-renders with the latest frame
    const [output, setOutput] = useState('');

    useEffect(() => {
        // Stores the ID returned by requestAnimationFrame for cleanup on unmount
        let rafId;
        // Tracks the current frame count (0 to TOTAL_FRAMES)
        let frame = 0;

        // 2. Delay the start slightly so the modal opening shutter animation has time to begin
        const timer = setTimeout(() => {
            const tick = () => {
                // 3. Normalized progress from 0.0 (start) to 1.0 (complete)
                const progress = frame / TOTAL_FRAMES;

                // 4. Calculate how many characters from the start are permanently locked in
                // Example: If finalText is 20 chars long and progress is 0.5 -> 10 chars locked
                const resolvedChars = Math.floor(progress * finalText.length);

                // 5. Build the string for the current frame
                const nextStr = finalText
                    .split('')
                    .map((char, index) => {
                        // Keep whitespaces intact to prevent word-wrapping/layout jumping
                        if(char === ' ') return ' ';

                        // If this character is before the resolved boundary, show the real letter
                        if(index < resolvedChars) return char;

                        // Otherwise, pick a random cyberpunk glyph from our matrix
                        const randomGlyphIndex = Math.floor(Math.random() * SCRAMBLE_CHARS.length);                        
                        return SCRAMBLE_CHARS[randomGlyphIndex];
                    })
                    .join('');
                

                // 6. Push the new frame to React state
                setOutput(nextStr);
                frame++;

                
                // 7. Decide whether to schedule another frame or finalize
                if(frame <= TOTAL_FRAMES) {
                    // Schedule next frame right before the browser's next screen repaint
                    rafId = requestAnimationFrame(tick);
                } else {
                    // Animation finished: lock in the exact final text
                    setOutput(finalText);
                }
            };

            // Kick off the very first frame
            tick();
        }, startDelay)

        // 8. CRITICAL CLEANUP: Runs if user closes modal mid-animation
        // Cancelling both prevents memory leaks and React state warnings on unmounted components
        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };
    }, [finalText, startDelay]);

    return output;
}


function useExtraction() {
    // phases: 'idle' | 'init' | 'extracting' | 'bypassing' | 'done'
    const [ phase, setPhase ] = useState('idle');

    const start = useCallback(async () => {
        // if not 'idle' then return to prevent rage clicks 
        if(phase !== 'idle') return;

        setPhase('init');
        await delay(200);

        setPhase('extracting');
        await delay(500);
        
        setPhase('bypassing');
        await delay(500);

        setPhase('done');
        console.log('its done bro');
    }, [phase]);


    const reset = useCallback(() => {
        setPhase('idle');
    }, []);


    const buttonLabel = LABELS[phase];


    return { phase, start, reset, buttonLabel };
}


const TELEMETRY_ROWS = [
    { key: 'TARGET',      val: 'PUSHKAR_RESUME_NEOIII.PDF', highlight: 'green'  },
    { key: 'COMPRESSION', val: 'MIDDLE-OUT*',               highlight: 'violet' },
    { key: 'ENCRYPTION',  val: 'BYPASSED (CHOOM CLEARANCE)',highlight: 'amber'  },
    { key: 'BASELINE',    val: 'CELLS INTERLINKED',         highlight: 'dim'    },
];


export default function ResumeModal({ onClose }) {
    const scrambledTitle = useScramble('SECURE_DATASHARD_EXTRACTION', 80);
    const { phase, start, buttonLabel } = useExtraction();
    const primaryBtnRef = useRef(null);

    useEffect(() => {
        // lock body scroll
        document.body.style.overflow = 'hidden';

        // autofocus on primary button
        if(primaryBtnRef.current) {
            primaryBtnRef.current.focus();
        }

        // cleanup: unlock scrol on unmount
        return () => {
            document.body.style.overflow = '';
            //? empty string('') > `auto`: bcoz empty string removes inline sty;es & restores whatever CSS rule was originally on it
        };
    }, []);

    // escape keydown
    useEffect(() => {
        const handleKeydown = (e) => {
            if(e.key === 'Escape') {
                onClose();
            }
        }

        // add keydown event listener 
        window.addEventListener('keydown', handleKeydown);

        // cleanup
        return () => window.removeEventListener('keydown', handleKeydown)
        
    }, [onClose]);

    // Handle download trigger
    const handleDownload = useCallback(async () => {
        // wait for animation to complete
        await start();

        // trigger download
        const a = document.createElement('a');
        // attach pdf link/path
        a.href = personal.resumeFile;
        // tells browser to save file instead of navigating to it
        a.download = 'Pushkar_resume_neoiii.pdf';
        // add download element: appending the 'a' tag in DOM is required for cross-origin PDF links to download
        document.body.appendChild(a);
        // simulate mouse click
        a.click()
        // remove download element: cleanup remove a tag from DOM
        document.body.removeChild(a);
        
    }, [start]);

    const handleBackdropClick = (e) => {
        // Only close if user clicked the backdrop itself, not the modal content inside
        if(e.target === e.currentTarget) {
            onClose();
        }
    }


    return (
        <div
            className={styles.backdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Resume Datashard Extraction"
        >
            <div className={`${styles.modal} ${phase === 'done' ? styles.modalPulse : ''}`}>
                {/* Header Bar */}
                <div className={styles.header}>
                    <span className={styles.headerIcon} aria-hidden="true">&gt;</span>
                    <span className={styles.headerTitle}>{scrambledTitle}</span>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                        [ESC]
                    </button>
                </div>
                {/* Telemetry Block */}
                <div className={styles.telemetryBlock}>
                    {TELEMETRY_ROWS.map(({ key, val, highlight }) => (
                        <div key={key} className={styles.telemetryRow}>
                            <span className={styles.telKey}>{key}</span>
                            <span className={styles.telLeader} aria-hidden="true" />
                            <span className={`${styles.telVal} ${styles[`highlight_${highlight}`]}`}>
                                {val}
                            </span>
                        </div>
                    ))}
                    <p className={styles.metaNote}>* absolutely not what is happening</p>
                </div>
                {/* Action Buttons */}
                <div className={styles.actions}>
                    <button
                        ref={primaryBtnRef}
                        className={`${styles.btn} ${styles.btnPrimary} ${phase !== 'idle' ? styles.btnExtracting : ''}`}
                        onClick={handleDownload}
                        disabled={phase !== 'idle'}
                        aria-label="Download resume as PDF"
                    >
                        {buttonLabel}
                    </button>
                    <a
                        href={personal.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        aria-label="View resume on Google Drive"
                    >
                        [↗ VIEW IN GOOGLE DRIVE]
                    </a>
                </div>
                {/* Footer */}
                <div className={styles.footer}>
                    [Press ESC to detach neural link]
                </div>
            </div>
        </div>
    );
}
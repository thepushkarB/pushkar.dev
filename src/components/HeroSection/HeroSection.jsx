import { useState, useEffect } from "react";
import styles from './HeroSection.module.css';
import { personal } from "../../data/content";

// glyphs matrix used during the scramble phase (alphanumerics, ASCII blocks, operators)
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789░▒▓';

// roles rotate through the typerwriter engine
const ROLES = [
    'Full-Stack Developer',
    'AI Tinkerer',
    // 'MCP Architect',
    'Hello, Friend'
];

/*
 * Custom Hook: useScramble
 * Drives the letter scramble animation on mount using requestAnimationFrame.
 * Progressively locks in characters from left to right.
*/
function useScramble(finalText, startDelay = 250) {
    //* NOTE: Use React state for data that affects rendering. 
    // Every time we call setOutput(), React re-renders the component and the user sees the next frame of the animation.
    const [output, setOutput] = useState('');

    useEffect(() => {
        //* 1. VARIABLES USED ONLY BY THE ANIMATION  
        //* ---------------------------------------
        // We'll store the ID returned by requestAnimationFrame()
        // We need this later so we can cancel the animation if the component unmounts before the animation finishes
        let rafId;

        // checkpoint - Keeps track of which animation frame we're currently on
        let frame = 0;


        // * 2. ANIMATION SETTINGS
        // * ------------------------------------------------------------
        // ~750ms total animation duration at 60fps
        const TOTAL_FRAMES = 60;


        // * 3. WAIT BEFORE STARTING THE ANIMATION
        // * ------------------------------------------------------------
        // runs code after startDelay 
        const timer = setTimeout(() => {

            //* 4. FUNCTION THAT CREATES ONE ANIMATION FRAME
            //* ------------------------------------------------------------
            const tick = () => {
                
                //* 5. CALCULATE ANIMATION PROGRESS
                //* ------------------------------------------------------------
                const progress = frame / TOTAL_FRAMES;


                //* 6. FIGURE OUT HOW MANY CHARACTERS ARE RESOLVED
                /* ------------------------------------------------------------
                * Example:
                * finalText = "PUSHKAR"
                * length = 7
                * progress = 0.4
                * 0.4 × 7 = 2.8
                * Math.floor() -> 2

                * Therefore:
                    * first 2 characters are already correct
                    * remaining characters are scrambled
                */
                // Calculate how many characters from the start are permanently resolved
                const resolvedChars = Math.floor(progress * finalText.length);

                /*
                 * 7. BUILD THE NEXT VERSION OF THE TEXT
                 * -------------------------------------------------------- 
                 * Strings are immutable in JavaScript
                 * So `split('')` returns arr of chars
                 * `map()` creates new arr & we conditionally return either the original char or a random glyph
                 * `join('')` creates new string
                 * 
                */

                const nextStr = finalText
                    .split('')
                    .map((char, index) => {
                        // keep whitespaces intact so layout doesn't jitter
                        if(char == ' ') return ' ';

                        // once index is behind the resolved TTFBThresholds, show actual letter
                        /* 
                        * If this character is BEFORE the resolved-character boundary, keep the real character.
                        * Example:
                            * resolvedCharacters = 3
                            * P U S H K A R
                            * ↑ ↑ ↑
                            * └─┴─┴─ already resolved
                        */
                        if(index < resolvedChars) return char;

                        // otherwise pick a random glyph form the matrix
                        /*
                        * Otherwise this character has not been resolved yet.
                        * Replace it with a random character from our SCRAMBLE_CHARS collection.
                        */
                        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    }).join('');

                
                /*
                 * 8. UPDATE REACT STATE
                 * --------------------------------------------------------
                 * This is what actually makes the new frame appear on the screen.
                */
                setOutput(nextStr);

                /*
                 * 9. MOVE TO THE NEXT FRAME
                 * --------------------------------------------------------
                 * We can only call requestAnimationFrame() after we update the state.
                 * We continue until we complete all the frames.
                */
                frame++;

                 /*

                /*
                 * 10. SHOULD THE ANIMATION CONTINUE?
                 * --------------------------------------------------------
                 * If we haven't reached the end:
                    * ask the browser to call animate() again before the next repaint.
                */
                if(frame <= TOTAL_FRAMES) {
                    rafId = requestAnimationFrame(tick);
                }
                else {
                    /*
                    * Animation is finished.
                    * Set the exact final text one last time so we guarantee that there are no random characters left.
                    */
                    setOutput(finalText);
                }
            };

            /*
            * 11. START THE FIRST FRAME
            * ----------------------------------------------------------
            * Calling tick() once starts the animation.
            * tick() itself will schedule the next frame.
            */
            tick();

        }, startDelay);

        /*
           * 12. CLEANUP ON UNMOUNT
           * --------------------------------------------------------
           * This runs when the component is removed from the page.
           * If you don't cancel the animation, it will keep running in the background and cause a warning or error.
        */
        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };

    }, [finalText, startDelay]);

    return output;

}



/**
 * Custom Hook: useTypewriter
 * 3-Phase finite state machine: Typing -> Pausing at full text -> Deleting.
 */
function useTypewriter(words, typeSpeed = 90, deleteSpeed = 45, pauseMs = 1000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  useEffect(() => {
    if (isPausing) return;
    const currentWord = words[wordIdx];
    const delay = isDeleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase: append next character
        const next = currentWord.slice(0, text.length + 1);
        setText(next);
        // Reached end of word -> pause before deleting
        if (next === currentWord) {
          setIsPausing(true);
          setTimeout(() => {
            setIsPausing(false);
            setIsDeleting(true);
          }, pauseMs);
        }
      } else {
        // Deleting phase: slice off last character
        const next = currentWord.slice(0, text.length - 1);
        setText(next);
        // Word completely cleared -> advance index cyclically using modulo
        if (next === '') {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
        }
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, isPausing, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);
  return text;
}



export default function HeroSection() {
  const scrambledName = useScramble(personal.name.toUpperCase(), 300);
  const currentRole = useTypewriter(ROLES, 70, 35, 2200);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="hero" className={styles.hero} aria-label="Hero Section">
      <div className={styles.centerContent}>
        {/* Terminal Header Prompt */}
        <div className={styles.terminalTag} aria-hidden="true">
          <span className={styles.promptSymbol}>$</span>
          <span>sys.init --user={personal.initials.toLowerCase()}</span>
        </div>
        {/* Scrambled Name Headline */}
        <h1 className={styles.heroName} aria-label={personal.name}>
          {scrambledName || personal.name.toUpperCase()}
        </h1>
        {/* Animated Role with Blinking Block Cursor */}
        <div className={styles.roleContainer} aria-live="polite">
          <span className={styles.rolePrefix}>&gt;</span>
          <span className={styles.roleText}>{currentRole}</span>
          <span className={styles.cursor} aria-hidden="true">█</span>
        </div>
        {/* Terminal Command CTAs */}
        <div className={styles.ctaGroup}>
          <button
            className={styles.ctaBtnPrimary}
            onClick={() => scrollTo('projects')}
            aria-label="View Projects"
          >
            <span className={styles.btnPrefix}>[./</span>view-projects<span className={styles.btnPrefix}>]</span>
          </button>
          <button
            className={styles.ctaBtnSecondary}
            onClick={() => scrollTo('contact')}
            aria-label="Contact Me"
          >
            <span className={styles.btnPrefix}>[./</span>contact-me<span className={styles.btnPrefix}>]</span>
          </button>
        </div>
      </div>
      {/* System Status Telemetry Footer Bar */}
      <div className={styles.statusFooter}>
        <div className={`${styles.statusInner} container`}>
          <span className={styles.statusText}>
            SYS_STATUS: <strong className={styles.online}>ONLINE</strong> · BUILD: v2.2.0 · UPTIME: 99.9%
          </span>
          <a
            href="#about"
            className={styles.scrollIndicator}
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            aria-label="Scroll to About section"
          >
            <span className={styles.scrollText}>SCROLL</span>
            <span className={styles.scrollArrow}>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
/*
  NOT FOUND PAGE — 404
  Terminal-style error: `ls /pages` output showing the unknown route.
  Click `> cd ~/home` to return.
*/

import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className={styles.page} aria-label="404 Page Not Found">
      <div className={styles.content}>

        {/* Error header */}
        <div className={styles.errorCode}>ERROR 404</div>
        <div className={styles.errorMsg}>
          Page not found.
          <br />
          Have you tried turning the internet off and on again?
        </div>

        {/* ls /pages terminal output */}
        <div className={styles.terminal}>
          <div className={styles.termLine}>
            <span className={styles.dollar}>$</span>
            <span className={styles.cmd}> ls /pages</span>
          </div>
          <div className={styles.lsOutput}>
            <span className={styles.dir}>home/</span>
            <span className={styles.dir}>about/</span>
            <span className={styles.dir}>experience/</span>
            <span className={styles.dir}>projects/</span>
            <span className={styles.dir}>skills/</span>
            <span className={styles.dir}>contact/</span>
          </div>
          <div className={styles.notFound}>
            [requested_page: <span className={styles.notFoundVal}>{location.pathname}</span>] NOT_FOUND
          </div>

          {/* Navigate home link */}
          <button
            onClick={() => navigate("/")}
            className={styles.homeLink}
            aria-label="Return to homepage"
          >
            <span className={styles.dollar}>$</span>
            <span className={styles.cmd}> cd ~/home</span>
          </button>
        </div>

      </div>
    </main>
  );
}

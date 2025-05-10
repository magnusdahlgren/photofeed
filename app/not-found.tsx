"use client";

import Link from "next/link";
import styles from "../styles/404.module.css";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <main className={styles.notFoundPage}>
      <header>
        <img
          src="/images/magnus.png"
          className="logo"
          alt="AI line art drawing of Magnus"
        />
        <h1>Magnus×404</h1>
      </header>

      <p>The page you were looking for doesn’t exist 😭</p>

      <Link href="/" className="primary-button">
        Back to homepage
      </Link>
    </main>
  );
}

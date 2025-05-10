import Link from "next/link";
import styles from "../styles/404.module.css";

export default function NotFound() {
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

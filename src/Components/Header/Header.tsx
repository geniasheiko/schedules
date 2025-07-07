import styles from "./Header.module.css";
export const Header = () => {
    return (
        <header className={styles.header}>
      <button className={styles.burger} aria-label="Open menu">
        &#9776;
      </button>
      <div className={styles.spacer}></div>
      <button className={styles.admin} aria-label="Admin login">
        Admin
      </button>
    </header>
    )
}
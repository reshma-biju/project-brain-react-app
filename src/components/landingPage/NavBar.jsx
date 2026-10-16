import styles from "./NavBar.module.css";
const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                 <img src="/images/Glowing Neon Circuit Brain Icon.png" alt="Project Brain logo" />
                <h2>Project Brain</h2>
            </div>

            <div className={styles.links}>
                <a href="#features">Features</a>
                <a href="#about">About</a>
            </div>

            <div className={styles.actions}>
                <button>Login</button>
                <button>Get Started</button>
            </div>
        </nav>
    );

}
export default NavBar;
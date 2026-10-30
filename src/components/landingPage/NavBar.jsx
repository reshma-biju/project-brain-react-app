import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                 <img src="/images/logo.png" alt="Project Brain logo" />
                <h2>Project Brain</h2>
            </div>

            <div className={styles.links}>
                <a href="#features">Features</a>
                <a href="#about">About</a>
            </div>

            <div className={styles.actions}>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Get Started</button>
            </div>
        </nav>
    );

}
export default NavBar;
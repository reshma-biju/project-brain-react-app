import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import GlowBackground from "../components/shared/GlowBackground";

const AppLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const closeNav = () => setIsNavOpen(false);

  useEffect(() => {
    if (!isNavOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsNavOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isNavOpen]);

  return (
    <div className={styles.appLayout}>
      <SideBar isOpen={isNavOpen} onClose={closeNav} />
      {isNavOpen && <div className={styles.backdrop} onClick={closeNav} />}

      <main className={styles.mainContent}>
        {!isNavOpen && (
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={isNavOpen}
            aria-controls="app-sidebar"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        )}

        <GlowBackground />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
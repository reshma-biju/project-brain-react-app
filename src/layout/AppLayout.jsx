import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import GlowBackground from "../components/shared/GlowBackground";

const AppLayout = ()=> {
  return (
    <div className={styles.appLayout}>
      <SideBar />

      <main className={styles.mainContent}>
        <GlowBackground />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
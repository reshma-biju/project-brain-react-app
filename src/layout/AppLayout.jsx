import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";

const AppLayout = ()=> {
  return (
    <div className={styles.appLayout}>
      <SideBar />

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
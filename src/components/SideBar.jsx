import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
} from "lucide-react";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import styles from "./SideBar.module.css";

function Sidebar() {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn } = useContext(AuthContext);

  function handleLogout() {
    setUser(null);
    navigate("/login");
  }

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <NavLink to="/" className={styles.brand}>
        <img src="/images/Glowing Neon Circuit Brain Icon.png" alt="Project Brain logo" />
        <span>Project Brain</span>
      </NavLink>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.active}`
              : styles.navLink
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.active}`
              : styles.navLink
          }
        >
          <FolderKanban size={19} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.active}`
              : styles.navLink
          }
        >
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* User profile and logout */}
      <div className={styles.sidebarFooter}>
        <div className={styles.avatar}>{user.name[0]}</div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userRole}>Personal workspace</span>
        </div>

        <button
          type="button"
          className={styles.logoutButton}
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
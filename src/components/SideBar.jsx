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

function Sidebar({ isOpen = false, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  async function handleLogout() {
    onClose?.();
    await logout();
    navigate("/login");
  }

  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <aside
      id="app-sidebar"
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
    >
      {/* Brand */}
      <NavLink to="/" className={styles.brand} onClick={onClose}>
        <img src="/images/logo.png" alt="Project Brain logo" />
        <span>Project Brain</span>
      </NavLink>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <NavLink to="/dashboard" className={getLinkClass} onClick={onClose}>
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/projects" className={getLinkClass} onClick={onClose}>
          <FolderKanban size={19} />
          <span>Projects</span>
        </NavLink>

        <NavLink to="/settings" className={getLinkClass} onClick={onClose}>
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
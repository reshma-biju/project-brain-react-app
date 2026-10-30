import styles from "./DashboardHeader.module.css";
import { Plus } from "lucide-react";
import { useContext } from "react";

import AuthContext from "../../context/AuthContext";

const DashboardHeader = ({ onCreateProject, greetingMsg }) => {
    const { user } = useContext(AuthContext);
    return (
    <div className={styles.outerContainer}>
       <h1 className={styles.greeting}>
           {greetingMsg}, <span>{user.name}</span>
        </h1>
       <button className={styles.createButton} onClick={onCreateProject}>
            <Plus size={18} strokeWidth={2.25} aria-hidden="true" />
            <span>New project</span>
        </button>
    </div>
    );

}
export default DashboardHeader;
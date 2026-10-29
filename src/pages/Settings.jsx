import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleAlert, CircleCheck, LogOut, Pencil, UserRound } from "lucide-react";
import AuthContext from "../context/AuthContext";
import styles from "./Settings.module.css";

const Settings = () => {
    const { user, updateDisplayName, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name ?? "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        const nextName = name.trim();

        if (!nextName) {
            setError("Name cannot be empty.");
            setSuccess(false);
            return;
        }

        if (!updateDisplayName(nextName)) {
            setError("Unable to update your display name. Please try again.");
            setSuccess(false);
            return;
        }

        setName(nextName);
        setError("");
        setSuccess(true);
        setIsEditing(false);
    }

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    return (
        <main className={styles.settingsPage}>
            <header className={styles.pageHeader}>
                <h1>Settings</h1>
                <p>Manage your account and workspace preferences.</p>
            </header>

            <section className={styles.settingSection} aria-labelledby="display-name-title">
                <div className={styles.sectionIcon} aria-hidden="true"><UserRound /></div>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionHeading}>
                        <h2 id="display-name-title">Display Name</h2>
                        <p>This name appears in your sidebar and dashboard.</p>
                    </div>
                    <div className={styles.nameForm}>
                        <span className={styles.nameLabel}>Name</span>
                        {!isEditing ? (
                            <div className={styles.displayNameRow}>
                                <span className={styles.displayName}>{user?.name}</span>
                                <button
                                    className={styles.editButton}
                                    type="button"
                                    aria-label="Edit display name"
                                    title="Edit display name"
                                    onClick={() => {
                                        setName(user?.name ?? "");
                                        setError("");
                                        setSuccess(false);
                                        setIsEditing(true);
                                    }}
                                >
                                    <Pencil aria-hidden="true" />
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className={styles.inputRow}>
                                    <input
                                        id="display-name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        autoFocus
                                        onChange={(event) => {
                                            setName(event.target.value);
                                            setError("");
                                            setSuccess(false);
                                        }}
                                        aria-invalid={Boolean(error)}
                                        aria-describedby={error ? "name-error" : undefined}
                                    />
                                    <button
                                        className={styles.saveButton}
                                        type="submit"
                                        disabled={name.trim() === (user?.name ?? "")}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        )}
                        {error && (
                            <p className={styles.errorMessage} id="name-error" role="alert">
                                <CircleAlert aria-hidden="true" />
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className={styles.successMessage} role="status">
                                <CircleCheck aria-hidden="true" />
                                Display name updated successfully!
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className={`${styles.settingSection} ${styles.logoutSection}`} aria-labelledby="logout-title">
                <div className={styles.sectionIcon} aria-hidden="true"><LogOut /></div>
                <div className={styles.logoutCopy}>
                    <h2 id="logout-title">Log Out</h2>
                    <p>Sign out of your account and return to the login page.</p>
                </div>
                <button className={styles.logoutButton} type="button" onClick={handleLogout}>
                    <LogOut aria-hidden="true" />
                    Log Out
                </button>
            </section>
        </main>
    );
}
export default Settings;
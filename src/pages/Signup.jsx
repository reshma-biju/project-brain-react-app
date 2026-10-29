import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthContext from "../context/AuthContext";
import styles from "./Login.module.css";

function Signup() {
  const { isLoggedIn, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  function validateField(field, value) {
    if (field === "name") return value.trim() ? "" : "Name is required.";
    if (field === "email") {
      if (!value.trim()) return "Email is required.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? ""
        : "Please enter a valid email address.";
    }
    if (field === "password") {
      if (!value) return "Password is required.";
      return value.length >= 6 ? "" : "Password must be at least 6 characters.";
    }
    if (field === "confirmPassword") {
      if (!value) return "Please confirm your password.";
      return value === password ? "" : "Passwords do not match.";
    }
    return "";
  }

  function handleFieldChange(field, value, setValue) {
    setValue(value);
    setAuthError("");

    if (touched[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: validateField(field, value),
      }));
    }
  }

  function handlePasswordChange(value) {
    setPassword(value);
    setAuthError("");

    if (touched.password) {
      setErrors((previous) => ({
        ...previous,
        password: validateField("password", value),
        ...(touched.confirmPassword && {
          confirmPassword: confirmPassword
            ? (confirmPassword === value ? "" : "Passwords do not match.")
            : "Please confirm your password.",
        }),
      }));
    } else if (touched.confirmPassword) {
      setErrors((previous) => ({
        ...previous,
        confirmPassword: confirmPassword
          ? (confirmPassword === value ? "" : "Passwords do not match.")
          : "Please confirm your password.",
      }));
    }
  }

  function handleBlur(field) {
    setTouched((previous) => ({ ...previous, [field]: true }));
    setErrors((previous) => ({
      ...previous,
      [field]: validateField(field, {
        name,
        email,
        password,
        confirmPassword,
      }[field]),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const fields = ["name", "email", "password", "confirmPassword"];
    const values = { name, email, password, confirmPassword };
    const nextErrors = Object.fromEntries(fields.map((field) => [field, validateField(field, values[field])]));

    setTouched(Object.fromEntries(fields.map((field) => [field, true])));
    setErrors(nextErrors);
    setAuthError("");
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsLoading(true);
    try {
      await signup({ name, email, password });
      navigate("/login", { state: { message: "Account created, please log in" } });
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.artworkPanel}>
        <div className={styles.artworkContent}>
          <Link to="/" className={styles.brand}>
            <img src="/images/Glowing Neon Circuit Brain Icon.png" alt="Project Brain logo" />
            <span>Project Brain</span>
          </Link>
          <div className={styles.artworkMessage}>
            <span className={styles.eyebrow}>YOUR SECOND BRAIN</span>
            <h1>Ideas come anytime.<br /><span>Keep them.</span></h1>
            <p>Capture your thoughts, organize your ideas, and turn your personal projects into progress.</p>
          </div>
        </div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.loginFormWrapper}>
          <Link to="/" className={styles.mobileBrand}>
            <img src="/images/Glowing Neon Circuit Brain Icon.png" alt="Project Brain logo" />
            <span>Project Brain</span>
          </Link>
          <div className={styles.formHeading}>
            <h2>Create your account</h2>
            <p>Start organizing your ideas and projects.</p>
          </div>
          {authError && <p className={styles.errorMessage} role="alert">{authError}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => handleFieldChange("name", event.target.value, setName)}
                onBlur={() => handleBlur("name")}
                placeholder="Your name"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <span id="name-error" className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => handleFieldChange("email", event.target.value, setEmail)}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <span id="email-error" className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => handlePasswordChange(event.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  required
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span id="password-error" className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => handleFieldChange("confirmPassword", event.target.value, setConfirmPassword)}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  required
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword((previous) => !previous)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span id="confirmPassword-error" className={styles.error}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className={styles.signupPrompt}>
            Already have an account? <Link to="/login" className={styles.textLink}>Log in</Link>
          </p>
          <p className={styles.storageNote}>Accounts are stored in this browser only.</p>
        </div>
      </section>
    </main>
  );
}

export default Signup;
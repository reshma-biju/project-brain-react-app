import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

import AuthContext from "../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
 const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();

  function validateEmail(value) {
    if (!value.trim()) {
      return "Email is required.";
    }

    // Use the browser's built-in email format validation.
    const input = document.createElement("input");
    input.type = "email";
    input.value = value;

    if (!input.validity.valid) {
      return "Please enter a valid email address.";
    }

    return "";
  }

  function validatePassword(value) {
    if (!value) {
      return "Password is required.";
    }

    if (value.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return "";
  }

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);

    if (touched.email) {
      setErrors((previous) => ({
        ...previous,
        email: validateEmail(value),
      }));
    }
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);

    if (touched.password) {
      setErrors((previous) => ({
        ...previous,
        password: validatePassword(value),
      }));
    }
  }

  function handleBlur(field) {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));

    if (field === "email") {
      setErrors((previous) => ({
        ...previous,
        email: validateEmail(email),
      }));
    }

    if (field === "password") {
      setErrors((previous) => ({
        ...previous,
        password: validatePassword(password),
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setTouched({
      email: true,
      password: true,
    });

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
      return;
    }

    // Temporary demo only: no real authentication yet.
    setUser({ id: "u1", name: "Reshma", email: email })
    toast.success("Login successful!");
    navigate("/dashboard");
  }

  return (
    <main className={styles.loginPage}>
        {/*left side of the login page with artwork and message*/}
      <section className={styles.artworkPanel}>
        <div className={styles.artworkContent}>
          <Link to="/" className={styles.brand}>
            <img src="/images/Glowing Neon Circuit Brain Icon.png" alt="Project Brain logo" />
            <span>Project Brain</span>
          </Link>

          <div className={styles.artworkMessage}>
            <span className={styles.eyebrow}>YOUR SECOND BRAIN</span>
            <h1>
              Ideas come anytime.
              <br />
              <span>Keep them.</span>
            </h1>
            <p>
              Capture your thoughts, organize your ideas, and turn
              your personal projects into progress.
            </p>
          </div>
        </div>
      </section>

{/*right side of the login page with form*/}
      <section className={styles.formPanel}>
        <div className={styles.loginFormWrapper}>
          <Link to="/" className={styles.mobileBrand}>
            <img src="/images/Glowing Neon Circuit Brain Icon.png" alt="Project Brain logo" />
            <span>Project Brain</span>
          </Link>

          <div className={styles.formHeading}>
            <h2>Welcome back</h2>
            <p>Sign in to continue working on your projects.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}//Communicates the field's invalid status
                aria-describedby={errors.email ? "email-error" : undefined}//Associates the input with the error eleement for screen readers, if an error exists
              />

              {errors.email && (
                <span id="email-error" className={styles.error}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>

              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
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

              {errors.password && (
                <span id="password-error" className={styles.error}>
                  {errors.password}
                </span>
              )}
            </div>

            <div className={styles.formOptions}>
              <label className={styles.rememberMe}>
                <input type="checkbox" name="rememberMe" />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className={styles.textLink}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign in
              <ArrowRight size={18} />
            </button>
          </form>

          <p className={styles.signupPrompt}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.textLink}>
              Sign up
            </Link>
          </p>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={2500} />
    </main>
  );
}

export default Login;

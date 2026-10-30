import { loadJSON, removeKey, saveJSON } from "../utils/storage";

const USERS_KEY = "pb_users";
const SESSION_KEY = "pb_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

export async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export async function signup({ name, email, password }) {
  const users = loadJSON(USERS_KEY, []);
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists");
  }

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  if (!saveJSON(USERS_KEY, [...users, user])) {
    throw new Error("Unable to create account in this browser");
  }
}

export async function login({ email, password }) {
  const users = loadJSON(USERS_KEY, []);
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);
  const passwordHash = await hashPassword(password);

  if (!user || user.passwordHash !== passwordHash) {
    throw new Error("Incorrect email or password");
  }

  if (
    !saveJSON(SESSION_KEY, {
      userId: user.id,
      expiresAt: Date.now() + SESSION_DURATION,
    })
  ) {
    throw new Error("Unable to sign in on this browser");
  }
}

export function logout() {
  removeKey(SESSION_KEY);
}

export function updateDisplayName(name) {
  const session = loadJSON(SESSION_KEY, null);
  if (!session) return null;

  const users = loadJSON(USERS_KEY, []);
  const updatedUsers = users.map((entry) =>
    entry.id === session.userId ? { ...entry, name: name.trim() } : entry,
  );
  const updatedUser = updatedUsers.find((entry) => entry.id === session.userId);
  if (!updatedUser || !saveJSON(USERS_KEY, updatedUsers)) return null;
// eslint-disable-next-line no-unused-vars
  const { passwordHash, ...safeUser } = updatedUser;
  return safeUser;
}

export function getSessionUser() {
  const session = loadJSON(SESSION_KEY, null);
  if (!session) return null;

  if (session.expiresAt <= Date.now()) {
    removeKey(SESSION_KEY);
    return null;
  }

  const user = loadJSON(USERS_KEY, []).find((entry) => entry.id === session.userId);
  if (!user) return null;
// eslint-disable-next-line no-unused-vars
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);//get item always returns string or null
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.warn(`Could not read "${key}" from storage:`, error);
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Could not save "${key}" to storage:`, error);
    return false;
  }
}

export function removeKey(key) {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}
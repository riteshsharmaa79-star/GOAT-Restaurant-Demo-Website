// Frontend-only credential gate. User explicitly requested hardcoded credentials.
// NOT a real authentication system — purely a UI gate for a demo admin panel.
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "goat123";
export const AUTH_KEY = "goat_admin_session_v1";

export function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ user: username, t: Date.now() }));
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
    try {
        return !!JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
    } catch {
        return false;
    }
}

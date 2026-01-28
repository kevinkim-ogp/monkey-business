// Simple authentication utilities for the BuggyShop demo

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// Store user email in localStorage
export function login(email: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("userEmail", email);
    window.Ladybug?.setUser({
      email: email,
    });
  }
}

// Get current user email
export function getUserEmail(): string | null {
  if (typeof window !== "undefined") {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      window.Ladybug?.setUser({ email: userEmail });
      return userEmail;
    }
  }
  return null;
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return getUserEmail() !== null;
}

// Clear user session
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userEmail");
    window.Ladybug?.unsetUser();
  }
}

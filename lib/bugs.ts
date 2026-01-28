// Bug definitions for the BuggyShop demo app
// Each bug has an ID, name, description, and location

export interface Bug {
  id: number;
  name: string;
  description: string;
  location: string;
}

export const BUG_POOL: Bug[] = [
  { id: 1, name: "Broken Add Button", description: "Add to Cart button does nothing", location: "products" },
  { id: 2, name: "Infinite Spinner", description: "One stat card stuck loading forever", location: "dashboard" },
  { id: 3, name: "Overlapping Text", description: "Revenue number overlaps its label", location: "dashboard" },
  { id: 4, name: "Missing Image", description: "One product shows broken image icon", location: "products" },
  { id: 5, name: "Placeholder Text", description: "Recent activity shows xxxx xxxx instead of real text", location: "dashboard" },
  { id: 6, name: "Wrong Currency", description: "Prices show as NaN or $undefined", location: "products" },
  { id: 7, name: "Repeated Product", description: "All products show the same item repeatedly", location: "products" },
  { id: 8, name: "Corrupted Text", description: "Text has missing characters and typos", location: "dashboard" },
  { id: 9, name: "Broken Link", description: "One nav link redirects to 404 page", location: "sidebar" },
  { id: 10, name: "Permanent Error State", description: "One card shows error that never resolves", location: "dashboard" },
];

// Randomly select 2-3 bugs from the pool
export function selectRandomBugs(): number[] {
  const numBugs = Math.floor(Math.random() * 3) + 2;
  const shuffled = [...BUG_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numBugs).map(bug => bug.id);
}

// Store active bugs in sessionStorage
export function activateBugs(bugIds: number[]): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('activeBugs', JSON.stringify([10]));
  }
}

// Get active bugs from sessionStorage
export function getActiveBugs(): number[] {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('activeBugs');
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return [];
}

// Check if a specific bug is active
export function isBugActive(bugId: number): boolean {
  const activeBugs = getActiveBugs();
  return activeBugs.includes(bugId);
}

// Clear active bugs (on logout)
export function clearBugs(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('activeBugs');
  }
}

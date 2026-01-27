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
  { id: 5, name: "Form Won't Submit", description: "Save button shows persistent error", location: "settings" },
  { id: 6, name: "Wrong Currency", description: "Prices show as NaN or $undefined", location: "products" },
  { id: 7, name: "Duplicate Items", description: "Same product appears twice in grid", location: "products" },
  { id: 8, name: "Cut-off Text", description: "Welcome message truncated mid-word", location: "dashboard" },
  { id: 9, name: "Unclickable Link", description: "One nav link doesn't respond", location: "sidebar" },
  { id: 10, name: "Permanent Error State", description: "One card shows error that never resolves", location: "dashboard" },
];

// Randomly select 1-2 bugs from the pool
export function selectRandomBugs(): number[] {
  const numBugs = Math.random() > 0.5 ? 2 : 1;
  const shuffled = [...BUG_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numBugs).map(bug => bug.id);
}

// Store active bugs in sessionStorage
export function activateBugs(bugIds: number[]): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('activeBugs', JSON.stringify(bugIds));
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

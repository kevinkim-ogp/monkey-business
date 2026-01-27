// Add this to your TypeScript project (e.g., types/ladybug.d.ts)

interface LadybugUserInfo {
  email?: string
  id?: string
}

declare global {
  interface Window {
    Ladybug?: {
      setUser(userInfo: LadybugUserInfo): void
      unsetUser(): void
    }
  }
}

export {}
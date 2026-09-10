import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { Role } from "@/types/domain";

export interface DemoUser {
  id: string;
  role: Role;
  nameAr: string;
  nameEn: string;
  /** merchant id for MERCHANT, captain id for CAPTAIN, customer phone for CUSTOMER */
  linkedId?: string;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: "u-merchant",
    role: "MERCHANT",
    nameAr: "مخبز الرحمة",
    nameEn: "Rahma Bakery",
    linkedId: "mr-rahma",
  },
  {
    id: "u-captain",
    role: "CAPTAIN",
    nameAr: "محمد السيد",
    nameEn: "Mohamed El Sayed",
    linkedId: "cp-mohamed",
  },
  {
    id: "u-customer",
    role: "CUSTOMER",
    nameAr: "أحمد محمد",
    nameEn: "Ahmed Mohamed",
    linkedId: "01277889900",
  },
  { id: "u-ops", role: "OPERATIONS", nameAr: "منى عبد الله", nameEn: "Mona Abdallah" },
  { id: "u-admin", role: "ADMIN", nameAr: "أحمد فؤاد", nameEn: "Ahmed Fouad" },
];

export const HOME_BY_ROLE: Record<Role, string> = {
  MERCHANT: "/app/merchant",
  CAPTAIN: "/app/captain",
  CUSTOMER: "/app/customer",
  ADMIN: "/app/admin",
  OPERATIONS: "/app/admin",
  SUPPORT: "/app/support",
};

const STORAGE_KEY = "tukly.user";

export function readStoredUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoUser;
    return DEMO_USERS.some((u) => u.id === parsed.id) ? parsed : null;
  } catch {
    return null;
  }
}

interface AuthValue {
  user: DemoUser | null;
  ready: boolean;
  signIn: (user: DemoUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setReady(true);
  }, []);

  const signIn = useCallback((next: DemoUser) => {
    setUser(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<AuthValue>(() => ({ user, ready, signIn, signOut }), [user, ready, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function isAdminRole(role: Role | undefined): boolean {
  return role === "ADMIN" || role === "OPERATIONS";
}

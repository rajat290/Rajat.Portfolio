"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { data } = useSession();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-900/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          Portfolio SaaS
        </Link>

        <nav className="flex items-center gap-3 text-sm text-slate-300">
          <Link href="/#pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/#templates" className="hover:text-white">
            Templates
          </Link>
          {data?.user ? (
            <>
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}



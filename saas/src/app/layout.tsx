import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio SaaS",
  description: "Multi-tenant portfolio builder platform"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <AppProviders session={session}>
          <SiteHeader />
          <div className="min-h-[calc(100vh-64px)]">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}



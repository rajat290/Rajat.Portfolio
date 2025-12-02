import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignInForm } from "@/components/auth/sign-in-form";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-16">
      <div className="text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-sky-400">
          Portfolio SaaS
        </p>
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Sign in to your workspace
        </h1>
        <SignInForm />
      </div>
    </main>
  );
}



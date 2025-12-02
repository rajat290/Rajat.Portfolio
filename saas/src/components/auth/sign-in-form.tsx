"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Github, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormValues = z.infer<typeof formSchema>;

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" }
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await signIn("credentials", {
        ...values,
        redirect: true,
        callbackUrl: "/dashboard"
      });

      if ((result as unknown as { error?: string })?.error) {
        toast.error("Invalid email or password");
      }
    });
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <Card className="w-full max-w-md border-slate-800 bg-slate-900/70 backdrop-blur">
      <CardTitle>Welcome back</CardTitle>
      <CardDescription className="mt-2">
        Sign in to continue building your portfolio.
      </CardDescription>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
        noValidate
      >
        <label className="space-y-2 text-sm font-medium text-slate-200">
          Email
          <Input
            type="email"
            placeholder="you@example.com"
            disabled={isPending}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-rose-400">{errors.email.message}</p>
          )}
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-200">
          Password
          <Input
            type="password"
            placeholder="••••••••"
            disabled={isPending}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-rose-400">{errors.password.message}</p>
          )}
        </label>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-widest text-slate-500">
        <span className="h-px w-full bg-slate-800" />
        OR
        <span className="h-px w-full bg-slate-800" />
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => handleSocialLogin("google")}
        >
          <Mail className="h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => handleSocialLogin("github")}
        >
          <Github className="h-4 w-4" />
          Continue with GitHub
        </Button>
      </div>
    </Card>
  );
}



"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/app";

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    remember: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fieldErrors = useMemo(() => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.email.trim()) errs.email = "Email address is required.";
    else if (!isValidEmail(form.email))
      errs.email = "Please enter a valid email address.";
    if (!form.password) errs.password = "Password is required.";
    return errs;
  }, [form]);

  const canSubmit = Object.keys(fieldErrors).length === 0 && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Please fix the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl w-full items-center p-6 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">
        {/* Left column - Login Form */}
        <div className="max-w-md mx-auto lg:mx-0">
          <span className="inline-flex items-center gap-2 border-white/5 border mb-6 text-[11px] font-medium rounded-full px-3 py-1 text-neutral-300 bg-black/30">
            <Icon icon="solar:shield-check-linear" className="w-3 h-3 text-green-300" />
            Secure sign-in
          </span>

          <h1 className="sm:text-4xl lg:text-5xl leading-tight text-3xl font-display font-semibold text-white tracking-tight mb-4">
            Welcome Back
          </h1>

          <p className="sm:text-lg leading-relaxed text-base font-light text-neutral-400 mb-8">
            Sign in to continue your learning journey and access your saved learning paths.
          </p>

          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            {error && (
              <div className="text-sm text-red-200 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email Address
              </label>
              <p className="text-xs text-neutral-500 mb-2">
                Enter the email associated with your account.
              </p>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg text-sm bg-[#0a0a0a]/80 border text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all ${
                  fieldErrors.email
                    ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30"
                    : "border-white/10 focus:border-green-500/50 focus:ring-green-500/50"
                }`}
                placeholder="Enter your email"
                required
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-300 mt-2">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <p className="text-xs text-neutral-500 mb-2">Enter your account password.</p>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg text-sm bg-[#0a0a0a]/80 border text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all ${
                  fieldErrors.password
                    ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30"
                    : "border-white/10 focus:border-green-500/50 focus:ring-green-500/50"
                }`}
                placeholder="Enter your password"
                required
              />
              {fieldErrors.password && (
                <p className="text-xs text-red-300 mt-2">{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between gap-6">
              <label className="flex items-center text-sm text-neutral-400">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm((p) => ({ ...p, remember: e.target.checked }))}
                  className="w-4 h-4 text-green-500 bg-black/50 border-white/10 rounded focus:ring-green-500"
                />
                <span className="ml-2">Keep me signed in on this device.</span>
              </label>
              <Link href="#" className="text-sm text-green-300 hover:text-green-200 transition-colors">
                Forgot password?
              </Link>
            </div>

            <p className="text-xs text-neutral-500">
              Forgot your password? You can reset it to regain access to your account.
            </p>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-white hover:bg-neutral-200 disabled:opacity-50 disabled:hover:bg-white text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Icon icon="solar:login-2-linear" className="w-4 h-4" />
              Sign In
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-neutral-500">Or continue with</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <button
              type="button"
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Icon icon="logos:google-icon" className="w-4 h-4" />
              Continue with Google
            </button>
          </form>

          <div className="mt-10 border-t border-white/5 pt-8">
            <p className="text-sm text-neutral-400 mb-3">Don&apos;t have an account?</p>
            <p className="text-xs text-neutral-500 leading-relaxed mb-6">
              Create an account to generate learning paths, track your progress, and save your
              curriculum.
            </p>
            <Link
              href={`/register${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
              className="w-full inline-flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Create Account
            </Link>
            <p className="text-xs text-neutral-600 mt-6">
              By signing in, you agree to the platform&apos;s terms of service and privacy policy.
            </p>
          </div>
        </div>

        {/* Right visualization */}
        <div className="relative hidden lg:block">
          <div className="h-[600px] flex items-center justify-center text-center bg-[url(https://images.unsplash.com/photo-1709706696753-1dc4f13d0cc4?w=1080&q=80)] bg-cover rounded-2xl p-8 border border-white/5">
            <div className="text-left w-full">
              <div className="w-24 h-24 flex items-center justify-center rounded-2xl mb-4 ml-auto backdrop-blur-md grayscale border border-white/5 bg-black/30">
                <Icon icon="solar:route-square-linear" className="w-12 h-12 text-green-300" />
              </div>
              <h3 className="uppercase text-3xl font-display font-medium text-white tracking-tight text-right mb-2">
                Your learning, organized
              </h3>
              <p className="text-sm text-neutral-300 text-right max-w-sm ml-auto">
                Follow curated modules, track progress, and stay focused.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


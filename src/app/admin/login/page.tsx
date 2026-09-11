"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/admin-api";
import { LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);

  useEffect(() => {
    if (retryAfter <= 0) return;
    const timer = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [retryAfter > 0]);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (retryAfter > 0) return;
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
      if (err.retryAfter) setRetryAfter(err.retryAfter);
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = loading || retryAfter > 0;

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold-500 font-display">Admin Panel</h1>
          <p className="text-slate-400 mt-2">Sign in to manage your school website</p>
        </div>

        <div className="bg-white rounded-xl shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="fake-username" autoComplete="username" className="absolute opacity-0 h-0 w-0 -z-10" tabIndex={-1} />
            <input type="password" name="fake-password" autoComplete="current-password" className="absolute opacity-0 h-0 w-0 -z-10" tabIndex={-1} />

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {retryAfter > 0 && (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <span className="font-mono font-bold text-lg tabular-nums">{formatTime(retryAfter)}</span>
                <span>Please wait before trying again</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="new-username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isDisabled}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isDisabled}
                  className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : retryAfter > 0 ? (
                `Locked — ${formatTime(retryAfter)}`
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

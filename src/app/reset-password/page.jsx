"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to reset your password.");
      return;
    }

    setMessage(data.message || "Password reset complete. You can now sign in.");
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900'>
      <div className='w-full max-w-xl rounded-[1.5rem] border border-slate-200 bg-white p-10 shadow-[0_18px_50px_rgba(20,45,70,0.08)]'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-slate-900'>
            Reset password
          </h1>
          <p className='mt-3 text-base leading-7 text-slate-600'>
            Set a new password for your MTSA account.
          </p>
        </div>

        {!token ? (
          <div className='rounded-2xl bg-rose-50 p-4 text-sm text-rose-700'>
            Invalid reset link. Please request a new password reset.
          </div>
        ) : (
          <>
            {message && (
              <div className='rounded-2xl bg-sky-50 p-4 text-sm text-sky-700'>
                {message}
              </div>
            )}
            {error && (
              <div className='rounded-2xl bg-rose-50 p-4 text-sm text-rose-700'>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className='mt-6 space-y-6'>
              <div>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-medium text-slate-700'
                >
                  New password
                </label>
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className='w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-sky-100'
                />
              </div>

              <div>
                <label
                  htmlFor='confirmPassword'
                  className='mb-2 block text-sm font-medium text-slate-700'
                >
                  Confirm new password
                </label>
                <input
                  id='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  className='w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-sky-100'
                />
              </div>

              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <button
                  type='submit'
                  disabled={loading}
                  className='inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                >
                  {loading ? "Resetting…" : "Reset password"}
                </button>
                <Link
                  href='/login'
                  className='inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50'
                >
                  Back to login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to send reset instructions.");
      return;
    }

    setMessage(data.message || "Check your inbox for reset instructions.");
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900'>
      <div className='w-full max-w-xl rounded-[1.5rem] border border-slate-200 bg-white p-10 shadow-[0_18px_50px_rgba(20,45,70,0.08)]'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-slate-900'>
            Forgot password
          </h1>
          <p className='mt-3 text-base leading-7 text-slate-600'>
            Enter the email address for your MTSA account.
          </p>
        </div>

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
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-slate-700'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              {loading ? "Sending…" : "Send reset link"}
            </button>
            <Link
              href='/login'
              className='inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50'
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

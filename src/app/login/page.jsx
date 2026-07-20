"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/");
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900'>
      <div className='w-full max-w-xl rounded-[1.5rem] border border-slate-200 bg-white p-10 shadow-[0_18px_50px_rgba(20,45,70,0.08)]'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-slate-900'>
            Sign in
          </h1>
          <p className='mt-3 text-base leading-7 text-slate-600'>
            Use your MTSA account credentials to sign in.
          </p>
        </div>

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

        {error && <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-slate-700'
            >
              Password
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

          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <button
              type='submit'
              disabled={loading}
              className='inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
            <Link
              href='/forgot-password'
              className='inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50'
            >
              Forgot password
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

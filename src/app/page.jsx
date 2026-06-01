"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 text-slate-900'>
      <div className='w-full max-w-3xl rounded-[1.5rem] border border-slate-200 bg-white p-10 shadow-[0_18px_50px_rgba(20,45,70,0.08)]'>
        <div className='mb-10 text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-slate-900'>
            MTSA Registrations
          </h1>
          <p className='mt-4 text-base leading-7 text-slate-600'>
            Access your admin portal with secure authentication and password
            recovery.
          </p>
        </div>

        {status === "loading" ? (
          <p className='text-center text-slate-600'>Loading session…</p>
        ) : session?.user ? (
          <div className='space-y-6'>
            <p className='text-lg text-slate-700'>
              Signed in as {session.user.email}
            </p>
            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700'
              >
                Sign out
              </button>
              <Link href='/forgot-password'>Reset password</Link>
            </div>
          </div>
        ) : (
          <div className='space-y-6 text-center'>
            <p className='text-lg text-slate-700'>
              Sign in to manage MTSA registrations and access secure admin
              features.
            </p>
            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
              <Link
                href='/login'
                className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700'
              >
                Sign in
              </Link>
            </div>
            <p className='text-slate-600'>
              Forgot your password?{" "}
              <Link
                href='/forgot-password'
                className='font-semibold text-slate-900 hover:text-slate-700'
              >
                Reset it here
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

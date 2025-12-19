"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white border rounded-xl p-6">
      <h1 className="text-xl font-semibold mb-4">Admin Sign In</h1>
      {error && (
        <p className="mb-3 text-xs text-red-600">
          Invalid credentials or something went wrong.
        </p>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-amber-600 text-white py-2 text-sm font-medium hover:bg-amber-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

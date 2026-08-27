import Image from "next/image";
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#060C18] px-4 py-12">
      <div className="mb-8 flex flex-col items-center">
        <Image
          src="/dastrup-logo-white.png"
          alt="Dastrup Deep Cleaning"
          width={220}
          height={178}
          priority
          className="w-40 sm:w-48 h-auto"
        />
      </div>

      <div className="w-full max-w-sm bg-[#0C1C34] border border-white/10 rounded-xl p-8 shadow-2xl">
        <h1 className="text-lg font-semibold text-white mb-1">Contracts Portal</h1>
        <p className="text-sm text-white/50 mb-6">Staff login</p>

        {error && (
          <div className="mb-4 text-sm text-red-200 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            Incorrect email or password.
          </div>
        )}

        <form action={loginAction} className="space-y-4">
          <input type="hidden" name="next" value={next || "/dashboard"} />
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/40 focus:border-[#38BDF8]/60"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/40 focus:border-[#38BDF8]/60"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0EA5E9] hover:bg-[#38BDF8] text-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>

      <p className="mt-8 text-xs text-white/30">Dastrup Deep Cleaning · Utah&apos;s Trusted Cleaning Experts</p>
    </div>
  );
}

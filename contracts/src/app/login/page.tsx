import Image from "next/image";
import { Inter } from "next/font/google";
import { loginAction } from "./actions";

const inter = Inter({ subsets: ["latin"], weight: ["800"] });

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 bg-[#060C18] px-4 py-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-[#0EA5E9]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-[#38BDF8]/10 blur-[120px]" />

      <div className="relative flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-up">
        <Image
          src="/dastrup-logo-color.png"
          alt="Dastrup Deep Cleaning"
          width={220}
          height={178}
          priority
          className="w-40 sm:w-48 h-auto drop-shadow-[0_0_30px_rgba(14,165,233,0.25)]"
        />
        <p className="mt-6 italic text-2xl sm:text-3xl text-white/90 font-medium">
          We make clean happen
        </p>
      </div>

      <div className="relative flex flex-col items-center animate-fade-in-up [animation-delay:120ms]">
        <div className="w-full max-w-sm bg-[#0C1C34]/90 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-[0_0_60px_-12px_rgba(14,165,233,0.35)] ring-1 ring-white/5">
          <h1
            className={`${inter.className} text-3xl font-extrabold tracking-tight text-center mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent`}
          >
            Portal
          </h1>

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
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/40 focus:border-[#38BDF8]/60 transition-shadow"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/40 focus:border-[#38BDF8]/60 transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#0EA5E9] hover:bg-[#38BDF8] hover:shadow-[0_0_24px_-2px_rgba(56,189,248,0.6)] text-white text-sm font-semibold rounded-lg py-2.5 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4.5" y="10.5" width="15" height="9" rx="1.5" />
                <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
              </svg>
              Log In
            </button>
          </form>
        </div>

        <p className="mt-8 text-xs text-white/30">Dastrup Deep Cleaning · Utah&apos;s Trusted Cleaning Experts</p>
      </div>
    </div>
  );
}

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

      <div className="relative flex items-end gap-2.5 animate-fade-in-up">
        <Image
          src="/dastrup-icon-color.png"
          alt="Dastrup Deep Cleaning"
          width={90}
          height={125}
          priority
          className="w-16 sm:w-20 h-auto"
        />
        <div className="flex flex-col border-l-[3px] border-[#80B687] pl-2.5 pb-1.5 leading-none">
          <span className="text-white text-sm sm:text-base font-bold tracking-[0.08em]">DASTRUP</span>
          <span className="text-white text-sm sm:text-base font-bold tracking-[0.08em]">DEEP</span>
          <span className="text-white text-sm sm:text-base font-bold tracking-[0.08em]">CLEANING</span>
        </div>
      </div>

      {/* Tagline, bottom-left of the page */}
      <p className="absolute left-6 sm:left-10 bottom-6 sm:bottom-8 italic text-lg sm:text-xl text-white/60 font-medium">
        We make clean happen
      </p>

      <div className="relative flex flex-col items-center animate-fade-in-up [animation-delay:120ms]">
        <div className="relative w-full max-w-sm">
          {/* Colorful glow directly behind the card, in the site's palette */}
          <div className="absolute inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#0EA5E9] via-[#38BDF8] to-[#80B687] opacity-30 blur-2xl" />

          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] pt-16 pb-9 px-8 shadow-2xl">
            {/* Logo badge, overlapping the top edge like an avatar */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg flex items-center justify-center p-4">
              <Image
                src="/dastrup-icon-color.png"
                alt="Dastrup Deep Cleaning"
                width={90}
                height={125}
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
              />
            </div>

            <h1
              className={`${inter.className} text-2xl font-extrabold tracking-tight text-center mb-7 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent`}
            >
              Portal
            </h1>

            {error && (
              <div className="mb-5 text-sm text-red-200 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                Incorrect email or password.
              </div>
            )}

            <form action={loginAction} className="space-y-7">
              <input type="hidden" name="next" value={next || "/dashboard"} />

              <div className="relative flex items-center gap-2.5 border-b border-white/25 focus-within:border-[#38BDF8] pb-2 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 shrink-0">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
                />
              </div>

              <div className="relative flex items-center gap-2.5 border-b border-white/25 focus-within:border-[#38BDF8] pb-2 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 shrink-0">
                  <rect x="4.5" y="10.5" width="15" height="9" rx="1.5" />
                  <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
                </svg>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] hover:shadow-[0_0_30px_-4px_rgba(56,189,248,0.65)] text-white text-sm font-semibold tracking-wide py-3 transition-shadow"
              >
                LOG IN
              </button>
            </form>
          </div>
        </div>

        <p className="mt-10 text-xs text-white/30">Dastrup Deep Cleaning · Utah&apos;s Trusted Cleaning Experts</p>
      </div>
    </div>
  );
}

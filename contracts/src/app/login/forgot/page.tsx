import Image from "next/image";
import { requestPasswordResetAction } from "./actions";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#060C18] px-4 py-12">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-[#0EA5E9]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-[#38BDF8]/10 blur-[120px]" />

      <div className="relative flex flex-col items-center animate-fade-in-up">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#0EA5E9] via-[#38BDF8] to-[#80B687] opacity-30 blur-2xl" />

          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] pt-20 pb-9 px-8 shadow-2xl">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg flex items-center justify-center p-4">
              <Image
                src="/dastrup-icon-color.png"
                alt="Dastrup Deep Cleaning"
                width={90}
                height={125}
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
              />
            </div>

            {sent ? (
              <div className="text-center">
                <p className="text-white text-sm leading-relaxed">
                  If an account exists for that email, we&apos;ve sent a link to reset your password. Check your inbox — the link expires in 1 hour.
                </p>
                <a
                  href="/login"
                  className="mt-6 inline-block text-xs text-white/50 hover:text-[#38BDF8] transition-colors"
                >
                  ← Back to login
                </a>
              </div>
            ) : (
              <>
                <p className="text-white/60 text-xs text-center mb-6">
                  Enter your email and we&apos;ll send you a link to reset your password.
                </p>

                <form action={requestPasswordResetAction} className="space-y-7">
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
                      autoComplete="email"
                      placeholder="Email"
                      className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] hover:shadow-[0_0_30px_-4px_rgba(56,189,248,0.65)] text-white text-sm font-semibold tracking-wide py-3 transition-shadow"
                  >
                    SEND RESET LINK
                  </button>
                </form>

                <a
                  href="/login"
                  className="mt-6 block text-center text-xs text-white/50 hover:text-[#38BDF8] transition-colors"
                >
                  ← Back to login
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

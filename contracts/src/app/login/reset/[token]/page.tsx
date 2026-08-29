import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { resetPasswordAction } from "./actions";

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { token } = await params;
  const { error } = await searchParams;

  const user = await prisma.user.findUnique({ where: { resetToken: token } });
  const valid = !!user && !!user.resetTokenExpires && user.resetTokenExpires > new Date();

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

            {!valid ? (
              <div className="text-center">
                <p className="text-white text-sm leading-relaxed">
                  This reset link is invalid or has expired.
                </p>
                <a
                  href="/login/forgot"
                  className="mt-6 inline-block text-xs text-white/50 hover:text-[#38BDF8] transition-colors"
                >
                  Request a new link
                </a>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-5 text-sm text-red-200 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    {error === "short"
                      ? "Password must be at least 8 characters."
                      : "Passwords don't match."}
                  </div>
                )}

                <form action={resetPasswordAction} className="space-y-7">
                  <input type="hidden" name="token" value={token} />

                  <div className="relative flex items-center gap-2.5 border-b border-white/25 focus-within:border-[#38BDF8] pb-2 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 shrink-0">
                      <rect x="4.5" y="10.5" width="15" height="9" rx="1.5" />
                      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
                    </svg>
                    <label htmlFor="password" className="sr-only">New password</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="New password"
                      className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
                    />
                  </div>

                  <div className="relative flex items-center gap-2.5 border-b border-white/25 focus-within:border-[#38BDF8] pb-2 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 shrink-0">
                      <rect x="4.5" y="10.5" width="15" height="9" rx="1.5" />
                      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
                    </svg>
                    <label htmlFor="confirm" className="sr-only">Confirm new password</label>
                    <input
                      id="confirm"
                      type="password"
                      name="confirm"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="Confirm password"
                      className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] hover:shadow-[0_0_30px_-4px_rgba(56,189,248,0.65)] text-white text-sm font-semibold tracking-wide py-3 transition-shadow"
                  >
                    SET NEW PASSWORD
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

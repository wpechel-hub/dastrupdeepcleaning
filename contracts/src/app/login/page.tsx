import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef1f5] px-4">
      <div className="w-full max-w-sm bg-white border border-[#e2e6ec] rounded-xl p-8 shadow-sm">
        <h1 className="text-lg font-semibold text-[#1B4B7A] mb-1">Dastrup Deep Cleaning</h1>
        <p className="text-sm text-[#5a6472] mb-6">Staff login — Contracts Portal</p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            Incorrect email or password.
          </div>
        )}

        <form action={loginAction} className="space-y-4">
          <input type="hidden" name="next" value={next || "/dashboard"} />
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-[#e2e6ec] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E6BA6]/30 focus:border-[#2E6BA6]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border border-[#e2e6ec] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E6BA6]/30 focus:border-[#2E6BA6]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1B4B7A] hover:bg-[#2E6BA6] text-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

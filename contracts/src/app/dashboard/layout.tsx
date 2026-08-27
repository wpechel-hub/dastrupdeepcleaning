import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "./actions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-[#eef1f5]">
      <header className="bg-[#1B4B7A] text-white">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="font-semibold text-sm">
            Dastrup Deep Cleaning — Contracts
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="opacity-75">{session?.name}</span>
            <form action={logoutAction}>
              <button className="opacity-80 hover:opacity-100 underline underline-offset-2" type="submit">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

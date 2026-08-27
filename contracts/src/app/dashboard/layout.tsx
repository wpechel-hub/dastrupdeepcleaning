import { getSession } from "@/lib/auth";
import Sidebar from "./Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen" style={{ background: "#F7F9FB" }}>
      <Sidebar userName={session?.name || "Staff"} />
      <main className="sm:ml-64 max-w-4xl px-4 sm:px-8 py-6 sm:py-8">{children}</main>
    </div>
  );
}

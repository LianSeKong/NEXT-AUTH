import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "../(auth)/logout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sesssion = await auth();

  if (!sesssion?.user?.id) {
    redirect("/login");
  }
  return (
    <main className="w-full h-full">
      <div className="h-[64px] w-full sticky top-0 left-0 shadow-sm backdrop-opacity-10 px-96 py-2 flex items-center gap-4 border-b border-b-slate-100">
        <Button variant="link">
          <Link href="/my-account">My Account</Link>
        </Button>
        <Button variant="link">
          <Link href="/change-password">Change Password</Link>
        </Button>
        <div className="absolute right-4">
          <LogoutButton />
        </div>
      </div>
      {children}
    </main>
  );
}

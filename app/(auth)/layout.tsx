import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sesssion = await auth();

  if (sesssion?.user?.id) {
    redirect("/my-account");
  }

  return (
    children
  );
}

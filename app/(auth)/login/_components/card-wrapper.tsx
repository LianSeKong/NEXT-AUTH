"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export const CardWrapper = ({
  children,
  headerLabel,
  headerDesc,
}: {
  children: React.ReactNode;
  headerLabel: string;
  headerDesc: string;
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="font-bold text-3xl">{headerLabel}</CardTitle>
        <CardDescription>{headerDesc}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col text-center">
        <div className="text-sm text-slate-500  w-full">New to Auth? <Link href={"/register"} className="text-indigo-500">Sign up for an account</Link></div>
        <div className="text-sm text-slate-500  w-full">Forget password? <Link href={"/rest-password"} className="text-indigo-500">Reset my password</Link></div>
      </CardFooter>
    </Card>
  );
};

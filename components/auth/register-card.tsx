"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import { RegisterForm } from "./register-form";

export const RegisterCard = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="font-bold text-3xl">注册</CardTitle>
        <CardDescription>新注册帐号</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground">
          已经有账户?{" "}
          <Link href="/login" className="underline decoration-solid">
            登陆
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

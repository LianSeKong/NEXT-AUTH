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
    </Card>
  );
};

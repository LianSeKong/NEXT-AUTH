"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordAction } from "./action";
import { SuccessInfo } from "./_components/success-info";
import { emailSchema } from "@/schemas/auth";

export default function Page() {

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    console.log("values: ", values);
    const data = await resetPasswordAction(values);
    if (data.error) {
      form.setError("email", {
        message: data.message,
      });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      {form.formState.isSubmitSuccessful ? (
        <SuccessInfo></SuccessInfo>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Reset</CardTitle>
            <CardDescription>
              Enter your email address to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email"></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting === true}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <div className="text-muted-foreground text-sm">
              Already has a account?{" "}
              <Link
                href={"/login"}
                className="text-base text-indigo-400 underline hover:text-indigo-800"
              >
                login
              </Link>
            </div>
            <div className="text-muted-foreground text-sm">
              New?{" "}
              <Link
                href={"/register"}
                className="text-base text-indigo-400 underline hover:text-indigo-800"
              >
                register
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}

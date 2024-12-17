"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { SubmitHandler, useFormContext } from "react-hook-form";
import { registerAction } from "@/app/(auth)/register/actions";
import { registerSchema } from "@/schemas/auth";
import toast from "react-hot-toast";
import { z } from "zod";

export const RegisterForm = () => {
  const context = useFormContext<z.infer<typeof registerSchema>>();
  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    values: z.infer<typeof registerSchema>
  ) => {
    try {
      const data = await registerAction(values);
      if (data.status) {
        toast.success("注册成功!");
      } else {
        context.setError("email", {
          message: data.message,
        });
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <Form {...context}>
      <form
        onSubmit={context.handleSubmit(onSubmit)}
        className={cn(
          "space-y-4",
          context.formState.isSubmitting ? "opacity-50" : ""
        )}
      >
        <FormField
          control={context.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={context.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={context.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>重复密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={context.formState.isSubmitting}
          type="submit"
        >
          {context.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>注册</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

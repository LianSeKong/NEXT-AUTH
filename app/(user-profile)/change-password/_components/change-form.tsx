"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { changePasswordSchema } from "@/schemas/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPasswordAction } from "../action";
import toast from "react-hot-toast";

export const ChangeForm = () => {
    const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    const data = await resetPasswordAction(values)
    if (data.error) {
        toast.error(data.message)
    } else {
        form.reset()
        toast.success('update success!')
    }
  };

  return (
    <CardWrapper headerDesc="Change your account password" headerLabel="Change password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control} 
            name="currentPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>currentPassword</FormLabel>
                  <FormControl>
                    <Input {...field} type="password"></Input>
                  </FormControl>
                  <FormMessage>{form.formState?.errors?.currentPassword?.message}</FormMessage> 
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>new password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password"></Input>
                  </FormControl>
                  <FormMessage>{form.formState?.errors?.password?.message}</FormMessage> 
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>passwordConfirm</FormLabel>
                  <FormControl>
                    <Input {...field} type="password"></Input>
                  </FormControl>
                  <FormMessage>{form.formState?.errors?.passwordConfirm?.message}</FormMessage> 
                </FormItem>
              );
            }}
          ></FormField>
          <Button type="submit" className="w-full">submit</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

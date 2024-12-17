"use client";
import { CardWrapper } from "./card-wrapper";
import { loginSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { loginAction } from "../action";
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter()

  
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {


    loginAction(values).then(res => {

        if (res.error) {
            form.setError('root', {
                message: res.message
            })
        } else {
          console.log(res);
          router.push('/my-account')
          
        }
    })
  };
  return (
    <CardWrapper headerDesc="Login in existed email" headerLabel="Login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
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
            <FormField
              name="password"

              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting === true}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

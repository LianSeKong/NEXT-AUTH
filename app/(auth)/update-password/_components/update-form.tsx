"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordMatchSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordAction } from "../action";
import toast from "react-hot-toast";
import { SuccessInfo } from "./success-info";


export const UpdateForm = ({
    token
}:{
    token: string;
}) => {
    const form = useForm<z.infer<typeof passwordMatchSchema>>({
        resolver: zodResolver(passwordMatchSchema),
        defaultValues: {
          password: '',
            passwordConfirm: ''
        },
      });

    const onSubmit = async (values: z.infer<typeof passwordMatchSchema>) =>{
        try {
            const data = await resetPasswordAction({...values, token})
            if (data.error) {
                toast.error(data.message)
            } else {
                toast.success(data.message)
                form.reset()
            }
        } catch (error) {
            toast.error("Unexpect Error!")
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen">
          {form.formState.isSubmitSuccessful ?
            <SuccessInfo />
            : (  <Card className="w-[350px]">
                <CardHeader >
                    <CardTitle>Update</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField name="password" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field}></Input>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                </FormItem>
                            )}>
                            </FormField>
                            <FormField name="passwordConfirm" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>passwordConfirm</FormLabel>
                                    <FormControl>
                                        <Input {...field}></Input>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.passwordConfirm?.message}</FormMessage>
                                </FormItem>
                            )}>
                            </FormField>
                            <Button className="w-full">Reset</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center">
                    <div className="text-muted-foreground text-sm">Already has a account? <Link href={"/login"} className="text-base text-indigo-400 underline hover:text-indigo-800">login</Link></div>
                    <div className="text-muted-foreground text-sm">New? <Link href={"/register"} className="text-base text-indigo-400 underline hover:text-indigo-800">register</Link></div>
                </CardFooter>
            </Card>)
            
            }

        </main>
    )
}
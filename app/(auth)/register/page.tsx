"use client";
import { registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm, useFormContext, FormProvider, FormSubmitHandler, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { registerAction } from "./actions";
import { RegisterCard } from "@/components/auth/register-card";
import { RegisterSuccess } from "@/components/auth/register-success";
import { createContext } from "react";

export default function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
        <FormProvider {...form}>
            {
                form.formState.isSubmitSuccessful 
                ? <RegisterSuccess></RegisterSuccess>
                : <RegisterCard></RegisterCard>
            }
        </FormProvider>
    </main>
  );
}

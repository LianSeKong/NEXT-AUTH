import { z } from "zod";

export const pwdSchema = z.string().min(8, {
    message: "Must be 8 or more characters long"
})

export const emailSchema = z.string().email({
    message: "Invalid email address"
})

export const loginSchema = z.object({
  password: pwdSchema,
  email: emailSchema
})

export const passwordMatchSchema = z.object({
  password: pwdSchema,
  passwordConfirm: z.string()
}).superRefine((data, ctx) => {
  if (data.password !== data.passwordConfirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passwordConfirm"],
      message: "Two passwords do not match!"
    })
  }
})

export const changePasswordSchema = z.object({
  currentPassword: pwdSchema
}).and(passwordMatchSchema)


export const registerSchema = z.object({
  email: emailSchema
}).and(passwordMatchSchema)

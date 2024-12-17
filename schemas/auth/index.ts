import { z } from "zod";
export const passwordScheme = z.string().min(8, {
  message: "最少八个字符！",
})
export const emailSchema = z.object({
  email: z.string().email({
      message: "Invalid email format",
  })
})
export const loginSchema = z.object({
  password: passwordScheme,
  email: z.string().email({
    message: "不正确的邮箱格式！",
  })
})

export const passwordMatchSchema = z.object({
  password: passwordScheme,
  passwordConfirm: z.string()
}).superRefine((data, ctx) => {
  if (data.password !== data.passwordConfirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passwordConfirm"],
      message: "两次密码不一致~！"
    })
  }
})
export const changePasswordSchema = z.object({
  currentPassword: passwordScheme
}).and(passwordMatchSchema)
export const registerSchema = z.object({
  email: z.string().email({
    message: "不正确的邮箱格式！",
  })
}).and(passwordMatchSchema)
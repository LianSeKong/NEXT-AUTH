"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema/user";
import { registerSchema } from "@/schemas/auth";
import { NeonDbError } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const registerAction = async ({
  email,
  password,
  passwordConfirm,
}: z.infer<typeof registerSchema>) => {
  const validResult = registerSchema.safeParse({
    email,
    password,
    passwordConfirm,
  });
  if (validResult.success) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPW = await bcrypt.hash(password, salt);
      await db.insert(users).values({
        email,
        password: hashedPW,
      });
      return {
        status: true,
        message: "succeed",
      };
    } catch (error) {
      if (error instanceof NeonDbError) {
        if (error.code === "23505") {
          return {
            status: false,
            message: error.detail || "Unknow Error!",
          };
        }
      }
      return {
        status: false,
        message: "Unknow Error!",
      };
    }
  } else {
    return {
        status: false,
        message: validResult.error.message,
      };
  }
};

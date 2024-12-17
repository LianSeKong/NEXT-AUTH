import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "./db/schema/user";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (!user) {
          throw new Error("Invalid credentials.");
        }
        if (
          await bcrypt.compare(
            credentials.password as string,
            user.password || ""
          )
        ) {
          return {
            email: user.email,
            id: user.id.toString(),
          };
        } else {
          throw new Error("Invalid credentials.");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {

        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
       
        
      session.user.id = token.sub as string;
      return session;
    },
  },
});

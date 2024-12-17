"use server"
import { Resend } from 'resend';
import { db } from "@/db/drizzle";
import { passwordResetTokens, users } from "@/db/schema";
import { emailSchema } from "@/schemas/auth"
import { eq } from "drizzle-orm";


export const resetPasswordAction = async ({
    email
}: {
    email: string;
}) => {

    // 1. 验证
    const valid = emailSchema.safeParse({
        email
    })

    if (!valid.success) {
        return {
            error: true,
            message: 'Invalid email!'
        }
    }
    try {
        const [ user ] = await db.select({
            id: users.id
        }).from(users).where(eq(users.email, email))

        
    
        if (user?.id) {
            const hashToken = crypto.randomUUID()
            await db.insert(passwordResetTokens).values({
                userId: user.id,
                token: hashToken,
                tokenExpiry: new Date(Date.now() + 1000 * 60 * 60),
            }).onConflictDoUpdate({ target: passwordResetTokens.userId, set: {token: hashToken, tokenExpiry: new Date(Date.now() + 1000 * 60 * 60) } });
            const resend = new Resend('re_aMtX2auh_MofWcADT16ysm6CTXPCLT95n');
            resend.emails.send({
                from: 'onboarding@resend.dev',
                to: '599820462@qq.com',
                subject: 'RESET',
                html: `<p>reset your password, this link <a href="http://localhost:3000/update-password?token=${hashToken}">to update password</a>!</p>`
            });
        }
        return {
            error: false,
            message: 'plase check your emial'
        }
        
    } catch (error) {
        return {
            error: true,
            message: 'Unknow Error!'
        }    
    }



}
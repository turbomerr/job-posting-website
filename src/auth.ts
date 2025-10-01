import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter : PrismaAdapter(prisma),
    providers: [GitHub],
    session  : {
        strategy : "jwt" //stateless
    },
    callbacks : {
        async jwt({token, user}){ // user var ise token olusturur ve token i doner 
            if(user){
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({token, session}){ // token var ise, user in 
            if(session.user){
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    }
})
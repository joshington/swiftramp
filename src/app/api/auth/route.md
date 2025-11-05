
import NextAuth from 'next-auth';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';




const prisma = new PrismaClient();


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {email: credentials?.email},
                });
                if (user && bcrypt.compareSync(credentials?.password || '', user.password)) {
                    return { id:user.id, email:user.email };
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, user}:  {token:any; user:any}) {
            if(user) {
                token.id  = user.id;
            }
            return token;
        },
        async session({session, token}: {session:any; token:any}) {
            session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
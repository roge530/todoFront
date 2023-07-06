import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import Login from "@/lib/users/read";
import { LoginForm } from "@/interfaces/users";
const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (credentials) {
                    const formatedCredentials: LoginForm = {
                        email: credentials?.email,
                        password: credentials?.password
                    } 
                    const res = await Login(formatedCredentials)
                    const user = { id: res.id as string, name: res.name as string, token: res.token as string}
                    if (res.success) {
                        return user;
                    }
                    return null
                }
                else return null
            }
        })
    ],
    session: {
        maxAge: 5
    },
    jwt: {
        maxAge: 5
    },
    callbacks: {
        async jwt({ token, user}) {
            return { ...token, ...user};
        },

        async session({ session, token}) {
            session.user = token as any;
            return session;
        }
    }
});

export {handler as GET, handler as POST}
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
                    console.log(user)
                    if (res.success) {
                        return user
                    }
                    return null
                }
                else return null
            }
        })
    ]
});

export {handler as GET, handler as POST}
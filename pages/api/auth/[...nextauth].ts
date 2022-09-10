import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../src/backend/users";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const apiResponse = await loginUser(email, password);

                if (apiResponse.code === 401) {
                    throw new Error("invalid credentials");
                }
                return {
                    id: apiResponse?.user?.id,
                    name: apiResponse?.user?.name,
                    email: apiResponse?.user?.email,
                    avatar: apiResponse?.user?.avatar,
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        // error: '/auth/error',
        // signOut: '/auth/signout'
    },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.avatar = user.avatar;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id;
                session.name = token.name;
                session.email = token.email;
                session.avatar = token.avatar;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);

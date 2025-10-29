import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/modules/auth/action";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db), // must come before callbacks
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  ...authConfig,

  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account) return false;

      // find or create user
      const existingUser = await db.user.findUnique({
        where: { email: user.email ?? "" },
        include: { accounts: true },
      });

      if (!existingUser) {
        // create user and link account
        await db.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token ?? null,
                access_token: account.access_token ?? null,
                expires_at: account.expires_at ?? null,
                token_type: account.token_type ?? null,
                scope: account.scope ?? null,
                id_token: account.id_token ?? null,
                session_state:
                  account.session_state !== undefined
                    ? String(account.session_state)
                    : null,
              },
            },
          },
        });
      } else {
        // link account if not already linked
        const linked = existingUser.accounts.some(
          (acc) =>
            acc.provider === account.provider &&
            acc.providerAccountId === account.providerAccountId
        );

        if (!linked) {
          await db.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token ?? null,
              access_token: account.access_token ?? null,
              expires_at: account.expires_at ?? null,
              token_type: account.token_type ?? null,
              scope: account.scope ?? null,
              id_token: account.id_token ?? null,
              session_state:
                account.session_state !== undefined
                  ? String(account.session_state)
                  : null,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      // ensure `role` exists in DB schema
      token.role = (existingUser as any).role;

      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});

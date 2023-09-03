import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/User";
import { connectToDatabase } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      if (sessionUser) session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, user, credentials, profile }) {
      try {
        await connectToDatabase();

        const user = await User.findOne({ email: profile.email });

        if (!user)
          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(" ", "").toLowerCase(),
            image: profile.picture,
          });

        return true;
      } catch (error) {
        console.log("error check if user exists");
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

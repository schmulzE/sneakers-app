import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from '../../../database/connect';
import Users from '../../../model/schema';
import { compare } from "bcryptjs";



export default NextAuth({

 providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string,
          password: string
        }
        connectMongo().catch(error => { error: "Connection Failed..!"; });

        //check user existence
        const result = await Users.findOne({ email: email });
        console.log(result)
        if (!result) {
          throw new Error("No user Found with Email Please Sign Up..!");
        }

        //compare()
        const checkPassword = await compare(password, result.password);
        
        //incorrect password
        if (!checkPassword || result.email !== email) {
          throw new Error("Email or Password doesn't match");
        }

        return result;
        
      },
    })
  ],
  secret: "h8Cechj70o4wiQ/O5SfbywvwUBgNDEGOiwmCnCfre7A=",
  session: {
    strategy: 'jwt'
  }
})


import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import squel from 'squel';
import bcrypt from 'bcrypt';
import { query } from '../../../lib/db'
import UserService from '../../../services/users'

export default NextAuth({
    callbacks: {
        /**
         * @param  {object} session      Session object
         * @param  {object} token        User object    (if using database sessions)
         *                               JSON Web Token (if not using database sessions)
         * @return {object}              Session that will be returned to the client 
         */
        async session(session, token) {
            // Add property to session, like an access_token from a provider.
            console.log('session', session, token);
            const results = await query(
                squel.select()
                    .from("users")
                    .field("id")
                    .field("users.role")
                    .where(`email = ?`, session.user.email)
                    .limit(1)
                    .toString()
            )
            const { id, role } = results[0];
            session.id = id;
            session.role = role;
            return session
        }
    },
    providers: [
        Providers.Credentials({
            id: 'with-email',
            name: 'Email',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "budi.annisa@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // const results = await query(
                //     squel.select()
                //         .from("users")
                //         .field("id")
                //         .field("users.name")
                //         .field("users.username")
                //         .field("users.email")
                //         .field("users.password")
                //         .field("users.role")
                //         .where(`email = ?`, credentials.email)
                //         .limit(1)
                //         .toString()
                // )

                const userService = UserService();
                const user = await userService.getOneByEmail(credentials.email);

                console.log('user find one by email', user)

                if (!user) return null;

                console.log(1);

                const match = await bcrypt
                    .compare(credentials.password, user.password);

                console.log(2, match);

                if (match) return user;

                return null;
            }
        })
    ],

})
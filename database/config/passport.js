import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../../api/models/authmodels/auth.model.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const emailaddress = profile.emails?.[0]?.value?.toLowerCase();

                if (!emailaddress) {
                    return done(new Error('No email found in profile'), null);
                }

                let user = await User.findOne({ emailaddress });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        emailaddress,
                        provider: 'google',
                        isEmailVerified: true,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// FACEBOOK STRATEGY
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'emails', 'name', 'displayName'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const emailaddress = profile.emails?.[0]?.value?.toLowerCase();

                if (!emailaddress) {
                    return done(new Error('No email found in profile'), null);
                }

                let user = await User.findOne({ emailaddress });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        emailaddress,
                        provider: 'facebook',
                        isEmailVerified: true,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;



// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import User from '../../api/models/authmodels/auth.model.js';

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/api/auth/google/callback',
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         const emailaddress = profile.emails && profile.emails[0] ? profile.emails[0].value.toLowerCase() : null;
//         if (!emailaddress) {
//             return done(new Error('No email found in profile'), null);
//         }

//         let user = await User.findOne({ emailaddress });

//         if (!user) {
//             user = await User.create({
//                 name: profile.displayName,
//                 emailaddress,
//                 provider: 'google',
//                 isEmailVerified: true,
//             });
//         }

//         return done(null, user);
//     } catch (err) {
//         return done(err, null);
//     }
// }));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
//     profileFields: ['id', 'emails', 'name', 'displayName']
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         const emailaddress = profile.emails && profile.emails[0] ? profile.emails[0].value.toLowerCase() : null;
//         if (!emailaddress) {
//             return done(new Error('No email found in profile'), null);
//         }

//         let user = await User.findOne({ emailaddress });

//         if (!user) {
//             user = await User.create({
//                 name: profile.displayName,
//                 emailaddress,
//                 provider: 'facebook',
//                 isEmailVerified: true,
//             });
//         }

//         return done(null, user);
//     } catch (err) {
//         return done(err, null);
//     }
// }));

// export default passport;

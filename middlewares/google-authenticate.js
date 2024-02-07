const {Strategy} = require('passport-google-oauth2');
const passport = require("passport");
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const {User} = require('../models/user');

const googleParams = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/users/google/callback",
    passReqToCallback: true,
};

const googleCallback = async(req, accessToken, refreshToken, profile, done,) => {
    try {
        const {email, displayName } = profile;
        console.log(email, displayName)
        const user = await User.findOne({email})
        console.log("user", user)
        if(user) {
          return done(null, user)
        }
        const password = await bcrypt.hash(nanoid(), 10)
        const newUser = await User.create({email, password, name: displayName})
        console.log("newUser",newUser)

        done(null, newUser);

    } catch (error) {
        done(error, false);
        console.log(error)
    }
}

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy)

module.exports = passport;
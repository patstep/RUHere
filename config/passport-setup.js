const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/users');

passport.use(
    new GoogleStrategy({
        //options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport call back function
        // console.log('it works');
        // console.log(profile);
        // check if user exists in DB
        User.findOne({
            where: {
                googleID: profile.id

            }
        }).then((currentUser) => {
            if (currentUser) {
                // already have the user
                console.log(`User is: ${currentUser}`);

            } else {
                // create new user
                User.create({
                    username: profile.displayName,
                    gender: profile.gender,
                    googleID: profile.id
                    // console.log('new user created');
                })
            }
        });

    })
)
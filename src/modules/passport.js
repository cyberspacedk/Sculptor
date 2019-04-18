const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").JwtStrategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").LocalStrategy;

const User = require("../models/userModel");

module.exports = function(passport) {
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:9000/api/auth/github/callback"
      },

      function(accessToken, refreshToken, profile, done) {
        console.log(profile);

        User.findOne({ githubId: profile.id }, function(err, user) {
          if (!user) {
            const newUser = new User({
              githubId: profile.id,
              avatar: profile._json.avatar_url,
              name: profile._json.name
            });

            newUser.save((err, user) => done(err, user));
          }

          return done(err, user);
        });
      }
    )
  );
};

import passport from "passport";
import local from "./local.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async(id, done));
};

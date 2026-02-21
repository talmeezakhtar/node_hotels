const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new LocalStrategy(async (usernameInput, password, done) => {
        try{
            const user = await Person.findOne({ username: usernameInput });
            if(!user){
                return done(null, false, { message: "User not found" });
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        }catch(error){
            return done(error);
    }
}
));

module.exports = passport;
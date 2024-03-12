import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

// Database query
import {pool} from '../config/index.js'

passport.use(new JwtStrategy({
    secretOrKey: process.env.KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async ({email}, done) => {
    try {
        const user = await pool.query('SELECT email FROM users WHERE email = $1', [email])

        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }

    } catch (error) {
        console.log(error)
        return done(error, null, {message: 'Internal server error'})
    }
}))
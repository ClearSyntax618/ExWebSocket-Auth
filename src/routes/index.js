import { Router } from "express";

import {
    signup,
    login
} from '../controllers/index.js'
import passport from "passport";


const router = Router()

router.post('/sign-up', signup)

router.post('/log-in', login)

router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send("Hola Mundo!")
})

export {
    router
}
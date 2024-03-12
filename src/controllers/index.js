import { pool } from '../config/index.js'

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup = async (req, res) => {
    const { email, password } = req.body
    
    if(!email || !password) {
        return res.status(400).json({
            message: 'Data was not provided'
        })
    }

    try {
        const salt = bcryptjs.genSaltSync(10)
        const hashedPassword = bcryptjs.hashSync(password, salt)

        const token = jwt.sign({email}, process.env.KEY, {expiresIn: 60*60})

        const user = await pool.query('SELECT email FROM users WHERE email = $1', [email])

        if(user.rows[0]) {
            return res.status(400).json({
                message: 'User already exists.'
            })
        }
        
        await pool.query('INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3)', [email, hashedPassword, new Date()])

        return res.status(200).json({
            token: `bearer ${token}`,
            message: 'User was created successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error.'
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const { rows } = await pool.query('SELECT password FROM users WHERE email = $1', [email])
        const {password: hashedPassword} = rows[0]

        const confirmedPassword = await bcryptjs.compare(password, hashedPassword)

        if(!confirmedPassword) {
            return res.status(401).json({
                message: 'Password or email is not correct'
            })
        }

        const token = jwt.sign({email}, process.env.KEY, {expiresIn: 60*60})

        return res.status(200).json({
            token: `bearer ${token}`
        })    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
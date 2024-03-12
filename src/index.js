import { createServer } from 'node:http'
import express from 'express'
import morgan from 'morgan';

// Passport.js
import passport from 'passport';
import './middleware/passport.js'

// Router
import { router } from './routes/index.js'

// Socket.io
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:4000'
    }
})

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(passport.initialize())
app.use(router)

io.on('connection', (socket) => {
    console.log(socket)
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor funcionando...")
})

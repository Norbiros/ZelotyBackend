import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import * as http from 'http'
import Discord from './discord/discord'

import { ErrorResponse } from './models/responses/error-response'
import * as process from 'process'

import authRouter from './routes/auth'
import versionCheckerRouter from './routes/version_checker'

dotenv.config()

new Discord(process.env.DISCORD_TOKEN)

const app = express()
const PORT = process.env.PORT == null ? 3001 : process.env.PORT
const server = http.createServer(app)
const corsOptions = {
    origin: process.env.WEBSITE_URL,
    credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use('/version', versionCheckerRouter)

app.get('/*', function (req, res) {
    new ErrorResponse({
        errorCode: 404,
        error: 'NOT_FOUND',
        errorMessage: 'Nie znaleziono takiej strony!',
    }).sendResponse(res)
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
})

export { app }

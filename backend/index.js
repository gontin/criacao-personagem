import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import registerRoute from './routes/register.js'
import loginRoute from './routes/login.js'
import personagensRoute from './routes/personagens.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/register', registerRoute)
app.use('/api/login', loginRoute)
app.use('/api/personagens', personagensRoute)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})
import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/', async (req, res) => {
    const { usuario, senha } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { usuario } })

        if (!user) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos'})
        }

        const senhaCorreta = await bcrypt.compare(senha, user.senha)

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos'})
        }
        const token = jwt.sign({userId: user.id, nome: user.usuario }, process.env.JWT_SECRET, {expiresIn: '2h'})
        return res.status(200).json({ message: 'Login realizado com sucesso :D', 
            userId: user.id,
            token
        })
    } catch (erro) {
        console.error(erro)
        return res.status(500).json({ error: 'Erro ao tentar fazer login' })
    }
})

export default router
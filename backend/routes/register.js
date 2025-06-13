import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const router = express.Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
const { usuario, senha } = req.body

if (!usuario || !senha) {
  return res.status(400).json({ error: 'Os dois campos são Obrigatórios' })
}

try {const existe = await prisma.user.findUnique({ where: { usuario } })
  if (existe) {
    return res.status(409).json({ error: 'Usuário já existe' })
  }



  const senhaHash = await bcrypt.hash(senha, 10)
  const novoUsuario = await prisma.user.create({
    data: {
      usuario, 
      senha: senhaHash
    }
  })

  res.status(201).json({
    message: 'Usuário registrado com sucesso',
    id: novoUsuario.id
  })
} catch (error) {
  console.error(error)
  res.status(500).json({ error: 'Erro do servidor' })
}
})

export default router
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { autenticarToken } from '../middleware/autenticarToken.js'
import {v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

const prisma = new PrismaClient()
const router = express.Router()

// configs do cloudnary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'personagens',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
})

const upload = multer({ storage })

// catar os personagens do user
router.get('/', autenticarToken, async (req, res) => {
    try {
        const personagens = await prisma.personagem.findMany({
            where: { userId: req.user.userId }
        })
        res.json(personagens)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao achar personagens'})
    }
})

// criar personagem

router.post('/teste', async (req, res) => {
  console.log('POST /teste recebido');
  res.json({ mensagem: 'ok' });
});

router.post('/', autenticarToken, upload.single('imagem'), async (req, res) => {
    const {
        nome,
        genero,
        raca,
        classe,
        corPele,
        corCabelo,
        cabelo,
        corOlhos,
        forca,
        destreza,
        inteligencia,
        fortitude,
        carisma,
        historia
        } = req.body
        const imagemUrl = req.file ? req.file.path : null

    try {
        const novoPersonagem = await prisma.personagem.create ({
            data: {
                nome,
                genero,
                raca,
                classe,
                corPele,
                corCabelo,
                cabelo,
                corOlhos,
                forca: Number(forca),
                destreza: Number(destreza),
                inteligencia: Number(inteligencia),
                fortitude: Number(fortitude),
                carisma: Number(carisma),
                historia,
                imagemUrl,
                userId: req.user.userId,

            }
        })
        res.status(201).json(novoPersonagem)
    } catch (err) {
        console.error('Erro ao criar novo personagem:', err);
        res.status(500).json({ error: 'Erro ao criar novo personagem', detalhes: err.message });
    }
})

// atualizar personagem
router.put('/:id', autenticarToken, upload.single('imagem'), async (req, res) => {
    const {
        nome,
        genero,
        raca,
        classe,
        corPele,
        corCabelo,
        cabelo,
        corOlhos,
        forca,
        destreza,
        inteligencia,
        fortitude,
        carisma,
        historia
    } = req.body
    const imagemUrl = req.file ? req.file.path : req.body.imagemUrl || null

    const { id } = req.params
    
    const personagem = await prisma.personagem.findUnique({
        where: { id: Number(id) }
    })

    if (!personagem || personagem.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Você não foi possivel identificar o personagem' })
    }
    try {
        const personagemAtualizado = await prisma.personagem.update({
            where: { id: Number(id) },
            data: {
                nome,
                genero,
                raca,
                classe,
                corPele,
                corCabelo,
                cabelo,
                corOlhos,
                forca: Number(forca),
                destreza: Number(destreza),
                inteligencia: Number(inteligencia),
                fortitude: Number(fortitude),
                carisma: Number(carisma),
                historia,
                imagemUrl
            }
        })
        res.json(personagemAtualizado)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar o personagem'})
    }
})

// deletar personagem
router.delete('/:id', autenticarToken, async (req, res) => {
    const { id } = req.params
    const personagem = await prisma.personagem.findUnique({
        where: { id: Number(id) }
    })

    if (!personagem || personagem.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Você não tem permissão para deletar esse personagem' })
    }
    try {
        await prisma.personagem.delete({
            where: { id: Number(id)}
        })
        res.json({ message: 'Personagem apagado'})
    } catch (err) {
        res.status(500).json({ error: 'Erro ao apagar personagem'})
    }
})

export default router
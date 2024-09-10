import { PrismaClient } from "@prisma/client"
import { Router } from "express"

// const prisma = new PrismaClient()
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

const router = Router()

// Listar todas as marcas
router.get("/", async (req, res) => {
  try {
    const marcas = await prisma.marca.findMany()
    res.status(200).json(marcas)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Adicionar uma nova marca
router.post("/", async (req, res) => {
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({ "erro": "Informe nome da marca" })
    return
  }

  try {
    const marca = await prisma.marca.create({
      data: { nome }
    })
    res.status(201).json(marca)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Deletar uma marca
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const marca = await prisma.marca.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(marca)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Atualizar uma marca
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({ "erro": "Informe nome da marca" })
    return
  }

  try {
    const marca = await prisma.marca.update({
      where: { id: Number(id) },
      data: { nome }
    })
    res.status(200).json(marca)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router

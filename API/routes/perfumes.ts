import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

// Listar todos os perfumes
router.get("/", async (req, res) => {
  try {
    const perfumes = await prisma.perfume.findMany({
      include: {
        marca: true,
      }
    })
    res.status(200).json(perfumes)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Adicionar um novo perfume
router.post("/", async (req, res) => {
  const { nome, ano, preco, foto, descricao, marcaId } = req.body

  if (!nome || !ano || !preco || !foto || !descricao || !marcaId) {
    res.status(400).json({ "erro": "Informe nome, ano, preco, foto, descricao e marcaId" })
    return
  }

  try {
    const perfume = await prisma.perfume.create({
      data: { nome, ano, preco, foto, descricao, marcaId }
    })
    res.status(201).json(perfume)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Deletar um perfume
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const perfume = await prisma.perfume.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(perfume)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Atualizar um perfume
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, ano, preco, foto, descricao, marcaId } = req.body

  if (!nome || !ano || !preco || !foto || !descricao || !marcaId) {
    res.status(400).json({ "erro": "Informe nome, ano, preco, foto, descricao e marcaId" })
    return
  }

  try {
    const perfume = await prisma.perfume.update({
      where: { id: Number(id) },
      data: { nome, ano, preco, foto, descricao, marcaId }
    })
    res.status(200).json(perfume)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Pesquisa de perfumes
router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params

  // tenta converter o termo em número
  const termoNumero = Number(termo)

  // se não é número (Not a Number)
  if (isNaN(termoNumero)) {
    try {
      const perfumes = await prisma.perfume.findMany({
        include: {
          marca: true,
        },
        where: {
          OR: [
            {
              nome: { contains: termo }
            },
            {
              marca: { nome: termo }
            }
          ]
        }
      })
      res.status(200).json(perfumes)
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    try {
      const perfumes = await prisma.perfume.findMany({
        include: {
          marca: true,
        },
        where: {
          OR: [
            {
              preco: { lte: termoNumero }
            },
            {
              ano: termoNumero
            }
          ]
        }
      })
      res.status(200).json(perfumes)
    } catch (error) {
      res.status(400).json(error)
    }
  }
})

// Obter detalhes de um perfume
router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const perfume = await prisma.perfume.findUnique({
      where: { id: Number(id) },
      include: {
        marca: true,
      }
    })
    res.status(200).json(perfume)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router

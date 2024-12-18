import express from "express"
import Category from "../models/category.js"
import { validateRole, validateToken } from "../middlewares/auth.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: "Error al obtener las categorias: " + error.message })
  }
})

router.get("/:id/productos", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products")
    if (!category) {
      return res.status(404).json({ error: "Categoria no encontrada" })
    }
    res.json(category.products)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: "Error al obtener los productos de la categoria: " + error
    })
  }
})

router.post("/", async (req, res) => {
  const { name, description, parent } = req.body

  try {
    const category = new Category({
      name,
      description,
      parent: parent === "" ? null : parent
    })
    await category.save()
    res.json(category)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al crear la categoria: " + error })
  }
})

router.put("/:id", async (req, res) => {
  const { name, description, parent } = req.body

  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ error: "Categoria no encontrada" })
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        parent: parent === "" ? null : parent,
        updatedAt: Date.now()
      },
      { new: true }
    )
    res.json(updatedCategory)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: "Error al actualizar la categoria: " + error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ error: "Categoria no encontrada" })
    }
    await Category.findByIdAndDelete(req.params.id)
    res.json({ message: "Categoria eliminada con éxito" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al eliminar la categoria: " + error })
  }
})

export default router

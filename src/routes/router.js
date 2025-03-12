import express from 'express';
import { accueil } from '../services/serviceTest.js'

const router = express.Router()

router.get('/accueil', accueil)
router.get('/fin', (req, res) => {
  res.send('Au revoir')
})

router.get('/users/:id', (req, res) => {
  res.send(`Ici utilisateur n° ${req.params.id}`)
})

export default router
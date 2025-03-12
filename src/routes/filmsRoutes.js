import express from 'express'
import { postFilm } from '../services/filmsServices.js'

const router = express.Router()

router.post('/films', postFilm)

export default router
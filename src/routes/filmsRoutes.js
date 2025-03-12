import express from 'express'
import { deleteFilm, getFilmById, getFilms, postFilm, putFilm } from '../services/filmsServices.js'

const router = express.Router()

router.post('/films', postFilm)
router.get('/films', getFilms)
router.get('/films/:id', getFilmById)
router.delete('/films/:id', deleteFilm)
router.put('/films/:id', putFilm)

export default router
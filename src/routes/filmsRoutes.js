import express from 'express'
import { deleteFilm, getFilmById, getFilms, postFilm, putFilm } from '../services/filmsServices.js'
import { errorHandler, requestTimer } from '../middleware/middlewareExo.js'


const router = express.Router()

router.post('/films', requestTimer, errorHandler(postFilm))
router.get('/films', getFilms)
router.get('/films/:id', getFilmById)
router.delete('/films/:id', deleteFilm)
router.put('/films/:id', putFilm)

export default router
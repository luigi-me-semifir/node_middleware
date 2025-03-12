import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/db/dbConnect.js'

import { requestTimer, date } from './src/middleware/middlewareExo.js'

import routerTest from './src/routes/router.js'
import routerTache from './src/routes/routerTaches.js'
import routerFilms from './src/routes/filmsRoutes.js'


dotenv.config()
connectDB()
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(requestTimer, date)
app.use(routerTest)
app.use(routerTache)
app.use(routerFilms)




app.get('/*', (req, res) => res.status(404).send("Page Introuvable"))



app.listen(port, () =>
  console.log(`Le serveur est en écoute sur le port ${port}`)
)
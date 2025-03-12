import express from 'express';
import { addTache } from '../services/serviceTache.js';

const router = express.Router()

let taches = [];

router.post('/taches', addTache)

router.get('/taches', (req, res) => res.send(taches))

router.delete('/taches/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tacheIndex = taches.findIndex(t => t.id === id)

  if (tacheIndex > -1) {
    taches.splice(tacheIndex, 1);
    res.send({ message: `Tache ${id} supprimée avec succès` })
  } else {
    res.status(404).send({ message: `Tache non trouvée` })
  }
})

router.put('/taches/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tacheIndex = taches.findIndex(t => t.id === id)

  if (tacheIndex > -1) {
    taches[tacheIndex] = { id, ...req.body };
    res.send(taches[tacheIndex])
  } else {
    res.status(404).send({ message: `Tache non trouvée` })
  }
})

export default router
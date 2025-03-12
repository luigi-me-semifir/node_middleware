let taches = []

export const addTache = (req, res) => {
  const tache = {
    id: taches.length + 1,
    description: req.body.description
  };
  taches.push(tache);
  res.send(tache)
}
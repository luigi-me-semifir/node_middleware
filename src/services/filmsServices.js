import { Film, filmValidation } from "../models/films.js";

/**
 * Route pour ajouter des ilms dans la base de données
 * @param {*} req 
 * @param {*} res 
 * @returns new Film
 */
export const postFilm = async (req, res) => {
  try {
    const { error, value } = filmValidation.validate(req.body)

    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const newFilm = new Film(
      req.body
    )
    const addFilm = await newFilm.save()
    res.status(201).json(addFilm)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "une erreur est survenue lors de la sauvegarde" })
  }
}

/**
 * Requête permettant de récupérer tous les films
 * @param {*} req 
 * @param {*} res 
 */
export const getFilms = async (req, res) => {
  const filmsListe = await Film.find()
  res.send(filmsListe)
}

/**
 * Fonction qui permets de récupérer un film par son ID
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id)

    if (!film) {
      return res.status(404).json({ message: `Film id : ${req.params.id} non trouvé` })
    }
    res.status(200).json(film)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: ` Une erreur est survenue` })
  }
}

/**
 * Fonction pour supprimer un film de la base de donnée
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteFilm = async (req, res) => {
  try {
    const delFilm = await Film.findByIdAndDelete(req.params.id)
    if (!delFilm) {
      return res.status(404).Json({ message: "Film non trouvé" })
    }
    res.status(204).end()
  } catch (error) { res.status(500).json({ message: 'Erreur serveur', error }) }
}

/**
 * Fonction pour mettre a jour un film
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const putFilm = async (req, res) => {
  try {
    const { error, value } = filmValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const majFilm = await Film.findByIdAndUpdate(req.params.id, {
      titre: req.body.titre,
      annee: req.body.annee
    }, { new: true })

    if (!majFilm) {
      return res.status(404).json({ message: "Film non trouvé " })
    }
    res.status(200).json(majFilm)

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}
import { Film, filmValidation } from "../models/films.js";

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
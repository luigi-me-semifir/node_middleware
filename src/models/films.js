import Joi from "joi";
import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    lowercase: true
  },
  annee: {
    type: Number
  }
})

const Film = mongoose.model('Film', filmSchema)

const filmValidation = Joi.object({
  titre: Joi.string()
    .required()
    .messages({
      'string.empty': 'Le titre du film est obligatoire'
    }),
  annee: Joi.number()
    .min(1921)
    .required()
    .messages({
      'number.base': 'L\'année doit etre un nombre',
      'number.min': 'L\'année doit être supérieur à 1921'
    })
})

export { Film, filmValidation }
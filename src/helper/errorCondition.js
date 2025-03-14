export const errorCondition = (error) => {
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
}
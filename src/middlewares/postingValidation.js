const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization

  if (!token)
  return res.status(401).json({message: "Token não encontrado"})
  if (token.length !== 16 || typeof token !== 'string' )
  return res.status(401).json({message:"Token inválido"})

  next()
}

const nameValidation = (req, res, next) => {
 const { name } = req.body;

 if (!name)
 return res.status(400).json({message: "O campo \"name\" é obrigatório"})
 if (name.length < 3)
 return res.status(400).json({message: "O \"name\" deve ter pelo menos 3 caracteres"})
 next()
}

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age)
  return res.status(400).json({message: "O campo \"age\" é obrigatório"})
  if(!(Number.isInteger(age)) || age < 18)
  return res.status(400).json({ message: "O campo \"age\" deve ser um número inteiro igual ou maior que 18"})

  next()
}

const talkValidation = (req,res,next) => {
  const { talk } = req.body;

  if(talk === undefined)
  return res.status(400).json({message: "O campo \"talk\" é obrigatório"})

  const { watchedAt, rate } = talk
  const regexDate = /(\d{2})[\/](\d{2})[\/](\d{4})$/.test(watchedAt)

  if (!watchedAt)
  return res.status(400).json({message: "O campo \"watchedAt\" é obrigatório"})
  if(!regexDate)
  return res.status(400).json({message:"O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""})
  if(rate === undefined)
  return res.status(400).json({message: "O campo \"rate\" é obrigatório"})
  if(!(Number.isInteger(rate)) || (rate < 1 || rate > 5))
  return res.status(400).json({message: "O campo \"rate\" deve ser um número inteiro entre 1 e 5"})

  next()

}


module.exports = { tokenValidation, nameValidation, ageValidation, talkValidation }
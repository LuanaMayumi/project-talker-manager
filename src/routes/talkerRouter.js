const express = require('express');
const path = require('path') // lib que 
const fs = require('fs').promises; 
// a versão promises é a mais performática
// sigla para fileSystem
// lib padrao do node

const router = express.Router()

// const nameFile = './talker.json'

const pathResolve = path.resolve(__dirname,'..', 'talker.json')
// __dirname: pega a rota até esse arquivo, ou seja: app/src/routes
// coloco o .. pra ele voltar pra src
// nesse caso ficaria app/src/index.json

router.get('/', async (_req,res) => {
  try {
    const response = await fs.readFile(pathResolve, 'utf-8');
    const data = JSON.parse(response)
    return res.status(200).json(data)
    
  } catch (error) {
    console.error(error)
    return res.status(200).json([])
  }
})

router.get('/:id', async (req,res) => {
  const {id} = req.params

  const response = await fs.readFile(pathResolve, 'utf-8');
  const data = JSON.parse(response)

  try {
    const person = data.find((person) => person.id === Number(id))
    if (person){
      return res.status(200).json(person)
    } else {
      return res.status(404).json({"message": "Pessoa palestrante não encontrada"})
    }
  } catch (error) {
    console.log(error)
  }


})
module.exports = router
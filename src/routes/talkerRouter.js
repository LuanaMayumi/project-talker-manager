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
    // console.log(xx)
    return res.status(200).json(data)
    
  } catch (error) {
    console.error(error)
    return res.status(200).json([])
  }
})

module.exports = router
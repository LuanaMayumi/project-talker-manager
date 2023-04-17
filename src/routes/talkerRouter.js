const express = require('express');
const path = require('path'); // lib que 
const fs = require('fs').promises; 
// a versão promises é a mais performática
// sigla para fileSystem
// lib padrao do node
const { tokenValidation,
nameValidation,
ageValidation,
talkAndDateValidation,
watchedAtValidation,
rateValidation } = require('../middlewares/postingValidation');

const router = express.Router();

// const nameFile = './talker.json'

const pathResolve = path.resolve(__dirname, '..', 'talker.json');
// __dirname: pega a rota até esse arquivo, ou seja: app/src/routes
// coloco o .. pra ele voltar pra src
// nesse caso ficaria app/src/index.json

router.get('/', async (_req, res) => {
  try {
    const response = await fs.readFile(pathResolve, 'utf-8');
    const data = JSON.parse(response);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await fs.readFile(pathResolve, 'utf-8');
  const data = JSON.parse(response);

  try {
    const person = data.find((el) => el.id === Number(id));
    if (person) {
      return res.status(200).json(person);
    } 
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', 
tokenValidation,
nameValidation, 
ageValidation, 
talkAndDateValidation,
watchedAtValidation,
rateValidation, 
async (req, res) => {
  const response = await fs.readFile(pathResolve, 'utf-8');
  const data = JSON.parse(response);
  const person = { ...req.body };

  // const { name, age, talk } = req.body
  const newId = data[data.length - 1].id + 1;
  // const newPerson = { id: newId, name, age, talk }
  const newPerson = { id: newId, ...person };
  // console.log(newPerson)
  
  data.push(newPerson);
  await fs.writeFile(pathResolve, JSON.stringify(data));
  
  return res.status(201).json(newPerson);
});
module.exports = router;
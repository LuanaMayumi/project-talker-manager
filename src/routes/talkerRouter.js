const express = require('express');
const path = require('path');
const fs = require('fs').promises;
// a versão promises é a mais performática
// sigla para fileSystem
// lib padrao do node
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkAndDateValidation,
  watchedAtValidation,
  rateValidation,
} = require('../middlewares/postingValidation');

const { findPersonById } = require('../controllers/talker.controller');

const router = express.Router();

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

router.get('/:id', findPersonById);

router.post(
  '/',
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

    const newId = data[data.length - 1].id + 1;
    const newPerson = { id: newId, ...person };

    data.push(newPerson);
    await fs.writeFile(pathResolve, JSON.stringify(data));

    return res.status(201).json(newPerson);
  },
);

router.put(
  '/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkAndDateValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const { id } = req.params;
    const { ...updatingPerson } = req.body;
    const response = await fs.readFile(pathResolve, 'utf-8');
    const data = JSON.parse(response);
    const findedPerson = data.find((el) => el.id === Number(id));
    if (!findedPerson) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    const personUpdated = {
      id: Number(id),
      ...updatingPerson,
    };
    const filteringArray = data.filter((person) => person.id !== Number(id));
    await fs.writeFile(
      pathResolve,
      JSON.stringify([...filteringArray, personUpdated]), 'utf-8',
    );
    return res.status(200).json(personUpdated);
  },
);

router.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;

  const response = await fs.readFile(pathResolve, 'utf-8');
  const data = JSON.parse(response);

  const deletingPerson = data.filter((person) => person.id !== Number(id));

  await fs.writeFile(pathResolve, JSON.stringify(deletingPerson), 'utf-8');
  return res.status(204).json();
});

module.exports = router;

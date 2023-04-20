const { readFile } = require('../models/talker.model')

const findById = async (idBody) => {
  const person = (await readFile()).find((el) => el.id === idBody)
  return person
}

module.exports = { findById }
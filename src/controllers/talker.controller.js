const { findById } = require('../services/talker.service')

const findPersonById = async (req, res) => {
    const { id } = req.params;
    try {
      const person = await findById(Number(id))
      if (person) {
        return res.status(200).json(person);
      }
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    } catch (error) {
      console.log(error);
    }
}

module.exports = { findPersonById }
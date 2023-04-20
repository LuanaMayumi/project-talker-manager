const path = require('path'); // lib que
const fs = require('fs').promises;

const pathResolve = path.resolve(__dirname, '..', 'talker.json');
// __dirname: pega a rota até esse arquivo, ou seja: app/src/routes
// coloco o .. pra ele voltar pra src
// nesse caso ficaria app/src/index.json

const readFile = async () => {
  const response = await fs.readFile(pathResolve, 'utf-8');
  const data = JSON.parse(response);
  return data
}

module.exports = { readFile }


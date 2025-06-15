

const pool = require('../db');
const bcrypt = require('bcryptjs');

exports.cadastrarFuncionario = async (req, res) => {
  if (req.usuario.perfil !== 'admin') return res.sendStatus(403);
  const { matricula, nome, senha } = req.body;
  const hash = bcrypt.hashSync(senha, 10);
  await pool.execute(
    'INSERT INTO usuarios (matricula, nome, senha_hash, perfil) VALUES (?, ?, ?, ?)',
    [matricula, nome, hash, 'funcionario']
  );
  res.sendStatus(201);
};


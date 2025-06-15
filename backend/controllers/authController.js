

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const SECRET = 'secreto_super_seguro';

exports.login = async (req, res) => {
  const { matricula, senha } = req.body;
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE matricula = ?', [matricula]);
  const usuario = rows[0];
  if (!usuario || !bcrypt.compareSync(senha, usuario.senha_hash)) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: usuario.id, perfil: usuario.perfil, nome: usuario.nome }, SECRET);
  res.json({ token, perfil: usuario.perfil });
};

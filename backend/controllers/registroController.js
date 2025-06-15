

const pool = require('../db');
const janelas = require('../utils/janelas');

function horaDentroJanela(tipo, horaAtual) {
  const [inicio, fim] = janelas[tipo].map(h => parseInt(h.replace(':', '')));
  const hora = parseInt(horaAtual.replace(':', ''));
  return hora >= inicio && hora <= fim;
}

exports.registrar = async (req, res) => {
  if (req.usuario.perfil !== 'funcionario') return res.sendStatus(403);
  const { tipo, hora } = req.body;
  if (!horaDentroJanela(tipo, hora)) return res.status(403).json({ erro: 'Fora da janela permitida' });

  const hoje = new Date().toISOString().slice(0, 10);
  const [rows] = await pool.execute('SELECT * FROM registros WHERE usuario_id = ? AND data = ?', [req.usuario.id, hoje]);
  const registro = rows[0];

  if (registro && registro[tipo]) return res.status(409).json({ erro: 'Registro já feito' });

  if (registro) {
    await pool.execute(`UPDATE registros SET ${tipo} = ? WHERE id = ?`, [hora, registro.id]);
  } else {
    await pool.execute(
      'INSERT INTO registros (usuario_id, data, entrada_manha, saida_manha, entrada_tarde, saida_tarde) VALUES (?, ?, ?, ?, ?, ?)',
      [req.usuario.id, hoje, tipo === 'entrada_manha' ? hora : null, tipo === 'saida_manha' ? hora : null, tipo === 'entrada_tarde' ? hora : null, tipo === 'saida_tarde' ? hora : null]
    );
  }
  res.sendStatus(200);
};

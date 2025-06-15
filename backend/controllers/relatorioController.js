

const pool = require('../db');
const PDFDocument = require('pdfkit');

exports.gerarRelatorio = async (req, res) => {
  if (req.usuario.perfil !== 'admin') return res.sendStatus(403);
  const hoje = new Date().toISOString().slice(0, 10);

  const [rows] = await pool.execute(`
    SELECT u.matricula, u.nome, r.* FROM registros r
    JOIN usuarios u ON r.usuario_id = u.id
    WHERE r.data = ?
  `, [hoje]);

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(14).text('Relatório de Ponto - ' + hoje);
  doc.moveDown();

  rows.forEach(r => {
    doc.text(`${r.matricula} | ${r.nome} | ${r.data} | ${r.entrada_manha || 'PENDENTE'} | ${r.saida_manha || 'PENDENTE'} | ${r.entrada_tarde || 'PENDENTE'} | ${r.saida_tarde || 'PENDENTE'}`);
  });

  doc.end();
};


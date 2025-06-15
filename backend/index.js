// Backend Index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/adminRoutes'));
app.use('/', require('./routes/registroRoutes'));
app.use('/', require('./routes/relatorioRoutes'));

app.listen(3001, () => console.log('Backend rodando na porta 3001'));

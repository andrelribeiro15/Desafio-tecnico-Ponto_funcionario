# Sistema de Registro de Ponto (Node.js + MySQL + Frontend HTML)

Este é um sistema de registro de ponto de funcionários, com backend em **Node.js (Express)** e banco de dados **MySQL**, e um frontend básico em **HTML/CSS com Bootstrap**.

---

## Funcionalidades Principais

- Login para Administrador e Funcionário
- Cadastro de Funcionários (Admin)
- Registro de Ponto (Funcionário)
- Geração de Relatório PDF diário (Admin)

---

## Tecnologias Utilizadas

- Node.js + Express
- MySQL
- Axios (para requisições HTTP no frontend)
- PDFKit (para geração de PDF)
- Bootstrap 5 (para o layout do frontend)

---

##  Requisitos de Ambiente

- Node.js instalado
- MySQL instalado e rodando
- Visual Studio Code (ou outro editor)

---

##  Instalação e Configuração

### 1. Configurar o Banco de Dados (MySQL)

- Crie o banco:

"
CREATE DATABASE registro_ponto;
USE registro_ponto;
Crie as tabelas:

sql
Copiar
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  matricula VARCHAR(50) UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  senha_hash VARCHAR(100) NOT NULL,
  perfil VARCHAR(20) NOT NULL
);

CREATE TABLE registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  data DATE NOT NULL,
  entrada_manha VARCHAR(5),
  saida_manha VARCHAR(5),
  entrada_tarde VARCHAR(5),
  saida_tarde VARCHAR(5),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
Inserir um usuário Admin inicial (senha: admin123):


INSERT INTO usuarios (matricula, nome, senha_hash, perfil)
VALUES (
  'admin123',
  'Administrador',
  '$2a$10$qQ0P5MGayAFflLVmc6k1yOS9IQW3uN6c9HcphBQ6lfZqMyL2sCj/2',
  'admin'
);
"

2. Configurar o Backend (Node.js)
Acesse a pasta /backend no terminal.

Instale as dependências:


npm install express cors mysql2 bcryptjs jsonwebtoken pdfkit
Edite o arquivo /backend/db.js e configure os dados do seu MySQL:


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'SUA_SENHA',
  database: 'registro_ponto',
  port: 3306
});

Inicie o backend:


node index.js
O backend estará rodando em:
http://localhost:3001

3. Executar o Frontend (HTML)
Acesse a pasta /frontend.

Abra o arquivo index.html no navegador.

Se quiser, use a extensão Live Server no Visual Studio Code para facilitar.

Fluxo Básico de Uso
Faça login com o usuário admin:

Matrícula: admin123
Senha: admin123
Cadastre novos funcionários.

Faça login com um funcionário.

Realize registros de ponto.

Como admin, baixe o Relatório PDF diário.

Observações
O backend utiliza JWT para autenticação.

As senhas são armazenadas com hash usando bcrypt.



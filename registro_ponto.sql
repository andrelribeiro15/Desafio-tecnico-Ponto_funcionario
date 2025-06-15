CREATE DATABASE IF NOT EXISTS registro_ponto;
USE registro_ponto;

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
INSERT INTO usuarios (matricula, nome, senha_hash, perfil)
VALUES ('admin123', 'Administrador', '$2a$10$qQ0P5MGayAFflLVmc6k1yOS9IQW3uN6c9HcphBQ6lfZqMyL2sCj/2', 'admin');
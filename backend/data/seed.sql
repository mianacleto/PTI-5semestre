INSERT OR IGNORE INTO produtos (id, nome, preco, imagem, categoria) VALUES
  (1, 'Dorflex', 19.90, './media/dorflex.png', 1),
  (2, 'Buscopan', 14.50, './media/buscopan.png', 1),
  (3, 'Dipirona', 12.00, './media/dipirona.png', 1),
  (4, 'Paracetamol', 24.90, './media/paracetamol.png', 1),
  (5, 'Loratadina', 31.40, './media/loratadina.png', 1),
  (6, 'BCAA', 19.90, './media/bcaa.png', 2),
  (7, 'Colageno', 49.90, './media/colageno.png', 2),
  (8, 'Vitamina C', 35.00, './media/vitaminaC.png', 2),
  (9, 'Vitamina D', 35.00, './media/vitaminaD.png', 2),
  (10, 'Fralda', 84.90, './media/fralda.png', 3);

INSERT OR IGNORE INTO farmacias (
  id, nome, email, senha, cnpj, telefone, endereco, foto_perfil, avaliacao, taxa, tempo_entrega, status
) VALUES
  (1, 'Drogaria Saude Maxima', '1@email.com', 'a', '1', 'a', 'a', './media/drog_saude.png', 4.8, 'R$ 5,00', '15-25 min', 'Aberto agora'),
  (2, 'Farmacia Central', '2@email.com', 'a', '2', 'a', 'a', './media/farma_central.png', 4.5, 'Gratis', '20-30 min', 'Fechado'),
  (3, 'Farmacia Popular', '3@email.com', 'a', '3', 'a', 'a', './media/farma_central.png', 4.2, 'R$ 3,50', '10-20 min', 'Aberto agora'),
  (4, 'BioFarma Delivery', '4@email.com', 'a', '4', 'a', 'a', './media/bio_deli.png', 4.9, 'R$ 7,00', '25-40 min', 'Aberto agora');

INSERT OR IGNORE INTO clientes (
  id, email, senha, nome, cpf, telefone, endereco, foto_perfil
) VALUES
  (1, 'ana@email.com', '123', 'Ana Maria de Souza', '12345678900', '123456789', 'Rua Dr. Vila Nova, 228, 7o andar, Sao Paulo, SP', './media/cliente.png');

INSERT OR IGNORE INTO farmacia_produtos (farmacia_id, produto_id) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
  (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
  (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10),
  (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10);

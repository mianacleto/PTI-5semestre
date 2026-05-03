const params = new URLSearchParams(window.location.search);
const farmaciaId = params.get('id');

const FARMACIA = `/farmacias/${farmaciaId}`;
const PRODUTOS = `/produtos?farmaciaId=${farmaciaId}`;

async function carregarFarmacia() {
  const res = await fetch(FARMACIA);
  const farmacia = await res.json();

  const info = document.getElementById('farmacia-info');
  info.innerHTML = `
    <h1>${farmacia.nome}</h1>
    <p><img src="${farmacia.logo}" alt="${farmacia.nome}" width="50"></p>
    <p>Avaliação: <i class="fas fa-star" style="color: gold;"></i> ${farmacia.avaliacao}</p>
    <p>Taxa: ${farmacia.taxa} | Entrega: ${farmacia.tempoEntrega}</p>
    <p>Status: ${farmacia.status}</p>
  `;
}

async function carregarProdutos() {
  const res = await fetch(PRODUTOS);
  const produtos = await res.json();

  const lista = document.getElementById('produtos-lista');
  lista.innerHTML = '';

  produtos.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('produto-card');
    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}" width="100">
      <div>
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <p><strong>R$ ${p.preco.toFixed(2)}</strong></p>
      </div>
    `;
    lista.appendChild(card);
  });
}

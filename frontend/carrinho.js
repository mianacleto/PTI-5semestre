const CARRINHO_KEY = 'carrinho';

function getCarrinho() {
  try {
    return JSON.parse(localStorage.getItem(CARRINHO_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function salvarCarrinho(carrinho) {
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
  atualizarCarrinhoFlutuante();
}

function adicionarAoCarrinho(produto) {
  if (!produto || !produto.id) return;
  const carrinho = getCarrinho();
  const existe = carrinho.find(i => i.id === produto.id);
  if (existe) {
    existe.quantidade = (existe.quantidade || 0) + 1;
  } else {
    const novo = {
      id: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco),
      imagem: produto.imagem || '/media/placeholder.png',
      quantidade: 1
    };
    carrinho.push(novo);
  }
  salvarCarrinho(carrinho);
}

function removerDoCarrinho(produtoId) {
  let carrinho = getCarrinho();
  carrinho = carrinho.filter(i => i.id !== produtoId);
  salvarCarrinho(carrinho);
}

function setQuantidade(produtoId, quantidade) {
  const carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === produtoId);
  if (!item) return;
  item.quantidade = Math.max(0, Number(quantidade));
  const fil = carrinho.filter(i => i.quantidade > 0);
  salvarCarrinho(fil);
}

function atualizarCarrinhoFlutuante() {
  const carrinho = getCarrinho();
  const totalItens = carrinho.reduce((s, it) => s + (it.quantidade || 0), 0);
  const totalValor = carrinho.reduce((s, it) => s + (it.preco * (it.quantidade || 0)), 0);
  const span = document.querySelector('.carrinho-flutuante span');
  if (!span) return;
  const textoItens = totalItens === 1 ? 'produto' : 'produtos';
  const valorFmt = totalValor.toFixed(2).replace('.', ',');
  span.textContent = `${totalItens} ${textoItens} | R$ ${valorFmt}`;
}

document.addEventListener('DOMContentLoaded', atualizarCarrinhoFlutuante);

window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.setQuantidade = setQuantidade;
window.getCarrinho = getCarrinho;
window.atualizarCarrinhoFlutuante = atualizarCarrinhoFlutuante;
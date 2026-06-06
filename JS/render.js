export function criaPlano(plano,sessao){
  const cardPlano = document.createElement('article');
  cardPlano.classList.add('planos');
  const tituloCard = document.createElement('h2');
  tituloCard.innerText = plano.nome;
  const cardParagrafo = document.createElement('p');
  cardParagrafo.innerText =  `R$ ${plano.preco} / ${plano.periodo}`;
  const listaCard = document.createElement('ul');
  const botaoCard = document.createElement('button');
  botaoCard.classList.add('botaoAssinatura')
  botaoCard.innerText = 'Assine já';
  cardPlano.dataset.id = plano.id;

 plano.recursos.forEach((item) => {
  const itemLista = document.createElement('li');
  itemLista.innerText = item;
  listaCard.appendChild(itemLista);
 });
 cardPlano.appendChild(tituloCard);
 cardPlano.appendChild(cardParagrafo);
 cardPlano.appendChild(listaCard);
 cardPlano.appendChild(botaoCard);
 sessao.appendChild(cardPlano);
}

export function renderPlanos(planos, sessao) {
  planos.forEach((plano) => criaPlano(plano, sessao));
}
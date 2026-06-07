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


export function renderizaCheckoutDescricao(planoSelecionado){

  if (!planoSelecionado) return;

  const dadosDinamicos = document.createElement('div');
  dadosDinamicos.classList.add('valor-dinamico');
  const tituloCheckout = document.createElement('h2');
  tituloCheckout.innerText = 'Confira aqui sua compra:';
  const checkoutParagrafo =  document.createElement('p');
  checkoutParagrafo.innerText = `valor do plano: R$${planoSelecionado.preco}`
  const listaCheckout = document.createElement('ul');

  planoSelecionado.recursos.forEach((item) =>{

    const itensLista = document.createElement('li');
    itensLista.innerText = item;
    listaCheckout.appendChild(itensLista);
  });    
  dadosDinamicos.appendChild(tituloCheckout);
  dadosDinamicos.appendChild(checkoutParagrafo);
  dadosDinamicos.appendChild(listaCheckout);

  const cardHtmlCheckout = document.querySelector('.checkout-card');
  cardHtmlCheckout.appendChild(dadosDinamicos);

}
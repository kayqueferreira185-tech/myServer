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
  const valorAnual = planoSelecionado.preco * 12;

  const dadosDinamicos = document.createElement('div');
  dadosDinamicos.classList.add('valor-dinamico');
  const icon = document.createElement('div');
  icon.classList.add('svg-clipboard');
icon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>
`;
  const divTitulo =document.createElement('div');
  divTitulo.classList.add('titulo-wrapper');
  const tituloCheckout = document.createElement('h2');
  tituloCheckout.innerText = 'Detalhes do plano:';
  divTitulo.appendChild(icon);
  divTitulo.appendChild(tituloCheckout)
  const NomePlanoCheckoutDinamic = document.createElement('h3');
  NomePlanoCheckoutDinamic.innerText = `${planoSelecionado.nome}`;
  const checkoutParagrafo =  document.createElement('p');
  checkoutParagrafo.innerText = `valor do plano: R$ ${planoSelecionado.preco} / mês`
  const listaCheckout = document.createElement('ul');

  planoSelecionado.recursos.forEach((item) =>{

    const itensLista = document.createElement('li');
    itensLista.innerText = item;
    listaCheckout.appendChild(itensLista);
  });   
  const paragrafoValorAnual = document.createElement('p');
  paragrafoValorAnual.classList.add('valor-anual');
  paragrafoValorAnual.textContent =`valor anual do plano: R$ ${valorAnual.toFixed(2)} / ano`;

   
  dadosDinamicos.appendChild(divTitulo);
  dadosDinamicos.appendChild(NomePlanoCheckoutDinamic);
  dadosDinamicos.appendChild(checkoutParagrafo);
  dadosDinamicos.appendChild(listaCheckout);
  dadosDinamicos.appendChild(paragrafoValorAnual);

  const cardHtmlCheckout = document.querySelector('.checkout-card');
  cardHtmlCheckout.appendChild(dadosDinamicos);

}
export function buildCancelModal(plano){
  const divPrincipalModalCancel = document.createElement('div');
  const divGuardaIcone = document.createElement('div');
 divGuardaIcone.innerHTML = `
   <svg xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke-width="1.5" 
    stroke="currentColor" 
    class="size-6">

  <path 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" 
  />
</svg>
`;
divGuardaIcone.classList.add('estilizacao-svg')
const tituloCancelModal = document.createElement('h2');
tituloCancelModal.innerText = 'Tem certeza que deseja cancelar sua assinatura?';
const subtituloCancelModal = document.createElement('h3');
subtituloCancelModal.innerHTML =`Ao cancelar, você perderá os benefícios do seu plano <em>${plano.nome}</em>:`;
const areaMostraPerdasPlano = document.createElement('div');
const ulModalCancel =document.createElement('ul');
plano.recursos.forEach((item) => {
    const itensLista = document.createElement('li');
    itensLista.innerText = item;
    ulModalCancel.appendChild(itensLista);
  });
areaMostraPerdasPlano.innerHTML = `<p>Você perderá:</p>`;
areaMostraPerdasPlano.appendChild(ulModalCancel);
areaMostraPerdasPlano.classList.add('areaPerdaModal')

const botaoContinuarModalCancel= document.createElement('button');
botaoContinuarModalCancel.innerText = 'Continuar';
botaoContinuarModalCancel.classList.add('botao-continuarModal');
const confirmacaoCancelamentoModal = document.createElement('button'); 
confirmacaoCancelamentoModal.innerText = 'Cancelar assinatura'
confirmacaoCancelamentoModal.classList.add('botao-cancelarModal')
const divAcoes = document.createElement('div');
divAcoes.classList.add('botoesCancelModal');
divAcoes.appendChild(botaoContinuarModalCancel);
divAcoes.appendChild(confirmacaoCancelamentoModal);
divPrincipalModalCancel.appendChild(divGuardaIcone);
divPrincipalModalCancel.appendChild(tituloCancelModal);
divPrincipalModalCancel.appendChild(subtituloCancelModal);
divPrincipalModalCancel.appendChild(areaMostraPerdasPlano);
divPrincipalModalCancel.appendChild(divAcoes);


divPrincipalModalCancel.classList.add('divModalCancel');
divPrincipalModalCancel.classList.add('aparecer');

return divPrincipalModalCancel;

}
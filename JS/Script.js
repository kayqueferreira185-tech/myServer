const sessao = document.querySelector ('.cards');

const planos = [
  {id: 'essencial', nome:'Essencial',preco:3.95, periodo:'Por mês', recursos:['1 Website','1 GB de armazenamento', '10 GB de transferência']},
  {id: 'Premium', nome:'Premium',preco:7.95, periodo:'Por mês', recursos:['5 Websites', '3 GB de armazenamento', 'Transferência ilimitada', '10 horas de suporte mensais']},
  {id: 'Gold', nome:'Gold',preco:13.95, periodo:'Por mês', recursos:['10 Websites', '30 GB de armazenamento','Transferência ilimitada', '30 Horas de suporte mensais', 'Email personalizado']}
];
let planoAtual = null;
function percorreArray(){
  for(let i = 0;i < planos.length; i++){
  criaPlano(planos[i]);
  }
}
function criaPlano(plano){
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

 for (let i = 0 ;i < plano.recursos.length ; i ++){
  const itemLista = document.createElement('li');
  itemLista.innerText = plano.recursos[i];
  listaCard.appendChild(itemLista);
 }
 cardPlano.appendChild(tituloCard);
 cardPlano.appendChild(cardParagrafo);
 cardPlano.appendChild(listaCard);
 cardPlano.appendChild(botaoCard);
 sessao.appendChild(cardPlano);
}
percorreArray();



const todos = document.querySelectorAll('.planos');

sessao.addEventListener('click', (e) => {
  const guardaEvento = e.target.closest('.planos');
  if (!guardaEvento){
    return;
  };
  if (guardaEvento.classList.contains('selected')){
    guardaEvento.classList.remove('selected');
  }else {
    limpaSelecao();
    guardaEvento.classList.add('selected');
  }
});
const areaFeedback = document.querySelector('.areaFeedback');

const guardaMain = document.querySelector('.principal');

guardaMain.addEventListener('click' , (e) => {
  const guardaEvento = e.target.closest('.cards');
  if(areaFeedback.classList.contains('active')){
    return;
  }
  if (guardaEvento){
    return;
  }else{
    limpaSelecao();
  };

});

function limpaSelecao(){
  for (let i = 0; i < todos.length; i++){
    todos[i].classList.remove('selected');
  }
};



sessao.addEventListener('click', (e) => { 
  const eventoFeedback = e.target.closest('.botaoAssinatura');
     if (!eventoFeedback){
    return
   }
   const card = eventoFeedback.closest('.planos');
   const idDoPlano  = card.dataset.id;
   const planoClicado = planos.find((item) => {
    return item.id === idDoPlano;
  })
  
  planoAtual = planoClicado
  criarFeedback(planoClicado);

});


function limparFeedback() {
  areaFeedback.innerHTML = "";
}



function buildFeedbackUi(plano) {
  const divFeedback = document.createElement('div');
  divFeedback.classList.add('divGeral')

  const tituloFeed = document.createElement('h2');
  tituloFeed.innerText = plano.nome;

  const paragrafoValor = document.createElement('p');
  paragrafoValor.innerHTML = `Valor do plano: `;

  const spanPreco = document.createElement('span');
  spanPreco.innerText = plano.preco;
  spanPreco.classList.add('preco');

  paragrafoValor.appendChild(spanPreco);

  const lista = document.createElement('ul');

  plano.recursos.forEach((item) => {
    const li = document.createElement('li');
    li.innerText = item;
    lista.appendChild(li);
  });

  const botaoFeed = document.createElement('button');
  botaoFeed.classList.add('botaoFeedback')
  botaoFeed.innerText = 'Cancelar assinatura';

  const linkAssinatura = document.createElement('a');
  linkAssinatura.innerText = 'Continuar assinatura';
  linkAssinatura.href = '#';

  const divAcoes = document.createElement('div');
  divAcoes.classList.add('divFlex');
  divAcoes.appendChild(linkAssinatura);
  divAcoes.appendChild(botaoFeed);

  divFeedback.appendChild(tituloFeed);
  divFeedback.appendChild(paragrafoValor);
  divFeedback.appendChild(lista);
  divFeedback.appendChild(divAcoes);

  return divFeedback;
}
function criarFeedback(plano) {
  limparFeedback();

  const ui = buildFeedbackUi(plano);
 

  areaFeedback.appendChild(ui);
  areaFeedback.classList.add('active');
  if (areaFeedback.classList.contains('active')){
    ui.classList.add('show')
  }
}

areaFeedback.addEventListener('click', (e) =>{
   const botaoConfirmaCancel = e.target.closest('.botaoFeedback');
   if (!botaoConfirmaCancel){
    return;
   }
  const novoModal = buildCancelModal(planoAtual);
  trocarModal(novoModal);
   
});

function buildCancelFeedback(){
  areaFeedback.innerHTML = ""
  
}
function trocarModal(novoModal){
  areaFeedback.innerHTML ="";
  areaFeedback.appendChild(novoModal);
}
function buildCancelModal(plano){
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

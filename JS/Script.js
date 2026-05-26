const sessao = document.querySelector ('.cards');

const planos = [
  {id: 'essencial', nome:'Essencial',preco:3.95, periodo:'Por mês', recursos:['1 Website','1 GB de armazenamento', '10 GB de transferência']},
  {id: 'Premium', nome:'Premium',preco:7.95, periodo:'Por mês', recursos:['5 Websites', '3 GB de armazenamento', 'Transferência ilimitada', '10 horas de suporte mensais']},
  {id: 'Gold', nome:'Gold',preco:13.95, periodo:'Por mês', recursos:['10 Websites', '30 GB de armazenamento','Transferência ilimitada', '30 Horas de suporte mensais', 'Email personalizado']}
];
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

const guardaMain = document.querySelector('.principal');

guardaMain.addEventListener('click' , (e) => {
  const guardaEvento = e.target.closest('.cards');
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

  criarFeedback(planoClicado);

});
const areaFeedback = document.querySelector('.areaFeedback');

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
}
areaFeedback.addEventListener('click', (e) =>{ 
   const botaoFeedCancel = e.target.closest('.botaoFeedback');
   if (!botaoFeedCancel){
    return
   };
   areaFeedback.classList.remove('active');
   areaFeedback.innerHTML ="";
});
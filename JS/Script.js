const sessao = document.querySelector ('.cards');

const planos = [
  {nome:'Essencial',preco:3.95, periodo:'Por mês', recursos:['1 Website','1 GB de armazenamento', '10 GB de transferência']},
  {nome:'Premium',preco:7.95, periodo:'Por mês', recursos:['5 Websites', '3 GB de armazenamento', 'Transferência ilimitada', '10 horas de suporte mensais']},
  {nome:'Gold',preco:13.95, periodo:'Por mês', recursos:['10 Websites', '30 GB de armazenamento','Transferência ilimitada', '30 Horas de suporte mensais', 'Email personalizado']}
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
  botaoCard.innerText = 'Assine já';

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
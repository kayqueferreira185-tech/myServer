import planos from "../dados/planos.js";
import  {renderPlanos} from "./render.js"
import {buildCancelModal} from "./render.js"

const sessao = document.querySelector ('.cards');

renderPlanos(planos, sessao);

let planoAtual = null;

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
   localStorage.setItem('planoSelecionado', planoClicado.id);

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
  linkAssinatura.classList.add('botao-checkout')
  linkAssinatura.href = './checkout.html';

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
    ui.classList.add('show');
  }
}

areaFeedback.addEventListener('click', (e) =>{
   const botaoConfirmaCancel = e.target.closest('.botaoFeedback');
  if (botaoConfirmaCancel){
   const novoModal = buildCancelModal(planoAtual);
   trocarModal(novoModal);
   return;
  }
   
   const botaoCancelarDefinitivo = e.target.closest('.botao-cancelarModal');
   if(botaoCancelarDefinitivo){
    limpaSelecao();
    buildCancelFeedback();
    areaFeedback.classList.remove('active');
    return;
   };
   const botaoRetornarPlanoA = e.target.closest('.botao-continuarModal')
    if (botaoRetornarPlanoA){
     criarFeedback(planoAtual);
   };
   const botaoCaminhoCheckout = e.target.closest('.botao-checkout')
     if (!planoAtual) {
      alert("Selecione um plano antes de continuar");
      e.preventDefault();
      return;
    }
   
});

function buildCancelFeedback(){
  areaFeedback.innerHTML = ""
  
}
function trocarModal(novoModal){
  areaFeedback.innerHTML ="";
  areaFeedback.appendChild(novoModal);
}


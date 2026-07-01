import {
  validaNomeInput,
  validaEmailInput,
  validaTelefone,
  validaNumeroCartao,
  validaValidadeCartao,
  validaCVV
} from './validacoes.js';

import {extrairNumero} from './utils.js'

const areaVisivelCartao = document.querySelector('.formulario-pagamento');
const areaGeralPagamento  = document.querySelector('.area-pagamento');
const areaQrCodePix = document.querySelector('.area-pix');

areaGeralPagamento.addEventListener('click', (e) => {
    const retornoBuscaEvent = e.target.closest('.botaoCheckout-pix');
    if (retornoBuscaEvent) {
      areaVisivelCartao.classList.add('hidden');
      areaQrCodePix.classList.remove('hidden');
    }
    const salvaAreaCartao = e.target.closest('.botaoCheckout-cartao');
    if (salvaAreaCartao) {
        areaQrCodePix.classList.add('hidden');
        areaVisivelCartao.classList.remove('hidden');
    }
})

const nomeUserCheckout = document.querySelector('#nome');
const emailUserCheckout = document.querySelector('#email');
const telUserCheckout = document.querySelector('#telefone');
const botaoFinalizaCheckout = document.querySelector('.finaliza-fluxo');
const formularioPagamento = document.querySelector('.formulario-pagamento');
const numeroCartao = document.querySelector('#numero-cartao');
const dataValidadeCartao = document.querySelector('#validade');
const CodigoCvv = document.querySelector('#CVV');
const erroSpanInputs = document.querySelectorAll('.erro');


botaoFinalizaCheckout.addEventListener('click', (e) =>{ 
e.preventDefault();
processaCheckout();
 
})

function processaCheckout() {
  const dados = capturaValorInput();

    const nomeValido = validaNomeInput(dados.nome);
    const emailValido =  validaEmailInput(dados.email);
    const telefoneValido =  validaTelefone(dados.telefone);
    const numeroCardValido =  validaNumeroCartao(dados.numeroCard);
    const validadeCardValida =  validaValidadeCartao(dados.validadeCard);
    const validoCvv =  validaCVV(dados.codigoCard);

const validacoes = {
    nome: {valido:nomeValido, mensagem: "digite um  nome válido"},
    email:{valido:emailValido,mensagem: "digite um  email válido"},
    telefone: {valido:telefoneValido, mensagem: "digite um  telefone válido"},
    cartao: {valido:numeroCardValido,mensagem: "digite um  número de cartão válido"},
    validade: {valido:validadeCardValida,mensagem: "digite uma validade válida"},
    cvv: {valido: validoCvv, mensagem: "digite um código válido"}
};

const camposInvalidos = Object.keys(validacoes).filter(campo =>  !validacoes[campo].valido);

if (camposInvalidos.length > 0){
    mostraErro(camposInvalidos, validacoes);
    return
}else{
    abreModalConfirmacao();
}
}

function abreModalConfirmacao(){
    const modalCompleto =  capturaModal();
    modalCompleto.overlay.classList.add('ativo');

}

function capturaModal(){
    const overlay = document.querySelector('.modal-confirmacao');
    const modal = document.querySelector('.modal-conteudo')

    return {
        overlay,
        modal
    }
}

function mostraErro(camposInvalidos, validacoes){
const erros = capturaCampoErro();
camposInvalidos.forEach(campo => {
    const elementoErro = erros[campo + "Erro"];
    const msg = elementoErro.querySelector('.msg');
    if (!elementoErro) return;
    if (!validacoes[campo].valido) {
    elementoErro.classList.add('show');
    msg.textContent = validacoes[campo].mensagem;
}else {
    elementoErro.classList.remove('show');
    elementoErro.textContent = '';
}
});
}

function capturaValorInput(){
    const nome = nomeUserCheckout.value;
    const email = emailUserCheckout.value;
    const telefone = telUserCheckout.value;
    const numeroCard = numeroCartao.value;
    const validadeCard = dataValidadeCartao.value;
    const codigoCard = CodigoCvv.value;
    
    return {
        nome,
        email,
        telefone,
        numeroCard,
        validadeCard,
        codigoCard

    }
}

function capturaCampoErro(){
    const nomeErro = document.querySelector('[data-campo="nome"]');
    const emailErro = document.querySelector('[data-campo="email"]');
    const telefoneErro = document.querySelector('[data-campo="telefone"]');
    const cartaoErro = document.querySelector('[data-campo="cartao"]');
    const validadeErro = document.querySelector('[data-campo="validade"]');
    const cvvErro = document.querySelector('[data-campo="cvv"]');

    return {
        nomeErro,
        emailErro,
        telefoneErro,
        cartaoErro,
        validadeErro,
        cvvErro

    }
}

telUserCheckout.addEventListener('input', () =>{
    const valorRealTelCheckout = telUserCheckout.value;
     const resultado = formatarTelefone(valorRealTelCheckout);
     telUserCheckout.value = resultado;
     
})
function formatarTelefone(stringUtilitaria){
    const valorFormatado = extrairNumero(stringUtilitaria);

    const pedacosDDD =  valorFormatado.slice(0,2);
    const meioNumero = valorFormatado.slice(2,7);
    const finalNumero = valorFormatado.slice(7,11);
    if (valorFormatado.length <= 2) return valorFormatado;
      if (valorFormatado.length <= 7) return `(${pedacosDDD}) ${meioNumero}`;
       return `(${pedacosDDD}) ${meioNumero}-${finalNumero}`;
}   



numeroCartao.addEventListener('input', () =>{
    const valorInputNumeroCartao = numeroCartao.value;
    const resultadoFormatacao = criaMascaraCartao(valorInputNumeroCartao)
    numeroCartao.value = resultadoFormatacao;
});


function criaMascaraCartao(stringUtilitariaCartao){
  let resultado = '';
  let contador = 0;
  const valorFormatado = extrairNumero(stringUtilitariaCartao);
  for (let i = 0; i < valorFormatado.length; i++) {
    contador = contador+ 1;
    resultado = resultado + valorFormatado[i]
    if (contador === 4 && i + 1 < valorFormatado.length) {
        resultado += ' ';
        contador = 0;    
    }   
  }
return resultado;

}

dataValidadeCartao.addEventListener('input', () =>{ 
    const ValorValidade = dataValidadeCartao.value;
    const mascaraArmazenada = criaMascaraValidade(ValorValidade);
    dataValidadeCartao.value = mascaraArmazenada;
})


function criaMascaraValidade(stringUtilitariaCartao){
    const valorFormatado = extrairNumero(stringUtilitariaCartao);
    const primeiroPedaco = valorFormatado.slice(0,2);
    const segundoPedaco = valorFormatado.slice(2,4);
    if (valorFormatado.length < 2) return valorFormatado;
    if (valorFormatado.length > 3) return `${primeiroPedaco}/${segundoPedaco}`;
    
    return valorFormatado;
    }



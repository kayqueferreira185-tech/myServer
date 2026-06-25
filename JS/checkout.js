
import planos from "../dados/planos.js";
import{renderizaCheckoutDescricao} from './render.js';

const idPlanoPersistido = localStorage.getItem('planoSelecionado');
if (!idPlanoPersistido) {
  alert('você não pode prosseguir');
  window.location.href = "index.html";
}
const planoSelecionado = planos.find((item) =>{ 
    return item.id === idPlanoPersistido;
});

if(!planoSelecionado){
    alert('você não pode prosseguir');
    window.location.href = "index.html";
}
renderizaCheckoutDescricao(planoSelecionado);

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
const dataValidadeCartao = document.querySelector('#validde');
const CodigoCvc = document.querySelector('#CVC');
const erroSpanInputs = document.querySelectorAll('.erro');


botaoFinalizaCheckout.addEventListener('click', (e) =>{ 
  e.preventDefault()
  const valor =  capturaValorInput();
})



function capturaValorInput(){
    const nome = nomeUserCheckout.value;
    const email = emailUserCheckout.value;
    const telefone = telUserCheckout.value;
    const numeroCard = numeroCartao.value;
    const validadeCard = dataValidadeCartao.value;
    const codigoCard = CodigoCvc.value;
    
    return {
        nome,
        email,
        telefone,
        numeroCard,
        validadeCard,
        codigoCard

    }
}
const dados = capturaValorInput();

function validaNomeInput(nome){
 const valorRealNome =  nome.trim();
    if (!valorRealNome) {
        return false;
    }
    if (valorRealNome.length > 2 && valorRealNome.length <= 180 ){
      return true ;
    }
    return false;

}

function validaEmailInput(email){
    const valorRealEmail = email.trim();
    if(!valorRealEmail){
        return false
    }
    if (valorRealEmail.length < 6 || valorRealEmail.length > 320){
        return false;
    }
    const localArroba = valorRealEmail.indexOf('@');
    if (localArroba === 0 || localArroba === valorRealEmail.length - 1 ){
        return false;
    }
    const possivelEspaco = valorRealEmail.indexOf(' ');
    if (possivelEspaco !== -1){
        return false;
    }  
    const partes = valorRealEmail.split('@');
    if (partes.length !== 2){
        return false;
    }
    return true
}

telUserCheckout.addEventListener('input', () =>{
    const valorRealTelCheckout = telUserCheckout.value;
     const resultado = formatarTelefone(valorRealTelCheckout);
     telUserCheckout.value = resultado;
     
})
function formatarTelefone(stringUtilitaria){
    const valorFormatado = normalizaTel(stringUtilitaria);

    const pedacosDDD =  valorFormatado.slice(0,2);
    const meioNumero = valorFormatado.slice(2,7);
    const finalNumero = valorFormatado.slice(7,11);
    if (valorFormatado.length <= 2) return valorFormatado;
      if (valorFormatado.length <= 7) return `(${pedacosDDD}) ${meioNumero}`;
       return `(${pedacosDDD}) ${meioNumero}-${finalNumero}`;
}
    

function normalizaTel(stringUtilitaria){
    let valorVazio = "";
    for (let letra of stringUtilitaria){
        if (letra >= "0" && letra <= "9"){
            valorVazio = valorVazio + letra;
        }
    }
    return valorVazio;
}
function validaTelefone(telefone){
    const valorLimpo = normalizaTel(telefone.trim());
    if (!valorLimpo) return false;
    if (valorLimpo.length !== 11) {
      return false;
    }   
    const arrayDigitos = valorLimpo.split("");
    if (arrayDigitos.every(n => n === arrayDigitos[0])){
        return false 
    }
    if (arrayDigitos[2] !== '9'){
        return false
    }
    return true
    
}



numeroCartao.addEventListener('input', () =>{
    const valorInputNumeroCartao = numeroCartao.value;
    const resultadoFormatacao = criaMascaraCartao(valorInputNumeroCartao)
    numeroCartao.value = resultadoFormatacao;
});

function formataNumeroCartao(stringUtilitariaCartao){
        let valorVazio = "";
    for (let letra of stringUtilitariaCartao){
        if (letra >= "0" && letra <= "9"){
            valorVazio = valorVazio + letra;
        }
    }
    return valorVazio;
}

function criaMascaraCartao(stringUtilitariaCartao){
  let resultado = '';
  let contador = 0;
  const valorFormaformatado = formataNumeroCartao(stringUtilitariaCartao);
  for (let i = 0; i < valorFormaformatado.length; i++) {
    contador = contador+ 1;
    resultado = resultado + valorFormaformatado[i]
    if (contador === 4 && i + 1 < valorFormaformatado.length) {
        resultado += ' ';
        contador = 0;
        
    }   
  }
return resultado;

}

function validaNumeroCartao(cartao){
    const valorLimpoCartao = formataNumeroCartao(cartao.trim());
    if (!valorLimpoCartao) return false;
    if (valorLimpoCartao.length > 19) return false;
    //falta inserir o algoritmo de luhn para finalizar validação, por isso não retorna true
}
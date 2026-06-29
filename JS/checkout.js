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
    if (valorLimpoCartao.length > 19 || valorLimpoCartao.length < 16) return false;
    //falta inserir o algoritmo de luhn para finalizar validação, por isso não retorna true
    return true 
}

dataValidadeCartao.addEventListener('input', () =>{ 
    const ValorValidade = dataValidadeCartao.value;
    const mascaraArmazenada = criaMascaraValidade(ValorValidade);
    dataValidadeCartao.value = mascaraArmazenada;
})


function criaMascaraValidade(stringUtilitariaCartao){
    const valorFormatado = formataNumeroCartao(stringUtilitariaCartao);
    const primeiroPedaco = valorFormatado.slice(0,2);
    const segundoPedaco = valorFormatado.slice(2,4);
    if (valorFormatado.length < 2) return valorFormatado;
    if (valorFormatado.length > 3) return `${primeiroPedaco}/${segundoPedaco}`;
    
    return valorFormatado;
    }

function validaValidadeCartao(cartao){
    const validadeLimpa = formataNumeroCartao(cartao.trim());
    if (!validadeLimpa) return false 
    if (validadeLimpa.length !== 4 ) return false;
    const arrayDigitos = validadeLimpa.split("");
    if (arrayDigitos.every(n => n === arrayDigitos[0])){
        return false 
    }
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear() % 100;
    const mesAtual = dataAtual.getMonth() +1;
    const MM = validadeLimpa.slice(0,2);
    const mes = Number(MM);
    const AA = validadeLimpa.slice(2,4);
    const ano = Number(AA);
    if ( ano < anoAtual) return false;

    if (ano > anoAtual )return true;

    if (mes < mesAtual) return false;

    return true

}

function validaCVV(CodigoCvv){
    const valorSemEspaco = CodigoCvv.trim();
    const soNumeros = /^\d+$/.test(valorSemEspaco);
    if (!valorSemEspaco) return false;
    if (!soNumeros) return false;
    const arrayDigitos = valorSemEspaco.split("");
    if (arrayDigitos.every(n => n === arrayDigitos[0])){
        return false 
    }
    if (valorSemEspaco.length <3  || valorSemEspaco.length >4 ) return false
    
    return true
    
}

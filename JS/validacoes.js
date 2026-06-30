import { extrairNumero } from "./utils.js";
export function validaNomeInput(nome){
 const valorRealNome =  nome.trim();
    if (!valorRealNome) {
        return false;
    }
    if (valorRealNome.length > 2 && valorRealNome.length <= 180 ){
      return true ;
    }
    return false;

}

export function validaEmailInput(email){
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

export function validaTelefone(telefone){
    const valorLimpo = extrairNumero(telefone.trim());
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

export function validaNumeroCartao(cartao){
    const valorLimpoCartao = extrairNumero(cartao.trim());
    if (!valorLimpoCartao) return false;
    if (valorLimpoCartao.length > 19 || valorLimpoCartao.length < 16) return false;
    return true 
}

export function validaValidadeCartao(cartao){
    const validadeLimpa = extrairNumero(cartao.trim());
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

export function validaCVV(CodigoCvv){
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

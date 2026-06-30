export function extrairNumero(stringUtilitaria){
    let valorVazio = "";
    for (let letra of stringUtilitaria){
        if (letra >= "0" && letra <= "9"){
            valorVazio = valorVazio + letra;
        }
    }
    return valorVazio;
}
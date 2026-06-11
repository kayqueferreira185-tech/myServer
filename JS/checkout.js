
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
const areaQrCodePix = document.querySelector('.area-pix.hidden');

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
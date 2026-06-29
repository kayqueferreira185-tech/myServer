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


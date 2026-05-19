const sessao = document.querySelector ('.cards');

sessao.addEventListener('click', (e) =>{
  const card =  e.target.closest('.planos');
  if (!card) return;
  const todosCard = document.querySelectorAll('.planos');
  for (let i = 0; i < todosCard.length; i++){
  todosCard[i].classList.remove('selected');
  }
  card.classList.add('selected');

});

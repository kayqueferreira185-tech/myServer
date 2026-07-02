☁️ MyServer - Escolha seu Plano

Projeto front-end de uma plataforma fictícia de hospedagem de servidores, desenvolvido com foco em praticar JavaScript moderno, manipulação do DOM, modularização de código e validação de formulários.

O usuário pode navegar entre os planos disponíveis, visualizar um resumo da compra e concluir um fluxo completo de checkout com validações, máscaras de entrada e confirmação da compra.

🚀 Funcionalidades
Renderização dinâmica dos planos.
Seleção de plano.
Resumo da compra.
Persistência do plano selecionado utilizando localStorage.
Checkout com validação completa dos campos.
Máscaras para telefone, cartão e validade.
Alternância entre pagamento por cartão e Pix.
Exibição de mensagens de erro em tempo real.
Modal de confirmação de compra.
Organização do código utilizando módulos ES6.
🛠 Tecnologias utilizadas
HTML5
CSS3
JavaScript (ES Modules)
DOM API
LocalStorage
Git
GitHub
📂 Estrutura do projeto
projeto_escolha_seu_plano/
│
├── assets/
│   └── imagens/
│
├── CSS/
│   ├── style.css
│   ├── resumo.css
│   └── checkout.css
│
├── dados/
│   └── planos.js
│
├── JS/
│   ├── Script.js
│   ├── render.js
│   ├── resumo.js
│   ├── checkout.js
│   ├── validacoes.js
│   └── utils.js
│
├── index.html
├── resumo.html
├── checkout.html
└── README.md

⚙️ Como funciona

Na página inicial, os planos são renderizados dinamamente através do arquivo planos.js.

Quando o usuário seleciona um plano, apenas o seu ID é armazenado no localStorage.

Na página de resumo, esse ID é recuperado para localizar o plano correspondente na base de dados da aplicação, evitando armazenar objetos completos no navegador.

Durante o checkout, o formulário realiza validações dos dados informados, exibe mensagens de erro quando necessário e, ao finalizar corretamente, apresenta um modal confirmando a conclusão da compra.

📚 Conceitos praticados

Durante o desenvolvimento deste projeto foram aplicados conceitos como:

Manipulação do DOM
Event Delegation
Modularização com ES Modules
Organização de responsabilidades entre arquivos
Renderização dinâmica
Criação de componentes via JavaScript
Validação de formulários
Máscaras de entrada
Manipulação de classes CSS
Persistência de dados com LocalStorage
Fluxo entre múltiplas páginas
📌 Observações

Este projeto foi desenvolvido como parte do meu processo de aprendizado em desenvolvimento Front-end, tendo como foco principal a prática de JavaScript, manipulação do DOM, modularização e arquitetura básica de aplicações.

Durante seu desenvolvimento, meu conhecimento sobre responsividade ainda estava em evolução. Por esse motivo, algumas interfaces podem apresentar limitações em telas menores. Pretendo revisitar este projeto futuramente para aplicar melhorias relacionadas à responsividade, acessibilidade e outras boas práticas adquiridas ao longo dos estudos.

Este projeto é uma simulação para fins de estudo e portfólio. Nenhum pagamento é processado e todos os dados utilizados durante o checkout são fictícios.

👨‍💻 Autor

Desenvolvido por Kayque Ferreira.

GitHub:
https://github.com/kayqueferreira185-tech

Projeto desenvolvido para fins de estudo e composição de portfólio.
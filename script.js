const divContent = document.querySelector('.content');
const inputSearch = document.querySelector('input[type="search"]');
const url = './rede-costa-verde.json';
let items = [];

// Função para renderizar os itens na lista
function renderItems(filteredItems) {
  divContent.innerHTML = '';

  filteredItems.forEach(item => {
    const { nome, seguimento, telefone, regiao, endereco, princServicos } = item;

    const li = document.createElement('li');
    li.innerHTML = `
      <h3 class="regiao">${regiao}</h3>
      <p class="nome"><strong>${nome}</strong></p>
      <p class="seguimento">${seguimento}</p>
      <p class="telefone">${telefone}</p>
      <p class="endereco">${endereco}</p>
      <p class="princServicos">${princServicos}</p>
      <button class="salvar-local">Salvar local</button>
    `;
    divContent.append(li);
  });
}

// Realizar a requisição inicial para obter os dados
fetch(url)
  .then(response => response.json())
  .then(redeJson => {
    items = redeJson.map(rede => ({
      nome: rede.nome,
      seguimento: rede.seguimento,
      telefone: rede.telefone,
      regiao: rede.regiao,
      endereco: rede.endereco,
      princServicos: rede.princServicos
    }));
  });

//Evento de input para realizar a busca
inputSearch.addEventListener('input', function() {
    const searchTerm = inputSearch.value.toLowerCase();
    const filteredItems = items.filter(item =>
        item.regiao.toLowerCase().includes(searchTerm)
    );

    renderItems(filteredItems);

    if(searchTerm === '') {
        divContent.innerHTML = ''
    }
});

// Listar por Opcao Selecionada
function selecionarOpcao(selectElement) {
    const opcaoSelecionada = selectElement.value

    //Logica para buscar por regiao
    if(opcaoSelecionada === 'por-regiao') {
        inputKey.placeholder = 'Encontre pelo nome do Municipio';

        inputSearch.addEventListener('input', function() {
            const searchTerm = inputSearch.value.toLowerCase();
            const filteredItems = items.filter(item =>
                item.regiao.toLowerCase().includes(searchTerm)
            );
        
            renderItems(filteredItems);
        
            if(searchTerm === '') {
                divContent.innerHTML = ''
            }
        });
    }

    // Logica para buscar por especialidade
    if(opcaoSelecionada === 'por-especialidade') {
        inputKey.placeholder = 'Encontre por especialidade ou exame';

        inputSearch.addEventListener('input', function() {
            const searchTerm = inputSearch.value.toLowerCase();
          
            const filteredItems = items.filter(item =>
              item.princServicos.some(servico => 
                servico.toLowerCase().includes(searchTerm))
            );
          
            renderItems(filteredItems);

            if(searchTerm === '') {
                divContent.innerHTML = ''
            }
          });
    }
}

// Listar pelo botao Buscar Toda Rede
const buscaRede = document.querySelector('#buscar-rede');

buscaRede.addEventListener('click', function() {
    const buscarRede = fetch(url);
    buscarRede
        .then(response => response.json())
        .then(redeJson => redeJson.forEach(rede => {
    const { nome, seguimento, telefone, regiao, endereco, princServicos } = rede
    
    items.push({
        nome: nome,
        seguimento: seguimento,
        telefone: telefone,
        regiao: regiao,
        endereco: endereco,
        princServicos: princServicos
    })

    const li = document.createElement('li')
    li.innerHTML = `
    <h3 class="regiao">${regiao}</h3>
    <p class="nome"><strong>${nome}</strong></p>
    <p class="seguimento">${seguimento}</p>
    <p class="telefone">${telefone}</p>
    <p class="endereco">${endereco}</p>
    <p class="princServicos">${princServicos}</p>
    <button class="salvar-local">Salvar local</button>
    `
    divContent.append(li)

}))
})

// Chamada da função selecionarOpcao após a definição
document.querySelector('#inputSelect').addEventListener('change', function() {
    selecionarOpcao(this);
});
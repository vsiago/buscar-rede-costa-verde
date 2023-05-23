const divContent = document.querySelector('.content');
const divListFavoritos = document.querySelector('.lista-favoritos')
const inputSearch = document.querySelector('input[type="search"]');
const btnLimpar = document.querySelector('.limpar')
const url = './rede-costa-verde.json';
let items = [];
let itemsFavoritos = []


// Funcao para limpar pesquisa
btnLimpar.addEventListener('click', () => {
  divContent.innerHTML = ''
})

// Funcao de salvar o item
function salvarItem(item) {
  const index = itemsFavoritos.findIndex(favorito => favorito.id === item.id);

  itemsFavoritos.push(item);

  

  itemsFavoritos.forEach(itemFavorito => {
    const { nome, seguimento, telefone, regiao, endereco, princServicos } = itemFavorito;

    const li = document.createElement('li');
    li.innerHTML += `
      <h3 class="regiao">${regiao}</h3>
      <p class="nome"><strong>${nome}</strong></p>
      <p class="seguimento">${seguimento}</p>
      <p class="telefone">${telefone}</p>
      <p class="endereco">${endereco}</p>
      <p class="princServicos">${princServicos}</p>
    `;

    divListFavoritos.append(li)
  })



  console.log(itemsFavoritos);
}

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

    const btnSalvarLocal = li.querySelector('.salvar-local');
    btnSalvarLocal.addEventListener('click', function() {
      salvarItem(item)
    })

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
    const searchTerm = inputSearch.value.toLowerCase();
    const filteredItems = items.filter(item =>
        item.regiao.toLowerCase().includes(searchTerm)
    );

    renderItems(filteredItems);
})


// Chamada da função selecionarOpcao após a definição
document.querySelector('#inputSelect').addEventListener('change', function() {
    selecionarOpcao(this);
});

console.log(itemsFavoritos);
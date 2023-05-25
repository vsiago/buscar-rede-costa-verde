// Elementos DOM
const divContent = document.querySelector('.content');
const divListFavoritos = document.querySelector('.lista-favoritos');
const inputSearch = document.querySelector('input[type="search"]');
const btnLimpar = document.querySelector('.limpar');
const buscaRede = document.querySelector('#buscar-rede');
const inputSelect = document.querySelector('#inputSelect');
const containerAddFavoritos = document.querySelector('.container-add-favoritos')

// Constantes
const url = './rede-costa-verde.json';

// Variáveis
let items = [];
let itemsFavoritos = [];

// Função principal: inicialização do aplicativo
function initializeApp() {
  fetchItems();
  setupEventListeners();
  loadItemsFavoritosFromLocalStorage();
}

// Função para buscar os dados
function fetchItems() {
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
    })
    .catch(error => {
      console.error('Erro ao buscar os dados:', error);
    });
}

// Função para configurar os event listeners
function setupEventListeners() {
  buscaRede.addEventListener('click', buscarRede);
  inputSearch.addEventListener('input', buscarRede);
  inputSelect.addEventListener('change', selecionarOpcao);
  btnLimpar.addEventListener('click', limparPesquisa);
}

// Função para buscar a rede
function buscarRede() {
  const searchTerm = inputSearch.value.toLowerCase();

  let filteredItems;
  if (inputSelect.value === 'por-regiao') {
    filteredItems = items.filter(item =>
      item.regiao.toLowerCase().includes(searchTerm)
    );
  } else if (inputSelect.value === 'por-especialidade') {
    filteredItems = items.filter(item =>
      item.princServicos.some(servico =>
        servico.toLowerCase().includes(searchTerm)
      )
    );
  }

  renderItems(filteredItems);
}

// Função para selecionar a opção
function selecionarOpcao() {
  if (inputSelect.value === 'por-regiao') {
    inputSearch.placeholder = 'Encontre pelo nome do Município';
  } else if (inputSelect.value === 'por-especialidade') {
    inputSearch.placeholder = 'Encontre por especialidade ou exame';
  }

  buscarRede();
}

// Função para limpar a pesquisa
function limparPesquisa() {
  divContent.innerHTML = '';
}

// Função para renderizar os itens encontrados
function renderItems(items) {
  divContent.innerHTML = '';

  items.forEach(item => {
    const { nome, seguimento, telefone, regiao, endereco, princServicos } = item;

    const li = createListItemElement(`
      <a class="icon-gps" href="https://www.google.com/maps/place/${endereco}"><img src="./img/icone-gps.svg"></a>
      <h3 class="regiao">${regiao}</h3>
      <p class="nome"><strong>${nome}</strong></p>
      <p class="seguimento">${seguimento}</p>
      <p class="telefone">${telefone}</p>
      <p class="endereco">${endereco}</p>
      <p class="princServicos">${princServicos}</p>
      <button class="salvar-local">Salvar local</button>
    `);

    li.querySelector('.salvar-local').addEventListener('click', () => {
      salvarItem(item);
    });

    divContent.appendChild(li);
  });
}

// Função para criar um elemento de lista
function createListItemElement(html) {
  const li = document.createElement('li');
  li.innerHTML = html;
  return li;
}

// Função para salvar um item nos favoritos
function salvarItem(item) {
  const enderecoExistente = itemsFavoritos.some(
    favorito => favorito.endereco === item.endereco
  );

  if (enderecoExistente) {
    return;
  }

  itemsFavoritos.unshift(item);
  saveItemsFavoritosToLocalStorage();
  renderItemsFavoritos();
}

// Função para renderizar os itens favoritos
function renderItemsFavoritos() {
  divListFavoritos.innerHTML = '';

  setTimeout(() => {
    const pFavoritos = document.createElement('p')
    pFavoritos.innerHTML = '<p class="title-favoritos">LOCAIS FAVORITOS</p>'
    divListFavoritos.prepend(pFavoritos)
  },60)

  if(itemsFavoritos.length >= 1) {
    containerAddFavoritos.remove()
  } 

  itemsFavoritos.reverse()

  for (let i = 0; i < itemsFavoritos.length; i++) {
    const { nome, seguimento, telefone, regiao, endereco, princServicos } = itemsFavoritos[i];

    const li = createListItemElement(`
      <a class="icon-gps" href="https://www.google.com/maps/place/${endereco}"><img src="./img/icone-gps.svg"></a>
      <h3 class="regiao">${regiao}</h3>
      <p class="nome"><strong>${nome}</strong></p>
      <p class="seguimento">${seguimento}</p>
      <p class="telefone">${telefone}</p>
      <p class="endereco">${endereco}</p>
      <p class="princServicos">${princServicos}</p>
    `);

    divListFavoritos.prepend(li);
  }
}

// Função para salvar os itens favoritos no Local Storage
function saveItemsFavoritosToLocalStorage() {
  try {
    localStorage.setItem('itemsFavoritos', JSON.stringify(itemsFavoritos));
  } catch (error) {
    console.error('Erro ao salvar no Local Storage:', error);
  }
}

// Função para carregar os itens favoritos do Local Storage
function loadItemsFavoritosFromLocalStorage() {
  try {
    const storedItems = localStorage.getItem('itemsFavoritos');
    if (storedItems) {
      itemsFavoritos = JSON.parse(storedItems);
      renderItemsFavoritos();
    }
  } catch (error) {
    console.error('Erro ao carregar do Local Storage:', error);
  }
}

// Inicializar o aplicativo
initializeApp();

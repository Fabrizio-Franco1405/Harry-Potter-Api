// URL base de la API de Harry Potter
const API_URL = 'https://harry-potter-api.onrender.com';

// Mapeo de casas
const HOUSE_MAPPING = {
    'Gryffindor': 'Gryffindor',
    'Slytherin': 'Slytherin',
    'Hufflepuff': 'Hufflepuff',
    'Ravenclaw': 'Ravenclaw',
    '': 'Desconocida'
};

// Variables globales
let allCharacters = [];
let filteredCharacters = [];
let currentHouse = 'all';

// Elementos del DOM
const $charactersGrid = $('#charactersGrid');
const $loading = $('#loading');
const $searchInput = $('#searchInput');
const $searchBtn = $('#searchBtn');
const $filters = $('.filters .btn');

// Función para obtener los personajes usando Fetch
function fetchCharacters() {
    $loading.show();
    $charactersGrid.empty();
    
    fetch(`${API_URL}/personajes`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los personajes');
            }
            return response.json();
        })
        .then(characters => {
            allCharacters = characters.map(character => ({
                id: character.id,
                name: character.personaje || 'Personaje desconocido',
                nickname: character.apodo || '',
                house: character.casaDeHogwarts || 'Desconocida',
                image: character.imagen || 'https://via.placeholder.com/300x400?text=Sin+imagen',
                actor: character.interpretado_por || 'No especificado',
            }));
            
            filteredCharacters = [...allCharacters];
            displayCharacters(filteredCharacters);
        })
        .catch(error => {
            console.error('Error:', error);
            $charactersGrid.html(`
                <div class="col-12 text-center text-danger">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <p>Error al cargar los personajes. Inténtalo de nuevo más tarde.</p>
                </div>
            `);
        })
        .finally(() => {
            $loading.hide();
        });
}

// Función para buscar personajes
function searchCharacters(query) {
    $loading.show();
    $charactersGrid.empty();
    
    // Filtrar los personajes ya cargados
    const searchQuery = query.toLowerCase();
    filteredCharacters = allCharacters.filter(character => 
        character.name.toLowerCase().includes(searchQuery) ||
        character.house.toLowerCase().includes(searchQuery) ||
        (character.actor && character.actor.toLowerCase().includes(searchQuery))
    );
    
    if (filteredCharacters.length === 0) {
        $charactersGrid.html(`
            <div class="col-12 text-center">
                <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                <p>No se encontraron personajes que coincidan con "${query}".</p>
            </div>
        `);
    } else {
        displayCharacters(filteredCharacters);
    }
    
    $loading.hide();
}

// Función para filtrar personajes por casa
function filterByHouse(house) {
    currentHouse = house;
    
    if (house === 'all') {
        filteredCharacters = [...allCharacters];
    } else {
        filteredCharacters = allCharacters.filter(character => 
            character.house === house
        );
    }
    
    displayCharacters(filteredCharacters);
}

// Función para mostrar los personajes en la cuadrícula
function displayCharacters(characters) {
    $charactersGrid.empty();
    
    if (characters.length === 0) {
        $charactersGrid.html(`
            <div class="col-12 text-center">
                <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                <p>No se encontraron personajes que coincidan con tu búsqueda.</p>
            </div>
        `);
        return;
    }
    
    characters.forEach(character => {
        const houseClass = character.house ? character.house.toLowerCase() : 'desconocida';
        
        const characterCard = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="character-card">
                    <img src="${character.image}" alt="${character.name}" class="character-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400?text=Imagen+no+disponible'">
                    <div class="character-info">
                        <h3 class="character-name">${character.name}</h3>
                        <span class="character-house house-${houseClass}">
                            ${character.house}
                        </span>
                        <div class="character-details">
                            ${character.nickname ? `<p><strong>Apodo:</strong> ${character.nickname}</p>` : ''}
                            <p><strong>Casa:</strong> ${character.house}</p>
                            <p><strong>Intérprete:</strong> ${character.actor}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $charactersGrid.append(characterCard);
    });
}

// Event Listeners
$(document).ready(function() {
    // Cargar personajes al iniciar
    fetchCharacters();
    
    // Buscar al hacer clic en el botón de búsqueda
    $searchBtn.on('click', function() {
        const query = $searchInput.val().trim();
        if (query) {
            searchCharacters(query);
        } else {
            filteredCharacters = [...allCharacters];
            displayCharacters(filteredCharacters);
        }
    });
    
    // Buscar al presionar Enter en el input
    $searchInput.on('keyup', function(e) {
        if (e.key === 'Enter') {
            $searchBtn.click();
        }
    });
    
    // Filtrar por casa
    $filters.on('click', function() {
        const house = $(this).data('house');
        $filters.removeClass('active');
        $(this).addClass('active');
        filterByHouse(house);
    });
});
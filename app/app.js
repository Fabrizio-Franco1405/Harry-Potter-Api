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

// Función para obtener una imagen de placeholder basada en la casa
function getHousePlaceholder(house) {
    const houseLower = (house || '').toLowerCase();
    const colors = {
        'gryffindor': 'DC143C', // Rojo
        'slytherin': '2E8B57',  // Verde
        'ravenclaw': '4169E1',   // Azul
        'hufflepuff': 'FFD700'   // Amarillo
    };
    const color = colors[houseLower] || '808080'; // Gris por defecto
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(house || '?')}&background=${color}&color=fff&size=300`;
}

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
            // Verificar si la respuesta es un array
            if (!Array.isArray(characters)) {
                throw new Error('Formato de datos inesperado');
            }

            // Mapear todos los personajes con manejo de imágenes
            allCharacters = characters.map(character => {
                const house = character.casaDeHogwarts || 'Desconocida';
                const name = character.personaje || 'Personaje desconocido';
                const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
                
                return {
                    id: character.id || Math.random().toString(36).substr(2, 9),
                    name: name,
                    nickname: character.apodo || '',
                    house: house,
                    image: character.imagen || getHousePlaceholder(house),
                    actor: character.interpretado_por || 'No especificado',
                    // Agregamos un fallback en caso de que la imagen falle al cargar
                    fallbackImage: getHousePlaceholder(house)
                };
            });
            
            filteredCharacters = [...allCharacters];
            displayCharacters(filteredCharacters);
        })
        .catch(error => {
            console.error('Error:', error);
            $charactersGrid.html(`
                <div class="col-12 text-center text-danger">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <p>Error al cargar los personajes: ${error.message}</p>
                    <button class="btn btn-primary mt-2" onclick="fetchCharacters()">
                        <i class="fas fa-sync-alt me-2"></i>Reintentar
                    </button>
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
                    <img src="${character.image}" 
                 alt="${character.name}" 
                 class="character-image" 
                 onerror="this.onerror=null; this.src='${character.fallbackImage}'; this.alt='${character.name} (sin imagen)'">
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
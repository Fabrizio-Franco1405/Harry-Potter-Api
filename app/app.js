// URL base de la API de Harry Potter
const API_URL = 'https://api.potterdb.com/v1/characters';

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
    
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los personajes');
            }
            return response.json();
        })
        .then(data => {
            allCharacters = data.data.map(character => ({
                id: character.id,
                name: character.attributes.name,
                house: character.attributes.house || 'Desconocida',
                species: character.attributes.species || 'Desconocida',
                patronus: character.attributes.patronus || 'Desconocido',
                ancestry: character.ancestry || 'Desconocida',
                image: character.attributes.image || 'https://via.placeholder.com/300x400?text=Sin+imagen',
                actor: character.attributes.actor || 'Desconocido'
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

// Función para buscar personajes usando jQuery AJAX
function searchCharacters(query) {
    $loading.show();
    $charactersGrid.empty();
    
    $.ajax({
        url: API_URL,
        method: 'GET',
        data: { 'filter[name_cont]': query },
        dataType: 'json',
        success: function(data) {
            filteredCharacters = data.data.map(character => ({
                id: character.id,
                name: character.attributes.name,
                house: character.attributes.house || 'Desconocida',
                species: character.attributes.species || 'Desconocida',
                image: character.attributes.image || 'https://via.placeholder.com/300x400?text=Sin+imagen'
            }));
            
            displayCharacters(filteredCharacters);
        },
        error: function(error) {
            console.error('Error en la búsqueda:', error);
            $charactersGrid.html(`
                <div class="col-12 text-center text-danger">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <p>Error en la búsqueda. Inténtalo de nuevo.</p>
                </div>
            `);
        },
        complete: function() {
            $loading.hide();
        }
    });
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
                    <img src="${character.image}" alt="${character.name}" class="character-image">
                    <div class="character-info">
                        <h3 class="character-name">${character.name}</h3>
                        <span class="character-house house-${houseClass}">
                            ${character.house}
                        </span>
                        <div class="character-details">
                            <p><strong>Especie:</strong> ${character.species}</p>
                            <p><strong>Patronus:</strong> ${character.patronus}</p>
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
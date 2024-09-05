const DATA_URL = 'data/destination.json'; // URL del JSON local o API externa

let cart = []; // Arreglo para almacenar los destinos añadidos al carrito

// Función para mostrar destinos
function displayDestinations(destinations) {
    const container = document.getElementById('destinations');
    container.innerHTML = ''; // Limpiar el contenedor

    destinations.forEach(destination => {
        const card = document.createElement('div');
        card.classList.add('destination-card');
        
        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
            <p>Precio: $${destination.price.toFixed(2)} por persona</p>
            <label for="peopleSelect-${destination.id}">Número de personas:</label>
            <select id="peopleSelect-${destination.id}" data-id="${destination.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <!-- Añadir más opciones si es necesario -->
            </select>
            <button data-id="${destination.id}" class="add-to-cart">Añadir al Carrito</button>
        `;

        container.appendChild(card);
    });

    // Añadir evento a los botones de "Añadir al Carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Función para añadir un destino al carrito
function addToCart(event) {
    const destinationId = event.target.getAttribute('data-id');
    const peopleSelect = document.getElementById(`peopleSelect-${destinationId}`);
    const numberOfPeople = parseInt(peopleSelect.value, 10);

    fetch(DATA_URL)
        .then(response => response.json())
        .then(data => {
            const destination = data.destinations.find(d => d.id === destinationId);
            if (destination) {
                // Calcula el precio total para el número de personas
                const totalPrice = destination.price * numberOfPeople;
                cart.push({ ...destination, numberOfPeople, totalPrice });
                updateCart();
            }
        });
}

// Función para actualizar el carrito
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = ''; // Limpiar el carrito
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (${item.numberOfPeople} personas) - $${item.totalPrice.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.totalPrice;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Manejo de la búsqueda
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value;
    fetch(DATA_URL)
        .then(response => response.json())
        .then(data => {
            const filteredDestinations = filterDestinations(query, data.destinations);
            displayDestinations(filteredDestinations);
        });
});

// Función para filtrar destinos
function filterDestinations(query, destinations) {
    return destinations.filter(destination =>
        destination.name.toLowerCase().includes(query.toLowerCase())
    );
}

// Manejo de la ordenación
document.getElementById('sortSelect').addEventListener('change', (event) => {
    const criterion = event.target.value;
    fetch(DATA_URL)
        .then(response => response.json())
        .then(data => {
            const sortedDestinations = sortDestinations(data.destinations, criterion);
            displayDestinations(sortedDestinations);
        });
});

// Función para ordenar destinos
function sortDestinations(destinations, criterion) {
    return destinations.sort((a, b) => {
        if (a[criterion] < b[criterion]) return -1;
        if (a[criterion] > b[criterion]) return 1;
        return 0;
    });
}

// Función para manejar la compra
document.getElementById('checkoutButton').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('¡Compra realizada con éxito!');
        cart = []; // Vaciar el carrito después de la compra
        updateCart();
    } else {
        alert('Tu carrito está vacío.');
    }
});

// Cargar destinos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetch(DATA_URL)
        .then(response => response.json())
        .then(data => {
            displayDestinations(data.destinations);
        });
});

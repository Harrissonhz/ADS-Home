// Cargar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const totalElement = document.getElementById('total');
const cartCount = document.getElementById('cart-count');

// Función para actualizar el contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Función para actualizar los totales
function updateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.99 : 0; // Costo de envío fijo
    const total = subtotal + shipping;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Función para renderizar los items del carrito
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <p class="text-muted">Tu carrito está vacío</p>
                <a href="index.html" class="btn btn-primary">Continuar Comprando</a>
            </div>
        `;
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item d-flex align-items-center mb-3';
        itemElement.innerHTML = `
            <div class="flex-grow-1">
                <h5 class="mb-1">${item.name}</h5>
                <p class="mb-0 text-muted">$${item.price.toFixed(2)}</p>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-outline-secondary btn-sm decrease-quantity" data-id="${item.id}">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-outline-secondary btn-sm increase-quantity" data-id="${item.id}">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="btn btn-danger btn-sm ms-3 remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    // Agregar eventos a los botones
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.closest('button').dataset.id;
            decreaseQuantity(id);
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.closest('button').dataset.id;
            increaseQuantity(id);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.closest('button').dataset.id;
            removeItem(id);
        });
    });
}

// Función para disminuir la cantidad
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Función para aumentar la cantidad
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    item.quantity++;
    updateCart();
}

// Función para eliminar un item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateTotals();
    updateCartCount();
}

// Evento para el botón de pago
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    // Aquí se implementaría la lógica de pago
    alert('Procesando pago...');
});

// Inicializar el carrito
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateTotals();
    updateCartCount();
}); 
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById('menuToggle'); // Hamburger menu button
    const navOverlay = document.getElementById('nav-overlay'); // Background overlay
    const navContent = document.getElementById('navLinks'); // Sidebar content
    const closeMenu = document.getElementById('closeBtn'); // Close button

    // Function to show the sidebar and overlay
    function openMenu() {
        navOverlay.style.display = 'block'; // Show the overlay
        navContent.classList.add('show'); // Show the sidebar by adding the class
    }

    // Function to hide the sidebar and overlay
    function closeMenuWithDelay() {
        navContent.classList.remove('show'); // Remove the class to hide the sidebar
        setTimeout(() => {
            navOverlay.style.display = 'none'; // Hide the overlay after transition
        }, 300); // Delay matches the CSS transition time
    }

    // Open the menu when the hamburger icon is clicked
    hamburgerMenu.addEventListener('click', openMenu);

    // Close the menu when the close button or the overlay is clicked
    closeMenu.addEventListener('click', closeMenuWithDelay);
    navOverlay.addEventListener('click', closeMenuWithDelay);
});

let cart = [];
const cartIcon = document.querySelector('.cart');
const cartCount = document.createElement('span');
cartCount.classList.add('cart-count');
cartCount.textContent = '0';
cartIcon.appendChild(cartCount);

// Select the popup elements
const cartPopup = document.getElementById('cartPopup');
const closePopup = document.getElementById('closePopup');
const cartItemsContainer = cartPopup.querySelector('.cart-items');
const cartTotalDisplay = cartPopup.querySelector('.cart-total');

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: parseFloat(productPrice) });
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.length;

    // Clear current cart items
    cartItemsContainer.innerHTML = '';

    // Populate the cart with items
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update the total
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to toggle the cart popup
function toggleCartPopup() {
    cartPopup.classList.toggle('show');
}

// Add event listeners to add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
        toggleCartPopup(); // Show the cart popup when item is added
    });
});

// Show the cart popup when cart icon is clicked
cartIcon.addEventListener('click', toggleCartPopup);

// Close the cart popup when the close button is clicked
closePopup.addEventListener('click', toggleCartPopup);

// Close the cart popup when clicking outside the popup
window.addEventListener('click', (event) => {
    if (event.target === cartPopup) {
        toggleCartPopup();
    }
});





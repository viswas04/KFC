let cart = [];

// Function to add item to cart
function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push({ item: item, price: price, quantity: 1 }); // Add new item to cart
    }
    updateCart();
    showAlert(`${item} has been added to your cart!`);
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = ''; // Clear current list
    let total = 0;

    if (cart.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Your cart is empty.';
        cartItems.appendChild(emptyMessage);
    } else {
        cart.forEach((cartItem, index) => {
            const li = document.createElement('li');
            li.textContent = `${cartItem.item} (x${cartItem.quantity}) - ₹${(cartItem.price * cartItem.quantity).toFixed(2)}`;
            cartItems.appendChild(li);
            total += cartItem.price * cartItem.quantity;
        });

        const totalLi = document.createElement('li');
        totalLi.textContent = `Total: ₹${total.toFixed(2)}`;
        cartItems.appendChild(totalLi);
    }

    // Update hidden input for order details
    document.getElementById('orderDetails').value = JSON.stringify(cart);
    
    // Fade-in effect
    cartItems.style.opacity = 0; // Start with opacity 0
    setTimeout(() => {
        cartItems.style.opacity = 1; // Fade-in effect
    }, 50);
}

// Function to show order form
function showOrderForm() {
    if (cart.length === 0) {
        showAlert("Your cart is empty! Add some items before proceeding.");
        return; // Prevent showing order form if cart is empty
    }

    const orderSection = document.getElementById("order");
    const cartSummary = document.getElementById("cartSummary");

    // Fill the order summary
    let summaryText = '';
    cart.forEach(cartItem => {
        summaryText += `${cartItem.item} (x${cartItem.quantity}) - ₹${(cartItem.price * cartItem.quantity).toFixed(2)}\n`;
    });
    summaryText += `Total: ₹${cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0).toFixed(2)}`;
    cartSummary.value = summaryText;

    // Show the order section
    orderSection.style.display = 'block';
}

// Function to show alert messages
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.className = 'alert';
    document.body.appendChild(alertBox);

    // Fade-out effect after 2 seconds
    setTimeout(() => {
        alertBox.style.opacity = 0; 
        setTimeout(() => alertBox.remove(), 500); // Remove after fade-out
    }, 2000);
}

// Function to clear the cart
function clearCart() {
    cart = []; // Reset the cart
    updateCart(); // Update display
    showAlert("Your cart has been cleared.");
}

// Adding clear cart button functionality
const clearCartButton = document.createElement('button');
clearCartButton.textContent = 'Clear Cart';
clearCartButton.onclick = clearCart;
document.getElementById('cart').appendChild(clearCartButton);
// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = ''; // Clear current list
    let total = 0;

    if (cart.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Your cart is empty.';
        cartItems.appendChild(emptyMessage);
    } else {
        cart.forEach((cartItem) => {
            const li = document.createElement('li');
            li.textContent = `${cartItem.item} - ₹${(cartItem.price).toFixed(2)} (x${cartItem.quantity})`;

            // Create +/- buttons
            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.onclick = () => updateItemQuantity(cartItem.item, 1);

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.onclick = () => updateItemQuantity(cartItem.item, -1);
            minusButton.disabled = cartItem.quantity === 1; // Disable if quantity is 1

            li.appendChild(minusButton);
            li.appendChild(plusButton);
            cartItems.appendChild(li);
            total += cartItem.price * cartItem.quantity;
        });

        const totalLi = document.createElement('li');
        totalLi.textContent = `Total: ₹${total.toFixed(2)}`;
        cartItems.appendChild(totalLi);
    }

    // Update hidden input for order details
    document.getElementById('orderDetails').value = JSON.stringify(cart);
    
    // Fade-in effect
    cartItems.style.opacity = 0; // Start with opacity 0
    setTimeout(() => {
        cartItems.style.opacity = 1; // Fade-in effect
    }, 50);
}

// Function to update item quantity
function updateItemQuantity(item, change) {
    const cartItem = cart.find(cartItem => cartItem.item === item);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.item !== item); // Remove item if quantity is zero
        }
        updateCart();
    }
}
function showOrderForm() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some items before proceeding.");
        return; // Prevent showing order form if cart is empty
    }

    // Redirect to the QR code image URL
    window.location.href = "https://github.com/viswas04/IMAGES/blob/main/PHONEPE%20QR.jpg?raw=true"; // Replace with your QR code image URL
}
function showOrderForm() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some items before proceeding.");
        return; // Prevent showing order form if cart is empty
    }

    // Redirect to the payment timer page
    window.location.href = "apayment_timer.html"; // Ensure the path is correct
}

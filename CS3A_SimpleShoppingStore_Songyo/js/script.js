let cart = [];
let totalPrice = 0;

function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; 
    totalPrice = 0; 

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;


        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeFromCart(item.name); 
        });

        li.appendChild(removeButton); 
        cartList.appendChild(li);
        totalPrice += item.price * item.quantity; 
    });

    document.getElementById('total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
}


function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 }); 
    }
    updateCart(); 
}


function removeFromCart(productName) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity -= 1; 
        if (existingProduct.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName); 
        }
    }
    updateCart(); 
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.parentElement;
        const productName = productCard.querySelector('h3').innerText;
        const productPriceInput = productCard.querySelector('.product-price');
        const productPrice = parseFloat(productPriceInput.value); 
        addToCart(productName, productPrice); 
    });
});

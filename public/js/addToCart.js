// script.js

document.addEventListener('DOMContentLoaded', function () {

    function updateCartNumber() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartNumber = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
        document.querySelector(".cart").textContent = cartNumber;
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (logoutBtn != null) {
                const card = button.closest('.card');
                const productId = card.querySelector('.product-id').value;
                const quantity = card.querySelector('.quantity').value;
                const price = card.querySelector('.price').innerText;
                const productImage = card.querySelector('img').src;
                const title = card.querySelector('.title').innerText;

                // Retrieve existing cart items from local storage
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

                // Check if the product already exists in the cart
                const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
                if (existingItemIndex !== -1) {
                    // If the product exists, update its quantity
                    cartItems[existingItemIndex].quantity += parseInt(quantity);
                } else {
                    // If the product doesn't exist, add it to the cart
                    cartItems.push({ productId, price, quantity: parseInt(quantity), productImage, title });
                }

                // Save updated cart items to local storage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCartNumber();
                // Optionally, you can display a confirmation message to the user
                alert('Item added to cart successfully.');
            }else{
                window.location.href = '/login';
            }
        });
    });
});

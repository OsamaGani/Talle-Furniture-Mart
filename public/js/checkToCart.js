function renderCartItem(
    productId,
    title,
    price,
    quantity,
    productImage
) {
    const container = document.querySelector(".container");
    const card = document.createElement("div");
    card.classList.add("card", "cart-item");
    card.setAttribute("data-product-id", productId);
    card.setAttribute("data-price", price);
    card.innerHTML = `
        <div class="img">
                <img src="${productImage}" alt="">
                <span>$${price}/-</span>
            </div>
            <p class="title">${title}</p>
            <input type="number" class="quantity" min="1" value="${quantity}" disabled>
        `;
    container.appendChild(card);
}

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
if (cartItems.length != 0) {
    cartItems.forEach((item) => {
        renderCartItem(
            item.productId,
            item.title,
            item.price,
            item.quantity,
            item.productImage
        );
    });
}


function calculateTotalCost() {
    let total = 0;
    document.querySelectorAll(".cart-item").forEach((item) => {
      const filteredPrice = item
        .getAttribute("data-price")
        .split(",")
        .join("");
      const price = parseInt(filteredPrice);
      const quantity = parseInt(item.querySelector(".quantity").value);
      total += price * quantity;
    });
    document.querySelector(".grand-total").textContent = `₹${total}/-`;
  }

  calculateTotalCost();
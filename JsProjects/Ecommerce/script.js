document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 49.999 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id = "${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
      // console.log(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
    // console.log(cart);
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-details");
        cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button data-index = "${index}" class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      saveCart();

      const removeBtn = cartItems.querySelectorAll(".remove-btn");
      removeBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = parseInt(e.target.getAttribute("data-index"));
          cart.splice(index, 1);
          renderCart();
        });
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `0.00`;
      saveCart();
    }
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("checkout successfully");
    // emptyCartMessage.classList.add("hidden");
    renderCart();
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});

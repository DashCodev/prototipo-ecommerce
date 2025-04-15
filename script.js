document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-cart");
  const cartCount = document.getElementById("cart-count");
  const cartModal = document.getElementById("cart-modal");
  const cartItemsList = document.getElementById("cart-items");
  const openCartBtn = document.getElementById("open-cart");
  const buyBtn = document.getElementById("buy-btn");

  // Reinicia el carrito al cargar la página
  let cart = [];
  localStorage.removeItem("cart"); // Limpia el almacenamiento local

  const updateCartCount = () => {
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      cartCount.textContent = `(${totalItems})`;
  };

  const saveCart = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCart = (productName, productPrice) => {
      const existingProduct = cart.find(item => item.name === productName);
      if (existingProduct) {
          existingProduct.quantity++;
      } else {
          cart.push({ name: productName, price: productPrice, quantity: 1 });
      }
      updateCartCount();
      saveCart();
  };

  const renderCart = () => {
      cartItemsList.innerHTML = "";
      cart.forEach(item => {
          const li = document.createElement("li");
          li.textContent = `${item.name} x${item.quantity}`;
          cartItemsList.appendChild(li);
      });
  };

  addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
          const card = e.target.closest(".card-product");
          const name = card.getAttribute("data-name");
          const price = parseFloat(card.getAttribute("data-price"));
          addToCart(name, price);
      });
  });

  openCartBtn.addEventListener("click", () => {
      renderCart();
      cartModal.classList.remove("hidden");
  });

  window.closeCart = () => {
      cartModal.classList.add("hidden");
  };

  buyBtn.addEventListener("click", () => {
      if (cart.length === 0) {
          alert("Tu carrito está vacío.");
          return;
      }

      let total = 0;
      let resumen = "Resumen de tu compra:\n\n";
      cart.forEach(item => {
          const subtotal = item.price * item.quantity;
          total += subtotal;
          resumen += `${item.name} x${item.quantity} = $${subtotal.toFixed(2)}\n`;
      });

      resumen += `\nTotal a pagar: $${total.toFixed(2)}`;
      alert(resumen);

      // Limpiar carrito
      cart = [];
      saveCart();
      updateCartCount();
      renderCart();
      closeCart();
  });

  updateCartCount(); // Estado inicial
});
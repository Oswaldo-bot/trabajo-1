const products = [
    { id: 1, name: "Buso negro", price: 300, image: "images/product1.jpg", sizes: ["XS", "S", "M", "L", "XL"] },
    { id: 2, name: "Pantalon Caqui", price: 150, image: "images/product2.jpg", sizes: [30, 32, 34, 36, 38, 40, 42]  },
    { id: 3, name: "Gorra negra", price: 200, image: "images/product3.jpg", sizes: ["Talla Unica"] },
    { id: 12, name: "Gorro Gris", price: 200, image: "images/product3.jpg", sizes: ["Talla Unica"] },
    { id: 4, name: "Pantalon Azul oscuro", price: 250, image: "images/product4.jpg",sizes: [30, 32, 34, 36, 38, 40, 42] },
    { id: 5, name: "Tenis Blancos", price: 300, image: "images/product5.jpg", sizes: [32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43] },
    { id: 6, name: "Tenis Negros", price: 350, image: "images/product6.jpg", sizes: [32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43] },
    { id: 7, name: "Camisa Polo Blanca", price: 400, image: "images/product7.jpg", sizes: ["XS", "S", "M", "L", "XL"] },
    { id: 8, name: "Camisa Polo Negra", price: 450, image: "images/product8.jpg", sizes: ["XS", "S", "M", "L", "XL"] },
    { id: 9, name: "Camisa Polo Roja", price: 450, image: "images/product8.jpg",sizes: ["XS", "S", "M", "L", "XL"] },
    { id: 10, name: "Camisa Polo azul", price: 450, image: "images/product8.jpg",sizes: ["XS", "S", "M", "L", "XL"] },
    { id: 11, name: "Tenis Grices", price: 450, image: "images/product8.jpg",sizes: [32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43] }

  ];
  
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");
  
  let cart = [];
  let totalPrice = 0;
  
  // Función para mostrar los productos
  function displayProducts() {
    productList.innerHTML = ""; // Limpia los productos anteriores
  
    products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
  
      // Crear selector de tallas dinámicamente
      let sizeOptions = "";
      product.sizes.forEach(size => {
        sizeOptions += `<option value="${size}">${size}</option>`;
      });
  
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2>${product.name}</h2>
        <p>Precio: $${product.price}</p>
        <label for="size-${product.id}">Talla:</label>
        <select id="size-${product.id}" class="size-select">
          ${sizeOptions}
        </select>
        <button onclick="addToCart(${product.id})">Añadir al carrito</button>
      `;
      productList.appendChild(productDiv);
    });
  }
  
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const selectedSize = document.getElementById(`size-${productId}`).value;
  
    // Agregar el producto con la talla seleccionada al carrito
    cart.push({ ...product, selectedSize });
    totalPrice += product.price;
    updateCartDisplay();
  }
  
   
  
  // Función para eliminar productos del carrito
  function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
      totalPrice -= cart[productIndex].price;
      cart.splice(productIndex, 1);
      updateCartDisplay();
    }
  }
  
  // Función para actualizar la visualización del carrito
  function updateCartDisplay() {
    cartItems.innerHTML = ""; // Limpia el carrito actual
  
    cart.forEach(item => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        ${item.name} - Talla: ${item.selectedSize} - $${item.price}
        <button class="delete-button" onclick="removeFromCart(${item.id})">Eliminar</button>
      `;
      cartItems.appendChild(cartItem);
    });
  
    totalPriceElement.textContent = `Total: $${totalPrice}`;
    cartCount.textContent = cart.length;
  }  
  
  
  // Mostrar los productos al cargar la página
  displayProducts();

// Botón de finalizar compra
document.getElementById("checkout-button").addEventListener("click", openModal);

// Función para abrir el modal de pago
function openModal() {
  document.getElementById("payment-modal").style.display = "flex";
}

// Función para cerrar el modal de pago
function closeModal() {
  document.getElementById("payment-modal").style.display = "none";
}

// Función para seleccionar el método de pago
function selectPayment(method) {
  alert(`Has seleccionado pagar con ${method}.`);
  closeModal();
}

// Función para agregar al carrito con validación
function agregarAlCarrito() {
  // Obtener el valor de la selección
  const tallaSeleccionada = document.getElementById('talla').value;

  // Verificar si se ha seleccionado una talla
  if (tallaSeleccionada === "") {
    // Mostrar el mensaje de error
    document.getElementById('error-message').style.display = "block";
  } else {
    // Si se seleccionó una talla, ocultar el mensaje de error (si es visible)
    document.getElementById('error-message').style.display = "none";
    // Aquí puedes agregar el producto al carrito o hacer cualquier otra acción
    alert('Producto agregado al carrito con la talla: ' + tallaSeleccionada);
  }
}

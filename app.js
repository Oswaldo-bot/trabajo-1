const products = [
    { id: 1, name: "Gorra Nike", price: 90.000, image: "images/product1.jpg",sizes: ["Talla Unica"],  colors: ["Blanco", "Rojo", "Negro", "Amarilla", "Azul","Gris"] },
    { id: 2, name: "Gorro Style", price: 50.000, image: "images/product2.jpg",sizes: ["Talla Unica"],  colors: ["Blanco", "Rojo", "Negro", "Amarilla", "Azul","Gris"] },
    { id: 1, name: "Camisa Tipo Polo", price: 72.000, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro","Rojo","Azul Oscuro","Verde Oscuro","Naranja Oscuro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["XS","S", "M", "L", "XL", "XXL"],  colors: ["Blanco", "Gris", "Negro"] },
    { id: 1, name: "Producto 1", price: 100, image: "images/product1.jpg",sizes: ["28","30", "32", "34", "36", "38"],  colors: ["Blanco", "Gris", "Negro"] },

  ];

 const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");


let cart = JSON.parse(localStorage.getItem('cart')) || []; // Recuperar carrito si existe

// Cargar productos
products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h2>${product.name}</h2>
      <p>Precio: $${product.price}</p>
      
      <!-- Selección de talla -->
      <label for="size-${product.id}">Tamaño:</label>
      <select id="size-${product.id}">
        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
      </select>
  
      <!-- Selección de color -->
      <label for="color-${product.id}">Color:</label>
      <select id="color-${product.id}">
        ${product.colors.map(color => `<option value="${color}">${color}</option>`).join("")}
      </select>
  
      <button onclick="addToCart(${product.id})">Añadir al carrito</button>
    `;
    productList.appendChild(productDiv);
  });
 

// Añadir al carrito
function addToCart(productId) {
    const sizeSelect = document.getElementById(`size-${productId}`);
    const colorSelect = document.getElementById(`color-${productId}`);
    
    const selectedSize = sizeSelect.value; // Obtener la talla seleccionada
    const selectedColor = colorSelect.value; // Obtener el color seleccionado
    
    if (!selectedSize || !selectedColor) {
      alert("Por favor, selecciona una talla y un color.");
      return;
    }
  
    const product = products.find(prod => prod.id === productId);
    cart.push({ ...product, size: selectedSize, color: selectedColor }); // Guardar producto con talla y color
    renderCart();
  }
  
// Función para actualizar el carrito visualmente
function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";
  
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price}`;
      cartItemsList.appendChild(li);
    })
}

// Mostrar carrito
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    cartList.innerHTML = ""; // Limpiar la lista de carrito

    let total = 0;

    cart.forEach(product => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        ${product.name} - $${product.price}
        <button onclick="removeFromCart(${product.id})">Eliminar</button>
      `;
      cartList.appendChild(cartItem);
      total += product.price;
    });

    totalPrice.textContent = `Total: $${total}`;
  }

// Eliminar del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
};

function openCheckoutForm() {
    document.getElementById("checkout-form").style.display = "block";
  }
  
  renderCart();

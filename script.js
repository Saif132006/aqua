// Product list
const products = [
  { id: 1, name: "Nano Aquarium 20L", price: 60, category: "Aquarium" },
  { id: 2, name: "Large Glass Aquarium 100L", price: 200, category: "Aquarium" },
  { id: 3, name: "Filter Pump 500", price: 120, category: "Accessories" },
  { id: 4, name: "LED Light Combo", price: 80, category: "Accessories" },
  { id: 5, name: "Premium Fish Food 500g", price: 20, category: "Food" },
  { id: 6, name: "Goldfish Food 1kg", price: 30, category: "Food" },
  { id: 7, name: "Aquarium Plants Set", price: 40, category: "Accessories" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.querySelectorAll("#cart-count").forEach(span => {
    span.textContent = cart.length;
  });
}

// Show products
function showProducts() {
  const main = document.getElementById("main-content");
  main.innerHTML = "<div class='products'></div>";
  const container = main.querySelector(".products");

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: $${p.price}</p>
      <p>Category: ${p.category}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });

  saveCart();
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
  alert(${product.name} added to cart);
}

// Show cart
function showCart() {
  const main = document.getElementById("main-content");
  if (cart.length === 0) {
    main.innerHTML = "<h2>Your cart is empty 🛒</h2>";
    return;
  }

  let html = "<h2>Your Cart</h2>";
  let total = 0;
  cart.forEach((item, index) => {
    html += `<p>${item.name} - $${item.price} 
             <button onclick="removeFromCart(${index})">❌ Remove</button></p>`;
    total += item.price;
  });
  html += <h3>Total: $${total}</h3>;
  html += <a href="checkout.html" class="btn">✅ Checkout</a>;
  main.innerHTML = html;

  saveCart();
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  showCart();
}

// Search products
function searchProducts() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderFilteredProducts(filtered);
}

// Filter by category
function filterByCategory() {
  const category = document.getElementById("category").value;
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  renderFilteredProducts(filtered);
}

function renderFilteredProducts(items) {
  const main = document.getElementById("main-content");
  main.innerHTML = "<div class='products'></div>";
  const container = main.querySelector(".products");

  if (items.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: $${p.price}</p>
      <p>Category: ${p.category}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// Update cart count everywhere
document.addEventListener("DOMContentLoaded", saveCart);
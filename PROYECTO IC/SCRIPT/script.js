

let PRODUCTS = JSON.parse(localStorage.getItem("productos")) || [
  { id:1,  name:"Arroz",   emoji:"🌾", price:3.50,  location:"Mercado de Surquillo",           seller:"Don Carlos",    unit:"kg" },
  { id:2,  name:"Arroz",   emoji:"🌾", price:2.80,  location:"Mercado Central",                seller:"Doña Rosa",     unit:"kg" },
  { id:3,  name:"Arroz",   emoji:"🌾", price:4.20,  location:"Mercado de Miraflores",          seller:"La Casa del Grano", unit:"kg" },
  { id:4,  name:"Pollo",   emoji:"🍗", price:9.50,  location:"Mercado de Surquillo",           seller:"Carnes el Valle", unit:"kg" },
  { id:5,  name:"Pollo",   emoji:"🍗", price:7.80,  location:"Mercado de Villa El Salvador",   seller:"Pollos Frescos SJL", unit:"kg" },
  { id:6,  name:"Pollo",   emoji:"🍗", price:11.00, location:"Mercado de San Isidro",          seller:"Don Enrique",   unit:"kg" },
  { id:7,  name:"Papa",    emoji:"🥔", price:1.50,  location:"Mercado Central",                seller:"Huerta Andina", unit:"kg" },
  { id:8,  name:"Papa",    emoji:"🥔", price:2.20,  location:"Mercado de Chorrillos",          seller:"Don Julio",     unit:"kg" },
  { id:9,  name:"Papa",    emoji:"🥔", price:1.80,  location:"Mercado de San Juan de Lurigancho", seller:"Familia Quispe", unit:"kg" },
  { id:10, name:"Tomate",  emoji:"🍅", price:2.50,  location:"Mercado de Surquillo",           seller:"Verduras Frescas", unit:"kg" },
  { id:11, name:"Tomate",  emoji:"🍅", price:1.90,  location:"Mercado de Villa El Salvador",   seller:"Doña Carmen",   unit:"kg" },
  { id:12, name:"Tomate",  emoji:"🍅", price:3.00,  location:"Mercado de Miraflores",          seller:"Bio Market",    unit:"kg" },
  { id:13, name:"Azúcar",  emoji:"🧂", price:4.80,  location:"Mercado Central",                seller:"Distribuidora Lima", unit:"kg" },
  { id:14, name:"Azúcar",  emoji:"🧂", price:3.90,  location:"Mercado de Chorrillos",          seller:"La Dulcería",   unit:"kg" },
  { id:15, name:"Azúcar",  emoji:"🧂", price:5.50,  location:"Mercado de San Isidro",          seller:"Súper Express", unit:"kg" },
  { id:16, name:"Leche",   emoji:"🥛", price:4.50,  location:"Mercado de Miraflores",          seller:"Lácteos del Norte", unit:"litro" },
  { id:17, name:"Leche",   emoji:"🥛", price:3.80,  location:"Mercado Central",                seller:"Don Leche",     unit:"litro" },
  { id:18, name:"Leche",   emoji:"🥛", price:5.20,  location:"Mercado de San Isidro",          seller:"Dairy Fresh",   unit:"litro" },
  { id:19, name:"Cebolla", emoji:"🧅", price:1.20,  location:"Mercado de San Juan de Lurigancho", seller:"Don Raúl",   unit:"kg" },
  { id:20, name:"Cebolla", emoji:"🧅", price:1.80,  location:"Mercado de Surquillo",           seller:"Verduras Frescas", unit:"kg" },
  { id:21, name:"Aceite",  emoji:"🫙", price:8.90,  location:"Mercado Central",                seller:"Distribuidora Lima", unit:"litro" },
  { id:22, name:"Aceite",  emoji:"🫙", price:7.50,  location:"Mercado de Villa El Salvador",   seller:"Doña Carmen",   unit:"litro" },
  { id:23, name:"Limón",   emoji:"🍋", price:2.00,  location:"Mercado de Chorrillos",          seller:"Cítricos del Sur", unit:"kg" },
  { id:24, name:"Limón",   emoji:"🍋", price:1.40,  location:"Mercado Central",                seller:"Don Pedro",     unit:"kg" },
];


let filtered = [...PRODUCTS];

/* ── Utilidades ── */
const $ = id => document.getElementById(id);

function fmt(n) { return 'S/ ' + parseFloat(n).toFixed(2); }

/* ── Render cards ── */
function renderCards(data) {
  const grid = $('productsGrid');
  grid.innerHTML = '';

  if (!data.length) {
    grid.innerHTML = `<div class="no-results">
      <i class="fa-solid fa-box-open"></i>
      <p>No se encontraron productos. Intenta con otro término o ajusta los filtros.</p>
    </div>`;
    $('resultCount').textContent = '0 productos';
    renderStats([]);
    return;
  }

  /* best price per product name */
  const bestByName = {};
  data.forEach(p => {
    if (!bestByName[p.name] || p.price < bestByName[p.name]) bestByName[p.name] = p.price;
  });

  data.forEach((p, i) => {
    const isBest = p.price === bestByName[p.name];
    const card = document.createElement('div');
    card.className = 'card' + (isBest ? ' best' : '');
    card.style.animationDelay = (i * 45) + 'ms';
    card.innerHTML = `
      ${isBest ? '<div class="badge-best"><i class="fa-solid fa-star"></i> Mejor precio</div>' : ''}
      <div class="card-icon">${p.emoji}</div>
      <h3>${p.name}</h3>
      <div class="price">${fmt(p.price)} <span>/ ${p.unit}</span></div>
      <div class="card-meta">
        <div><i class="fa-solid fa-store"></i> ${p.location}</div>
        <div><i class="fa-solid fa-user"></i> ${p.seller}</div>
      </div>
      <div class="card-tag"><i class="fa-solid fa-tag"></i> ${p.unit}</div>
    `;
    grid.appendChild(card);
  });

  $('resultCount').textContent = data.length + ' producto' + (data.length !== 1 ? 's' : '');
  renderStats(data);
}

/* ── Stats bar ── */
function renderStats(data) {
  const bar = $('statsBar');
  bar.innerHTML = '';
  if (!data.length) return;

  const prices = data.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const savings = max - min;

  bar.innerHTML = `
    <div class="stat-card"><i class="fa-solid fa-arrow-down"></i> Precio mínimo: <strong>${fmt(min)}</strong></div>
    <div class="stat-card"><i class="fa-solid fa-arrow-up"></i> Precio máximo: <strong>${fmt(max)}</strong></div>
    <div class="stat-card"><i class="fa-solid fa-hashtag"></i> Resultados: <strong>${data.length}</strong></div>
    ${savings > 0 ? `<div class="savings-banner">
      <i class="fa-solid fa-piggy-bank"></i>
      Puedes ahorrar <strong>&nbsp;${fmt(savings)}&nbsp;</strong> eligiendo la opción más barata
    </div>` : ''}
  `;
}

/* ── Apply filters ── */
function applyAll() {
  const query    = $('searchInput').value.trim().toLowerCase();
  const location = $('filterLocation').value;
  const maxPrice = parseFloat($('filterPrice').value);
  const sort     = $('filterSort').value;

  filtered = PRODUCTS.filter(p => {
    const matchQ = !query || p.name.toLowerCase().includes(query) || p.seller.toLowerCase().includes(query);
    const matchL = !location || p.location === location;
    const matchP = p.price <= maxPrice;
    return matchQ && matchL && matchP;
  });

  if (sort === 'asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'desc') filtered.sort((a, b) => b.price - a.price);

  renderCards(filtered);
}

/* ── Reset ── */
function resetAll() {
  $('searchInput').value    = '';
  $('filterLocation').value = '';
  $('filterPrice').value    = 25;
  $('filterSort').value     = '';
  $('priceVal').textContent = 'S/ 25.00';
  filtered = [...PRODUCTS];
  renderCards(filtered);
}

/* ── Search on Enter ── */
$('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') applyAll(); });

/* ── Dark mode ── */
const toggle = $('darkToggle');
toggle.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? '' : 'dark');
  toggle.innerHTML = isDark
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
});

/* Mostrar por secciones */

function mostrarSeccion(seccion) {
  document.getElementById("productos").style.display = "none";
  document.getElementById("agregar").style.display = "none";

  document.getElementById(seccion).style.display = "block";
}

function toggleEmojiMenu() {
  const menu = document.getElementById("emojiMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function seleccionarEmoji(emoji) {
  document.getElementById("nuevoEmoji").value = emoji;
  document.getElementById("emojiMenu").style.display = "none";
}

function guardarProducto() {
  const nombre = document.getElementById("nuevoNombre").value.trim();
  const precio = document.getElementById("nuevoPrecio").value;
  const vendedor = document.getElementById("nuevoVendedor").value.trim();
  const lugar = document.getElementById("nuevoLugar").value.trim();
  const emoji = document.getElementById("nuevoEmoji").value || "🛒";
  

  if (!nombre || !precio || ! vendedor || !lugar) {
    alert("Completa todos los campos");
    return;
  }

  const nuevoProducto = {
    id: PRODUCTS.length ? PRODUCTS[PRODUCTS.length - 1].id + 1 : 1,
    name: nombre,
    emoji: emoji,
    price: parseFloat(precio),
    location: lugar,
    seller: vendedor,
    unit: "unidad"
  };

  PRODUCTS.push(nuevoProducto);

  guardarEnLocalStorage(PRODUCTS);


  // limpiar
  document.getElementById("nuevoNombre").value = "";
  document.getElementById("nuevoPrecio").value = "";
  document.getElementById("nuevoVendedor").value = "";
  document.getElementById("nuevoLugar").value = "";
  document.getElementById("nuevoEmoji").value = "";

  // volver a productos
  mostrarSeccion("productos");
}

function guardarEnLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(PRODUCTS))
}

/* ── Initial render ── */
window.onload = function() {
  renderCards(PRODUCTS);
  mostrarSeccion("productos");
  };

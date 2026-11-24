// Sample Mega Store Database
const products = [
    { id: 1, name: "Girls Embroidered Party Dress", category: "Girls", price: 4500, img: "./img/imgone.webp" },
    { id: 2, name: "Girls Summer Kurti Set", category: "Girls", price: 2800, img: "./img/imgone.webp" },
    { id: 3, name: "Boys Casual Denim Jacket", category: "Boys", price: 3900, img: "./img/imgone.webp" },
    { id: 4, name: "Boys Formal Shalwar Kameez", category: "Boys", price: 3500, img: "./img/imgone.webp" },
    { id: 5, name: "Kids Colorful Party Frock", category: "Kids", price: 2200, img: "https://unsplash.com" },
    { id: 6, name: "Kids Boys Cotton Tracksuit", category: "Kids", price: 1850, img: "https://unsplash.com" },
    { id: 7, name: "Gold Plated Bridal Necklace Set", category: "Jewelry", price: 5200, img: "https://unsplash.com" },
    { id: 8, name: "Diamond Cut Earrings & Ring", category: "Jewelry", price: 1900, img: "https://unsplash.com" },
    { id: 9, name: "Sports Running Sneakers", category: "Shoes", price: 4200, img: "https://unsplash.com" },
    { id: 10, name: "Girls Fancy Party Heels", category: "Shoes", price: 3100, img: "https://unsplash.com" }
];

let cart = [];

// Render Products
function displayProducts(items) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <div class="product-info">
                <div class="product-cat">${p.category}</div>
                <div class="product-title">${p.name}</div>
                <div class="product-price">Rs. ${p.price.toLocaleString()}</div>
                <button class="add-cart-btn" onclick="addToCart(${p.id})">
                    <i class="fas fa-cart-plus"></i> Add to Bag
                </button>
            </div>
        </div>
    `).join('');
}

// Filter by Category
function filterProducts(cat, btn) {
    if (btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    if (cat === 'all') displayProducts(products);
    else displayProducts(products.filter(p => p.category === cat));
}

// Search Function
function searchProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
    );
    displayProducts(filtered);
}

// Cart Functions
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
    const cartContainer = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-msg">Your bag is empty.</p>';
        document.getElementById('cartTotal').innerText = '0';
        return;
    }
    let total = 0;
    cartContainer.innerHTML = cart.map((item, idx) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>Rs. ${item.price}</small>
                </div>
                <i class="fas fa-trash" style="color:red; cursor:pointer;" onclick="removeFromCart(${idx})"></i>
            </div>
        `;
    }).join('');
    document.getElementById('cartTotal').innerText = total.toLocaleString();
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

function checkout() {
    if (cart.length === 0) return alert("Aapka bag khali hai!");
    alert("Shukriya! Aapka order Kalpna App par confirm ho gaya hai.");
    cart = [];
    updateCartUI();
    toggleCart();
}

// AI Chatbot Logic
function toggleAI() {
    document.getElementById('aiChatbox').classList.toggle('active');
}

function sendAIMessage() {
    const input = document.getElementById('aiUserInput');
    const text = input.value.trim();
    if (!text) return;

    const messagesDiv = document.getElementById('aiMessages');
    messagesDiv.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = '';

    setTimeout(() => {
        const lower = text.toLowerCase();
        let reply = "";

        // Owner Escalation Logic
        if (lower.includes("owner") || lower.includes("masla") || lower.includes("problem") || lower.includes("payment") || lower.includes("complain")) {
            messagesDiv.innerHTML += `<div class="msg alert">[SYSTEM NOTE TO OWNER]: Customer ko madad chahiye! Masla: "${text}". Owner ko notification bhej diya gaya hai.</div>`;
            reply = "Main ne aapka masla note kar liya hai aur Kalpna App ke Owner ko alert bhej diya hai. Wo abhi aapse rabta karte hain!";
        }
        else if (lower.includes("hi") || lower.includes("hello") || lower.includes("salam")) {
            reply = "Hello! Kalpna App mein khush amdeed. Bataiye main aapki shopping mein kya madad kar sakta hoon?";
        }
        else if (lower.includes("jewelry") || lower.includes("necklace")) {
            reply = "Hamare paas Gold Plated Bridal Sets (Rs. 5,200) aur Diamond Cut Earrings (Rs. 1,900) mojood hain. Aap 'Jewelry' tab par click kar ke dekh sakte hain!";
        }
        else if (lower.includes("shoes") || lower.includes("heels") || lower.includes("sneakers")) {
            reply = "Shoes mein Boys Sports Sneakers (Rs. 4,200) aur Girls Fancy Heels (Rs. 3,100) available hain.";
        }
        else if (lower.includes("kids") || lower.includes("bachon")) {
            reply = "Kids section mein Party Frocks aur Boys Tracksuits Rs. 1,850 se shuru ho rahe hain.";
        }
        else {
            reply = "Hamare paas Girls, Boys, Kids ke dresses, shoes aur jewelry ki mukammal variety mojood hai. Kya aap kisi khaas item ki price poochna chahte hain?";
        }

        messagesDiv.innerHTML += `<div class="msg bot">${reply}</div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 500);
}

// Load All Products Initially
displayProducts(products);

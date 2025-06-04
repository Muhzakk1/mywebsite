// Data Menu
const menuData = [
    {
        id: 1,
        name: "Nasi Gudeg Yogya",
        description: "Nasi gudeg khas Yogyakarta dengan ayam kampung, telur pindang, dan sambal krecek yang gurih",
        price: 25000,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=250&fit=crop", // Adjusted height for better aspect
        category: "makanan-utama"
    },
    {
        id: 2,
        name: "Rendang Daging Sapi",
        description: "Rendang daging sapi Padang yang empuk dengan bumbu rempah-rempah pilihan",
        price: 35000,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=250&fit=crop",
        category: "makanan-utama"
    },
    {
        id: 3,
        name: "Sate Ayam Madura",
        description: "Sate ayam Madura dengan bumbu kacang khas dan lontong hangat",
        price: 20000,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=250&fit=crop",
        category: "makanan-utama"
    },
    {
        id: 4,
        name: "Nasi Liwet Solo",
        description: "Nasi liwet Solo dengan ayam suwir, telur pindang, dan sayur labu siam",
        price: 22000,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=250&fit=crop",
        category: "makanan-utama"
    },
    {
        id: 5,
        name: "Gado-Gado Jakarta",
        description: "Gado-gado Jakarta dengan sayuran segar, tahu, tempe, dan bumbu kacang",
        price: 18000,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=250&fit=crop",
        category: "makanan-utama"
    },
    {
        id: 6,
        name: "Bakso Malang",
        description: "Bakso Malang dengan kuah kaldu sapi, mie, dan pangsit goreng",
        price: 15000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=250&fit=crop",
        category: "makanan-utama"
    },
    {
        id: 7,
        name: "Es Teh Manis",
        description: "Es teh manis segar dengan gula aren pilihan",
        price: 5000,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=250&fit=crop",
        category: "minuman"
    },
    {
        id: 8,
        name: "Es Jeruk Peras",
        description: "Es jeruk peras segar dengan jeruk lokal pilihan",
        price: 8000,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=250&fit=crop",
        category: "minuman"
    },
    {
        id: 9,
        name: "Es Kelapa Muda",
        description: "Es kelapa muda segar langsung dari pohon",
        price: 10000,
        image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=250&fit=crop",
        category: "minuman"
    },
    {
        id: 10,
        name: "Jus Alpukat",
        description: "Jus alpukat creamy dengan susu kental manis",
        price: 12000,
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=250&fit=crop",
        category: "minuman"
    },
    {
        id: 11,
        name: "Es Cendol",
        description: "Es cendol tradisional dengan santan dan gula merah",
        price: 8000,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=250&fit=crop",
        category: "dessert"
    },
    {
        id: 12,
        name: "Klepon",
        description: "Klepon tradisional dengan isian gula merah dan kelapa parut",
        price: 10000,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=250&fit=crop",
        category: "dessert"
    }
];

// Cart state
let cart = [];

// DOM Elements
// Kita perlu memastikan DOM sudah sepenuhnya dimuat sebelum mengakses elemen
let menuGrid, cartSidebar, overlay, cartCount, cartItems, cartTotal, checkoutModal, modalOrderSummary, modalTotalPrice;

const placeholderImageURL = 'https://placehold.co/400x250/E0E0E0/B0B0B0?text=Gambar+Tidak+Tersedia';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Assign DOM elements after DOM is loaded
    menuGrid = document.getElementById('menuGrid');
    cartSidebar = document.getElementById('cartSidebar');
    overlay = document.getElementById('overlay');
    cartCount = document.getElementById('cartCount');
    cartItems = document.getElementById('cartItems');
    cartTotal = document.getElementById('cartTotal');
    checkoutModal = document.getElementById('checkoutModal');
    // modalContent = checkoutModal.querySelector('div > div'); // Tidak digunakan secara global lagi
    modalOrderSummary = document.getElementById('modalOrderSummary');
    modalTotalPrice = document.getElementById('modalTotalPrice');

    // Periksa apakah semua elemen penting ditemukan
    if (!menuGrid || !cartSidebar || !overlay || !cartCount || !cartItems || !cartTotal || !checkoutModal || !modalOrderSummary || !modalTotalPrice) {
        console.error("Satu atau lebih elemen DOM penting tidak ditemukan. Pastikan ID elemen di HTML sudah benar.");
        return; // Hentikan eksekusi jika elemen penting tidak ada
    }

    renderMenu();
    updateCartUI();
    // Set initial active button
    const initialActiveButton = document.querySelector('.category-btn[onclick*="\'all\'"]');
    if (initialActiveButton) {
        initialActiveButton.classList.add('active');
    }
});

// Render menu items
function renderMenu(filterCategory = 'all') {
    if (!menuGrid) return; // Pastikan menuGrid ada
    menuGrid.innerHTML = '';
    
    const filteredMenu = filterCategory === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === filterCategory);
    
    if (filteredMenu.length === 0) {
        menuGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">Tidak ada menu untuk kategori ini.</p>`;
        return;
    }

    filteredMenu.forEach(item => {
        const menuItemHTML = `
            <div class="menu-item bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-[1.02] duration-300" data-category="${item.category}">
                <img src="${item.image}" alt="${item.name}" class="menu-item-image w-full h-48 object-cover" onerror="this.onerror=null; this.src='${placeholderImageURL}'">
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${item.name}</h3>
                    <p class="text-sm text-gray-600 mb-3 flex-grow">${item.description}</p>
                    <div class="menu-item-footer mt-auto flex justify-between items-center">
                        <span class="menu-item-price text-lg font-bold text-orange-500">Rp ${formatPrice(item.price)}</span>
                        <button class="add-to-cart-btn bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-200 text-sm" onclick="addToCart(${item.id}, event)">
                            Tambah
                        </button>
                    </div>
                </div>
            </div>
        `;
        menuGrid.innerHTML += menuItemHTML;
    });

    // Add loaded class for fade-in effect
    menuGrid.querySelectorAll('.menu-item-image').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
}

// Filter menu by category
// Fungsi ini sekarang global karena dipanggil dari HTML
function filterMenu(category, event) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.currentTarget) {
         event.currentTarget.classList.add('active');
    } else {
        // Fallback if event is not passed
        const fallbackButton = document.querySelector(`.category-btn[onclick*="'${category}'"]`);
        if (fallbackButton) {
            fallbackButton.classList.add('active');
        }
    }
    renderMenu(category);
}

// Add item to cart
// Fungsi ini sekarang global karena dipanggil dari HTML
function addToCart(itemId, event) {
    const item = menuData.find(menuItem => menuItem.id === itemId); // Ubah nama variabel agar tidak konflik
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
    
    if (event && event.currentTarget) {
        const button = event.currentTarget;
        const originalText = button.textContent;
        
        button.textContent = 'Ditambahkan!';
        button.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        button.classList.add('bg-green-500', 'hover:bg-green-600', 'cursor-not-allowed');
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-500', 'hover:bg-green-600', 'cursor-not-allowed');
            button.classList.add('bg-blue-500', 'hover:bg-blue-600');
            button.disabled = false;
        }, 1200);
    }
}

// Remove item from cart (called from updateQuantity)
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// Update item quantity
// Fungsi ini sekarang global karena dipanggil dari HTML
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    if (!cartCount || !cartItems || !cartTotal) return; // Pastikan elemen ada

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart text-center text-gray-500 py-10">Keranjang belanja Anda kosong.</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md mr-3" onerror="this.onerror=null; this.src='${placeholderImageURL}'">
                <div class="cart-item-info flex-grow">
                    <h4 class="font-semibold text-gray-700 text-sm">${item.name}</h4>
                    <div class="cart-item-price text-xs text-gray-500">Rp ${formatPrice(item.price)}</div>
                </div>
                <div class="quantity-controls flex items-center ml-2">
                    <button class="quantity-btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-l text-sm transition-colors" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity bg-white py-1 px-3 text-sm border-t border-b border-gray-200">${item.quantity}</span>
                    <button class="quantity-btn bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-r text-sm transition-colors" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join('');
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(totalPrice);
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        if (cart.length === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.textContent = 'Keranjang Kosong';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Pesan Sekarang';
        }
    }
}

// Toggle cart sidebar
// Fungsi ini sekarang global karena dipanggil dari HTML
function toggleCart() {
    if (!cartSidebar || !overlay) return; // Pastikan elemen ada

    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('active'); 
    
    if (cartSidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Animate modal
function animateModalOpen() {
    if (!checkoutModal) return;
    const modalDialog = checkoutModal.querySelector('div > div'); // The actual dialog box
    if (!modalDialog) return;

    checkoutModal.classList.remove('hidden');
    checkoutModal.classList.add('flex'); 
    void modalDialog.offsetWidth; 
    modalDialog.classList.remove('scale-95', 'opacity-0');
    modalDialog.classList.add('scale-100', 'opacity-100');
}

function animateModalClose(callback) {
    if (!checkoutModal) return;
    const modalDialog = checkoutModal.querySelector('div > div');
    if (!modalDialog) return;

    modalDialog.classList.remove('scale-100', 'opacity-100');
    modalDialog.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        checkoutModal.classList.add('hidden');
        checkoutModal.classList.remove('flex');
        if (callback) callback();
    }, 300); 
}

// Checkout function
// Fungsi ini sekarang global karena dipanggil dari HTML
function checkout() {
    if (cart.length === 0) {
        console.warn('Checkout attempted with empty cart.');
        return;
    }
    
    if (!modalOrderSummary || !modalTotalPrice) return; // Pastikan elemen ada

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummaryHTML = cart.map(item => 
        `<div class="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
            <span class="text-gray-700">${item.name} <span class="text-xs text-gray-500">(x${item.quantity})</span></span>
            <span class="font-medium text-gray-800">Rp ${formatPrice(item.price * item.quantity)}</span>
        </div>`
    ).join('');
    
    modalOrderSummary.innerHTML = orderSummaryHTML;
    modalTotalPrice.textContent = formatPrice(totalPrice);
    
    animateModalOpen();
}

// Fungsi ini sekarang global karena dipanggil dari HTML
function closeCheckoutModal() {
    animateModalClose(() => {
        cart = [];
        updateCartUI();
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            toggleCart(); 
        }
    });
}

// Format price function
function formatPrice(price) {
    return price.toLocaleString('id-ID');
}

// Handle escape key to close cart or modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (checkoutModal && checkoutModal.classList.contains('flex')) { 
            closeCheckoutModal();
        } else if (cartSidebar && cartSidebar.classList.contains('open')) { 
            toggleCart();
        }
    }
});

// Smooth scrolling for anchor links (if any were added)
// Event listener ini tetap di dalam DOMContentLoaded atau bisa juga di luar jika tidak bergantung pada elemen spesifik yang dimuat lambat.
// Untuk konsistensi, kita bisa biarkan di luar jika hanya menargetkan 'a[href^="#"]' secara umum.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        // Pastikan targetId tidak hanya "#"
        if (targetId && targetId.length > 1) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

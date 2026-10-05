// =====================================================
// ONLINE SHOPPING SYSTEM
// ShopEase
// =====================================================


// ================= PRODUCT DATA =================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        rating: 4.5,
        icon: "fa-headphones",
        description:
            "Enjoy clear and powerful sound with comfortable wireless headphones."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        rating: 4.6,
        icon: "fa-clock",
        description:
            "Track your daily activities and stay connected with this smart watch."
    },

    {
        id: 3,
        name: "Smartphone",
        category: "Electronics",
        price: 14999,
        rating: 4.7,
        icon: "fa-mobile-screen",
        description:
            "A modern smartphone with powerful performance and a beautiful display."
    },

    {
        id: 4,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1299,
        rating: 4.3,
        icon: "fa-volume-high",
        description:
            "Portable Bluetooth speaker with high-quality sound."
    },

    {
        id: 5,
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 599,
        rating: 4.2,
        icon: "fa-shirt",
        description:
            "Comfortable casual T-shirt suitable for everyday use."
    },

    {
        id: 6,
        name: "Denim Jacket",
        category: "Fashion",
        price: 1599,
        rating: 4.4,
        icon: "fa-shirt",
        description:
            "Stylish denim jacket with a modern casual design."
    },

    {
        id: 7,
        name: "Running Shoes",
        category: "Shoes",
        price: 1899,
        rating: 4.6,
        icon: "fa-shoe-prints",
        description:
            "Lightweight running shoes designed for comfort and daily exercise."
    },

    {
        id: 8,
        name: "Sports Shoes",
        category: "Shoes",
        price: 2199,
        rating: 4.5,
        icon: "fa-shoe-prints",
        description:
            "Durable sports shoes with comfortable cushioning."
    },

    {
        id: 9,
        name: "Leather Wallet",
        category: "Accessories",
        price: 799,
        rating: 4.4,
        icon: "fa-wallet",
        description:
            "Premium-looking wallet with multiple card and cash compartments."
    },

    {
        id: 10,
        name: "Backpack",
        category: "Accessories",
        price: 999,
        rating: 4.5,
        icon: "fa-bag-shopping",
        description:
            "Spacious backpack suitable for college, office and travel."
    },

    {
        id: 11,
        name: "Sunglasses",
        category: "Accessories",
        price: 699,
        rating: 4.1,
        icon: "fa-glasses",
        description:
            "Stylish sunglasses suitable for everyday outdoor use."
    },

    {
        id: 12,
        name: "Bluetooth Earbuds",
        category: "Electronics",
        price: 1799,
        rating: 4.5,
        icon: "fa-ear-listen",
        description:
            "Compact wireless earbuds with clear audio and comfortable fit."
    }

];


// ================= VARIABLES =================

let cart = [];

let wishlist = [];

let currentProducts = [...products];


// ================= PAGE LOAD =================

document.addEventListener("DOMContentLoaded", function () {

    displayProducts(products);

    updateCart();

    updateWishlist();

});


// ================= DISPLAY PRODUCTS =================

function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
                color:#777;
            ">
                <i class="fa-solid fa-box-open"
                   style="font-size:50px;color:#5b4bdb;">
                </i>

                <h3 style="margin-top:15px;">
                    No products found
                </h3>

                <p>
                    Try searching for another product.
                </p>
            </div>
        `;

        return;
    }


    productList.forEach(product => {

        const isWishlist =
            wishlist.includes(product.id);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <button
                class="wishlist-btn ${isWishlist ? "active" : ""}"
                onclick="toggleWishlist(${product.id})">

                <i class="${isWishlist
                    ? "fa-solid"
                    : "fa-regular"} fa-heart">
                </i>

            </button>


            <div
                class="product-image"
                onclick="showProductDetails(${product.id})">

                <i class="fa-solid ${product.icon}"></i>

            </div>


            <div class="product-info">

                <span class="category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ${getStars(product.rating)}
                    <span style="color:#777;">
                        ${product.rating}
                    </span>
                </div>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart

                </button>

            </div>
        `;

        container.appendChild(card);

    });

}


// ================= STAR RATING =================

function getStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (rating >= i) {

            stars +=
                '<i class="fa-solid fa-star"></i>';

        } else {

            stars +=
                '<i class="fa-regular fa-star"></i>';

        }

    }

    return stars;

}


// ================= SEARCH =================

function searchProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    currentProducts = products.filter(product =>

        product.name
            .toLowerCase()
            .includes(search)

        ||

        product.category
            .toLowerCase()
            .includes(search)

    );


    displayProducts(currentProducts);

}


// ================= CATEGORY FILTER =================

function filterCategory(category) {

    if (category === "All") {

        currentProducts = [...products];

    } else {

        currentProducts =
            products.filter(
                product => product.category === category
            );

    }

    displayProducts(currentProducts);

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= ADD TO CART =================

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    const existingItem =
        cart.find(
            item => item.id === productId
        );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    showNotification(
        `${product.name} added to cart`
    );

}


// ================= UPDATE CART =================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    const totalQuantity =
        cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"
                   style="font-size:50px;color:#ccc;">
                </i>

                <h3 style="margin-top:15px;">
                    Your cart is empty
                </h3>

                <p>
                    Add some products to your cart.
                </p>

            </div>

        `;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div class="cart-item-image">

                <i class="fa-solid ${item.icon}"></i>

            </div>


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-price">
                    ₹${item.price.toLocaleString("en-IN")}
                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="removeFromCart(${item.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        cartItems.appendChild(div);

    });

}


// ================= CHANGE QUANTITY =================

function changeQuantity(productId, change) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product => product.id !== productId
            );

    }


    updateCart();

}


// ================= REMOVE FROM CART =================

function removeFromCart(productId) {

    cart =
        cart.filter(
            product => product.id !== productId
        );

    updateCart();

}


// ================= OPEN CART =================

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("open");

    document
        .getElementById("overlay")
        .classList.add("show");

}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("open");

    document
        .getElementById("overlay")
        .classList.remove("show");

}


// ================= WISHLIST =================

function toggleWishlist(productId) {

    if (wishlist.includes(productId)) {

        wishlist =
            wishlist.filter(
                id => id !== productId
            );

    } else {

        wishlist.push(productId);

    }


    updateWishlist();

    displayProducts(currentProducts);

}


// ================= UPDATE WISHLIST =================

function updateWishlist() {

    document
        .getElementById("wishlistCount")
        .textContent = wishlist.length;


    const container =
        document.getElementById("wishlistItems");


    if (!container) return;


    if (wishlist.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="fa-regular fa-heart"
                   style="font-size:50px;color:#ccc;">
                </i>

                <h3>
                    Wishlist is empty
                </h3>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    wishlist.forEach(id => {

        const product =
            products.find(
                item => item.id === id
            );


        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div class="cart-item-image">
                <i class="fa-solid ${product.icon}"></i>
            </div>

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <div class="cart-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

            </div>

            <button
                class="remove-item"
                onclick="toggleWishlist(${product.id})">

                <i class="fa-solid fa-heart"></i>

            </button>

        `;

        container.appendChild(div);

    });

}


// ================= OPEN WISHLIST =================

function openWishlist() {

    updateWishlist();

    document
        .getElementById("wishlistModal")
        .classList.add("show");

}


// ================= CLOSE WISHLIST =================

function closeWishlist() {

    document
        .getElementById("wishlistModal")
        .classList.remove("show");

}


// ================= PRODUCT DETAILS =================

function showProductDetails(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    const details =
        document.getElementById("productDetails");


    details.innerHTML = `

        <div class="details-image">

            <i class="fa-solid ${product.icon}"></i>

        </div>


        <div class="details-content">

            <span class="category">
                ${product.category}
            </span>

            <h2>
                ${product.name}
            </h2>

            <div class="rating">
                ${getStars(product.rating)}
                ${product.rating}
            </div>

            <h2 style="color:#5b4bdb;">
                ₹${product.price.toLocaleString("en-IN")}
            </h2>

            <p>
                ${product.description}
            </p>

            <button
                class="add-cart"
                onclick="addToCart(${product.id}); closeProductDetails();">

                <i class="fa-solid fa-cart-plus"></i>
                Add to Cart

            </button>

        </div>

    `;


    document
        .getElementById("productModal")
        .classList.add("show");

}


// ================= CLOSE PRODUCT DETAILS =================

function closeProductDetails() {

    document
        .getElementById("productModal")
        .classList.remove("show");

}


// ================= CHECKOUT =================

function openCheckout() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty"
        );

        return;

    }


    closeCart();

    document
        .getElementById("checkoutModal")
        .classList.add("show");

}


// ================= CLOSE CHECKOUT =================

function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("show");

}


// ================= PLACE ORDER =================

function placeOrder(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("customerName")
            .value;


    closeCheckout();


    cart = [];

    updateCart();


    showNotification(
        `Order placed successfully. Thank you ${name}!`
    );


    event.target.reset();

}


// ================= NOTIFICATION =================

function showNotification(message) {

    const notification =
        document.getElementById("successMessage");


    notification.querySelector("p")
        .textContent = message;


    notification.classList.add("show");


    setTimeout(() => {

        notification.classList.remove("show");

    }, 3000);

}


// ================= MOBILE MENU =================

function toggleMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("show");

}


// ================= SCROLL PRODUCTS =================

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= CLOSE ALL =================

function closeAll() {

    closeCart();

}


// ================= CLOSE MODALS WHEN CLICKING OUTSIDE =================

window.addEventListener("click", function(event) {

    const productModal =
        document.getElementById("productModal");

    const wishlistModal =
        document.getElementById("wishlistModal");

    const checkoutModal =
        document.getElementById("checkoutModal");


    if (event.target === productModal) {

        closeProductDetails();

    }


    if (event.target === wishlistModal) {

        closeWishlist();

    }


    if (event.target === checkoutModal) {

        closeCheckout();

    }

});
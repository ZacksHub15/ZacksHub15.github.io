// Initialize a Vue instance
var webstore = new Vue({
    el: '#app',
    data: {
        // Show or hide products
        showProduct: true,
        // Website name
        sitename: 'Md Zakir Hossain Store',
        // Button for shopping cart
        cartButton: '<i class="fas fa-shopping-cart"></i> Checkout',
        // Search term
        searchTerm: '',
        // Sorting style
        sortStyle: '',
        // Cart to store selected products
        cart: [],
        // Order information
        order: {
            Name: '',
            phoneNo: ''
        },
        // Button for adding lessons to the cart
        lessonButton: "<i class='fas fa-plus'></i> Add to cart",
        // Array of products
        products: products,
        // Button label for removing items from the cart
        inCartButton: "Remove"
    },

    methods: {
        // Add product to the cart
        addToCart: function (product) {
            this.cart.push(product.id);
            product.spaces--;
        },

        // Check if a product can be added to the cart
        canAdd: function (product) {
            return product.spaces > 0;
        },

        // Show or hide the checkout section
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },

        // Count the number of items with a specific id in the cart
        counter(id) {
            let counter = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    counter++;
                }
            }
            if (counter > 0) {
                return counter;
            }
        },

        // Get the name of the product in the cart
        showInCart(product, id) {
            let counter = this.counter(id);
            if (counter > 0) {
                return product.name;
            }
        },

        // Place an order
        placeOrder() {
            alert('Order Placed!');
            location.reload();
        },

        // Remove a product from the cart
        removeFromCart(product) {
            const index = this.cart.indexOf(product.id);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
            product.spaces++;
        }
    },

    computed: {
        // Count of items in the cart
        cartCount: function () {
            return this.cart.length || '';
        },
        // Check if the cart has items
        cartLenth: function () {
            return cartCount > 0;
        },

        // Sort products low to high by price
        sortedProducts() {
            function compare(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }
            return this.products.sort(compare);
        },

        // Sort products high to low by price
        sortedProductsHigh() {
            function compare(a, b) {
                if (a.price < b.price) return 1;
                if (a.price > b.price) return -1;
                return 0;
            }
            return this.products.sort(compare);
        },

        // Sort products A to Z alphabetically
        alphabetProducts() {
            function compare(a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            }
            return this.products.sort(compare);
        },

        // Sort products Z to A alphabetically
        alphabetProductsZ() {
            function compare(a, b) {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            }
            return this.products.sort(compare);
        },

        // Filter products based on the search term
        searchField() {
            return this.products.filter(product => {
                return (product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    product.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    // For the data saved as integers, they get cast to String which lets it match any typed numbers 
                    product.price.toString().includes(this.searchTerm.toLowerCase()) ||
                    product.spaces.toString().includes(this.searchTerm.toLowerCase()))
            })
        }
    }
});

// Function to confirm and enable a button
function btnConfirm() {
    if (document.getElementById("nameid").value >= 5 || document.getElementById("phoneid").value >= 5) {
        document.getElementById('button').disabled = false;
    } else {
        document.getElementById('button').disabled = true;
    }
}

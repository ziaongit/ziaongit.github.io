// If everything is ok then run the ready funtion
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// This funtion will call when the browser load the page completly without any problem
function ready() {

    // Get the element of delete button
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')

    // When the page load for the first time it will delete all the product in the cart - removeCartItem
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // Get the quantity element
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')

    // loop through the qauntity element and update it - quantityChanged
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // Add to cart button element
    var addToCartButtons = document.getElementsByClassName('shop-item-button')

    // How many times you click on add to cart button the addToCartClicked funtion will call 
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // this code will get the buy button element and add click event to call puchaseClicked fution
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

    // To display the product on the page when page load we call renderProducts funtion
    renderProducts();
}

// This funtion is used to display the product on the page
function renderProducts() {

    // All the products is assigned to products contant in JSON array
    const products =
        [
            {
                "id": "1",
                "name": "Aloe Vera",
                "origin": "Nederländerna",
                "description": "Lättskött suckulent med tjocka gröna blad. En av världens äldsta läkeväxter. Trivs på soliga platser. Låt den torka ut mellan varje vattning",
                "height": "120cm",
                "price": "120",
                "care": "Lättskött suckulent som trivs ljust, men undvik direkt solljus. Vattna undertill och inte på växten, men låt jorden torka mellan varje vattning. Ge flytande näring från vår till höst. Eventuell omplantering ska göras på våren.",
                "image": "images/Product-1.jpg"
            },
            {
                "id": "2",
                "name": "Citronfikusk",
                "origin": "Danmark",
                "description": "En vacker växt med blanka, små gröna blad. Lättskött alternativ till en bonsai. Trivs i ljust till halvskuggigt läge. Vattnas då jorden nästan torkat upp, ungefär en gång i veckan.",
                "height": "50cm",
                "price": "200",
                "care": "Passar bra i uterummet sommartid, vänt mot öst eller väst. Behöver extra ljus vintertid. Tål måttlig uttorkning, men att vattna den regelbundet är rekommendationen för att den ska bli så fin som möjligt.",
                "image": "images/Product-2.jpg"
            },
            {
                "id": "3",
                "name": "Apple",
                "origin": "Sweden",
                "description": "En vacker växt med blanka, små gröna blad. Lättskött alternativ till en bonsai. Trivs i ljust till halvskuggigt läge. Vattnas då jorden nästan torkat upp, ungefär en gång i veckan.",
                "height": "50cm",
                "price": "100",
                "care": "Passar bra i uterummet sommartid, vänt mot öst eller väst. Behöver extra ljus vintertid. Tål måttlig uttorkning, men att vattna den regelbundet är rekommendationen för att den ska bli så fin som möjligt.",
                "image": "images/Product-3.jpg"
            }
        ];
 // Get the element of shopProduct div on line 42 in index.html
    var productContainer = document.getElementById("shopProducts");
// The products in products array will be looped and append to the shopProducts
    for (var i = 0; i < products.length; i++) {

        // creat a div
        var div = document.createElement("div");

        // add innder hemt to above div -- accoding to the prodict.length
        div.innerHTML = "<div class='shop-item'>" +
            "<span class='shop-item-title'>" + products[i].name + "</span>" +
            "<img class='shop-item-image' src='" + products[i].image + "'>" +
            "<p class='shop-descriptopn'>" + products[i].description + "</p>" +
            "<div id='already-there-product-" + products[i].id + "'></div>" +
            "<div class='shop-item-details'>" +
            "<span class='shop-item-price'>" + products[i].price + "</span>" +
            "<button class='btn btn-primary shop-item-button' type='button' onclick='addToCartClicked(\"" + products[i].id + "\", \"" + products[i].name + "\", \"" + products[i].image + "\", \"" + products[i].price + "\")'>LÄGG TILL</button>" +
            "</div>" +
            "</div>";
            
        // append the created div to the productContainer
        productContainer.appendChild(div);
    }

}

// This funtion will be called to buy button is clicked
function purchaseClicked() {
    // Get the element of product price
    var productPrice = document.getElementById('cartTotal').innerHTML;
    // Get the element of cart items mean total product in the cart - why becaused I will use the in the product titme
    const cartItems = document.getElementsByClassName('cart-items')[0];

    // get cart titme usring the parent cartItems
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    // get the cart quantity with help of the class cart-quantity-input
    let cartQuantity = document.getElementsByClassName('cart-quantity-input');
    // create and assign 0 value to it otherwise it will take NAN
    var totalCartQuantity = 0;

    // Loop throught all the cart input and get the value
    for (var i = 0; i < cartQuantity.length; i++) {
        // Sum the value in each itreation
        totalCartQuantity += Number(document.getElementsByClassName('cart-quantity-input')[i].value);
    }
    
    // Call the buyAlert funtion and pass values - i.e. product price, tota quantity and items name
    buyAlert(productPrice, totalCartQuantity, cartItemNames)

    // We needed productPrice && cartItemNames && cartItems values for buyAlert funtion and when we get them the remove all from the cart
     if (productPrice && cartItemNames && cartItems) {
         // loop through all cart item and move it
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        // update the total according to current cart
        updateCartTotal()
    } 

}

// This funtion will be called when buy button is press. it receiving productPrice, totalCartQuantity, cartItemNamess wich we will be using in success message
function buyAlert(productPrice, totalCartQuantity, cartItemNamess) {
   
    if (cartItemNamess.length > 0) {
        // <div id="buy-alert"></div> and append html to it - How many times? cartItemNamess.length
        document.getElementById('buy-alert').innerHTML =
            `<div class="buy-alert-success card mb-4">
            <div class="card-body">
            <div class="card-title">Tack för ditt köp</div><br>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Total pris: ${productPrice}</li>
            <li class="list-group-item">Total Producter: ${totalCartQuantity}</li>
          </ul>
    </div>
    </div>`;
    }


}

// This funtion is used to remove the current item from the cart
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// This funtion is used to change the quantity of the cart
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    this.setAttribute('value', input.value);
    updateCartTotal()
}

// When we clicked the add to cart button the this funtion will be callded
function addToCartClicked(id, title, imageSrc, price) {
    addItemToCart(id, title, price, imageSrc)
    updateCartTotal()
}

// This funtion will be used to clear the cart
function clearCart() {
    // Get the element of product price
    var productPrice = document.getElementById('cartTotal').innerHTML;
    // Get the element of cart items mean total product in the cart - why becaused I will use the in the product titme
    const cartItems = document.getElementsByClassName('cart-items')[0];

    // get cart titme usring the parent cartItems
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    // get the cart quantity with help of the class cart-quantity-input
    let cartQuantity = document.getElementsByClassName('cart-quantity-input');
    // create and assign 0 value to it otherwise it will take NAN
    var totalCartQuantity = 0;

    // Loop throught all the cart input and get the value
    for (var i = 0; i < cartQuantity.length; i++) {
        // Sum the value in each itreation
        totalCartQuantity += Number(document.getElementsByClassName('cart-quantity-input')[i].value);
    }
    
    // We needed productPrice && cartItemNames && cartItems values for buyAlert funtion and when we get them the remove all from the cart
     if (productPrice && cartItemNames && cartItems) {
         // loop through all cart item and move it
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        // update the total according to current cart
        updateCartTotal()
    } 

    
}

// Add to the cart funtion
function addItemToCart(id, title, price, imageSrc) {

    // get the element of cart items
    var cartItems = document.getElementsByClassName('cart-items')[0]
    // get the element of cart title -- inside the above cartItems give me the all the titles
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    // loop through all the cart titles length and get the title
    for (var i = 0; i < cartItemNames.length; i++) {
        // if the title name is matching then 
        if (cartItemNames[i].innerText == title) {
            // run this already there div
            document.getElementById(`already-there-product-${id}`).innerHTML = '<div class="already-there-product-warning">Denna artikel har redan lagts till i kundvagnen</div>';
            setInterval(function () {
                // otherwise make the already there product div empty
                document.getElementById(`already-there-product-${id}`).innerHTML = '';
            }, 4000);
            return
        }
    }

    // create the car row element
    var cartRow = document.createElement('div')
    // assign class to div cartRow
    cartRow.classList.add('cart-row')
    // this valirbale will store all the cart content
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" min="1">
            <button class="btn btn-danger" type="button">TA BORT</button>
        </div>`
    
 // add the cartRowcontents to cartRow
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    // get the element of input and add listener to it when it change - quantityChanged
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    // get the element delete button and add click event to it. It will call removeCartItem function
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
   
}

// This funtion is used to update the total price
function updateCartTotal() {
    // get the elelem of cart item container <div class="cart-items">
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    // get all the rows of the cart
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    // create total variable and assign value 0 to it so to keep it integer
    var total = 0
    // loop through all the cart row and means cartRows.length
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        // get the price in each row
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        // get the quantity in each row
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // convert the price element to the float integet and put it in order SEK
        var price = parseFloat(priceElement.innerText.replace('SEK', ''))
        // get the quantity value
        var quantity = quantityElement.value

        // calculate the total according to -- total price will be plus on each itreation and the price and quantity will be multiplied
        total = total + (price * quantity)
    }
    // convet total to integer float integet
    total = Math.round(total * 100) / 100
    // get the elemnt of cart total price and and inner text 'SEK' + total (variable)
    document.getElementsByClassName('cart-total-price')[0].innerText = 'SEK' + total
}
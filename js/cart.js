let orderId;

let localStorageContent = localStorage.getItem('cart');
let cartItemsArray = JSON.parse(localStorageContent);
let cartItems = JSON.parse(localStorageContent);

/**
 * Update cart number in navigation menu
 */
 function addNumCart() {
    const localStorageContent = localStorage.getItem('cart');
    let cartItemsArray = JSON.parse(localStorageContent);
    let cartNum = document.getElementById('cartNum');
    if (cartItemsArray) {
      cartNum.innerHTML = cartItemsArray.length;
    }
}
addNumCart();

(function () {

    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('not valid');
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('true');
                    let products = [];
                    let cartArray = JSON.parse(localStorage.getItem('cart'));
                    console.log(cartArray);
                    for (let i = 0; i < cartArray.length; i++) {
                        products.push(cartArray[i].prodId);
                    }
                    let firstName = document.getElementById('firstName');
                    let lastName = document.getElementById('lastName');
                    let email = document.getElementById('email');
                    let address = document.getElementById('address');
                    let city = document.getElementById('city');
                    let contact = {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        address: address.value,
                        city: city.value,
                        email: email.value,
                    };
                    let data = {
                        contact: contact,
                        products: products,
                    };
                    console.log(data);
                    makeRequest(data);
                    sessionStorage.setItem('firstName', contact.firstName);
                }
                form.classList.add('was-validated');
            }, false);
        });
})();

/**
 * This Function to display shopping cart
 * The Name of the array/Colour and price.
 * Creating an removeButton with a location reload function for the cart. 
 *  @param 
 */
 function displayCart() {

    let localStorageContent = localStorage.getItem('cart');
    let cartArray = JSON.parse(localStorageContent);
    if (cartArray) {
        for (let i = 0; i <cartArray.length; i++) {

            let cart = document.getElementById('shoppingCart');
            let cartItem = document.createElement('li');

            cartItem.classList.add('cart-row', 'list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');
            cartItem.style.height = '75px';

            let item = document.createElement('div');
            item.classList.add('w-50');
            item.innerHTML = '<p class="my-0 text-1">' + cartArray[i].name + '</p> <small class="text-primary text-1">' + cartArray[i].selectLenses + '</small>';

            let cost = document.createElement('div');
            cost.classList.add('w-25');
            cost.style.marginTop = '12px';
            cost.innerHTML = '<p class="cart-price"><strong>' + '$' + cartArray[i].price / 100 + '</strong></p>';

            let removeButton = document.createElement('button');
            removeButton.setAttribute('type', 'button');
            removeButton.classList.add('btn', 'my-2', 'py-1', 'px-2', 'remove');
            removeButton.setAttribute('aria-label', 'remove');
            removeButton.innerHTML = '<i class="bi bi-dash-square close"></i>';
            removeButton.onclick = function removeItem() {
                let cartArray = JSON.parse(localStorage.getItem('cart'));
                cartArray.splice(i, 1);
                localStorage.setItem('cart', JSON.stringify(cartArray));
                location.reload();
            };

            cart.appendChild(cartItem);
            cartItem.appendChild(item);
            cartItem.appendChild(cost);
            cartItem.appendChild(removeButton);
        }
    }
   
}

displayCart();


/* create a boolean to keep track of whether or not to push object
let shouldPush = true;

// use case - no items in cart - push object
if (cartItemsArray.length === 0) {
     cartArray.push(currentItem);
     pushItem = false;
     
} else {
     // use case - cart not empty - use for loop to check product against other objects in cart
     // if this product and option already exist in cart don't push
    for (let i = 0; i < cartItemsArray.length; i++) {
        if (cartItemsArray.name === cartArray[i].name &&  cartItemsArray[i].selectLenses  ===  cartArray[i].selectLenses) {
            shouldPush = false;
        }
      }
}

// use case - cart not empty, current product with same option not in cart - push object
if (shouldPush) {
     cartArray.push(currentItem);
}
cartItemsArray();
cartArray();
console.log(shouldPush)
console.log(currentItem)


/**
 * Function to calculate total cost of the items in the cart and return the total.
 */
 function updateCartTotal() {
    let total = document.getElementById('totalCost');
    let totalCost = 0;
    for (let i = 0; i < cartItemsArray.length; i++) {
        totalCost += cartItemsArray[i].price / 100;
    }
    total.innerHTML = '$' + totalCost;

    sessionStorage.setItem('price', totalCost);
}

updateCartTotal();

/**
 * Send information from user to API go to confirmation page
 * 
 * @param {*} data 
 */
 function makeRequest(data) {
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        
        orderId = data.orderId;
        sessionStorage.setItem("orderId", orderId);
        console.log(orderId);
        location.replace('confirmation.html');

    }).catch(function (err) {
        console.log(err);
    });
}


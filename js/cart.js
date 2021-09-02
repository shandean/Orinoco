let orderId;

let localStorageContent = localStorage.getItem('cart');
let cartItemsArray = JSON.parse(localStorageContent);

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
                    for (let i = 0; i < cartArray.length; i++) {
                        products.push(cartArray[i].id);
                    }
                    let firstName = document.getElementById('firstName');
                    let lastName = document.getElementById('lastName');
                    let email = document.getElementById('email');
                    let address = document.getElementById('address');
                    let country = document.getElementById('country');
                    let city = document.getElementById('city');
                    let zip = document.getElementById('zip');
                    let contact = {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        address: address.value,
                        country: country.value,
                        city: city.value,
                        zip: zip.value,
                    };
                    let data = {
                        contact: contact,
                        products: products,
                    };
                    makeRequest(data);
                    sessionStorage.setItem('firstName', contact.firstName);
                }
                form.classList.add('was-validated');
            }, false);
        });
})();


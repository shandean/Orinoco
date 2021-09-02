// DOM ELEMENT REFERENCES
let thankYouName = document.querySelector('.thankYouName');
let totalCost = document.getElementById('totalCost');
let orderId = document.getElementById('orderId');

// Shows total cost of order and return to home 
thankYouName.innerHTML = ' ' + sessionStorage.getItem('firstName') + '!';
totalCost.innerHTML = '$' + ' ' + sessionStorage.getItem('price');
orderId.innerHTML = sessionStorage.getItem('orderId');
document.getElementById('returnToHomePage').addEventListener('click', eraseSessionStorage);

// remove the item from localStorage and sessionStorage
function eraseSessionStorage() {
    sessionStorage.removeItem('orderId');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('price');
    localStorage.removeItem('cart');
    location.replace('index.html');
}
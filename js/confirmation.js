// DOM ELEMENT REFERENCES
let thankYouName = document.querySelector('.thankYouName');
let totalCost = document.getElementById('totalCost');
let orderNext = document.getElementById('orderId');

// Showing total cost of order and return to home page
thankYouName.innerHTML = ' ' + sessionStorage.getItem('firstName') + '!';
totalCost.innerHTML = '$' + ' ' + sessionStorage.getItem('price');
const holder = sessionStorage.getItem('orderId');
orderNext.innerHTML = holder;
console.log(holder);
document.getElementById('returnToHomePage').addEventListener('click', eraseSessionStorage);
// remove the item from localStorage and sessionStorage
function eraseSessionStorage() {
    sessionStorage.removeItem('orderId');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('price');
    localStorage.removeItem('cart');
    location.replace('index.html');
}
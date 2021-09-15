// DOM ELEMENT REFERENCES
let priceElem = document.getElementById('price');
let descElem = document.getElementById('desc');
let select = document.getElementById('Teddy');
let wrapperImage = document.getElementById('cardImage');
let titleProduct = document.getElementById('titleproduct');
const btnAddToCart = document.getElementById('btnAddToCart');

/**
 *  Init method is a predefined method to initialize an object after its creation
 */
async function init() {
  let productId = getProductId();
  fetchSingleProduct(productId);
}

/**
 * Return product id from query param
 */
function getProductId() {
const qureyString = window.location.search;
const urlParam = new URLSearchParams(qureyString);
const id = urlParam.get("id");
return id;
}

/**
 * Fetch Single Product by Id 
 * @param {Number} id 
 */
async function fetchSingleProduct(id) {
fetch('http://localhost:3000/api/teddies/' + id)
    .then(response => response.json())
    .then(data => {
    product = data;
    console.log(product);
    showProduct(data);
    })
    .catch(err => console.log(err +'something went wrong'))
   
  }
/**
 * Creating an Product string for the specified data.
 * @param 
 */
function showProduct(data) { 
    let name = data.name;
    let description = data.description;
    let priceString = data.price.toString();
    let price = priceString.substring(0, 3);
    let imageUrl = data.imageUrl;
    let colors = data.colors;
    
   // image product 
  let imageElem = document.createElement('img');
  imageElem.setAttribute('src', imageUrl);
  wrapperImage.appendChild(imageElem);

  // name product
  let nameElem = document.createElement('h1');
  nameElem.innerHTML = name;
  titleProduct.appendChild(nameElem);

  // price product
  priceElem.innerHTML = price + ` $`;
  descElem.innerHTML = description;

  // DROPDOWN LISTENER
  for (let i in colors) {
    const newOption = document.createElement('option');
    newOption.textContent = colors[i];
    select.appendChild(newOption);
  } 
  
}

// Put Product Data To The LocalStorage
btnAddToCart.addEventListener('click', () => {
  let cartItems = [];
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorageContent);
  }
  let singleProduct = {
    imageUrl: product.imageUrl,
    price: product.price,
    name: product.name,
    selectLenses: select.value,
    prodId: product._id,
  };

  //push item_selector to cart
  cartItems.push(singleProduct);
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // this function Notify User that Added items to cart
  let confirme = document.getElementById('confirme-feedback');
  confirme.innerHTML = `Just Added Items To Cart.`;
  confirme.classList.add('confirme-feedback--visible');
  confirme.hideTimeout = setTimeout(() => {
    confirme.classList.remove('confirme-feedback--visible');
  }, 3000);

  addNumCart()
});

/**
 *  cart-function/ This function storage product informantion to cart.
*/
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent) {
    let cartItemsArray = JSON.parse(localStorageContent);
    let cartNum = document.getElementById('cartNum');
    cartNum.innerHTML = cartItemsArray.length;
  }
}

addNumCart();
init();

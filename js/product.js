
// DOM ELEMENT REFERENCES
let priceElem = document.getElementById('price');
let descElem = document.getElementById('desc');
let select = document.getElementById('camera');
let wrapperImage = document.getElementById('big-image');
let titleProduct = document.getElementById('titleproduct');
const btnAddToCart = document.getElementById('btnAddToCart');
let productsContainer = document.getElementById('img-card');

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
    .catch(err => console.log(err))
  }
/**
 * 
 * @param 
 */
function showProduct(data) {
    
    let name = data.name;
    let description = data.description;
    let priceString = data.price.toString();
    let price = priceString.substring(0, 3);
    let imageUrl = data.imageUrl;
    let lenses = data.lenses;
    
   // image product 
  let imageElem = document.createElement('img');
  imageElem.setAttribute('src', imageUrl);
  wrapperImage.appendChild(imageElem);
  // name product
  let nameElem = document.createElement('h1');
  nameElem.innerHTML = name;
  titleproduct.appendChild(nameElem);

  priceElem.innerHTML = price + ` $`;
  descElem.innerHTML = description;
  // DORPDOWN LISTENER
  for (let i in lenses) {
    const newOption = document.createElement("option");
    newOption.textContent = lenses[i];
    select.appendChild(newOption);
  }

  addNumCart();
}
   










init();
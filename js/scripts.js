const productsContainer = document.getElementById('content');
const url = 'http://localhost:3000/api/teddies';

async function getProducts() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
 

  for (let i = 0; i < data.length; i++) {
     console.log(data[i]);

    //  Product Values
    let productId = data[i]._id;
    let name = data[i].name;
    let description = data[i].description;
    let priceString = data[i].price.toString();
    let price = priceString.substring(0, 3);
    let imageUrl = data[i].imageUrl;
    console.log(priceString);

    // Create & Append New Product
    const product = document.createElement('div');
    product.classList.add('col-md-4');

    product.innerHTML = `
    <a href="product.html?id=${productId} "class="card h-40 hover-card shadow">
      <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
        <img class="card-img-top" src="${imageUrl}" alt="Product Image">
        <div class="card-body p-3">
          <div class="text-center text-1">
            <h5 class="card-title fw-bolder">${name}</h5>
            <p class="text-justify desc fst-italic">${description}</p>
            <span class="price fw-bolder">$ ${price}</span>
          </div>
        </div>
      </div>
    </a>
    `;
    console.log(typeof(product))
    productsContainer.appendChild(product);
   
  }
 
}
/**
 * Cart-function This will show tote/products in cart 
 **/ 
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent) {
    let cartItemsArray = JSON.parse(localStorageContent);
    let cartNum = document.getElementById('cartNum');
    cartNum.innerHTML = cartItemsArray.length;
  }
}
getProducts();
addNumCart();

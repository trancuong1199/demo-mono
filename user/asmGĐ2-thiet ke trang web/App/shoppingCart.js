const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addToCarts = $$(".add-to-cart");
const changeNumberOfCart = $(".header-icon-bag-notice");
const renderProducts = $(".render-products");
const subTotal = $("#subtotal");
const total = $("#total");
const shipping = $("#shipping");


const products = [
  {
    id: 1,
    name: "ALIQUAM LOBORTIS",
    tag: "aliquam",
    price: 90,
    inCart: 0,
    img: "default-1.jpg",
  },
  {
    id: 2,
    name: "DUIS PULVINAR OBORTIS",
    tag: "duis",
    price: 199,
    inCart: 0,
    img: "default-3.jpg",
  },
  {
    id: 3,
    name: "DOLORUM FUGA EGET",
    tag: "dolorum",
    price: 150,
    inCart: 0,
    img: "default-5.jpg",
  },
  {
    id: 4,
    name: "CONVALLIS QUAM SIT",
    tag: "convallis",
    price: 111,
    inCart: 0,
    img: "default-6.jpg",
  },
  {
    id: 5,
    name: "CONDIMENTUM POSUERE",
    tag: "posuere",
    price: 300,
    inCart: 0,
    img: "default-7.jpg",
  },
  {
    id: 6,
    name: "DONEC EU LIBERO AC",
    tag: "donec",
    price: 89,
    inCart: 0,
    img: "default-8.jpg",
  },
  {
    id: 7,
    name: "CRAS NEQUE METUS",
    tag: "cras",
    price: 500,
    inCart: 0,
    img: "default-9.jpg",
  },
  {
    id: 8,
    name: "CONDIMENTUM POSUERE",
    tag: "condimentum",
    price: 168,
    inCart: 0,
    img: "default-4%20(1).jpg",
  },
  {
    id: 9,
    name: "CONDIMENTUM POSUERE",
    tag: "condimentum",
    price: 100,
    inCart: 0,
    img: "default-10.jpg",
  },
  {
    id: 10,
    name: "EPICURI PER LOBORTIS",
    tag: "epicuri",
    price: 90,
    inCart: 0,
    img: "default-9.jpg",
  },
  {
    id: 11,
    name: "CONVALLIS QUAM SIT",
    tag: "convallis",
    price: 60,
    inCart: 0,
    img: "default-11.jpg",
  },
  {
    id: 12,
    name: "DOLORUM FUGA EGET",
    tag: "dolorum",
    price: 120,
    inCart: 0,
    img: "default-6.jpg",
  },
];

for (let i = 0; i < addToCarts.length; i++) {
  addToCarts[i].onclick = () => {
    cartNumbers(products[i]);
  };
}

// Get info products when clicked
function setItems(product) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    cartItems = {
      [product.tag]: product,
    };
    product.inCart = 1;
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Quantity increased when add product
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    changeNumberOfCart.textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    changeNumberOfCart.textContent = 1;
  }

  setItems(product);
}

//Total Cost
function totalCost() {
  let productInCart = JSON.parse(localStorage.getItem("productsInCart"));
  let totalCost = 0;
  for (let x in productInCart){
    totalCost += productInCart[x].price*productInCart[x].inCart;
  }
  return totalCost;
}

// Save data on localStorage when reload page
function onLoadCartIcon() {
  let productNumbers = localStorage.getItem("cartNumbers");
  
  if (productNumbers) {
    changeNumberOfCart.textContent = productNumbers;
  }
}

onLoadCartIcon();

// Remove product

function removeProduct(id) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let productNumbers = localStorage.getItem("cartNumbers");
  let temp = Object.values(cartItems).filter(function(item) {
    if(id === item.id) {
      // localStorage.setItem("totalCost", cartTotal - item.price * item.inCart)
      localStorage.setItem("cartNumbers", productNumbers - item.inCart);
      changeNumberOfCart.textContent = productNumbers - item.inCart;
    }
    return item.id != id
  });
  localStorage.setItem("productsInCart", JSON.stringify(temp));
  viewCartTotals()
  viewCart()
}


// View Cart
function viewCart() {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  if (cartItems) {
    renderProducts.innerHTML = "";
    Object.values(cartItems).map((item) => {
      renderProducts.innerHTML += `
            <tr class="item-product">
              <td onclick="removeProduct(${item.id})" class="delete-icon">
                <i class="ti-trash"></i>
              </td>
              <td class="item-img">
                <img src="../assets/img/Featured products/${item.img}">
              </td>
              <td class="item-name">
                <h2>${item.name}</h2>
              </td>
              <td class="item-price">
                <p>$${item.price}.0</p>
              </td>
              <td class="item-quantity"> 
                  <i class="ti-minus item-quantity-icon" onclick="handleOnIcon(this, ${item.id})"></i>
                  <p class="item-quantity-child">${item.inCart}</p>
                  <i class="ti-plus item-quantity-icon" onclick="handleOnIcon(this, ${item.id})"></i>
              </td>
              <td>
                <p class="item-total-${item.id} item-total">$${item.price * item.inCart}.0</p>
              </td>
            </tr>
        `;
    });
  } 
  if (cartItems.length === 0) {
      renderProducts.innerHTML += `
          <h2 class="cart-empty">Your cart is empty</h2>
      `
  }
}

viewCart();


// HandleOnIcon

function handleOnIcon(btn, id) {
  let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  let productInCart = JSON.parse(localStorage.getItem("productsInCart"));
  let totalCart = document.querySelector("#totalCost");
  const itemTotal = document.querySelector(`.item-total-${id}`);
  
  if (btn.classList.contains("ti-minus")) {
    var quantity = btn.nextElementSibling;
    if (parseInt(quantity.innerText) > 1) {
      localStorage.setItem("cartNumbers", productNumbers - 1);
      changeNumberOfCart.textContent = productNumbers - 1;
      quantity.innerText = parseInt(quantity.innerText) - 1;
    }
  } else {
    var quantity = btn.previousElementSibling;
    localStorage.setItem("cartNumbers", productNumbers + 1);
    changeNumberOfCart.textContent = productNumbers + 1;
    quantity.innerText = parseInt(quantity.innerText) + 1;
  }
  let product = products.find(function(value){
    return value.id == id;
  })
  
  let price = product.price;
  let total = price * parseInt(quantity.innerText);
  itemTotal.innerText = `$${total}.0`;

  for (let x in productInCart){
    if(productInCart[x].id == id){
      productInCart[x].inCart = parseInt(quantity.innerText);
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(productInCart));
  totalCart.innerText = `$${totalCost()}.0`;
};



//// Cách 2
// let quantity_buttons = document.querySelectorAll(".item-quantity-icon");
// quantity_buttons.forEach(element => {
//     element.addEventListener("click",function(){
//        if(element.classList.contains("ti-minus")){
//           let quantity = element.nextElementSibling;
//         if(parseInt(quantity.innerText) > 1){
//           quantity.innerText = parseInt(quantity.innerText) - 1;
//         }
//        }else{
//         let quantity = element.previousElementSibling;
//         quantity.innerText = parseInt(quantity.innerText) + 1;
//        }
//       let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
//       localStorage.setItem("cartNumbers", productNumbers + 1);
//       changeNumberOfCart.textContent = productNumbers + 1;
//     });
// })





// viewCartTotals
function viewCartTotals() {
  let cartNumbers = JSON.parse(localStorage.getItem("cartNumbers"));
  if (cartNumbers > 0) {
    subTotal.innerHTML = "";
    subTotal.innerHTML += `
      <p id="totalCost">$${totalCost()}.0</p>
    `;
    shipping.innerHTML = "";
    shipping.innerHTML += `
      <p>$25.0</p>
    `;
    total.innerHTML = "";
    total.innerHTML += `
      <p>$${totalCost() + 25}.0</p>
    `
  } else {
    subTotal.innerHTML = "";
    subTotal.innerHTML += `
      <p id="totalCost">$${totalCost()}.0</p>
    `;
    shipping.innerHTML = "";
    shipping.innerHTML += `
      <p>$00.0</p>
    `;
    total.innerHTML = "";
    total.innerHTML += `
      <p>$00.0</p>
    `
  }
}

viewCartTotals()


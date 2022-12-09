function number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const iconCart = document.querySelector('.header-icon-bag-notice');
const showProducts = document.querySelector('.product-img');
const imgBig = document.querySelector('.body-banner-big');
const imgSmall = document.querySelector('.body-banner-big-right');
const bestSeller = document.querySelector('.best-seller-product');
var products;

// Show Products
axios.get('http://localhost:3000/products')
    .then((res) => {
        const data = res.data;
        products = data
        res.data.slice(5, 13).forEach((value) => {
                showProducts.innerHTML += `
                    <div class="products-new-child">
                        <div class="products-new-img">
                            <img src="${value.image}" alt="">
                            <div class="products-new-img-sale">sale</div>
                            <div class="products-new-img-action">
                                <div class="new-img-action-add add-to-cart" onclick="addToCart(${value.id})">Thêm giỏ hàng</div>
                                <div class="new-img-action-icon">
                                    <i class="ti-search"></i>
                                    <i class="ti-heart"></i>
                                    <a href="/user/asmGĐ2-thiet ke trang web/product.html?id=${value.id}" class="checkNow" style="color: #fff";>
                                        <i class="ti-control-shuffle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
    
                        <div class="products-new-info">
                            <div class="products-new-info-name">
                                <h2 class="new-info-name-title">${value.name}</h2>
                            </div>
                            <div class="products-new-info-bottom">
                                <ul class="new-info-name-star">
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                </ul>
                                <div class="products-new-info-price-left">
                                    <div class="products-new-info-price-old">1.600.000đ</div>
                                    <div class="products-new-info-price-new">${number_format(value.price)} đ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        )

        res.data.slice(0, 1).forEach((value) => {
                imgBig.innerHTML += `
                    <div class="banner-big-img">
                        <img src="${value.image}" alt="">
                    </div>
                    <div class="banner-big-content">
                        <h2 class="banner-big-content-title">${value.name}</h2>
                        <h3 class="banner-big-content-subtitle">Thiết kế thủ công</h3>
                        <div class="banner-big-btn">
                            <a href="/user/asmGĐ2-thiet ke trang web/product.html?id=${value.id}" class="checkNow">
                                <button class="banner-big-button" href="/user/asmGĐ2-thiet ke trang web/product.html?id=${value.id}">
                                    Xem ngay
                                    <i class="banner-big-btn-icon ti-arrow-right"></i>
                                </button>
                            </a>
                        </div>
                    </div>
                `
        })

        res.data.slice(1, 5).forEach((value) => {
                imgSmall.innerHTML += `
                    <div class="col l-6 m-12">
                        <div class="hover-img body-banner-small-1">
                            <img src="${value.image}" alt=""
                                class="banner-small-img">
                            <div class="body-banner-small-text">
                                <h3 class="banner-small-title hide-on-PC-low">${value.name}</h3>
                                <a href="/user/asmGĐ2-thiet ke trang web/product.html?id=${value.id}" class="checkNow">
                                    <h4 class="banner-small-buy"">Xem ngay</h4>
                                </a> 
                            </div>
                        </div>
                    </div>
                `
        })

        res.data.slice(11, 16).forEach((value) => {
            bestSeller.innerHTML += `
                <div class="col l-3">
                    <div class="seller-product-child">
                        <div class="seller-product-img">
                            <img src="${value.image}" alt="">
                            <div class="seller-product-action">
                                <div class="seller-product-action-add add-to-cart" onclick="addToCart(${value.id})">Thêm giỏ hàng</div>
                                <div class="seller-product-action-icon">
                                    <i class="ti-search"></i>
                                    <i class="ti-heart"></i>
                                    <a href="/user/asmGĐ2-thiet ke trang web/product.html?id=${value.id}" class="checkNow" style="color: #fff;">
                                        <i class="ti-control-shuffle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="seller-product-info">
                            <div class="seller-product-info-name">
                                <h2 class="seller-product-name-title">${value.name}</h2>
                            </div>
                            <div class="seller-product-info-bottom">
                                <ul class="seller-product-name-star">
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                    <li class="star-fill">
                                        <i class="fas fa-star"></i>
                                    </li>
                                    <li">
                                        <i class="fas fa-star"></i>
                                        </li>
                                </ul>
                                <div class="seller-product-info-price-left">
                                    <div class="seller-product-info-price-new">${number_format(value.price)} đ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
    }
)

// Add to cart

function addToCart(id) {
    products.forEach((value) => {
        if (id === value.id) {
            let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
            let Product = {
                id: value.id,
                name: value.name,
                image: value.image,
                price: value.price,
                quantity: 1
            }
            if (cartItems === null) {
                cartItems = []
                cartItems.push(Product)
                localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            } else {
                let item = cartItems.find((item)=>{
                    if (item.id === Product.id) {
                        return item;
                    }
                })
        
                if(item) {
                    item.quantity = item.quantity + 1;
                    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
                } else {
                    cartItems = JSON.parse(localStorage.getItem("productsInCart"))
                    cartItems.push(Product);
                    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
                }
        
            }
            showSuccessToast()
        }
    })


    // quantity icon 
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let iconQuantity = JSON.parse(localStorage.getItem("iconQuantity"));
    let total = 1; 
    let dataTotal = {
        totalQuantity: total
    }
    
    cartItems.forEach((value) => {
        total += value.quantity
    })

    if (iconQuantity === null) {
        iconQuantity = []
        iconQuantity.push(dataTotal)
        localStorage.setItem("iconQuantity", JSON.stringify(iconQuantity));
    } else {
        iconQuantity = JSON.parse(localStorage.getItem("iconQuantity"))
        iconQuantity[0].totalQuantity += 1
        localStorage.setItem("iconQuantity", JSON.stringify(iconQuantity))
    }
    onLoadCartIcon();
    renderProductsOnCart()
}

function onLoadCartIcon() {
    const iconQuantity = JSON.parse(localStorage.getItem("iconQuantity"));
    
    if (iconQuantity) {
        iconCart.innerText = iconQuantity[0].totalQuantity
    }
}
onLoadCartIcon();


// Add products to icon Cart

function renderProductsOnCart() {
    const iconBag = document.querySelector('.icon-bag-Shopping-father');
    const sumBag = document.querySelector('.bag-sum');
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    
    if (cartItems.length == 0) {
        iconBag.innerHTML = '<p style="margin-left: 25px; color: #000;">Giỏ hàng trống</p>'
        sumBag.innerHTML = `
            <p>Tổng tiền:</p>
            <span class="bag-sum-money">0 đ</span>
        `
    } else {
        let temp = ''
        let dataPrice = [];
        cartItems.forEach((value) => {
            dataPrice.push(value.price * value.quantity)
            const newPrice = dataPrice.reduce((prev, curr) => prev + curr, 0)
            temp += `
                <div class="icon-bag-product">
                    <img class="icon-bag-product-img" src="${value.image}" alt="">
    
                    <ul class="icon-bag-product-description">
                        <a href="/user/asmGĐ2-thiet ke trang web/product.html?id=${value.id}" style="text-decoration: none;"><li class="bag-product-description-name">${value.name}</li></a>
                        <li class="bag-product-description-price">${value.quantity} x ${number_format(value.price)}</li>
                    </ul>
                    <i class="icon-bag-product-bin ti-trash" onclick="deleteProduct(${value.id})"></i>
                </div>
            `
            sumBag.innerHTML = `
                <p>Tổng tiền:</p>
                <span class="bag-sum-money">${number_format(newPrice)} đ</span>
            `
        })
        iconBag.innerHTML = temp
    }
}


function deleteProduct(id) {
    const cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let item = cartItems.filter((value) => {
        if(value.id == id) {
            let icon = JSON.parse(localStorage.getItem("iconQuantity"));
            iconCart.innerText = icon[0].totalQuantity -= value.quantity;
            localStorage.setItem("iconQuantity", JSON.stringify(icon));
        }
        return value.id != id
    })
    localStorage.setItem("productsInCart", JSON.stringify(item));
    renderProductsOnCart()
    viewCart()
}
renderProductsOnCart()

// Message success when add product to cart

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 800);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
  }

  
function showSuccessToast() {
    toast({
        title: "Thành công!",
        message: "Thêm vào giỏ hàng thành công!",
        type: "success",
        duration: 3000
    });
}

function showErrorToast() {
    toast({
      title: "Thất bại!",
      message: "Vui lòng nhập số lượng cần mua!",
      type: "error",
      duration: 3000
    })
};

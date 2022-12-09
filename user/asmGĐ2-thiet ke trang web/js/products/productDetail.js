const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
function number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

var product;
let productId = params.id;
const productDetail = document.querySelector('.productDetail');
axios.get(`http://localhost:3000/products/${productId}`)
    .then((res) => {
            product = res.data;
            productDetail.innerHTML = `
                <div class="col l-6 m-12 c-12">
                    <div class="product-img">
                        <img src="${product.image}" alt="">
                    </div>
                </div>

                <div class="col l-6 m-12 c-12">
                    <h3 class="product-name">${product.name}</h3>
                    <ul class="product-info">
                        <li>
                            <i style="color:#f7b603;" class="fas fa-star"></i>
                            <i style="color:#f7b603;" class="fas fa-star"></i>
                            <i style="color:#f7b603;" class="fas fa-star"></i>
                            <i style="color:#f7b603;" class="fas fa-star"></i>
                            <i style="color: #dfdfde;" class="fas fa-star"></i>
                        </li>
                        <li class="product-review">
                            <p>3 Nhận xét</p>
                        </li>
                        <li class="product-review">
                            <p class="product-review--separate">Thêm nhận xét</p>
                        </li>
                        <ul class="product-icon">
                            <li class="product-social">
                                <p class="product-review--separate">Share:</p>
                            </li>
                            <li>
                                <i class="fab fa-facebook-f"></i>
                            </li>
                            <li>
                                <i class="fab fa-twitter"></i>
                            </li>
                            <li>
                                <i class="fab fa-google-plus-g"></i>
                            </li>
                            <li>
                                <i class="fab fa-pinterest-p"></i>
                            </li>
                            <li>
                                <i class="fas fa-camera-retro"></i>
                            </li>
                            <li>
                                <i class="far fa-envelope"></i>
                            </li>
                        </ul>
                    </ul>
                    <div class="product-price">
                        <h2 class="product-price-main">2.000.000đ</h2>
                        <h2 class="product-price-sale">${number_format(product.price)}đ</h2>
                    </div>

                    <h4 class="product-Availability">Tình trạng: <strong style="color:#8c8c8c;">Còn hàng</strong></h4>
                    <h4 class="product-code">Mã sản phẩm: <strong style="color:#8c8c8c;">#499577</strong></h4>
                    <h4 class="product-tags">Tags: <strong style="color:var(--main-color);">Classic, Casual, V-neck,
                            Loose</strong></h4>
                    <span class="product-content">
                        ${product.detail}
                        <br>
                        • Chất lượng
                        <br>
                        • Giá cả
                        <br>
                        • Chất liệu
                        <br>
                        • Miễn phí vận chuyển
                    </span>

                    <div class="product-form">

                        <div class="product-form-quantity">
                            <h4 class="form-color-title">Số lượng</h4>
                            <input type="number" id="form-quantity" min="1" max="1000">
                        </div>
                    </div>

                    <div class="product-btn">
                        <button class="product-btn-cart" onclick="addToCart()">
                            <i class="fas fa-shopping-cart"></i>
                            Mua ngay
                        </button>
                        <button class="product-btn-lookbook">
                            <i class="far fa-heart"></i>
                            Yêu thích</button>
                    </div>

                    <div class="product-compare">
                        <div class="compare-icon">
                            <i class="fas fa-compress-alt"></i>
                        </div>
                        <h2>Add to Compare</h2>
                    </div>
                </div>
            `
        }
    )


// Add to cart

function addToCart() {
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    const quantity = document.querySelector('#form-quantity');
    let Product = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: Number(quantity.value)
    }
    if (quantity.value == '') {
        showErrorToast();
    } else {
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
                item.quantity = item.quantity + Number(quantity.value);
                localStorage.setItem("productsInCart", JSON.stringify(cartItems))
            } else {
                cartItems = JSON.parse(localStorage.getItem("productsInCart"))
                cartItems.push(Product);
                localStorage.setItem("productsInCart", JSON.stringify(cartItems))
            }
        }

        let iconQuantity = JSON.parse(localStorage.getItem("iconQuantity"));
        let total = Number(quantity.value); 
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
            iconQuantity[0].totalQuantity += Number(quantity.value)
            localStorage.setItem("iconQuantity", JSON.stringify(iconQuantity))
        }
        quantity.value = ''
        onLoadCartIcon();
        renderProductsOnCart();
        showSuccessToast();
    }
}
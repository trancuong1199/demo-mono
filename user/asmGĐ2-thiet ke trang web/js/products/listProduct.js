const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
function number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const cateId = params.cateId
const showProduct = document.querySelector('.product-img-cate');
const filterPrice = document.querySelectorAll('.filter');
var products;
const selectedPrices = [];
filterPrice.forEach((data) => {
    data.onclick = function() {
       
        if(this.checked){
            selectedPrices.push(this.value)
        }else{
            let position = selectedPrices.indexOf(this.value);
            selectedPrices.splice(position,1);
        }
        if(selectedPrices.length == 0) {
            showProductCate(products);
            return;
        }
        let filterProducts = products.filter((value) => {
            let flag = false;
            selectedPrices.forEach((item)=>{
                let price_range = item.split("-");
                let min_price = Number(price_range[0]);
                let max_price = Number(price_range[1]);
                if(min_price <= value.price && value.price <= max_price) {
                    flag = true;
                }
            })
            if(flag){
                return value;
            }
        })
        showProductCate(filterProducts);
    }
})

function showProductCate(products) {
    let output = "";
    products.forEach((value) => {
        output += `
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
    })
    showProduct.innerHTML = output
}

axios.get('http://localhost:3000/products')
    .then((res) => {
        products = res.data.filter((value) => {
            if(value.cats.includes(Number(cateId))) {
               return value;
            }
        })
       
       showProductCate(products);
    })
    
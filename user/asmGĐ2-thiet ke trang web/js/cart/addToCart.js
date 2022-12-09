const render = document.querySelector('.render-products');
const subtotal = document.querySelector('#subtotal');
const shipping = document.querySelector('#shipping');
const total = document.querySelector('#total');
function number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function viewCart() {
    const cart = JSON.parse(localStorage.getItem("productsInCart"));
    if (cart.length == 0) {
        render.innerHTML = `
            <h2 class="cart-empty">Giỏ hàng trống - <a class="buyNow" href="index.html">Mua ngay!</a></h2>
        `
    } else {
        let output = '';
        let dataPrice = [];
        cart.forEach((res) => {
            dataPrice.push(res.price * res.quantity)
            const newPrice = dataPrice.reduce((prev, curr) => prev + curr, 0)
            output += `
                <tr class="item-product">
                    <td onclick="removeProduct(${res.id})" class="delete-icon">
                        <i class="ti-trash"></i>
                    </td>
                    <td class="item-img">
                        <img src="${res.image}">
                    </td>
                    <td class="item-name">
                        <h2>${res.name}</h2>
                    </td>
                    <td class="item-price">
                        <p>${number_format(res.price)} đ</p>
                    </td>
                    <td class="item-quantity"> 
                        <i class="ti-minus item-quantity-icon" onclick="handleOnIcon(this, ${res.id})"></i>
                        <p class="item-quantity-child-${res.id}">${res.quantity}</p>
                        <i class="ti-plus item-quantity-icon" onclick="handleOnIcon(this, ${res.id})"></i>
                    </td>   
                    <td>
                        <p class="item-total-${res.id} item-total">${number_format(res.price * res.quantity)} đ</p>
                    </td>
                </tr>
            `
            subtotal.innerText = `${number_format(newPrice)} đ`;
            shipping.innerText = `${number_format(30000)} đ`;
            total.innerText = `${number_format(newPrice + 30000)} đ`;
        })
        render.innerHTML = output;
    }
}
viewCart()

function handleOnIcon(btn, id) {
    // Handle icon plus
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    const iconCart = document.querySelector('.header-icon-bag-notice');
    const quantity = document.querySelector(`.item-quantity-child-${id}`);
    const price = document.querySelector(`.item-total-${id}`);
    
    let product = cartItems.find((item)=>{
        if(item.id === id){
            return item;
        }
    })
    if (btn.classList.contains('ti-plus')) {
        product.quantity++;
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        quantity.innerHTML = product.quantity;
        price.innerHTML = number_format(product.quantity * product.price) + ' đ';

        // Change icon number when increase product
        let icon = JSON.parse(localStorage.getItem("iconQuantity"));
        iconCart.innerText = icon[0].totalQuantity += 1;
        localStorage.setItem("iconQuantity", JSON.stringify(icon));
    } else {
        if (product.quantity > 1) {
            product.quantity--;
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            quantity.innerHTML = product.quantity;
            price.innerHTML = number_format(product.quantity * product.price) + ' đ';

            // Change icon number when decrease product
            let icon = JSON.parse(localStorage.getItem("iconQuantity"));
            iconCart.innerText = icon[0].totalQuantity -= 1;
            localStorage.setItem("iconQuantity", JSON.stringify(icon));
        }

    }
    renderProductsOnCart()
    viewCart()
}

function removeProduct(id) {
    const cart = JSON.parse(localStorage.getItem("productsInCart"));
    let temp = cart.filter((value) => {
        if (value.id == id) {
            let icon = JSON.parse(localStorage.getItem("iconQuantity"));
            iconCart.innerText = icon[0].totalQuantity -= value.quantity;
            localStorage.setItem("iconQuantity", JSON.stringify(icon));
        }
        return value.id !== id
    })
    localStorage.setItem("productsInCart", JSON.stringify(temp));
    viewCart();
    renderProductsOnCart()
}
viewCart();
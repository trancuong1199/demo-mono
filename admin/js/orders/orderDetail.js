const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

function number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

let orderId = params.order_id;
const orderDetail = document.querySelector('tbody');
const newOrders = [];
const newProducts = [];

axios.get('http://localhost:3000/orders')
    .then(function (res) {
        res.data.forEach((newRes) => {
            newOrders.push(newRes);
        })
    }
)


axios.get('http://localhost:3000/products')
    .then(function (res) {
        res.data.forEach((newRes) => {
            newProducts.push(newRes);
        })
    }
)

axios.get(`http://localhost:3000/order_detail?order_id=${orderId}`)
    .then(function (res) {
        newOrders.forEach(function (order) {
            newProducts.forEach(function (product) {
                res.data.forEach(function (dataOrderDetail) {
                    if (dataOrderDetail.product_id === product.id && dataOrderDetail.order_id === order.id) {
                        orderDetail.innerHTML += `
                            <tr>
                                <td class="hidden-xs hidden-sm">${dataOrderDetail.id}</td>
                                <td><a href="javascript:void(0)">${order.customer_name}</a></td>
                                <td class="hidden-xs hidden-sm"><img src="${product.image}"  style="width: 150px;"></td>
                                <td class="hidden-xs hidden-sm">${product.name}</td>
                                <td class="hidden-xs hidden-sm">${dataOrderDetail.quantity}</td>
                                <td class="hidden-xs hidden-sm">${number_format(dataOrderDetail.quantity * product.price)} đ</td>
                            </tr>
                        `
                    }
                })
            })
        })

    }
)
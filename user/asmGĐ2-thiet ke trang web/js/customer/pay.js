const fullName = document.querySelector('.fullName');
const phone = document.querySelector('.phone');
const email = document.querySelector('.email');
const city = document.querySelector('.city');
const district = document.querySelector('.district');
const ward = document.querySelector('.ward');
const houseNumber = document.querySelector('.houseNumber');
const btn = document.querySelector('.sign-in-btn');
const message = document.querySelector('.message');
const date = new Date()

btn.onclick = (e) => {
    e.preventDefault();
    let address = [];
    address.push(houseNumber.value, ward.value, district.value, city.value)
    if (fullName.value == "" || phone.value == "" || email.value == "" || city.value == "" || district.value == "" || ward.value == "" || houseNumber.value == "") {
        message.innerText = 'Vui lòng nhập đầy đủ thông tin! (*) Bắt buộc'
    }
    else {
        axios.post('http://localhost:3000/orders', {
            customer_name: fullName.value, 
            customer_address: address.join(', '),
            customer_email: email.value,
            customer_phone: phone.value,
            create_date: date.toLocaleDateString()
        })
        .then((res) => {
            alert('Đặt đơn hàng thành công!')
            let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
            let iconQuantity = JSON.parse(localStorage.getItem("iconQuantity"));
            let lastOrder = res.data.id;

            cartItems.forEach((value) => {
                axios.post('http://localhost:3000/order_detail', {
                    order_id: lastOrder,
                    product_id: value.id,
                    quantity: value.quantity
                })
            })
            
            cartItems = [];
            iconQuantity[0].totalQuantity = 0;
    
            localStorage.setItem("iconQuantity", JSON.stringify(iconQuantity));
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        })
    }
}
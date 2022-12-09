const listOrders = document.querySelector('tbody');

axios.get('http://localhost:3000/orders')
    .then(function (res) {
        res.data.forEach((data) => {
            listOrders.innerHTML += `
                <tr>
                    <td class="cell-small text-center">${data.id}</td>
                    <td><a id="customer-name-${data.id}">${data.customer_name}</a></td>
                    <td class="hidden-xs hidden-sm" id="customer-address-${data.id}">${data.customer_address}</td>
                    <td class="hidden-xs hidden-sm" id="customer-email-${data.id}">${data.customer_email}</td>
                    <td class="hidden-xs hidden-sm" id="customer-phone-${data.id}">${data.customer_phone}</td>
                    <td class="hidden-xs hidden-sm" id="customer-date-${data.id}">${data.create_date}</td>
                    <td class="text-center">
                        <div class="btn-group">
                            <a href="/admin/orderDetail.html?order_id=${data.id}" data-toggle="tooltip" title="" class="btn btn-xs btn-info" data-original-title="Details"><i class="fa fa-info-circle"></i></a>
                            <a data-toggle="tooltip" title="" class="btn btn-xs btn-danger" data-original-title="Delete" onclick="deleteOrder(${data.id})"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>
            `
        })
    }
)

// Deleted

function deleteOrder(id) {
    axios.delete(`http://localhost:3000/orders/${id}`)
        .then(() => {
            alert('Xóa thành công');
        }
    )
}

// Edit Status

function editStatus(id, status) {
    document.querySelector(`#edit-${id}`).innerHTML = `
        <input id="newStatus" value="${status}">
        <button onclick="saveStatus(${id})">Lưu</button>
    `
}


function saveStatus(id) {
    const newStatus = document.querySelector('#newStatus').value;
    const newName = document.querySelector(`#customer-name-${id}`).innerText;
    const newAddress = document.querySelector(`#customer-address-${id}`).innerText;
    const newEmail = document.querySelector(`#customer-email-${id}`).innerText;
    const newPhone = document.querySelector(`#customer-phone-${id}`).innerText;
    const newDate = document.querySelector(`#customer-date-${id}`).innerText;
    axios.put(`http://localhost:3000/orders/${id}`, {
        customer_name: newName,
        customer_address: newAddress,
        customer_email: newEmail,
        customer_phone: newPhone,
        create_date: newDate,
        status: newStatus
    })
    .then(() => {
        alert('Sửa thành công');
    })
}
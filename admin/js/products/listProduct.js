axios.get('http://localhost:3000/products')
    .then(function(res) {
        res.data.forEach((product) => {
            document.querySelector('tbody').innerHTML += `
                <tr>
                    <td class="hidden-xs hidden-sm">${product.id}</td>
                    <td><a href="javascript:void(0)">${product.name}</a></td>
                    <td class="hidden-xs hidden-sm"><img src="${product.image}" style="width: 150px;"></td>
                    <td class="hidden-xs hidden-sm">${product.price}</td>
                    <td class="hidden-xs hidden-sm">${product.detail}</td>
                    <td class="text-center">
                        <div class="btn-group">
                            <a href="javascript:void(0)" data-toggle="tooltip" title="" class="btn btn-xs btn-info" data-original-title="Details"><i class="fa fa-info-circle"></i></a>
                            <a href="/admin/editProducts.html?product_id=${product.id}" data-toggle="tooltip" title="" class="btn btn-xs btn-success" data-original-title="Edit"><i class="fa fa-pencil"></i></a>
                            <a href="javascript:void(0)" data-toggle="tooltip" title="" class="btn btn-xs btn-danger" data-original-title="Delete" onclick="deleteProduct(${product.id})"><i class="fa fa-times"></i></a>
                        </div>
                    </td>
                </tr>
            `
        })  
    })

 
function deleteProduct(id) {
    axios.delete(`http://localhost:3000/products/${id}`)
        .then(() => {
            alert('Xóa thành công!');
        })

}

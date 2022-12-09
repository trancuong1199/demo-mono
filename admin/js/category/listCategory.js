const listCate = document.querySelector('tbody');

axios.get('http://localhost:3000/categories?parent_id=0')
    .then((res) => {
        res.data.forEach((data) => {
            listCate.innerHTML += `
                <td class="cell-small text-center">${data.id}</td>
                <td id="edit-${data.id}">${data.name}
                    <a href="/admin/addCateChildren.html?parent_id=${data.id}" style="margin-left: 10px;">Thêm danh mục con</a>
                </td>
                <td class="text-center">
                    <div class="btn-group">
                        <a href="javascript:void(0)" data-toggle="tooltip" title="" class="btn btn-xs btn-info" data-original-title="Details"><i class="fa fa-info-circle"></i></a>
                        <a href="javascript:void(0)" data-toggle="tooltip" title="" class="btn btn-xs btn-success" data-original-title="Edit" onclick='editCate(${data.id},"${data.name}")'><i class="fa fa-pencil"></i></a>
                        <a href="javascript:void(0)" data-toggle="tooltip" title="" class="btn btn-xs btn-danger" data-original-title="Delete" onclick='deleteCate(${data.id})'><i class="fa fa-times"></i></a>
                    </div>
                </td>
            `
        })
    }
)

// Deleted Cate

function deleteCate(id) {
    axios.delete(`http://localhost:3000/categories/${id}`)
    .then(function() {
        alert('Xóa thành công!');
    })
}

// Edit Cate

function editCate(id, name) {
    document.querySelector(`#edit-${id}`).innerHTML = `<input id="editName" value="${name}"> <button onclick='btnEditCate(${id})'>Lưu</button>`;
}

function btnEditCate(id) {
    const newName = document.querySelector('#editName').value;
    axios.put(`http://localhost:3000/categories/${id}`,{
        name: newName   
    })
    .then(function() {
        alert('Sửa thành công!')
    })
}



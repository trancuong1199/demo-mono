// Add Cate-Children

const btnCateChildren = document.querySelector('#btn-CateChildren');
const inputValue = document.querySelector("#val_username");
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const renderCate = document.querySelector('tbody');
const parentId = params.parent_id
btnCateChildren.onclick = ((e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/categories', {
        name: inputValue.value,
        parent_id: Number(parentId)
    })
})

axios.get(`http://localhost:3000/categories?parent_id=${parentId}`)
    .then((res) => {
        res.data.forEach((data) => {
            renderCate.innerHTML += `
                <td class="cell-small text-center">${data.id}</td>
                <td id="edit-${data.id}">${data.name}
                    <a href="/admin/addCateChildren.html?parent_id=${data.id}" style="margin-left: 10px;">Thêm danh mục con</a>
                </td>
                <td class="text-center">
                    <div class="btn-group">
                        <a data-toggle="tooltip" title="" class="btn btn-xs btn-success" data-original-title="Edit" onclick='editCate(${data.id},"${data.name}")'><i class="fa fa-pencil"></i></a>
                        <a data-toggle="tooltip" title="" class="btn btn-xs btn-danger" data-original-title="Delete" onclick='deleteCate(${data.id})'><i class="fa fa-times"></i></a>
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
    document.querySelector(`#edit-${id}`).innerHTML = `<input id="editName" value="${name}"> <button onclick='btnEditCate(event,${id})'>Lưu</button>`;
}

function btnEditCate(e,id) {
    e.preventDefault();
    const newName = document.querySelector('#editName').value;
    axios.put(`http://localhost:3000/categories/${id}`,{
        name: newName,
        parent_id: Number(parentId)
    })
    .then(function() {
        alert('Sửa thành công!')
    })
}
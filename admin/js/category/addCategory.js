const nameCate = document.querySelector('#val_username');
const btnCate = document.querySelector('#btn-Cate');
const listCate = document.querySelector('tbody');

btnCate.onclick = (e) => {
    e.preventDefault();
    if (nameCate.value == "") {
        alert('Vui lòng điền đủ thông tin!');
    } else {
        alert('Thêm thành công!');
        axios.post('http://localhost:3000/categories',{
            name: nameCate.value,
        })
            .then(res => {
                res.data.forEach(data => {
                    listCate.innerHTML += `
                        <td class="cell-small text-center">${data.id}</td>
                        <td><a href="javascript:void(0)">${data.name}</a></td>
                        <td class="text-center">
                            <div class="btn-group">
                                <a href="javascript:void(0)" data-toggle="tooltip" title="" class="btn btn-xs btn-info" data-original-title="Details"><i class="fa fa-info-circle"></i></a>
                                <a href="javascript:void(0)" data-toggle="tooltip" title="" class="btn btn-xs btn-success" data-original-title="Edit"><i class="fa fa-pencil"></i></a>
                                <a href="javascript:void(0)" data-toggle="tooltip" title="" class="btn btn-xs btn-danger" data-original-title="Delete"><i class="fa fa-times"></i></a>
                            </div>
                        </td>
                    `
                })
            })
        }
        nameCate.focus()
}
nameCate.focus()


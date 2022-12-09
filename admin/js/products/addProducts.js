var nameProducts = document.querySelector("#val_username");
var imgProducts = document.querySelector("#val_img");
var priceProducts = document.querySelector("#val_price");
var detailProducts = document.querySelector("#val_detail");
var btnProduct = document.querySelector("#addProduct");
var listCate = document.querySelector(".list-cate");
// biến này dùng để lưu các danh mục được chọn,khai báo ở đây(nghĩa là global) thì có thể truy cập từ bất cứ đoạn mã nào.
var categories;
axios.get(`http://localhost:3000/categories?parent_id=0`)
  .then(async (res) => {
    await showCategories(res.data);
    listCate.innerHTML = categories_output;
    // vì categories là global nên trong hàm này có thể truy cập được.
    categories = document.querySelectorAll(".categories");
  }
);

btnProduct.onclick = (e) => {
  e.preventDefault();
  if ( nameProducts.value == "" || imgProducts.value == "" || priceProducts.value == "" || detailProducts.value == "" ) {
    alert("Nhập đầy đủ thông tin!");
  } else {
    let categories_arr = [];
    // vì categories là global nên trong hàm này có thể truy cập được.
    categories.forEach((item) => {
      if (item.checked) {
        categories_arr.push(Number(item.value));
      }
    });
    axios
      .post("http://localhost:3000/products", {
        name: nameProducts.value,
        image: imgProducts.value,
        price: priceProducts.value,
        detail: detailProducts.value,
        cats: categories_arr,
      })
      .then(() => {
        alert("Thêm thành công");
      });
  }
  nameProducts.focus();
};
nameProducts.focus();

async function checkCate(id) {
  let flag;
  await axios
    .get(`http://localhost:3000/categories?parent_id=${id}`)
    .then((res) => {
      if (res.data.length !== 0) {
        flag = true;
      } else {
        flag = false;
      }
    });
  return flag;
}

var categories_output = "";
async function showCategories(categories) {
  categories_output += "<ul>";
  for (var cat of categories) {
    categories_output += `<li><input class="categories" value=${cat.id} type="checkbox">${cat.name}`;
    if (await checkCate(cat.id)) {
      await axios
        .get(`http://localhost:3000/categories?parent_id=${cat.id}`)
        .then(async (res) => {
          await showCategories(res.data);
        });
    }
    categories_output += "</li>";
  }
  categories_output += "</ul>";
}

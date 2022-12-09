const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const nameProduct = document.querySelector("#val_username");
const imageProduct = document.querySelector("#val_img");
const namePrice = document.querySelector("#price");
const detail = document.querySelector("#detail");
const cate = document.querySelector("#val_skill");
const btnEditProduct = document.querySelector("#btnEditProduct");
var listCate = document.querySelector(".list-cate");
var categories;
let productId = params.product_id;
let product_categories;
axios.get(`http://localhost:3000/products/${productId}`).then(async (res) => {
  let product = res.data;
  product_categories = product.cats;
  nameProduct.value = product.name;
  imageProduct.value = product.image;
  namePrice.value = product.price;
  detail.value = product.detail;

  axios.get(`http://localhost:3000/categories?parent_id=0`)
    .then(async (res) => {
      await showCategories(res.data);
      listCate.innerHTML = categories_output;
      categories = document.querySelectorAll(".categories");
    });
});

async function fetchCategories() {
  let categories = [];
  await axios.get(`http://localhost:3000/categories`).then((res) => {
    categories = res.data;
  });
  return categories;
}

btnEditProduct.onclick = (e) => {
  e.preventDefault();
  let categories_arr = [];
  categories.forEach((item) => {
    if (item.checked) {
      categories_arr.push(Number(item.value));
    }
  });
  axios
    .put(`http://localhost:3000/products/${productId}`, {
      name: nameProduct.value,
      image: imageProduct.value,
      detail: detail.value,
      price: namePrice.value,
      cats: categories_arr,
    })
    .then(function () {
      alert("Sửa thành công!");
    });
};

/*------------------------- categories ------------------------*/


var categories_output = "";
async function showCategories(categories) {
  categories_output += "<ul>";
  for (var cat of categories) {
    // hàm này tương tự như khi thêm,khác ở chỗ là khi show danh mục thì kiểm tra xem danh mục này có tồn tại trong mãng danh mục lấy từ sản phẩm. Nếu có thì check.
    // hàm includes kiểm tra xem một giá trị có tồn tại trong mãng hay không.
    categories_output += `<li><input class="categories" ${
    product_categories.includes(cat.id) ? "checked" : ""
    } value=${cat.id} type="checkbox">${cat.name}`;
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

/*-------------------------END categories ------------------------*/

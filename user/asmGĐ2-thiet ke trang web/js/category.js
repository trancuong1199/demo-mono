const cate = document.querySelector('.header-shop-product-body');
var output = ""
axios.get('http://localhost:3000/categories?parent_id=0')
    .then(async (res) => {
        for (var cat of res.data) {
            output += `
                <div class="header-shop-product-body-title">
                    <h2 class="product-body-name">${cat.name}</h2>
            `
            if(await checkCate(cat.id)) {
                await axios
                    .get(`http://localhost:3000/categories?parent_id=${cat.id}`)
                    .then(async (res) => {
                        res.data.forEach((value) => {
                        output += `
                            <ul class="product-body-child" style="padding-top: 5px;">
                                <li class="product-body-child-name"><a href="listProductsCate.html?cateId=${value.id}">${value.name}</a></li>
                            </ul>
                        `
                    })
                }
                )
            }
            output += `</div>`
        }
        cate.innerHTML = output
    })

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
function showFood() {
    showMain();
    axios.get("http://localhost:8080/foods").then((response) => {
        let list = response.data;
        let html = `
<div class="u-s-p-y-90">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="shop-p">
                    <div class="shop-p__toolbar u-s-m-b-30">
                        <div class="shop-p__meta-wrap u-s-m-b-60">
                            <span class="shop-p__meta-text-1">FOUND ${list.length} RESULTS</span>
                            <div class="shop-p__meta-text-2">
                                <span>Related Searches:</span>
                                <a class="gl-tag btn--e-brand-shadow" href="#">men's clothing</a>
                                <a class="gl-tag btn--e-brand-shadow" href="#">mobiles & tablets</a>
                                <a class="gl-tag btn--e-brand-shadow" href="#">books & audible</a>
                            </div>
                        </div>
                        <!--====== Search Form ======-->
                        <div class="main-form" style="margin-bottom: 20px">
                            <label for="main-search-food"></label>
                            <input class="input-text input-text--border-radius input-text--style-1" type="text" id="main-search-food" placeholder="Search" name="foodName">
                            <button class="btn btn--icon fas fa-search main-search-button-food" onclick="searchFood()"></button>
                        </div>
                        <!--====== End - Search Form ======-->
                        <div class="shop-p__tool-style">
                            <button class="js-shop-filter-target" data-side="#side-filter" onclick="AddFoodForm()">Add Product</button>
                            <!-- Button trigger modal -->

                            <div class="tool-style__form-wrap">
                                <div class="u-s-m-b-8"><select class="select-box select-box--transparent-b-2">
                                    <option>Show: 8</option>
                                    <option selected>Show: 12</option>
                                    <option>Show: 16</option>
                                    <option>Show: 28</option>
                                </select></div>
                                <div class="u-s-m-b-8"><select class="select-box select-box--transparent-b-2">
                                    <option selected>Sort By: Newest Items</option>
                                    <option>Sort By: Latest Items</option>
                                    <option>Sort By: Best Selling</option>
                                    <option>Sort By: Best Rating</option>
                                    <option>Sort By: Lowest Price</option>
                                    <option>Sort By: Highest Price</option>
                                </select></div>
                            </div>
                        </div>
</div>

                    <div class="shop-p__collection" id="shop-p__collection">
                        <div class="row is-grid-active">`;

        for (let i = 0; i < list.length; i++) {
            html += `<div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="product-m">
                            <div class="product-m__thumb">
                                <a class="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                    <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                <div class="product-m__quick-look">
                                    <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                <div class="product-m__add-cart">
                                    <a class="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart">Cập Nhật</a></div>
                            </div>
                            <div class="product-m__content">
                                <div class="product-m__category">
                                    <a href="shop-side-version-2.html">${list[i].id}</a></div>
                                <div class="product-m__name">
                                    <a href="product-detail.html">${list[i].name}</a></div>
<div class="product-m__rating gl-rating-style">
                                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                                    <span class="product-m__review">(${list[i].quantity})</span></div>
                                <div class="product-m__price">${list[i].price}</div>
                                <div class="product-m__hover">
                                    <div class="product-m__preview-description">
                                        <span>${list[i].description}</span></div>
                                    <div class="product-m__wishlist">
                                        <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist"></a></div>
                                    <button class="button-5" role="button" onclick="deleteFood(${list[i].id})">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
        html += `
                        </div>
                    </div>
                    <div class="u-s-p-y-60">
                        <ul class="shop-p__pagination">
                            <li class="is-active"><a href="shop-grid-full.html">1</a></li>
                            <li><a href="shop-grid-full.html">2</a></li>
                            <li><a href="shop-grid-full.html">3</a></li>
                            <li><a href="shop-grid-full.html">4</a></li>
                            <li><a class="fas fa-angle-right" href="shop-grid-full.html"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
        document.getElementById("app-content").innerHTML = html;
    });
}

function AddFoodForm() {
    let html = ` <h2 class="u-s-m-b-15">Thêm Món Ăn Mới</h2>
    <div class="u-s-m-b-30">
        <label for="food-name" class="gl-label">Tên Món Ăn</label>
        <input class="input-text input-text--border-radius input-text--style-1" type="text" id="food-name" placeholder="Nhập tên món ăn" required>
    </div>
    <div class="u-s-m-b-30">
        <label for="food-description" class="gl-label">Mô Tả</label>
        <textarea class="textarea textarea--border-radius textarea--style-1" id="food-description" placeholder="Nhập mô tả" rows="3" required></textarea>
    </div>
    <div class="u-s-m-b-30">
        <label for="food-price" class="gl-label">Giá Tiền (VNĐ)</label>
        <input class="input-text input-text--border-radius input-text--style-1" type="number" id="food-price" placeholder="Nhập giá tiền" required>
    </div>
    <div class="u-s-m-b-30">
        <label for="food-quantity" class="gl-label">Số Lượng</label>
        <input class="input-text input-text--border-radius input-text--style-1" type="number" id="food-quantity" placeholder="Nhập số lượng" required>
    </div>
    <div class="u-s-m-b-30">
        <label for="food-image" class="gl-label">URL Hình Ảnh</label>
        <input class="input-text input-text--border-radius input-text--style-1" type="text" id="food-image" placeholder="Nhập URL hình ảnh" required>
    </div>
    <div>
        <button class="btn btn--e-brand-shadow" onclick="addFood()">Thêm Món Ăn</button>
    </div>
`
    document.getElementById('shop-p__collection').innerHTML = html;

}


function addFood() {
    let name = document.getElementById('food-name').value;
    let description = document.getElementById('food-description').value;
    let price = document.getElementById('food-price').value;
    let quantity = document.getElementById('food-quantity').value;
    let image = document.getElementById('food-image').value;

    let food = {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        image: image
    };

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }

    axios.post("http://localhost:8080/foods", food, auth).then((response) => {
        alert("Thêm món ăn thành công!");
        searchFood();
    }).catch((error) => {
        alert("Thêm món ăn thất bại.");
    });
}

function deleteFood(foodId) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }

    axios.delete(`http://localhost:8080/foods/${foodId}`, auth).then((response) => {
        alert("Xóa món ăn thành công!");
        searchFood();
    }).catch((error) => {
        alert("Xóa món ăn thất bại.");
    });
}

function searchFood() {
    let foodName = document.getElementById('main-search-food').value;
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/foods/search`, {
        params: {
            foodName: foodName
        }
    }).then((response) => {
        let list = response.data;
        let html = '';
        if (list.length === 0) {
            html = `<div style="font-size: 30px">No Product...</div>`;
            document.getElementById("shop-p__collection").innerHTML = html;
        } else {
            html = `
<div class="u-s-p-y-90">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="shop-p">
                    <div class="shop-p__toolbar u-s-m-b-30">
                        <div class="shop-p__meta-wrap u-s-m-b-60">
                            <span class="shop-p__meta-text-1">FOUND ${list.length} RESULTS</span>
                            <div class="shop-p__meta-text-2">
                                <span>Related Searches:</span>
                                <a class="gl-tag btn--e-brand-shadow" href="#">men's clothing</a>
                                <a class="gl-tag btn--e-brand-shadow" href="#">mobiles & tablets</a>
                                <a class="gl-tag btn--e-brand-shadow" href="#">books & audible</a>
                            </div>
                        </div>
                        <!--====== Search Form ======-->
                        <div class="main-form" style="margin-bottom: 20px">
                            <label for="main-search-food"></label>
                            <input class="input-text input-text--border-radius input-text--style-1" type="text" id="main-search-food" placeholder="Search" name="foodName">
                            <button class="btn btn--icon fas fa-search main-search-button-food" onclick="searchFood()"></button>
                        </div>
                
                        <!--====== End - Search Form ======-->
                        <div class="shop-p__tool-style">
                          <button class="js-shop-filter-target" data-side="#side-filter" onclick="AddFoodForm()">Add Product</button>
                            <div class="tool-style__form-wrap">
                                <div class="u-s-m-b-8"><select class="select-box select-box--transparent-b-2">
                                    <option>Show: 8</option>
                                    <option selected>Show: 12</option>
                                    <option>Show: 16</option>
                                    <option>Show: 28</option>
                                </select></div>
                                <div class="u-s-m-b-8"><select class="select-box select-box--transparent-b-2">
                                    <option selected>Sort By: Newest Items</option>
                                    <option>Sort By: Latest Items</option>
                                    <option>Sort By: Best Selling</option>
                                    <option>Sort By: Best Rating</option>
                                    <option>Sort By: Lowest Price</option>
                                    <option>Sort By: Highest Price</option>
                                </select></div>
                            </div>
                        </div>
                    </div>
                    <div class="shop-p__collection" id="shop-p__collection">
                        <div class="row is-grid-active">`;

            for (let i = 0; i < list.length; i++) {
                html += `<div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="product-m">
                                <div class="product-m__thumb">
                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                        <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                    <div class="product-m__quick-look">
                                        <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                    <div class="product-m__add-cart">
                                        <a class="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart">Cập Nhật</a></div>
                                </div>
                                <div class="product-m__content">
                                    <div class="product-m__category">
                                        <a href="shop-side-version-2.html">${list[i].id}</a></div>
                                    <div class="product-m__name">
                                        <a href="product-detail.html">${list[i].name}</a></div>
                                    <div class="product-m__rating gl-rating-style">
                                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                                        <span class="product-m__review">(${list[i].quantity})</span></div>
                                    <div class="product-m__price">${list[i].price}</div>
                                    <div class="product-m__hover">
<div class="product-m__preview-description">
                                            <span>${list[i].description}</span></div>
                                        <div class="product-m__wishlist">
                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist"></a></div>
                                        <button class="button-5" role="button" onclick="deleteFood(${list[i].id})">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }
            html += `
                        </div>
                    </div>
                    <div class="u-s-p-y-60">
                        <ul class="shop-p__pagination">
                            <li class="is-active"><a href="shop-grid-full.html">1</a></li>
                            <li><a href="shop-grid-full.html">2</a></li>
                            <li><a href="shop-grid-full.html">3</a></li>
                            <li><a href="shop-grid-full.html">4</a></li>
                            <li><a class="fas fa-angle-right" href="shop-grid-full.html"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
            document.getElementById("app-content").innerHTML = html;
        }
    })
}
function addTocart(id) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser == null) return;
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/user/foods/${id}`, auth).then((respone) => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }
        axios.post(`http://localhost:8080/cart/${currentUser.id}`, respone.data, auth).then((response) => {
            alert(response.data);
            showMiniCart();
        })
    })

}

function showFood() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //duyệt qua từng đối tượng trong mảng roles và tạo ra một mảng mới (userRoles) chỉ chứa các giá trị authority
    let userRoles = currentUser.roles.map(role => role.authority);
    console.log(userRoles);

    if (userRoles.includes("ROLE_MERCHANT")) {
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }
        let id = currentUser.id;
        axios.get(`http://localhost:8080/merchant/shop/${id}`, auth).then((response) => {
            let shop_id = response.data.id;
            axios.get(`http://localhost:8080/foods/shop/${shop_id}`, auth).then((response) => {
                let list = response.data;
                let html = `
    <div class="container">
        <div class="row">
           
            <div class="col-lg-12 col-md-12">
                <div class="shop-p">
                    <div class="shop-p__toolbar u-s-m-b-30">                       
                        <!--====== Search Form ======-->
                      <div style="display: flex">

    <div class="main-form" style="margin-bottom: 20px">
        <label for="main-search-food"></label>
        <input class="input-text input-text--border-radius input-text--style-1" type="text" style="width: 90%;" id="main-search-food" placeholder="Search" name="foodName">
        <button class="btn btn--icon fas fa-search main-search-button-food" onclick="searchFood()"></button>
    </div>
    <!--====== End - Search Form ======-->

    <div class="shop-p__tool-style">
        <button  onclick="AddFoodForm()" style="font-family: sans-serif;
                        margin-left: 500px;
                        font-weight: bold;
                        font-size: 16px;
                        background-color: orangered ;
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 5px;
                        transition: background-color 0.3s ease; ;">Add Product
        </button>
    </div>

</div>

                    <div class="shop-p__collection" id="shop-p__collection">
                        <div class="row is-grid-active">`;

                for (let i = 0; i < list.length; i++) {
                    html += `                 <div class="col-lg-3 col-md-4 col-sm-6">
                                <div class="product-m">
                                    <div class="product-m__thumb">
                                     <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#" onclick="showEdit(${list[i].id})">
                                            <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                        <div class="product-m__quick-look">

                                            <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                        <div class="product-m__add-cart">                                          
                                            </div>

                                    </div>
                                    <div class="product-m__content">
                                        <div class="product-m__category">
                                            <a href="#"></a></div>
                                        <div class="product-m__name">
                                            <a href="product-detail.html">${list[i].name}</a></div>
                                        <div class="product-m__rating gl-rating-style"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>

                                        <span class="product-m__review"></span></div>
                                        <div class="product-m__price"><b>Price</b>: ${list[i].price}</div>
                                        <div class="product-m__price"><b>Quantity</b>: ${list[i].quantity}</div>

                                        <div class="product-m__hover">
                                            <div class="product-m__preview-description">
                                                <span>${list[i].description}</span></div>
                                            <div class="product-m__wishlist">
                                                <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist"></a></div>
                                        <button class="button-5" role="button" onclick="deleteFood(${list[i].id})">Delete</button>
                                        <button class="button-6" role="button" onclick="showEdit(${list[i].id})">Update</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
`
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
        })
        document.getElementsByClassName("shop-p__meta-wrap u-s-m-b-60").display = "none";
    } else if (userRoles.includes("ROLE_USER")) {
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }

        axios.get("http://localhost:8080/user/shops", auth).then((response1) => {
            let shops = response1.data;
            console.log(shops);
            axios.get("http://localhost:8080/user/foods", auth).then((response) => {
                let list = response.data;
                let html = `<div class="u-s-p-y-90">
    <div class="container">
        <div class="row">
         <div class="col-lg-3 col-md-12">
                            <div class="shop-w-master">
                                <h1 class="shop-w-master__heading u-s-m-b-30"><i class="fas fa-filter u-s-m-r-8"></i>

                                    <span>FILTERS</span></h1>
                                <div class="shop-w-master__sidebar sidebar--bg-snow">                                
                                    <div class="u-s-m-b-30">
                                        <div class="shop-w">
                                            <div class="shop-w__intro-wrap">
                                                <h1 class="shop-w__h">NUMBER OF SALES </h1>

                                                <span class="fas fa-minus shop-w__toggle" data-target="#s-shipping" data-toggle="collapse"></span>
                                            </div>
                                            <div class="shop-w__wrap collapse show" id="s-shipping">
                                              <ul class="shop-w__list gl-scroll">

                                                    <li>                                                                                                          
                                                            <input type="radio" class="quantity" name="quantity_range">                                                         
                                                                <label style="color: #0D0A0A">From 50-100 pcs</label>                                                                                                        
                                                    </li>      
                                                    <li>                                                                                                       
                                                            <input type="radio" class="quantity" name="quantity_range">                                                          
                                                                <label style="color: #0D0A0A">From 100-200 pcs</label>                                                                                                         
                                                    </li>                                                     
                                                    <li>                                                                                                          
                                                            <input type="radio" class="quantity" name="quantity_range">                                                        
                                                                <label style="color: #0D0A0A">From 200-300 pcs</label>                                                                                                         
                                                    </li>
`
                html += `</ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-s-m-b-30">
                                        <div class="shop-w">
                                            <div class="shop-w__intro-wrap">
                                                <h1 class="shop-w__h">PRICE</h1>

                                                <span class="fas fa-minus shop-w__toggle" data-target="#s-price" data-toggle="collapse"></span>
                                            </div>
                                            <div class="shop-w__wrap collapse show" id="s-price">
                                                <form class="shop-w__form-p">
                                                    <div class="shop-w__form-p-wrap">
                                                        <div>

                                                            <label for="price-min"></label>

                                                            <input class="input-text input-text--primary-style" type="number" id="price-min" placeholder="Min"></div>
                                                        <div>

                                                            <label for="price-max"></label>

                                                            <input class="input-text input-text--primary-style" type="number" id="price-max" placeholder="Max"></div>
                                                        <div>

                                                            <button class="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2" onclick="filterByPrice()"></button></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-s-m-b-30">
                                        <a style="margin-left: 70px;font-size: 20px; margin-bottom: 20px" class="gl-tag btn--e-brand-shadow" onclick="filterFood()" href="#">Filter Food</a>
                                    </div>
                                </div>
                            </div>
                        </div>
         <div class="col-lg-9 col-md-12">
              <!--====== Product Breadcrumb ======-->
                            <div class="pd-breadcrumb u-s-m-b-30">
                                <ul class="pd-breadcrumb__list">
                                    <li class="has-separator">

                                        <a href="#" onclick="showMain()" style="font-size: 13px">Home</a></li>
                                    <li class="is-marked">

                                        <a href="#" onclick="showFood()"  style="font-size: 13px">Food</a></li>
                                   
                                </ul>
                            </div>
                            <!--====== End - Product Breadcrumb ======-->
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
                      <div style="display: flex">

    <div class="main-form" style="margin-bottom: 20px">
        <label for="main-search-food"></label>
        <input class="input-text input-text--border-radius input-text--style-1" type="text" style="width: 90%;" id="main-search-food" placeholder="Search" name="foodName">
        <button class="btn btn--icon fas fa-search main-search-button-food" onclick="searchFood()"></button>
    </div>
    <!--====== End - Search Form ======-->
</div>

                    <div class="shop-p__collection" id="shop-p__collection">
                        <div class="row is-grid-active">`;
                for (let i = 0; i < list.length; i++) {
                    html += `               <div class="col-lg-3 col-md-4 col-sm-6">
                                <div class="product-m">
                                    <div class="product-m__thumb">
                                     <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#" onclick="showFoodDetail(${list[i].id})">
                                            <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                        <div class="product-m__quick-look">

                                            <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                        <div class="product-m__add-cart">

                                            
                                            </div>

                                    </div>
                                    <div class="product-m__content">
                                        <div class="product-m__category">

                                            <a href="#"></a></div>
                                        <div class="product-m__name">

                                            <a href="product-detail.html">${list[i].name}</a></div>
                                        <div class="product-m__rating gl-rating-style"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>

                                        <span class="product-m__review"></span></div>
                                        <div class="product-m__price"><b>Price</b>: ${list[i].price}</div>
                                        <div class="product-m__price" id="sold-quantity-${list[i].id}"><b>Already Sold</b>: Loading...</div>

                                        <div class="product-m__hover">
                                            <div class="product-m__preview-description">

                                                <span>${list[i].description}</span></div>
                                            <div class="product-m__wishlist">

                                                <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist" onclick="addToWishlist(${list[i].id})"></a></div>
                                        <button class="button-5" role="button" onclick="addTocart(${list[i].id})">Add To Cart</button>

                                        </div>
                                        
                                    </div>
                                </div>
                            </div>`
                    // Fetch the sold quantity for each product
                    axios.get(`http://localhost:8080/user/foods/quantities/${list[i].id}`, auth).then((response2) => {
                        document.getElementById(`sold-quantity-${list[i].id}`).innerHTML = `<b>Already Sold</b>: ${response2.data}`;
                    }).catch((error) => {
                        console.error(`Error fetching sold quantity for product ${list[i].id}:`, error);
                    });
                }

                html += `</div>
                        </div>`
                document.getElementById("app-content").innerHTML = html;
            });
        })
    }


}

function AddFoodForm() {


    let html = `<div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">Add New Food</h1>
                                            <div class="dash__link dash__link--secondary u-s-m-b-30">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="dash-edit-p">
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-name">Name Food *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="food-name" placeholder="">
                                                            </div>                                                         
                                                        </div>
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-description">Description*</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="food-description" placeholder="">
                                                            </div>
                                                        </div>
                                                       
                                                         <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-quantity">Quantity *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="food-quantity" placeholder="">
                                                            </div>
                                                        </div>
                                                         <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-price">Price *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="food-price" placeholder="">
                                                            </div>
                                                        </div>
                                                        
                                                          <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-image">Image *</label>
                                                                <input class="input-text input-text--primary-style" type="file" id="food-image" placeholder="" onchange="uploadImage(event)">
                                                            </div>
                                                        </div>
                                                        <button class="btn btn--e-brand-b-1" onclick="showFood()" >Back Food List</button>
                                                        <button class="btn btn--e-brand-b-2" style="margin-left: 650px" onclick="addFood()">Add Food</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>   
                                                                        </div>   

                                      
`
    document.getElementById('shop-p__collection').innerHTML = html;

}

function addFood() {


    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/merchant/shop/${currentUser.id}`, auth).then((response) => {
        let name = document.getElementById('food-name').value;
        let description = document.getElementById('food-description').value;
        let price = document.getElementById('food-price').value;
        let quantity = document.getElementById('food-quantity').value;
        let image = localStorage.getItem("regm-image");

        let food = {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            image: image,
            shop: {
                id: response.data.id
            }
        };
        axios.post("http://localhost:8080/foods", food, auth).then((response) => {
            alert("Thêm món ăn thành công!");
            searchFood();
        }).catch((error) => {
            alert("Thêm món ăn thất bại.");
        });
    })

}

function deleteFood(foodId) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    if (confirm("Are you sure you want to delete this food?")) {
        axios.delete(`http://localhost:8080/foods/${foodId}`, auth).then((response) => {
            alert("Xóa món ăn thành công!");
            showFood();
        }).catch((error) => {
            alert("Xóa món ăn thất bại.");
        });
    } else {
        alert("Hủy xóa món ăn.");
    }


}

function searchFood() {
    let foodName = document.getElementById('main-search-food').value;
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //duyệt qua từng đối tượng trong mảng roles và tạo ra một mảng mới (userRoles) chỉ chứa các giá trị authority
    let userRoles = currentUser.roles.map(role => role.authority);

    console.log(userRoles);

    if (userRoles.includes("ROLE_MERCHANT")) {
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }
        let id = currentUser.id;
        axios.get(`http://localhost:8080/merchant/shop/${id}`, auth).then((response) => {
            let shop_id = response.data.id;
            axios.get(`http://localhost:8080/foods/${shop_id}/search`, {
                params: {
                    foodName: foodName
                }, headers: auth.headers
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
                                        <div style="display: flex">

    <div class="main-form" style="margin-bottom: 20px">
        <label for="main-search-food"></label>
        <input class="input-text input-text--border-radius input-text--style-1" type="text" style="width: 90%;" id="main-search-food" placeholder="Search" name="foodName">
        <button class="btn btn--icon fas fa-search main-search-button-food" onclick="searchFood()"></button>
    </div>
    <!--====== End - Search Form ======-->

    <div class="shop-p__tool-style">
        <button  onclick="AddFoodForm()" style="font-family: sans-serif;
                        margin-left: 500px;
                        font-weight: bold;
                        font-size: 16px;
                        background-color: orangered ;
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 5px;
                        transition: background-color 0.3s ease; ;">Add Product
        </button>
    </div>

</div>
                    <div class="shop-p__collection" id="shop-p__collection">
                        <div class="row is-grid-active">`;

                    for (let i = 0; i < list.length; i++) {
                        html += `<div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="product-m">
                                <div class="product-m__thumb">
                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#" onclick="showEdit(${list[i].id})">
                                        <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                    <div class="product-m__quick-look">
                                        <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                    <div class="product-m__add-cart">
                                            <a></a></div>
                                </div>
                                <div class="product-m__content">
                                    <div class="product-m__category">
                                        <a  href="#"></a></div>
                                    <div class="product-m__name">
                                        <a href="product-detail.html">${list[i].name}</a></div>
                                    <div class="product-m__rating gl-rating-style">
                                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                                        <span class="product-m__review"> </span></div>
                                    <div class="product-m__price"><b>Price</b>: ${list[i].price}</div>
                                    <div class="product-m__price"><b>Quantity</b>: ${list[i].quantity}</div>
                                    <div class="product-m__price" id="sold-quantity-${list[i].id}"><b>Already Sold</b>: Loading...</div>

                                    <div class="product-m__hover">
<div class="product-m__preview-description">
                                            <span>${list[i].description}</span></div>
                                        <div class="product-m__wishlist">
                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist"></a></div>
                                        <button class="button-5" role="button" onclick="deleteFood(${list[i].id})">Delete</button>
                                        <button class="button-6" role="button" onclick="showEdit(${list[i].id})">Update</button>

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
        });


    } else if (userRoles.includes("ROLE_USER")) {
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }
        axios.get("http://localhost:8080/user/shops", auth).then((response1) => {
            let shops = response1.data;

            axios.get(`http://localhost:8080/user/foods/search`, {
                params: {
                    foodName: foodName
                }, headers: auth.headers
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
            <div class="col-lg-3 col-md-12">
                            <div class="shop-w-master">
                                <h1 class="shop-w-master__heading u-s-m-b-30"><i class="fas fa-filter u-s-m-r-8"></i>

                                    <span>FILTERS</span></h1>
                                <div class="shop-w-master__sidebar sidebar--bg-snow">                                
                                    <div class="u-s-m-b-30">
                                        <div class="shop-w">
                                            <div class="shop-w__intro-wrap">
                                                <h1 class="shop-w__h">SHOP</h1>

                                                <span class="fas fa-minus shop-w__toggle" data-target="#s-shipping" data-toggle="collapse"></span>
                                            </div>
                                             <div class="shop-w__wrap collapse show" id="s-shipping">
                                               <ul class="shop-w__list gl-scroll">

                                                    <li>                                                                                                          
                                                            <input type="radio" class="quantity" name="quantity_range">                                                         
                                                                <label style="color: #0D0A0A">From 50-100 pcs</label>                                                                                                        
                                                    </li>      
                                                    <li>                                                                                                       
                                                            <input type="radio" class="quantity" name="quantity_range">                                                          
                                                                <label style="color: #0D0A0A">From 100-200 pcs</label>                                                                                                         
                                                    </li>                                                     
                                                    <li>                                                                                                          
                                                            <input type="radio" class="quantity" name="quantity_range">                                                        
                                                                <label style="color: #0D0A0A">From 200-300 pcs</label>                                                                                                         
                                                    </li>`

                    html += `</ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-s-m-b-30">
                                        <div class="shop-w">
                                            <div class="shop-w__intro-wrap">
                                                <h1 class="shop-w__h">PRICE</h1>

                                                <span class="fas fa-minus shop-w__toggle" data-target="#s-price" data-toggle="collapse"></span>
                                            </div>
                                            <div class="shop-w__wrap collapse show" id="s-price">
                                                <div class="shop-w__form-p">
                                                    <div class="shop-w__form-p-wrap">
                                                        <div>

                                                            <label for="price-min"></label>

                                                            <input class="input-text input-text--primary-style" type="number" id="price-min" placeholder="Min"></div>
                                                        <div>

                                                            <label for="price-max"></label>

                                                            <input class="input-text input-text--primary-style" type="number" id="price-max" placeholder="Max"></div>
                                                        <div>

                                                            <button class="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2" onclick="filterByPrice()"></button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                      <div class="u-s-m-b-30">
                                        <a style="margin-left: 70px;font-size: 20px; margin-bottom: 20px" class="gl-tag btn--e-brand-shadow" onclick="filterFood()" href="#">Filter Food</a>
                                    </div>
                                </div>
                            </div>
                        </div>
            <div class="col-lg-9 col-md-12">
              <!--====== Product Breadcrumb ======-->
                            <div class="pd-breadcrumb u-s-m-b-30">
                                <ul class="pd-breadcrumb__list">
                                    <li class="has-separator">

                                        <a href="#" onclick="showMain()" style="font-size: 13px">Home</a></li>
                                    <li class="is-marked">

                                        <a href="#" onclick="showFood()"  style="font-size: 13px">Food</a></li>
                                   
                                </ul>
                            </div>
                            <!--====== End - Product Breadcrumb ======-->
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
                                        <div style="display: flex">

    <div class="main-form" style="margin-bottom: 20px">
        <label for="main-search-food"></label>
        <input class="input-text input-text--border-radius input-text--style-1" type="text" style="width: 90%;" id="main-search-food" placeholder="Search" name="foodName">
        <button class="btn btn--icon fas fa-search main-search-button-food" onclick="searchFood()"></button>
    </div>
    <!--====== End - Search Form ======-->

</div>
                    <div class="shop-p__collection" id="shop-p__collection">
                        <div class="row is-grid-active">`;

                    for (let i = 0; i < list.length; i++) {
                        html += `<div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="product-m">
                                <div class="product-m__thumb">
                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#"  onclick="showFoodDetail(${list[i].id})">
                                        <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                    <div class="product-m__quick-look">
                                        <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                    <div class="product-m__add-cart">
                                            <a></a></div>
                                </div>
                                <div class="product-m__content">
                                    <div class="product-m__category">
                                        <a  href="#"></a></div>
                                    <div class="product-m__name">
                                        <a href="product-detail.html">${list[i].name}</a></div>
                                    <div class="product-m__rating gl-rating-style">
                                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                                        <span class="product-m__review"> </span></div>
                                    <div class="product-m__price"><b>Price</b>: ${list[i].price}</div>
                                    <div class="product-m__price" id="sold-quantity-${list[i].id}"><b>Already Sold</b>: Loading...</div>

                                    <div class="product-m__hover">
                                    <div class="product-m__preview-description">
                                            <span>${list[i].description}</span></div>
                                        <div class="product-m__wishlist">
                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist" onclick="addToWishlist(${list[i].id})"></a></div>
                                        <button class="button-5" role="button" onclick="addTocart(${list[i].id})">Add To Cart</button>

                                    </div>
                                </div>
                            </div>
                        </div>`;
                        // Fetch the sold quantity for each product
                        axios.get(`http://localhost:8080/user/foods/quantities/${list[i].id}`, auth).then((response2) => {
                            document.getElementById(`sold-quantity-${list[i].id}`).innerHTML = `<b>Already Sold</b>: ${response2.data}`;
                        }).catch((error) => {
                            console.error(`Error fetching sold quantity for product ${list[i].id}:`, error);
                        });
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
        })

    }

}

function addToWishlist(id) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser == null) return;
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    };
    axios.get(`http://localhost:8080/user/foods/${id}`, auth).then((response) => {
        axios.post(`http://localhost:8080/wishlist/${currentUser.id}`, response.data, auth).then((response) => {
            alert(response.data);
        }).catch(error => {
            console.error('Error adding to wishlist:', error);
        });
    }).catch(error => {
        console.error('Error fetching food details:', error);
    });
}

function showFoodDetail(id) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/user/foods/${id}`, auth).then(response => {
        let food = response.data;
        console.log(food);
        document.getElementById(`app-content`).innerHTML = `   <!--====== Section 1 ======-->
                <div class="u-s-p-t-90">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">

                            <!--====== Product Breadcrumb ======-->
                            <div class="pd-breadcrumb u-s-m-b-30">
                                <ul class="pd-breadcrumb__list">
                                    <li class="has-separator">
                                        <a href="#" onclick="showMain()" style="font-size: 13px">Home</a></li>
                                    <li class="has-separator">

                                        <a href="#" onclick="showFood()" style="font-size: 13px">Food</a></li>
                                    <li class="is-marked">
                                        <a style="font-size: 13px" href="#">${food.name}</a></li>
                                        <li  id="wishlist-check">
                                        </li>
                                </ul>
                            </div>
                            <!--====== End - Product Breadcrumb ======-->


                            <!--====== Product Detail Zoom ======-->
                            <div class="pd u-s-m-b-30">
                                <img class="u-img-fluid" src="${food.image}" alt="">
                              
                            </div>
                            <!--====== End - Product Detail Zoom ======-->
                        </div>
                        <div class="col-lg-7">

                            <!--====== Product Right Side Details ======-->
                            <div class="pd-detail">
                                <div>

                                    <span class="pd-detail__name">${food.name}</span></div>
                                <div>
                                    <div class="pd-detail__inline">

                                        <span class="pd-detail__price">${food.price} VNĐ</span>

<!--                                        <span class="pd-detail__discount">(76% OFF)</span><del class="pd-detail__del">$28.97</del></div>-->
                                </div>
                                <div class="u-s-m-b-15">
                                    <div class="pd-detail__rating gl-rating-style"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>

                                        <span class="pd-detail__review u-s-m-l-4">

                                            <a data-click-scroll="#view-review">23 Reviews</a></span></div>
                                </div>
                                <div class="u-s-m-b-15">
                                    <div class="pd-detail__inline">

                                        <span class="pd-detail__stock">${food.quantity} in stock</span>

                                    </div>
                                </div>
                                
                                <div class="u-s-m-b-15">

                                    <span class="pd-detail__preview-desc">${food.description}</span></div>
                                <div class="u-s-m-b-15">
                                    <div class="pd-detail__inline">

                                        <span class="pd-detail__click-wrap"><i class="far fa-heart u-s-m-r-6"></i>

                                            <a href="#" onclick="addToWishlist(${food.id})" >Add to Wishlist</a>

                                            <span class="pd-detail__click-count">(222)</span></span></div>
                                </div>
                                
                                <div class="u-s-m-b-15">
                                    <div class="pd-detail__inline">

                                        <span class="pd-detail__stock" style="border-radius: 5px; background: #3b5c9f; color: black">COUPONS: </span>
                                        <div id="coupon-list" style="margin-top: 10px ; width: 50%">
                                             
                                        </div>
                                    </div>
                                </div>
                                <div class="u-s-m-b-15">
                                    <div class="pd-detail__inline">

                                        <span class="pd-detail__click-wrap"><i class="far fa-envelope u-s-m-r-6"></i>

                                            <a href="signin.html">Email me when the price drops</a>

                                           </div>
                                </div>
                            
                                <div class="u-s-m-b-15">
                                    <div class="pd-detail__form">
                                        <div class="pd-detail-inline-2">
                                       <div class="u-s-m-b-15">
                                           <div> 
                                           <button class="btn " onclick="showShop(${food.shop.id})" ><i class="fas fa-shopping-bag"></i> Shop</button> 
                                           </div>
                                       </div>
                                        
                                            <div class="u-s-m-b-15">

                                                <button class="btn btn--e-brand-b-2" onclick="addTocart(${food.id})" >Add to Cart</button></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-s-m-b-15">

                                    <span class="pd-detail__label u-s-m-b-8">Product Policy:</span>
                                    <ul class="pd-detail__policy-list">
                                        <li><i class="fas fa-check-circle u-s-m-r-8"></i>

                                            <span>Buyer Protection.</span></li>
                                        <li><i class="fas fa-check-circle u-s-m-r-8"></i>

                                            <span>Full Refund if you don't receive your order.</span></li>
                                        <li><i class="fas fa-check-circle u-s-m-r-8"></i>

                                            <span>Returns accepted if product not as described.</span></li>
                                    </ul>
                                </div>
                            </div>
                            <!--====== End - Product Right Side Details ======-->
                        </div>
                    </div>
                </div>
            </div>
      `
        getCouponDetailsByShop(food)
        checkWishList(food)
    });

//Test in food
}

function checkWishList(food) {
    axios.get(`http://localhost:8080/wishlist/dup?food=${food.id}&user=${getUser().id}`, getAuth()).then((response) => {
        document.getElementById("wishlist-check").innerHTML = `<span class="pd-detail__stock" style="border-radius: 5px; background: red; color: black">Wishlist <i class="far fa-heart"></i> </span>`
    })
}

function getCouponDetailsByShop(food) {
    axios.get(`http://localhost:8080/coupons/shop/${food.shop.id}`, getAuth()).then((response) => {
        let data = response.data;
        let html = "";
        for (let i = 0; i < data.length; i++) {
            html += `<span class="pd-detail__stock" style="border-radius: 30px; background: #a0a0a0; color: black; margin-top: 5px ">${String(data[i].type).toUpperCase()} ${String(data[i].discount).toUpperCase()} </span>`
        }
        document.getElementById("coupon-list").innerHTML = html;
    })
}

function showShop(id) {
    axios.get(`http://localhost:8080/user/shops/shopDetail/${id}`, getAuth()).then((response) => {
        let shop = response.data;
        console.log(shop);
        axios.get(`http://localhost:8080/user/foods/shop/${id}`, getAuth()).then((response) => {
            let food = response.data;
            console.log(food);
            for (let i = 0; i < food.length; i++) {
                let list = ``
            }
            let html = ` 

            <!--====== Section 1 ======-->
            <div class="u-s-p-y-90">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-12">
                            <div class="shop-w-master">
                                <h1 class="shop-w-master__heading u-s-m-b-30"><i class="fas fa-filter u-s-m-r-8"></i>

                                    <span>FILTERS</span></h1>
                                <div class="shop-w-master__sidebar sidebar--bg-snow">                                
                                    <div class="u-s-m-b-30">
                                        <div class="shop-w">
                                            <div class="shop-w__intro-wrap">
                                                <h1 class="shop-w__h">SHOP</h1>

                                                <span class="fas fa-minus shop-w__toggle" data-target="#s-shipping" data-toggle="collapse"></span>
                                            </div>
                                            <div class="shop-w__wrap collapse show" id="s-shipping">
                                                <ul class="shop-w__list gl-scroll">

                                                    <li>                                                                                                          
                                                            <input type="radio" class="quantity" name="quantity_range">                                                         
                                                                <label style="color: #0D0A0A">From 50-100 pcs</label>                                                                                                        
                                                    </li>      
                                                    <li>                                                                                                       
                                                            <input type="radio" class="quantity" name="quantity_range">                                                          
                                                                <label style="color: #0D0A0A">From 100-200 pcs</label>                                                                                                         
                                                    </li>                                                     
                                                    <li>                                                                                                          
                                                            <input type="radio" class="quantity" name="quantity_range">                                                        
                                                                <label style="color: #0D0A0A">From 200-300 pcs</label>                                                                                                         
                                                    </li>`
            html += `</ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-s-m-b-30">
                                        <div class="shop-w">
                                            <div class="shop-w__intro-wrap">
                                                <h1 class="shop-w__h">PRICE</h1>

                                                <span class="fas fa-minus shop-w__toggle" data-target="#s-price" data-toggle="collapse"></span>
                                            </div>
                                            <div class="shop-w__wrap collapse show" id="s-price">
                                                <div class="shop-w__form-p">
                                                    <div class="shop-w__form-p-wrap">
                                                        <div>

                                                            <label for="price-min"></label>

                                                            <input class="input-text input-text--primary-style" type="number" id="price-min" placeholder="Min"></div>
                                                        <div>

                                                            <label for="price-max"></label>

                                                            <input class="input-text input-text--primary-style" type="number" id="price-max" placeholder="Max"></div>
                                                        <div>

                                                            <button class="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2" type="submit" onclick="filterByPriceAtShop(${id})"></button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                         
                        <div class="col-lg-9 col-md-12">
                           <!--====== Product Breadcrumb ======-->
                            <div class="pd-breadcrumb u-s-m-b-30">
                                <ul class="pd-breadcrumb__list">
                                    <li class="has-separator">
                                        <a href="#" onclick="showMain()" style="font-size: 13px">Home</a></li>
                                    <li class="has-separator">

                                        <a href="#" onclick="showFood()" style="font-size: 13px">Food</a></li>
                                    <li class="is-marked">
                                        <a style="font-size: 13px" href="#">Shop</a></li>
                                        <li  id="wishlist-check">
                                        </li>
                                </ul>
                            </div>
                            <!--====== End - Product Breadcrumb ======-->
                            <div class="shop-p">
                                <div class="shop-p__toolbar u-s-m-b-30">
                                    <div class="shop-p__meta-wrap u-s-m-b-60">
                                    <div style="display: flex">  
                                        <img src="${shop.image}" style="width: 40%" alt="">
                                        <span style="font-size: 50px; margin-top: 51px;margin-left: 20px;color: orangered" class="shop-p__meta-text-1">${shop.name}</span>
                                    </div>
                                      
                                        <div class="shop-p__meta-text-2">                                                                            
                                           </div>
                                    </div>
                              
                                </div>
                                <div class="shop-p__collection" id="shop-p__collection">
                                    <div class="row is-list-active">
`

            for (i = 0; i < food.length; i++) {
                html += `<div class="col-lg-4 col-md-6 col-sm-6">
                                            <div class="product-m">
                                                <div class="product-m__thumb">

                                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#" onclick="showFoodDetail(${food[i].id})">

                                                        <img class="aspect__img" src="${food[i].image}" alt=""></a>
                                               
                                                    <div class="product-m__add-cart">

                                                        <a class="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart" onclick="addTocart(${food[i].id})">Add to Cart</a></div>
                                                </div>
                                                <div class="product-m__content">
                                                    <div class="product-m__category">

                                                        <a href="#" onclick="showFood()">Food</a></div>
                                                    <div class="product-m__name">

                                                        <a href="#">${food[i].name}</a></div>
                                                 
                                                    <div class="product-m__price">VND ${food[i].price}</div>
                                                    <div class="product-m__hover">
                                                        <div class="product-m__preview-description">

                                                            <span>${food[i].description}</span></div>
                                                        <div class="product-m__wishlist">

                                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" onclick="addToWishlist(${food[i].id})" title="Add to Wishlist"></a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
`
            }


            html += `</div>
                                </div>
                                <div class="u-s-p-y-60">

                                    <!--====== Pagination ======-->
                                    <ul class="shop-p__pagination">
                                        <li class="is-active">

                                            <a href="shop-list-left.html">1</a></li>
                                        <li>

                                            <a href="shop-list-left.html">2</a></li>
                                        <li>

                                            <a href="shop-list-left.html">3</a></li>
                                        <li>

                                            <a href="shop-list-left.html">4</a></li>
                                        <li>

                                            <a class="fas fa-angle-right" href="shop-list-left.html"></a></li>
                                    </ul>
                                    <!--====== End - Pagination ======-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--====== End - Section 1 ======-->        `;

            document.getElementById("app-content").innerHTML = html;
        })
    })


}

function filterByPrice() {
    let priceMin = document.getElementById("price-min").value;
    let priceMax = document.getElementById("price-max").value;

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //duyệt qua từng đối tượng trong mảng roles và tạo ra một mảng mới (userRoles) chỉ chứa các giá trị authority
    let userRoles = currentUser.roles.map(role => role.authority);

    console.log(userRoles);

    if (userRoles.includes("ROLE_MERCHANT")) {
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }
        let id = currentUser.id;
        axios.get(`http://localhost:8080/merchant/shop/${id}`, auth).then((response) => {
            let shop_id = response.data.id;
            axios.get(`http://localhost:8080/foods/${shop_id}/searchPrice`, {
                params: {
                    priceMin: priceMin,
                    priceMax: priceMax
                }, headers: auth.headers
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
                                        <div style="display: flex">

    <div class="main-form" style="margin-bottom: 20px">
        <label for="main-search-food"></label>
        <input class="input-text input-text--border-radius input-text--style-1" type="text" style="width: 90%;" id="main-search-food" placeholder="Search" name="foodName">
        <button class="btn btn--icon fas fa-search main-search-button-food" onclick="searchFood()"></button>
    </div>
    <!--====== End - Search Form ======-->

    <div class="shop-p__tool-style">
        <button  onclick="AddFoodForm()" style="font-family: sans-serif;
                        margin-left: 500px;
                        font-weight: bold;
                        font-size: 16px;
                        background-color: orangered ;
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 5px;
                        transition: background-color 0.3s ease; ;">Add Product
        </button>
    </div>

</div>
                    <div class="shop-p__collection" id="shop-p__collection">
                        <div class="row is-grid-active">`;

                    for (let i = 0; i < list.length; i++) {
                        html += `<div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="product-m">
                                <div class="product-m__thumb">
                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#" onclick="showEdit(${list[i].id})">
                                        <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                    <div class="product-m__quick-look">
                                        <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                    <div class="product-m__add-cart">
                                            <a></a></div>
                                </div>
                                <div class="product-m__content">
                                    <div class="product-m__category">
                                        <a  href="#"></a></div>
                                    <div class="product-m__name">
                                        <a href="product-detail.html">${list[i].name}</a></div>
                                    <div class="product-m__rating gl-rating-style">
                                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                                        <span class="product-m__review"> </span></div>
                                    <div class="product-m__price"><b>Price</b>: ${list[i].price}</div>
                                    <div class="product-m__price" id="sold-quantity-${list[i].id}"><b>Already Sold</b>: Loading...</div>
                                    <div class="product-m__hover">
<div class="product-m__preview-description">
                                            <span>${list[i].description}</span></div>
                                        <div class="product-m__wishlist">
                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist"></a></div>
                                        <button class="button-5" role="button" onclick="deleteFood(${list[i].id})">Delete</button>
                                        <button class="button-6" role="button" onclick="showEdit(${list[i].id})">Update</button>

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
        });


    } else if (userRoles.includes("ROLE_USER")) {
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }

        axios.get("http://localhost:8080/user/shops", auth).then((response1) => {
            let shops = response1.data;
            console.log(shops);
            axios.get(`http://localhost:8080/user/foods/searchPrice`, {
                params: {
                    priceMin: priceMin,
                    priceMax: priceMax,
                }, headers: auth.headers
            }).then((response) => {
                let list = response.data;
                console.log(list)
                let html = '';
                if (list.length === 0) {
                    html = `<div style="font-size: 30px">No Product...</div>`;
                    document.getElementById("shop-p__collection").innerHTML = html;
                } else {
                    html = `
<div class="u-s-p-y-90">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-12">
                            <div class="shop-w-master">
                                <h1 class="shop-w-master__heading u-s-m-b-30"><i class="fas fa-filter u-s-m-r-8"></i>

                                    <span>FILTERS</span></h1>
                                <div class="shop-w-master__sidebar sidebar--bg-snow">
                                 
                                
                                    <div class="u-s-m-b-30">
                                        <div class="shop-w">
                                            <div class="shop-w__intro-wrap">
                                                <h1 class="shop-w__h">SHOP</h1>

                                                <span class="fas fa-minus shop-w__toggle" data-target="#s-shipping" data-toggle="collapse"></span>
                                            </div>
                                             <div class="shop-w__wrap collapse show" id="s-shipping">
                                                <ul class="shop-w__list gl-scroll">

                                                    <li>                                                                                                          
                                                            <input type="radio" class="quantity" name="quantity_range">                                                         
                                                                <label style="color: #0D0A0A">From 50-100 pcs</label>                                                                                                        
                                                    </li>      
                                                    <li>                                                                                                       
                                                            <input type="radio" class="quantity" name="quantity_range">                                                          
                                                                <label style="color: #0D0A0A">From 100-200 pcs</label>                                                                                                         
                                                    </li>                                                     
                                                    <li>                                                                                                          
                                                            <input type="radio" class="quantity" name="quantity_range">                                                        
                                                                <label style="color: #0D0A0A">From 200-300 pcs</label>                                                                                                         
                                                    </li>`
                    html += `</ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-s-m-b-30">
                                        <div class="shop-w">
                                            <div class="shop-w__intro-wrap">
                                                <h1 class="shop-w__h">PRICE</h1>

                                                <span class="fas fa-minus shop-w__toggle" data-target="#s-price" data-toggle="collapse"></span>
                                            </div>
                                            <div class="shop-w__wrap collapse show" id="s-price">
                                                <div class="shop-w__form-p">
                                                    <div class="shop-w__form-p-wrap">
                                                        <div>

                                                            <label for="price-min"></label>

                                                            <input class="input-text input-text--primary-style" type="number" id="price-min" placeholder="Min"></div>
                                                        <div>

                                                            <label for="price-max"></label>

                                                            <input class="input-text input-text--primary-style" type="number" id="price-max" placeholder="Max"></div>
                                                        <div>

                                                            <button class="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2" onclick="filterByPrice()"></button></div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div class="u-s-m-b-30">
                                        <a style="margin-left: 70px;font-size: 20px; margin-bottom: 20px" class="gl-tag btn--e-brand-shadow" onclick="filterFood()" href="#">Filter Food</a>
                                    </div>
                                </div>
                            </div>
                        </div>
            <div class="col-lg-9 col-md-12">
              <!--====== Product Breadcrumb ======-->
                            <div class="pd-breadcrumb u-s-m-b-30">
                                <ul class="pd-breadcrumb__list">
                                    <li class="has-separator">

                                        <a href="#" onclick="showMain()" style="font-size: 13px">Home</a></li>
                                    <li class="is-marked">

                                        <a href="#" onclick="showFood()"  style="font-size: 13px">Food</a></li>
                                   
                                </ul>
                            </div>
                            <!--====== End - Product Breadcrumb ======-->
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
                                        <div style="display: flex">

    <div class="main-form" style="margin-bottom: 20px">
        <label for="main-search-food"></label>
        <input class="input-text input-text--border-radius input-text--style-1" type="text" style="width: 90%;" id="main-search-food" placeholder="Search" name="foodName">
        <button class="btn btn--icon fas fa-search main-search-button-food" onclick="searchFood()"></button>
    </div>
    <!--====== End - Search Form ======-->

</div>
                    <div class="shop-p__collection" id="shop-p__collection">
                        <div class="row is-grid-active">`;

                    for (let i = 0; i < list.length; i++) {
                        html += `<div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="product-m">
                                <div class="product-m__thumb">
                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#"  onclick="showFoodDetail(${list[i].id})">
                                        <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                    <div class="product-m__quick-look">
                                        <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                    <div class="product-m__add-cart">
                                            <a></a></div>
                                </div>
                                <div class="product-m__content">
                                    <div class="product-m__category">
                                        <a  href="#"></a></div>
                                    <div class="product-m__name">
                                        <a href="product-detail.html">${list[i].name}</a></div>
                                    <div class="product-m__rating gl-rating-style">
                                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>
                                        <span class="product-m__review"> </span></div>
                                    <div class="product-m__price"><b>Price</b>: ${list[i].price}</div>
                                    <div class="product-m__price" id="sold-quantity-${list[i].id}"><b>Already Sold</b>: Loading...</div>

                                    <div class="product-m__hover">
                                    <div class="product-m__preview-description">
                                            <span>${list[i].description}</span></div>
                                        <div class="product-m__wishlist">
                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist" onclick="addToWishlist(${list[i].id})"></a></div>
                                        <button class="button-5" role="button" onclick="addTocart(${list[i].id})">Add To Cart</button>

                                    </div>
                                </div>
                            </div>
                        </div>`;
                        // Fetch the sold quantity for each product
                        axios.get(`http://localhost:8080/user/foods/quantities/${list[i].id}`, auth).then((response2) => {
                            document.getElementById(`sold-quantity-${list[i].id}`).innerHTML = `<b>Already Sold</b>: ${response2.data}`;
                        }).catch((error) => {
                            console.error(`Error fetching sold quantity for product ${list[i].id}:`, error);
                        });

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

        });


    }


}

// function filterFood() {
//     let shopIds = [];
//     let shop = document.getElementsByClassName("shop-name");
//     console.log(shop);
//     for (let i = 0; i < shop.length; i++) {
//         if (shop[i].checked) {
//             shopIds.push(shop[i].id);
//         }
//     }
//     console.log(shopIds);
//
//
// }


function filterByPriceAtShop(id_shop) {
    console.log(id_shop);
    let priceMin = document.getElementById("price-min").value;
    let priceMax = document.getElementById("price-max").value;

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //duyệt qua từng đối tượng trong mảng roles và tạo ra một mảng mới (userRoles) chỉ chứa các giá trị authority
    let userRoles = currentUser.roles.map(role => role.authority);

    console.log(userRoles);

    if (userRoles.includes("ROLE_USER")) {
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }

        axios.get(`http://localhost:8080/user/foods/searchPriceAndShopId`, {
            params: {
                id_shop: id_shop,
                priceMin: priceMin,
                priceMax: priceMax,
            }, headers: auth.headers
        }).then((response) => {
            let list = response.data;
            console.log(list)
            let html = '';
            if (list.length === 0) {
                html = `<div style="font-size: 30px">No Product...</div>`;
                document.getElementById("shop-p__collection").innerHTML = html;
            } else {
                html = ` <div class="row is-list-active">`
                for (let i = 0; i < list.length; i++) {
                    html += `  
                        <div class="col-lg-4 col-md-6 col-sm-6">
                                            <div class="product-m">
                                                <div class="product-m__thumb">

                                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#" onclick="showFoodDetail(${list[i].id})">

                                                        <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                               
                                                    <div class="product-m__add-cart">

                                                        <a class="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart" onclick="addTocart(${list[i].id})">Add to Cart</a></div>
                                                </div>
                                                <div class="product-m__content">
                                                    <div class="product-m__category">

                                                        <a href="#" onclick="showFood()">Food</a></div>
                                                    <div class="product-m__name">

                                                        <a href="#">${list[i].name}</a></div>
                                                 
                                                    <div class="product-m__price">VND ${list[i].price}</div>
                                                    <div class="product-m__hover">
                                                        <div class="product-m__preview-description">

                                                            <span>${list[i].description}</span></div>
                                                        <div class="product-m__wishlist">

                                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" onclick="addToWishlist(${list[i].id})" title="Add to Wishlist"></a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                          `
                }
                html += `</div>`
                document.getElementById("shop-p__collection").innerHTML = html;
            }
        })


    }
}

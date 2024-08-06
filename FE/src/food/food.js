
function addTocart(id){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(currentUser == null) return;
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/user/foods/${id}`,auth).then((respone)=>{
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }
        axios.post(`http://localhost:8080/cart/${currentUser.id}`,respone.data,auth).then((response) =>{
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
        axios.get(`http://localhost:8080/merchant/shop/${id}`,auth).then((response) => {
            let shop_id = response.data.id;
            axios.get(`http://localhost:8080/foods/shop/${shop_id}`, auth).then((response) => {
                let list = response.data;
                let html = `
<div class="u-s-p-y-90">
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
        axios.get("http://localhost:8080/user/foods", auth).then((response) => {
            let list = response.data;
            let html = `<div class="u-s-p-y-90">
    <div class="container">
        <div class="row">
         <div class="col-lg-3 col-md-12" id="food-mega-filter">
                            
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
                        <div class="row is-grid-active" id="food-list">`;
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
            }

            html+=`</div>
                        </div>`
            document.getElementById("app-content").innerHTML = html;
            getFoodFilterUI()
        });
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
    axios.get(`http://localhost:8080/merchant/shop/${currentUser.id}`,auth).then((response) => {
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

    if(userRoles.includes("ROLE_MERCHANT")){
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }
        let id = currentUser.id;
        axios.get(`http://localhost:8080/merchant/shop/${id}`,auth).then((response) => {
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


    }else if(userRoles.includes("ROLE_USER")){
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }

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
                                                  <h1 class="shop-w__h">FOODS</h1>

                                                  <span class="fas fa-minus shop-w__toggle collapsed" data-target="#foods" data-toggle="collapse"></span>
                                               </div>
                                               <div class="shop-w__wrap collapse" id="foods">
                                               <ul class="shop-w__category-list gl-scroll" id="foods-filter-list">
                                            
                                               </ul>
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
                }
                html +=     `
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
function showFoodDetail(id){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/user/foods/${id}`,auth).then(response => {
        let food = response.data;
        document.getElementById(`app-content`).innerHTML=`   <!--====== Section 1 ======-->
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

                                            <a href="#" onclick="addToWishlist()" n>Add to Wishlist</a>

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
                                    <ul class="pd-social-list">
                                        <li>

                                            <a class="s-fb--color-hover" href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li>

                                            <a class="s-tw--color-hover" href="#"><i class="fab fa-twitter"></i></a></li>
                                        <li>

                                            <a class="s-insta--color-hover" href="#"><i class="fab fa-instagram"></i></a></li>
                                        <li>

                                            <a class="s-wa--color-hover" href="#"><i class="fab fa-whatsapp"></i></a></li>
                                        <li>

                                            <a class="s-gplus--color-hover" href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                    </ul>
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
        getSameFoodsGuess(food.shop.id)
    });


}

function showShop(id) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/user/shops/shopDetail/${id}`, auth).then((response) => {
        let shop = response.data;
        console.log(shop)
        axios.get(`http://localhost:8080/user/shops/${id}`, auth).then((response) => {
            let list = response.data;
            let html = `<div class="u-s-p-y-90">
    <div class="container">
        <div class="row">
         <div class="col-lg-9 col-md-12">           
                <div class="shop-p">
                    <div class="shop-p__toolbar u-s-m-b-30">
                        <div class="shop-p__meta-wrap u-s-m-b-60" style="display: flex">
                            <img src="${shop.image}" style="width: 60px; height: 60px;">
                            <div class="shop-p__meta-text-2" style="margin-left: 15px">
                                 <div>
                                      <span class="shop-p__meta-text-1">${shop.name}</span>
                                 </div>
                                 <div style=" color: black;" >
                                      <p id="total-sold"></p>
                                 </div>
                            </div>
                        </div>                                            
                    <div class="shop-p__collection" id="shop-p__collection">
                         <div class="row" style="margin-bottom: 100px">
                              <div class="section__content">
                                   <h3>SHOP COUPONS</h3>
                                   <div class="container" style="padding: 20px">
                                       <div class="slider-fouc">
                                           <div class="owl-carousel product-slider" data-item="4" id="coupon-list">
                                                                                            
                                           </div>
                                       </div>
                                   </div>
                             </div>
                         </div>
                         <div class="row is-list-active"><h3>SHOP FOODS</h3>`;
                let total_sold = 0;
                for (let i = 0; i < list.length; i++) {
                html += `<div class="col-lg-4 col-md-6 col-sm-6">
                                            <div class="product-m">
                                                <div class="product-m__thumb">

                                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" href="#">

                                                        <img class="aspect__img" src="${list[i].image}" alt=""></a>
                                                    <div class="product-m__quick-look">

                                                        <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                                    <div class="product-m__add-cart">

                                                        <a class="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart" onclick="addTocart(${list[i].id})">Add to Cart</a></div>
                                                </div>
                                                <div class="product-m__content">
                                                    <div class="product-m__category">

                                                        <a href="shop-side-version-2.html">Food</a></div>
                                                    <div class="product-m__name">

                                                        <a href="product-detail.html">${list[i].name}</a></div>
                                                
                                                    <div class="product-m__price">${list[i].price} VND</div>
                                                    <div class="product-m__hover">
                                                        <div class="product-m__preview-description">

                                                            <span>${list[i].description}</span></div>
                                                        <div class="product-m__wishlist">

                                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist"></a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
                    total_sold += list[i].quantity;
            }
            html += `</div>
                        </div>`
            document.getElementById("app-content").innerHTML = html;
            document.getElementById("total-sold").innerText = total_sold + " sold";

            axios.get(`http://localhost:8080/coupons/shop/${shop.id}`,getAuth()).then(({data}) =>{
                console.log(data)
                let html = "";
                for (let  i = 0 ; i < data.length;i++){
                    let date = new Date(new Date(data[i].endDate).getMilliseconds() - new Date(data[i].startDate).getMilliseconds()).getDay();
                    let name = getCouponName(data[i]);
                    html += `<div class="col-lg-3 col-md-4 col-sm-6" style="border-radius: 5px; color: black; margin-top: 5px;">
                                            <div class="pd-detail__stock" style="width: 200px; height: 50px; text-align: center; border-radius: 10px">
                                                 <p>${name} </p>
                                                 <span>${date} day left</span>
                                            </div>
                            </div>`
                }
                document.getElementById("coupon-list").innerHTML = html;
                load_js()
            })
        })
    });
}
function checkWishList(food){
         axios.get(`http://localhost:8080/wishlist/dup?food=${food.id}&user=${getUser().id}`,getAuth()).then((response) =>{
             document.getElementById("wishlist-check").innerHTML = `<span class="pd-detail__stock" style="border-radius: 5px; background: red; color: black">Wishlist <i class="far fa-heart"></i> </span>`
         })
}
function getCouponDetailsByShop(food){
    axios.get(`http://localhost:8080/coupons/shop/${food.shop.id}`,getAuth()).then((response)=>{
        let data = response.data;
        let html = "";
        for (let i=0; i< data.length; i++) {
            html +=  `<span class="pd-detail__stock" style="border-radius: 30px; background: #a0a0a0; color: black; margin-top: 5px ">${String(data[i].type).toUpperCase()} ${String(data[i].discount).toUpperCase()} </span>`
        }
        document.getElementById("coupon-list").innerHTML = html;
    })
}

function getCouponName(coupon){
         if(coupon.type.toString().toUpperCase() == "PERCENT")
                   return "DISCOUNT " + coupon.discount + "%";
         else
                   return "DISCOUNT " + String(coupon.discount).replace(/(.)(?=(\d{3})+$)/g, "$1.") + " VND";
}

function getSameFoodsGuess(id){
         document.getElementById("app-content").innerHTML  += `
         <div class="u-s-p-b-90">
                <!--====== Section Intro ======-->
                <div class="section__intro u-s-m-b-46">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section__text-wrap">
                                    <h1 class="section__heading u-c-secondary u-s-m-b-12">FOODS RECOMMEND</h1>

                                    <span class="section__span u-c-grey">FOODS FROM THAT SHOP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Intro ======-->
                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="slider-fouc">
                            <div class="owl-carousel product-slider" data-item="4" id="shop-list">
                                                              
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>
            <div class="u-s-p-b-90">

                <!--====== Section Intro ======-->
                <div class="section__intro u-s-m-b-46">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section__text-wrap">
                                    <h1 class="section__heading u-c-secondary u-s-m-b-12">BESTSELLER OF DAY</h1>

                                    <span class="section__span u-c-grey">FOODS THAT ARE SOLD THE MOST DURING THE DAY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Intro ======-->
                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="slider-fouc">
                            <div class="owl-carousel product-slider" data-item="8" id="best-list" >
                                                                                            
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>
`
         axios.get(`http://localhost:8080/user/foods/same/${id}`,getAuth()).then(function(response){
             let bestseller = response.data.bestseller;
             let shop = response.data.shop;
             let html = ""
             for (let i = 0; i < bestseller.length; i++){
                 let food = bestseller[i];
                    console.log(food)
                      html += `<div class="u-s-m-b-30">
                                    <div class="product-o product-o--hover-on">
                                        <div class="product-o__wrap">

                                            <a class="aspect aspect--bg-grey aspect--square u-d-block" onclick="showFoodDetail(${food.id})">

                                                <img class="aspect__img" src="${food.image}" alt=""></a>
                                            
                                            <div class="product-o__action-wrap">
                                                <ul class="product-o__action-list">
                                                   
                                                    <li>

                                                        <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart" onclick="addTocart(${food.id})"><i class="fas fa-plus-circle"></i></a></li>
                                                    <li>

                                                        <a href="wpage/user/signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist" onclick="addToWishlist(${food.id})"><i class="fas fa-heart"></i></a></li>
                                                </ul>
                                            </div>   
                                        </div>

                                        <span class="product-o__category">

                                            <a href="shop-side-version-2.html">${food.shop.name}</a></span>

                                        <span class="product-o__name">

                                            <a onclick="showFoodDetail(${food.id})">${food.name}</a></span>
                                        <div class="product-o__rating gl-rating-style"></div>

                                        <span class="product-o__price">${food.price}
                                          </span>
                                    </div>
                                </div>`
             }
             document.getElementById("best-list").innerHTML = html;
             for (let i = 0; i < shop.length; i++){
                 let food = shop[i];
                 console.log(food)
                 html += `<div class="u-s-m-b-30">
                                    <div class="product-o product-o--hover-on">
                                        <div class="product-o__wrap">

                                            <a class="aspect aspect--bg-grey aspect--square u-d-block" onclick="showFoodDetail(${food.id})">

                                                <img class="aspect__img" src="${food.image}" alt=""></a>
                                            
                                            <div class="product-o__action-wrap">
                                                <ul class="product-o__action-list">
                                                   
                                                    <li>

                                                        <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart" onclick="addTocart(${food.id})"><i class="fas fa-plus-circle"></i></a></li>
                                                    <li>

                                                        <a href="wpage/user/signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist" onclick="addToWishlist(${food.id})"><i class="fas fa-heart"></i></a></li>
                                                </ul>
                                            </div>   
                                        </div>

                                        <span class="product-o__category">

                                            <a href="shop-side-version-2.html">${food.shop.name}</a></span>

                                        <span class="product-o__name">

                                            <a href="product-detail.html">${food.name}</a></span>
                                        <div class="product-o__rating gl-rating-style"></div>

                                        <span class="product-o__price">${food.price}
                                          </span>
                                    </div>
                                </div>`
             }
             document.getElementById("shop-list").innerHTML = html;
             load_js();
         })
}
function showBestSeller(){
         document.getElementById("app-content").innerHTML = `            
            <div class="u-s-p-y-90">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="shop-p">
                                <div class="shop-p__toolbar u-s-m-b-30">
                                    <div class="shop-p__meta-wrap u-s-m-b-60">
                                        <h2 style="text-align: center; color: black">BEST SELLER FOODS OF DAY</h2>
                                       
                                    </div>
                                    <div class="shop-p__tool-style">
                                        <div class="tool-style__group u-s-m-b-8">
                                     
                                            <span class="js-shop-grid-target">Grid</span>

                                            <span class="js-shop-list-target is-active">List</span></div>
                                      
                                    </div>
                                </div>
                                <div class="shop-p__collection">
                                    <div class="row is-list-active" id="food-list">
                                    </div>
                                </div>
                                <div class="u-s-p-y-60">

                                    <!--====== Pagination ======-->
                                    <ul class="shop-p__pagination">
                                        <li class="is-active">

                                            <a href="shop-list-full.html">1</a></li>
                                        <li>

                                            <a href="shop-list-full.html">2</a></li>
                                        <li>

                                            <a href="shop-list-full.html">3</a></li>
                                        <li>

                                            <a href="shop-list-full.html">4</a></li>
                                        <li>

                                            <a class="fas fa-angle-right" href="shop-list-full.html"></a></li>
                                    </ul>
                                    <!--====== End - Pagination ======-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`
        axios.get('http://localhost:8080/user/foods/bestseller',getAuth()).then(function(response) {
                  let bestseller = response.data;
                  let html = ""
                  for (let i = 0; i < bestseller.length; i++) {
                       let item = bestseller[i];
                       html += `<div class="col-lg-3 col-md-4 col-sm-6">
                                            <div class="product-m">
                                                <div class="product-m__thumb">

                                                    <a class="aspect aspect--bg-grey aspect--square u-d-block" onclick="showFoodDetail(${item.id})">

                                                        <img class="aspect__img" src="${item.image}" alt=""></a>
                                                    <div class="product-m__quick-look">

                                                        <a class="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a></div>
                                                    <div class="product-m__add-cart">

                                                        <a class="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart" onclick="addTocart(${item.id})">Add to Cart</a></div>
                                                </div>
                                                <div class="product-m__content">
                                                    <div class="product-m__category">

                                                        <a href="shop-side-version-2.html">${item.shop.name}</a></div>
                                                    <div class="product-m__name">

                                                        <a href="product-detail.html">${item.name}</a></div>
                                            
                                                    <div class="product-m__price">${item.price}</div>
                                                    <div class="product-m__hover">
                                                        <div class="product-m__preview-description">

                                                            <span>${item.description}</span></div>
                                                        <div class="product-m__wishlist">

                                                            <a class="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist" onclick="addToWishlist(${item.id})"></a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                 `
                  }
                  document.getElementById('food-list').innerHTML = html;
        })
        load_js()
}
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, xhr.response);
        } else {
            callback(xhr.status, xhr.response);
        }
    };
    xhr.send();
};

function addressSelector(){
    getJSON('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json', function(err, data) {
        console.log(data);
        var citis = document.getElementById("city-filter");
        var districts = document.getElementById("district-filter");
        if (err !== null) {
            console.error('Something went wrong: ' + err);
        } else {
            for (const x of data) {
                citis.options[citis.options.length] = new Option(x.Name, x.Id);
                citis.options[citis.options.length-1].setAttribute("address",x.Name)
                citis.options[citis.options.length-1].classList.add("city-list")
            }
            citis.onchange = function () {
                districts.length = 1;
                if(this.value != ""){
                    const result = data.filter(n => n.Id === this.value);

                    for (const k of result[0].Districts) {
                        districts.options[districts.options.length] = new Option(k.Name, k.Id);
                    }
                }
            };

        }
    });
}
function getFoodListHtml(list){
    let html = "";
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
    }
        document.getElementById('food-list').innerHTML = html;
}

function getFoodFilterUI(){
         document.getElementById('food-mega-filter').innerHTML = `
                          <div class="shop-w-master">
                                <h1 class="shop-w-master__heading u-s-m-b-30"><i class="fas fa-filter u-s-m-r-8"></i>
                                    <span>FILTERS</span></h1>
                                <div class="shop-w-master__sidebar sidebar--bg-snow">
                                     <div class="u-s-m-b-30">
                                           <div class="shop-w">
                                                <div class="shop-w__intro-wrap">
                                                    <h1 class="shop-w__h">ADDRESS</h1>
                                                    <span class="fas fa-minus shop-w__toggle collapsed" data-target="#address" data-toggle="collapse"></span>
                                                </div>
                                                <div class="shop-w__wrap collapse" id="address">
                                                     <select class="select-box select-box--primary-style" id="city-filter">
                                                        <option selected value="">Choose State/Province</option>                                                        
                                                     </select>
                                                     <select class="select-box select-box--primary-style" id="district-filter">
                                                        <option selected value="">Choose District</option>                                                        
                                                     </select>
                                                </div>
                                           </div>
                                     </div>
                                     <div class="u-s-m-b-30">
                                           <div class="shop-w">
                                                <div class="shop-w__intro-wrap">
                                                    <h1 class="shop-w__h">CATEGORY</h1>
                                                    <span class="fas fa-minus shop-w__toggle collapsed" data-target="#category" data-toggle="collapse"></span>
                                                </div>
                                                <div class="shop-w__wrap collapse" id="category">
                                                      <ul id="category-list">
                                                          
                                                      </ul>
                                                </div>
                                           </div>
                                     </div>
                                     <div class="u-s-m-b-30">
                                           <div class="shop-w">
                                                <div class="shop-w__intro-wrap">
                                                    <h1 class="shop-w__h">PRICE RANGE</h1>
                                                    <span class="fas fa-minus shop-w__toggle collapsed" data-target="#price" data-toggle="collapse"></span>
                                                </div>
                                                <div class="shop-w__wrap collapse" id="price">
                                                      <label id="start-price" class="check-box__label">FROM</label>
                                                      <input  class="input-text input-text--primary-style" id="start-price" style="width: 100%">
                                                      <label id="start-price" class="check-box__label">TO</label>
                                                      <input class="input-text input-text--primary-style" id="end-price" style="width: 100%">
                                                </div>
                                           </div>
                                     </div>
                                     <div class="u-s-m-b-30">
                                           <div class="shop-w">
                                                <div class="shop-w__intro-wrap">
                                                    <h1 class="shop-w__h">COUPON</h1>
                                                    <span class="fas fa-minus shop-w__toggle collapsed" data-target="#coupon" data-toggle="collapse"></span>
                                                </div>
                                                <div class="shop-w__wrap collapse" id="coupon">
                                                      <ul>
                                                          <li>
                                                             <div class="check-box">
                                                                <input class="coupon-list" type="checkbox" value="minus">
                                                                <div class="check-box__state check-box__state--primary">
                                                                <label class="check-box__label" >MINUS</label></div>
                                                              </div>
                                                          </li>
                                                          <li>
                                                             <div class="check-box">
                                                                <input class="coupon-list" type="checkbox" value="percent">
                                                                <div class="check-box__state check-box__state--primary">
                                                                <label class="check-box__label" >PERCENT</label></div>
                                                              </div>
                                                          </li>
                                                      </ul>
                                                </div>
                                           </div>
                                     </div>                                     
                            <div class="u-s-m-b-30">
                                <div class="shop-w">
                                     <button class="btn btn--e-white-brand" style="width: 100%; padding: 25px;font-size: 25px ; border: 1px solid brown; border-radius: 25px" onclick="filterFood()">FILTER</button>
                                </div>
                            </div>
                                </div>
                          </div>`
         addressSelector();
         let items = ["PIZZA","NOODLE","CREAM","TEA","CHICKEN","PHO","HOTPOT","VEGETARIAN","DESSERT","SUSHI","DRINK"]
         let category = "";
         for (let i = 0 ; i < items.length; i++) {
             category += `<li>
                                <div class="check-box">
                                                    <input class="category-list" type="checkbox" id="category-${i}" value="${items[i]}" onchange="chooseCategory(${i})">
                                                    <div class="check-box__state check-box__state--primary">
                                                    <label class="check-box__label" for="category-${i}">${items[i]}</label></div>
                               </div>
                          </li>`
         }
         document.getElementById("category-list").innerHTML = category;
}
function filterFood(){
         let city= document.getElementById("city-filter").value;
         let district= document.getElementById("district-filter").value;
         let address = city+"-"+district;
         let coupons = document.getElementsByClassName("coupon-list");
         let coupons_type =""
         for (let i = 0; i < coupons.length; i++) {
              if (coupons[i].checked)
                   coupons_type = coupons[i].value;
         }
         let start = +document.getElementById("start-price").value;
         let end = +document.getElementById("end-price").value;
         let category = document.getElementsByClassName("category-list");
         let categoryList = []
         for (let i = 0; i < category.length; i++) {
             if(category[i].checked)
                 categoryList.push(category[i].value);
         }
         console.log(categoryList)
         let url = `http://localhost:8080/user/foods/filter?`
         if(city != "" && district != "") url += "address=" + address;
         if(coupons_type != ""){
             if(url.at(url.length-1) == "?")
                 url += `coupon=${coupons_type}`
             else
                 url += `&coupon=${coupons_type}`
         }
         if(start != 0 && end != 0){
             if(url.at(url.length-1) == "?")
                 url += `start=${start}&end=${end}`
             else
                 url += `&start=${start}&end=${end}`
         }
         if(url.at(url.length-1) == "?")
             url = `http://localhost:8080/user/foods/filter`
         axios.get(url,getAuth()).then((response) => {
                 let foods = response.data.foods;
                 let foods_check = []
                 for (let i = 0 ; i < foods.length;i++){
                      let name = foods[i].name;
                      for (let j = 0 ; j < categoryList.length;j++){
                           if(name.toUpperCase().includes(categoryList[j]))
                                   foods_check.push(foods[i])
                      }
                 }
                 if(response.data.foods.length > 0)
                     getFoodListHtml(foods_check)
                 else
                     document.getElementById("food-list").innerHTML = `
                              <div class="section__content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 u-s-m-b-30">
                                <div class="empty">
                                    <div class="empty__wrap">

                                        <span class="empty__big-text">NO RESULTS FOUND</span>

                                        <span class="empty__text-1">Your search, did not match any foods</span>

                                        <a class="empty__redirect-link btn--e-brand" href="#" onclick="showFood()">CONTINUE SHOPPING</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                     `
         })
}
function chooseCategory(id){
         let categorys = document.getElementsByClassName("category-list");
         for (let i = 0; i < categorys.length; i++){
             if(i != id)
                categorys[i].checked = false;
         }
}
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

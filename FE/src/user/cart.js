function showMiniCart(){
        document.getElementById("mini-cart").innerHTML =`

                                            <!--====== Mini Product Container ======-->
                                            <div class="mini-product-container gl-scroll u-s-m-b-15" id="cart-container-mini">
                                            
                                            </div>
                                            <div class="mini-product-stat">
                                                <div class="mini-total">

                                                    <span class="subtotal-text">SUBTOTAL</span>

                                                    <span class="subtotal-value" id="total-value"></span></div>
                                                <div class="mini-action">

                                                    <a class="mini-link btn--e-brand-b-2" href="checkout.html">PROCEED TO CHECKOUT</a>

                                                    <a class="mini-link btn--e-transparent-secondary-b-2" onclick="showCart()">VIEW CART</a></div>
                                            </div>
                                            <!--====== End - Mini Product Statistics ======-->                           
`
        getList();
}
function showCart(){
        document.getElementById('app-content').innerHTML = `<div class="u-s-p-b-60">
                <!--====== Section Intro ======-->
                <div class="section__intro u-s-m-b-60" >
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section__text-wrap">
                                    <h1 class="section__heading u-c-secondary">SHOPPING CART</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Intro ======-->


                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                                <div class="table-responsive">
                                    <table class="table-p">
                                        <tbody id="cart-container">
                                                                                        <tr>
                        <td>
                                <div class="table-p__box">
                                        <div class="table-p__img-wrap">

                                                <img class="u-img-fluid" src="images/product/electronic/product3.jpg" alt=""></div>
                                        <div class="table-p__info">

                                                            <span class="table-p__name">

                                                                <a href="product-detail.html">Yellow Wireless Headphone</a></span>

                                                <span class="table-p__category">

                                                                <a href="shop-side-version-2.html">Electronics</a></span>
                                                <ul class="table-p__variant-list">
                                                        <li>

                                                                <span>Size: 22</span></li>
                                                        <li>

                                                                <span>Color: Red</span></li>
                                                </ul>
                                        </div>
                                </div>
                        </td>
                        <td>

                                <span class="table-p__price">$125.00</span></td>
                        <td>
                                <div class="table-p__input-counter-wrap">

                                        <!--====== Input Counter ======-->
                                        <div class="input-counter">

                                                <span class="input-counter__minus fas fa-minus" onclick="minusQuantity(1)"></span>

                                                <input class="input-counter__text input-counter--text-primary-style" type="text" value="1" data-min="1" data-max="1000" id="1">

                                                <span class="input-counter__plus fas fa-plus" onclick="plusQuantity(1)"></span></div>
                                        <!--====== End - Input Counter ======-->
                                </div>
                        </td>
                        <td>
                                <div class="table-p__del-wrap">

                                        <a class="far fa-trash-alt table-p__delete-link" href="#"></a></div>
                        </td>
                </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="route-box">
                                    <div class="route-box__g1">

                                        <a class="route-box__link" href="shop-side-version-2.html"><i class="fas fa-long-arrow-alt-left"></i>

                                            <span>CONTINUE SHOPPING</span></a></div>
                                    <div class="route-box__g2">

                                        <a class="route-box__link" onclick="deleteAll()"><i class="fas fa-trash"></i>

                                            <span>CLEAR CART</span></a>

                                        <a class="route-box__link" href="cart.html"><i class="fas fa-sync"></i>

                                            <span>UPDATE CART</span></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        // getList()
}

function plusQuantity(id){
         let quantity  = +document.getElementById(id).value;
         quantity++;
        document.getElementById(id).value = quantity;
}
function minusQuantity(id){
        let quantity  = +document.getElementById(id).value;
        if(quantity == 0) return;
        quantity--;
        document.getElementById(id).value = quantity;
}
function deleteCart(id){
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(currentUser == null) return;
        let auth = {
                headers: {
                        "Authorization": `Bearer ${currentUser.accessToken}`
                }
        }
        let food = {
                id: id
        }
         axios.post('http://localhost:8080/cart/delete',currentUser.id,food,auth).then((response) =>{
                 alert(response.data);
        })
}
function deleteAll(){
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(currentUser == null) return;
        let auth = {
                headers: {
                        "Authorization": `Bearer ${currentUser.accessToken}`
                }
        }
        axios.post('http://localhost:8080/cart/deleteAll',currentUser.id,auth).then((response) =>{
                alert(response.data);
        })
}

function getList(){
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(currentUser == null) return;
        let auth = {
                headers: {
                        "Authorization": `Bearer ${currentUser.accessToken}`
                }
        }
        console.log("Ok");
        axios.get(`http://localhost:8080/cart/${currentUser.id}`,auth).then((response) =>{
                let data = response.data;
                let html = "";
                        for(let i = 0 ; i < data.foods.length; i++){
                                html += `                                          <!--====== Card for mini cart ======-->
                                                <div class="card-mini-product">
                                                    <div class="mini-product">
                                                        <div class="mini-product__image-wrapper">

                                                            <a class="mini-product__link" href="product-detail.html">

                                                                <img class="u-img-fluid" src="images/product/women/product8.jpg" alt=""></a></div>
                                                        <div class="mini-product__info-wrapper">

                                                            <span class="mini-product__category">

                                                                <a href="shop-side-version-2.html">Women Clothing</a></span>

                                                            <span class="mini-product__name">

                                                                <a href="product-detail.html">New Dress D Nice Elegant</a></span>

                                                            <span class="mini-product__quantity">1 x</span>

                                                            <span class="mini-product__price">$8</span></div>
                                                    </div>

                                                    <a class="mini-product__delete-link far fa-trash-alt"></a>
                                                </div>`
                                document.getElementById("cart-container-mini").innerHTML = html;
                                html = "";
                                for(let i = 0 ; i < data.foods.length; i++){
                                        let a  = data.foods[i];
                                html += `
                                         <tr>
                        <td>
                                <div class="table-p__box">
                                        <div class="table-p__img-wrap">

                                                <img class="u-img-fluid" src="${a.image}" alt=""></div>
                                        <div class="table-p__info">

                                                            <span class="table-p__name">

                                                                <a href="product-detail.html">${a.name}</a></span>
                                        </div>
                                </div>
                        </td>
                        <td>
                                <span class="table-p__price">${a.price}</span></td>
                        <td>
                                <div class="table-p__input-counter-wrap">

                                        <!--====== Input Counter ======-->
                                        <div class="input-counter">

                                                <span class="input-counter__minus fas fa-minus" onclick="minusQuantity(${a.id})"></span>

                                                <input class="input-counter__text input-counter--text-primary-style" type="text" value="1" data-min="1" data-max="1000" id="${a.id}">

                                                <span class="input-counter__plus fas fa-plus" onclick="plusQuantity(${a.id})"></span>
                                        <!--====== End - Input Counter ======-->
                                </div>
                        </td>
                        <td>
                                <div class="table-p__del-wrap">

                                        <a class="far fa-trash-alt table-p__delete-link" onclick="deleteCart(${a.id})"></a></div>
                        </td>
                </tr>
                                 `

                        }
                                document.getElementById("cart-container").innerHTML = html;
                        }
        }).catch((error) => {
                if(document.getElementById("cart-container") != null){
                        document.getElementById("cart-container").innerHTML = `
               <div class="u-s-p-y-60">

                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 u-s-m-b-30">
                                <div class="empty">
                                    <div class="empty__wrap">

                                        <span class="empty__big-text">EMPTY</span>

                                        <span class="empty__text-1">No items found on your cart.</span>

                                        <a class="empty__redirect-link btn--e-brand" href="shop-side-version-2.html">CONTINUE SHOPPING</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>
                `
                }

                document.getElementById("cart-container-mini").innerHTML = `
                    <div class="u-s-p-y-60">
                        <div class="section__content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 u-s-m-b-30">
                                <div class="empty">
                                    <div class="empty__wrap">
                                        <span class="empty__big-text">EMPTY</span>
                                        <span class="empty__text-1">No items found on your cart.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>
                `
        })
}
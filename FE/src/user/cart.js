function showMiniCart(){
        document.getElementById("mini-cart").innerHTML =`
                                            
                                        <a class="mini-cart-shop-link"><i class="fas fa-shopping-bag"></i>

                                            <span class="total-item-round" id="cart-number"></span></a>

                                        <!--====== Dropdown ======-->

                                        <span class="js-menu-toggle"></span>
                                        <div class="mini-cart">
                                             <div class="mini-product-container gl-scroll u-s-m-b-15" id="cart-container-mini">
                                            
                                            </div>
                                            <div class="mini-product-stat">                                              
                                                <div class="mini-action">                                                
                                                    <a class="mini-link btn--e-transparent-secondary-b-2" onclick="showCart()">VIEW CART</a></div>
                                            </div>
                                        </div>
                                            <!--====== Mini Product Container ======-->
                                            
                                            <!--====== End - Mini Product Statistics ======-->                           
`
        getMiniList()
}
function turnOffAddressEdit(){
        document.getElementById("address-edit-modal").style = "display:none; opacity:1"
}
function editAddress(){
        let address = document.getElementById("new-address").value;
        axios.get(`http://localhost:8080/users/${getUser().id}`,getAuth()).then((response)=>{
                let data = response.data;
                data.address = address;
                axios.put(`http://localhost:8080/users/${getUser().id}`,data,getAuth()).then((response)=>{
                      turnOffAddressEdit();
                      document.getElementById("new-address").value = "";
                })
                document.getElementById("use-default").onclick = function(){
                        document.getElementById("f-cart-note-1").toggleAttribute("disabled");
                        if(document.getElementById("use-default").checked)
                                axios.get(`http://localhost:8080/users/${getUser().id}`,getAuth()).then((response)=>{
                                        let data = response.data;
                                        document.getElementById("f-cart-note-1").value = data.address;
                                })
                        else{
                                document.getElementById("f-cart-note-1").value = "";
                        }
                }
        })
}
function showAddressEdit(){
        if(document.getElementById("address-edit-modal") == null)
         document.getElementById("app-content").innerHTML += `<!--====== Newsletter Subscribe Modal ======-->
        <div class="modal fade new-l" id="address-edit-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal--shadow">

                    <button class="btn new-l__dismiss fas fa-times" type="button" data-dismiss="modal" onclick="turnOffAddressEdit()"></button>
                    <div class="modal-body">
                        <div class="row u-s-m-x-0">
                            <div class="col-lg-12 new-l__col-2">
                                <div class="new-l__section u-s-m-t-30">
                                    <div class="u-s-m-b-8 new-l--center">
                                        <h3 class="new-l__h3">EDIT ADDRESS</h3>
                                    </div>
                                    <div class="u-s-m-b-30 new-l--center">
                                        <p class="new-l__p1">Edit your default address</p>
                                    </div>
                                    <div class="new-l__form">
                                        <div class="u-s-m-b-15">
                                            <label for="default-address" style="color:black;">DEFAULT ADDRESS</label>
                                            <input class="news-l__input" type="text" placeholder="E-mail Address" id="default-address" disabled>
                                            <label for="new-address" style="color: black">NEW ADDRESS</label>
                                            <input class="news-l__input" type="text" placeholder="E-mail Address" id="new-address"></div>
                                        <div class="u-s-m-b-15">
                                            <button class="btn btn--e-brand-b-1" type="submit" onclick="editAddress()">CHANGE</button></div>
                                            <button class="btn btn--e-brand-b-2" type="submit" onclick="turnOffAddressEdit()">CANCEL</button></div>
                                    </div>                                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        console.log(getUser().id)
        axios.get(`http://localhost:8080/users/${getUser().id}`,getAuth()).then((response)=>{
                let data = response.data;
                console.log(data)
                document.getElementById("default-address").value = data.address;
        })
        document.getElementById("address-edit-modal").style = "display: block; opacity: 1"
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

                                        <a class="route-box__link" href="#" onclick="showFood()"><i class="fas fa-long-arrow-alt-left"></i>

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
            </div>
                            <div class="section__content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                                <div class="f-cart">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-6 u-s-m-b-30">
                                            <div class="f-cart__pad-box" style="border: 1px solid #888888; border-radius: 25px;">
                                                <h2 class="gl-h1">DELIVERY</h2>
                                                <div class="u-s-m-b-30">
                                                     <select class="select-box select-box--transparent-b-2" id="delivery-select" onchange="calculatePrice()">
                                                        <option selected>SELECT DELIVERY</option>
                                                        <option value="1">GRAB</option>
                                                        <option value="2">SHOPPE</option>                                                     
                                                        <option value="3">BE</option>                                                     
                                                     </select>
                                                </div>                                               
                                                <div class="gl-inline">
                                                        <div><h2 class="gl-h1">ADDRESS</h2></div>                                                                                                               
                                                </div>
                                                <span class="gl-text u-s-m-b-30">Enter your destination or choose your one to get a shipping estimate.</span>
                                                <div class="u-s-m-b-30">
                                                    <div style="display: flex; justify-content: space-around; align-items: center">
                                                        <div><input type="checkbox" class="radio-box" id="use-default">
                                                        <label for="use-default" style="font-size: 10px">USING DEFAULT ADDRESS</label></div>
                                                        <a class="ship-b__edit btn--e-transparent-platinum-b-2" onclick="showAddressEdit()">Edit</a>
                                                    </div>
                                                    <!--====== Select Box ======-->
                                                    <label for="f-cart-note-1"></label><textarea class="text-area text-area--primary-style" id="f-cart-note-1"></textarea>
                                                    <!--===== End - Select Box ======-->
                                                </div>
                   
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-6 u-s-m-b-30" >
                                            <div class="f-cart__pad-box" style="border: 1px solid #888888; border-radius: 25px">
                                                <h2 class="gl-h1">NOTE</h2>

                                                <span class="gl-text u-s-m-b-30">Add Special Note About Your Product</span>
                                                <div>
                                                    <label for="f-cart-note"></label><textarea class="text-area text-area--primary-style" id="f-cart-note"></textarea></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-6 u-s-m-b-30" >
                                            <div class="f-cart__pad-box" style="border: 1px solid black; border-radius: 25px">
                                                <div class="u-s-m-b-30">
                                                    <table class="f-cart__table">
                                                        <tbody>
                                                            <tr>
                                                                <td>SHIPPING</td>
                                                                <td id="shipping-cost"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>SUBTOTAL</td>
                                                                <td id="food-cost"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>GRAND TOTAL</td>
                                                                <td id="total-cost"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div>
                                                    <button class="btn btn--e-brand-b-2" type="submit" onclick="createOrder()"> ORDER </button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
`
        document.getElementById("use-default").onclick = function(){
                document.getElementById("f-cart-note-1").toggleAttribute("disabled");
                if(document.getElementById("use-default").checked)
                axios.get(`http://localhost:8080/users/${getUser().id}`,getAuth()).then((response)=>{
                        let data = response.data;
                        console.log(data);
                        document.getElementById("f-cart-note-1").value = data.address;
                })
                else{
                        document.getElementById("f-cart-note-1").value = "";
                }
        }
        getTotalList()
}
function calculatePrice(){
        const deliveries = [
                {
                        value: 1,
                        cost:  30000
                }
        ]
        let delivery = document.getElementById("delivery-select").value;
        let ship_cost = 0;
        if (delivery != ""){
                for (let i = 0; i < deliveries.length; i++){
                        if(delivery == deliveries[i].value)
                                ship_cost = deliveries[i].cost;
                }
        }
        document.getElementById("shipping-cost").innerText = ship_cost;
        let index = 0;
        let shops = document.getElementsByClassName("choose-shop");
        for (let i = 0; i < shops.length;i++){
                if(shops[i].checked)
                        index = shops[i].getAttribute("data-shop");
        }
        let foods = document.getElementsByClassName("foods-"+index);
        let check = document.getElementsByClassName("checkbox-"+index);
        let subtotal = 0;
        let quantity = 0;
        let coupon_index = 0;
        for (let i = 0; i < foods.length;i++){
                 if(i == 0) coupon_index = foods[i].id;
                 if(check[i].checked){
                         subtotal += parseInt(foods[i].getAttribute("price-date")) * foods[i].value;
                         quantity++;
                 }
        }
        document.getElementById("food-cost").innerText = subtotal;
        let total = subtotal + ship_cost;
        let coupon = document.getElementById("coupon-"+coupon_index);
        if(coupon.value != "default") {
                let c = document.getElementById("coupon-number-"+coupon.value);
                if(c.getAttribute("type") == "minus")
                        total -=  parseInt(c.getAttribute("discount"))*quantity;
                else
                        total -= subtotal * (100 / parseInt(c.getAttribute("discount")));
                if(total < 0) total = 0;
        }
        document.getElementById("total-cost").innerText = total;
}
function plusQuantity(id){
         let quantity  = +document.getElementById(id).value;
         quantity++;
         document.getElementById(id).value = quantity;
         calculatePrice()
}
function minusQuantity(id){
        let quantity  = +document.getElementById(id).value;
        if(quantity == 0) return;
        quantity--;
        document.getElementById(id).value = quantity;
        calculatePrice()
}
function deleteCart(id){
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(currentUser == null) return;
        let auth = {
                headers: {
                        "Authorization": `Bearer ${currentUser.accessToken}`
                }
        }
        axios.get(`http://localhost:8080/user/foods/${id}`,auth).then((respone)=>{
                console.log(respone.data)
                let currentUser = JSON.parse(localStorage.getItem("currentUser"));
                let auth = {
                        headers: {
                                "Authorization": `Bearer ${currentUser.accessToken}`
                        }
                }
                axios.post(`http://localhost:8080/cart/delete/${currentUser.id}`,respone.data,auth).then((response) =>{
                        alert(response.data);
                        showCart();
                        showMiniCart();
                })
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
        axios.delete(`http://localhost:8080/cart/deleteAll/${currentUser.id}`,auth).then((response) =>{
        })
}
function getCouponsByFood(food_id,shop_id){
         let str = shop_id + '-' + getUser().id
         axios.get(`http://localhost:8080/coupons/user/${str}`,getAuth()).then((response) =>{
                 let data = response.data;
                 let html = "";
                 for (let i = 0; i < data.length; i++){
                         html  += `<option value="${data[i].id}" type="${data[i].type}" discount="${data[i].discount}" id="coupon-number-${data[i].id}">${String(data[i].type).toUpperCase()} ${String(data[i].discount).toUpperCase()}</option>`
                 }
                 document.getElementById("coupon-"+food_id).innerHTML += html;
         })
}
function chooseShop(id){
        let shops = document.getElementsByClassName("choose-shop");
        for (let i = 0; i < shops.length;i++){
                if(shops[i].getAttribute("data-shop") != id)
                        shops[i].checked = false;
        }
        let checkbox_food = document.getElementsByClassName("checkbox-food");
        for (let i = 0; i < checkbox_food.length;i++){
               checkbox_food[i] = false;
               checkbox_food[i].setAttribute("disabled",true)
        }
        let check = document.getElementsByClassName("checkbox-"+ id);
        for (let i = 0; i < check.length;i++){
                check[i].checked = true;
                check[i].removeAttribute("disabled")
        }
        calculatePrice()
}
function getTotalList(){
        axios.get(`http://localhost:8080/cart/total/${getUser().id}`,getAuth()).then(function(response){
                let data = response.data;
                          let html = ""
                          let shop_list = response.data.list_shop;
                          for (let i= 0 ; i < shop_list.length;i++){
                               let shop = data[`${shop_list[i]}`]
                                  let a  = shop[0];
                                  html += `
                        <tr style=" border: 1px solid lightgrey; box-shadow: 5px 5px 5px #888888;">
                        <td>
                                                <input type="checkbox"  class="select-box select-box--primary-style choose-shop" data-shop="${a.shop.id}" onclick="chooseShop(${a.shop.id})">

                        </td>
                        <td style="display: flex; justify-content: center; align-items: center">
                                <div>
                                    <span class="table-p__name">
                                                                <a href="product-detail.html">${a.shop.name}</a></span>
                                </div>
                                <div style="margin-left: 100px">
                                <label class="gl-label" for="shipping-country">COUPON</label>
                                <select class="select-box select-box--primary-style" id="coupon-${a.id}" onchange="calculatePrice()">
                                                        <option selected value="default"> SELECT COUPON</option></select>
                                </div>
                        </td>
                        </tr>
                                 `
                                  getCouponsByFood(a.id,a.shop.id)
                                  for (let j = 0 ; j < shop.length;j++){
                                          a = shop[j];
                                          html += `
                        <tr>
                        <td style="width: 5px">
                               <input type="checkbox"  class="select-box select-box--primary-style choose-shop checkbox-${a.shop.id} checkbox-food" data-shop="${a.shop.id}" data-food="${a.id}" id="checkbox-${a.id}" onclick="calculatePrice()">
                        </td>
                        <td>
                                <div class="table-p__box">
                                        <div class="table-p__img-wrap">

                                                <img class="u-img-fluid" src="${a.image}" alt="" style="height: 120px"></div>
                                        <div class="table-p__info">

                                                            <span class="table-p__name">

                                                                <a href="product-detail.html">${a.name}</a></span>
                                        </div>
                                </div>
                        </td>
                        <td>
                                <span class="table-p__price">${a.price} VND</span></td>

                        <td>

                                <div class="table-p__input-counter-wrap">

                                        <!--====== Input Counter ======-->
                                        <div class="input-counter">

                                                <span class="input-counter__minus fas fa-minus" onclick="minusQuantity(${a.id})"></span>

                                                <input class="input-counter__text input-counter--text-primary-style foods-${a.shop.id}" type="text" value="1" data-min="1" data-max="1000" id="${a.id}" price-date="${a.price}">

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
                          }
                        document.getElementById("cart-container").innerHTML = html;
        })

}
function getMiniList(){
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
                console.log(data.food)
                document.getElementById("cart-number").innerHTML = data.food.length;
                if(data.food.length == 0){
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

                                        <a class="empty__redirect-link btn--e-brand" href="#" onclick="showFood()">CONTINUE SHOPPING</a></div>
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
                        return;
                }
                let html = "";
                        for(let i = 0 ; i < data.food.length; i++){
                                let a = data.food[i];
                                html += `                                          <!--====== Card for mini cart ======-->
                                                <div class="card-mini-product">
                                                    <div class="mini-product">
                                                        <div class="mini-product__image-wrapper">

                                                            <a class="mini-product__link" href="#" onclick="showFoodDetail(${a.id})">

                                                                <img class="u-img-fluid" src="${a.image}" alt=""></a></div>
                                                        <div class="mini-product__info-wrapper">

                                                          
                                                            <span class="mini-product__name">

                                                                <a href="#" onclick="showFoodDetail(${a.id})">${a.name}</a></span>

                                                        
                                                            <span class="mini-product__price">${a.price} VND</span></div>
                                                    </div>

                                                    <a class="mini-product__delete-link far fa-trash-alt" onclick="deleteCart(${a.id})"></a>
                                                </div>`

                        }
                document.getElementById("cart-container-mini").innerHTML = html;
        })
}
function createOrder(){
        let foods = []
        let orderProduct = []
        let shop_index = -1;
        let shop = document.getElementsByClassName("choose-shop");
        let address = document.getElementById("f-cart-note-1").value;
        let delivery = document.getElementById("delivery-select").value;
        let note = document.getElementById("f-cart-note").value;
        for (let i = 0; i < shop.length; i++){
                if(shop[i].checked)
                        shop_index = shop[i].getAttribute("data-shop");
        }
        if(shop_index == -1 || address == "" || delivery == "" || note == ""){
                alert("Please done fill all the information")
                return;
        }
        axios.get(`http://localhost:8080/cart/${getUser().id}`,getAuth()).then((response) =>{
                foods = response.data.food;
                let coupons = [];
                for (let i = 0; i < foods.length; i++){
                        if(foods[i].shop.id == shop_index) {
                                if(document.getElementById("checkbox-"+foods[i].id).checked){
                                        let quantity = parseInt(document.getElementById(foods[i].id).value);
                                        foods[i].quantity = quantity;
                                        let coupon;
                                        if (document.getElementById("coupon-" + foods[i].id).value != "default") {
                                                coupon = document.getElementById("coupon-" + foods[i].id).value;
                                                coupons.push({
                                                        id: coupon
                                                });
                                        }
                                        orderProduct.push({
                                                quantity: quantity,
                                                orderProductPK: {
                                                        food: foods[i]
                                                }
                                        })
                                }
                        }
                }
                let order = {
                        user: getUser(),
                        shippingAddress: address,
                        foods: orderProduct,
                        delivery: {
                                id: delivery
                        },
                        coupons: coupons,
                        note: note,
                        status: "PENDING"
                }
                axios.post("http://localhost:8080/orders",order,getAuth()).then((response) => {
                        alert("ORDER SUCCESS")
                        showMiniCart()
                        showCart()
                })
        })
}

let orders = []
function showOrder() {
    if(document.getElementById("orders-button") != null)
    document.getElementById("orders-button").classList.add("is-active");
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    };
    axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response) =>{
        axios.get(`http://localhost:8080/orders/shop/${response.data.id}`, getAuth()).then((response1) => {
                let list = response1.data;
                let html = OrderList(list);
                document.getElementById("app-content").innerHTML = html;
                addOrderEventListeners(list);
                getBorderColorByStatus();
                orders = list;
                getAllOrderStatus(orders)
                getMegaFilter()
                getFunctionButton(list)
        });
    })
}

function filterOrders(){
         let str = document.getElementById("filter-main-search").value;
         console.log(str)
         let ship = document.getElementsByClassName("shipping-list");
         let ship_ids = [];
         for (let i = 0; i < ship.length; i++){
             if(ship[i].checked){
                 ship.push(ship[i].id);
             }
         }
         let ship_str = "";
         for (let i = 0; i < ship_ids.length;i++){
              if(i == 0)
                   ship_str += ship_ids[0];
              else
                   ship_str += "-"+ ship_ids[i];
         }
         let start_date = document.getElementById("start-date").valueAsDate;
         let end_date = document.getElementById("end-date").valueAsDate;

         if(end_date == null){
                     end_date = new Date();
                     if(start_date == null){
                         start_date  = new Date();
                         start_date.setFullYear(end_date.getFullYear() - 1);
                     }
                     end_date = end_date.getTime();
                     start_date = start_date.getTime();
         }else{
             start_date = start_date.getTime();
             end_date = end_date.getTime()
         }
         if(ship_str == "") ship_str = "1"
         let url = `http://localhost:8080/orders/filter?str=${str}&ships=${ship_str}&start=${start_date}&end=${end_date}`;
         axios.get(url,getAuth()).then((response) =>{
             let list = response.data;
             console.log(list)

             let foods = document.getElementsByClassName("food-list");
             let food_indexes = []
             for (let i = 0; i < foods.length; i++){
                      if (foods[i].checked)
                                food_indexes.push(foods[i].id);
             }
             let coupons = document.getElementsByClassName("coupon-list");
             let coupon_indexes = []
             for (let i = 0; i < coupons.length;i++){
                        if(coupons[i].checked)
                                     coupon_indexes.push(coupons[i].id);
             }
             let length = list.length;
             let show_list = []
             for (let i = 0; i < length;i++){
                  axios.get(`http://localhost:8080/orders/${list[i].id}`,getAuth()).then((response1) => {
                        let order = response1.data
                        if(food_indexes.length != 0){
                            for (let  j = 0; j < order.foods.length;j++){
                                console.log()
                                for (let k = 0; k < food_indexes.length; k++){
                                    console.log(order.foods[j].orderProductPK.food.id)
                                    console.log("order: "+order.id)
                                    console.log(food_indexes[k])
                                     if(order.foods[j].orderProductPK.food.id == food_indexes[k]){
                                         show_list.push(order);
                                         break;
                                     }
                                }
                            }
                        }
                      if(coupon_indexes.length != 0)
                          for (let  j = 0; j < coupon_indexes.length;j++){
                              if(coupon_indexes[j] == order.coupons[0].id){
                                  show_list.push(order)
                                  break;
                              }
                          }
                      if(coupon_indexes.length ==0 && food_indexes.length == 0){
                             show_list.push(order)
                      }
                         if(i == length-1){
                          document.getElementById("app-content").innerHTML = OrderList(show_list)
                          getBorderColorByStatus();
                          getAllOrderStatus(orders)
                          getFunctionButton(show_list)
                      }
                  }).then(
                  )
             }
         })
}
function getMegaFilter(){
    document.getElementById("main").innerHTML += `
    <div class="shop-a" id="side-filter">
            <div class="shop-a__wrap">
                <div class="shop-a__inner gl-scroll">
                    <div class="shop-w-master">
                        <h1 class="shop-w-master__heading u-s-m-b-30"><i class="fas fa-filter u-s-m-r-8"></i>

                            <span>FILTERS</span></h1>
                        <div class="shop-w-master__sidebar">
                            <div class="u-s-m-b-30">
                                <div class="shop-w">
                                     <label for="main-search"></label>
                                     <input class="input-text input-text--border-radius input-text--style-1" type="text" id="filter-main-search" placeholder="Search" style="font-size: 16px">
                                </div>
                            </div>
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
                            <div class="u-s-m-b-30">
                                <div class="shop-w">
                                    <div class="shop-w__intro-wrap">
                                        <h1 class="shop-w__h">COUPONS</h1>

                                        <span class="fas fa-minus shop-w__toggle collapsed" data-target="#s-category" data-toggle="collapse"></span>
                                    </div>
                                    <div class="shop-w__wrap collapse" id="s-category">
                                        <ul class="shop-w__category-list gl-scroll" id="coupon-filter-list">
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="u-s-m-b-30">
                                <div class="shop-w">
                                    <div class="shop-w__intro-wrap">
                                        <h1 class="shop-w__h">SHIPPING</h1>

                                        <span class="fas fa-minus shop-w__toggle collapsed" data-target="#s-shipping" data-toggle="collapse"></span>
                                    </div>
                                    <div class="shop-w__wrap collapse" id="s-shipping">
                                        <ul class="shop-w__list gl-scroll">
                                            <li>
                                                <div class="check-box">

                                                    <input class="shipping-list" type="checkbox" id="grab-shipping" value="1">
                                                    <div class="check-box__state check-box__state--primary">
                                                        <label class="check-box__label" for="grab-shipping">Grab</label></div>
                                                </div>
                                            </li>
                                            <li>
                                                 <div class="check-box">
                                                    <input class="shipping-list" type="checkbox" id="shoppe-shipping">
                                                    <div class="check-box__state check-box__state--primary">
                                                        <label class="check-box__label" for="shoppe-shipping">Shoppe</label></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="u-s-m-b-30">
                                <div class="shop-w">
                                    <div class="shop-w__intro-wrap">
                                        <h1 class="shop-w__h">DATE</h1>

                                        <span class="fas fa-minus shop-w__toggle collapsed" data-target="#s1-shipping" data-toggle="collapse"></span>
                                    </div>
                                    <div class="shop-w__wrap collapse " id="s1-shipping">
                                        <ul class="shop-w__list gl-scroll">
                                            <li>
                                                <div>
                                                    <label class="gl-label" for="start-date">START TIME</label>

                                                    <input class="input-text input-text--primary-style" type="date" id="start-date" data-bill="" style="width: 100%">
                                                    <label class="gl-label" for="end-date">END TIME</label>

                                                    <input class="input-text input-text--primary-style" type="date" id="end-date" data-bill="" style="width: 100%">
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="u-s-m-b-30">
                                <div class="shop-w">
                                     <button class="btn btn--e-white-brand" style="width: 100%; padding: 25px;font-size: 25px ; border: 1px solid brown; border-radius: 25px" onclick="filterOrders()">FILTER</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response)=>{
        axios.get(`http://localhost:8080/coupons/shop/${response.data.id}`,getAuth()).then((response1) =>{
            let data = response1.data;
            let list = ""
            for (let i = 0; i < data.length; i++){
                list  += `<li>
                                                 <div class="check-box">
                                                    <input class="coupon-list" type="checkbox" id="${data[i].id}">
                                                    <div class="check-box__state check-box__state--primary">
                                                        <label class="check-box__label" for="${data[i].id}">${data[i].type.toUpperCase()} ${data[i].discount}</label></div>
                                                </div>
                          </li>`
            }
            document.getElementById("coupon-filter-list").innerHTML = list;
        })
    })
    axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response)=>{
        axios.get(`http://localhost:8080/foods/shop/${response.data.id}`,getAuth()).then((response1) =>{
            let data = response1.data;
            let list = ""
            for (let i = 0; i < data.length; i++){
                list  += `<li>
                                                 <div class="check-box" >                                                
                                                     <input class="food-list" type="checkbox" id="${data[i].id}">                                                  
                                                    <div class="check-box__state check-box__state--primary" style="margin-left: 40px;display: flex;justify-content: center; align-items: center">
                                                        <img src="${data[i].image}" class="u-img-fluid" style="width: 40px; height: 40px;border-radius: 999px">
                                                        <label class="check-box__label" for="${data[i].id}">${data[i].name}</label>
                                                    </div>
                                                </div>
                          </li>`
            }
            document.getElementById("foods-filter-list").innerHTML = list;
        })
    })
}

function getBorderColorByStatus(){
    let orders = document.getElementsByClassName("m-order__get");
    for (let i = 0; i < orders.length; i++) {
        let color = "";
        let status_type = orders[i].getAttribute("status-type");
        console.log(status_type+ "status")
        if(status_type.toUpperCase()=="PENDING")
            color = "#3b5c9f"
        else if(status_type.toUpperCase()=="DOING")
            color ="peachpuff"
        else if(status_type.toUpperCase()=="SHIPPING")
            color = "orange"
        else if(status_type=="DONE")
            color = "greenyellow"
        else if(status_type=="CANCEL")
            color = "red"
        document.getElementById(orders[i].id).style ="background: #C8C8C8 ;border-radius: 15px;border: 5px solid " + color;
    }
    // getFunctionButton(list)
}

function getNumberByStatus(status,list){
         let sum = 0;
         console.log(status)
         for (let i=0; i < list.length; i++){
             console.log(list[i].status.toUpperCase())
              if(list[i].status.toUpperCase() == status.toUpperCase()){
                  sum++;
              }
         }
         return sum;
}
function getAllOrderStatus(list){
    let pending_number = getNumberByStatus("PENDING",list);
    let doing_number = getNumberByStatus("DOING",list);
    let shipping_number = getNumberByStatus("SHIPPING",list);
    let done_number = getNumberByStatus("DONE",list);
    let cancel_number = getNumberByStatus("CANCEL",list);
    document.getElementById("order-status").innerHTML = `                                     <div class="dash__pad-1">
                                            <ul class="dash__w-list">
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-1" style="background: #3b5c9f"></span>

                                                        <span class="dash__w-text">${pending_number}</span>

                                                        <span class="dash__w-name">Pending Orders</span></div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-1" style="background: "></span>

                                                        <span class="dash__w-text">${doing_number}</span>

                                                        <span class="dash__w-name">Doing Orders</span></div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-1" style="background: orange"></span>

                                                        <span class="dash__w-text">${shipping_number}</span>

                                                        <span class="dash__w-name">Shipping Orders</span></div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-1" style="background: greenyellow"></span>

                                                        <span class="dash__w-text">${done_number}</span>

                                                        <span class="dash__w-name">Done Orders</span></div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-2" style="background: red"></span>

                                                        <span class="dash__w-text">${cancel_number}</span>

                                                        <span class="dash__w-name">Cancel Orders</span></div>
                                                </li>
                                            </ul>
                                        </div>
`
}

function getFunctionButton(list){
         for (let i = 0 ; i< list.length ; i++){
             let  order = list[i];
             html = ""
             if(order.status == "CANCEL")
                 html = `<a onclick="showOrderDetails(${order.id})" >DETAILS</a>`
             else if(order.status == "DONE" || order.status == "SHIPPING")
                 html = `<a onclick="showOrderDetails(${order.id})" >DETAILS</a>`
             else if(order.status != "PENDING")
                 html = `<a class="receiveOrder" data-id="${order.id}" onclick="updateOrderStatus(${order.id})">UPDATE STATUS |</a>
                 <a onclick="showOrderDetails(${order.id})" >DETAILS</a>`
             else
                 html = `<a class="receiveOrder" data-id="${order.id}" onclick="updateOrderStatus(${order.id})">UPDATE STATUS |</a>
                                    <a class="cancelOrder" onclick="cancelStatus(${order.id})" >CANCEL |</a>
                                    <a onclick="showOrderDetails(${order.id})" >DETAILS</a>`
             document.getElementById("function-bar-"+order.id).innerHTML = html;
    }
}

function showMegaFilter(){
         if(!document.getElementById("side-filter").classList.contains("is-open"))
                 document.getElementById("side-filter").classList.add("is-open");
         else
                 document.getElementById("side-filter").classList.remove("is-open")
    if(!document.getElementById("filter-button").classList.contains("is-active"))
        document.getElementById("filter-button").classList.add("is-active");
    else
        document.getElementById("filter-button").classList.remove("is-active")
}

function showOrdersCustomer(user,shop){
    axios.get(`http://localhost:8080/orders/shop/user?user=${user}&shop=${shop}`,getAuth()).then((respone)=>{
        let data = respone.data;
        document.getElementById("app-content").innerHTML = OrderList(data);
        getAllOrderStatus(orders)
        getFunctionButton(data)
        document.getElementById("customer-button").classList.add("is-active");
        document.getElementById("orders-button").classList.remove("is-active");
    })
}
function showCustomerBought(id){
    document.getElementById("customer-button").classList.add("is-active");
    document.getElementById("orders-button").classList.remove("is-active");
    axios.get(`http://localhost:8080/orders/shop/users/${id}`,getAuth()).then((response)=>{
        let customers = response.data;
        console.log(customers)
        let html = "";
        for (let i = 0; i < customers.length; i++){
            let customer = customers[i];
            html += `<div class="w-r u-s-m-b-30">
                                    <div class="w-r__container">
                                        <div class="w-r__wrap-1">                                          
                                            <div class="w-r__info">
                                                <span class="w-r__name">${customer.name}</span>
                                                <span class="w-r__name">${customer.phoneNumber}</span>
                                                <span class="w-r__price">${customer.address}</span>
                                            </div>
                                        </div>
                                        <div class="w-r__wrap-2">                                          
                                            <a class="w-r__link btn--e-transparent-platinum-b-2" onclick="showOrdersCustomer(${customer.id},${id})">VIEW</a>
                                    </div>
                                </div>`
        }
        document.getElementById('orders-list').innerHTML = html;
    })

}
function OrderList(list) {
    let canceledOrdersCount = getCanceledOrdersCount(list);
    let ordersCount = getOrdersCount(list);
    let doneCount = getDoneCount(list);
    let foodTakenCount = getFoodTakeCount(list);
    let foodShipCount = getFoodShipCount(list);
    let html = `
        <div class="u-s-p-y-60">
            <div class="u-s-p-b-60">
                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="dash">
                        <div class="container">
                            <div class="row" id="orders-container">
                                <div class="col-lg-3" id="order-status">
                                </div>
                                <div class="col-lg-9 col-md-12" >
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30" style="background: lightgrey">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">My Orders</h1>
                                            <div class="m-order u-s-m-b-30">
                                             <div class="row">
                                                <div class="m-order__select-wrapper col-lg-6">
                                                    <div class="tool-style__group u-s-m-b-8">

                                                           <span class="js-shop-filter-target" id="filter-button"><a onclick="showMegaFilter()">Filters</a></span>
                                                          <span class="js-shop-filter-target is-active" id="orders-button"><a onclick="showOrder()">Orders</a></span>
                                                          <span class="js-shop-filter-target" id="customer-button"><a onclick="showCustomerBought(${list[0].shops[0].id})">Customer</a></span>
                                                    </div>                                                 
                                                </div>                                                
                                                
                                             </div>
                                    </div>
                                </div>
                                 <div class="m-order__list" style="background: lightgrey" id="orders-list">
    `;

    for (let i = 0; i < list.length; i++) {
        let order = list[i];
        let orderStatus = getStatusText(order.status, order.cancelStatus, order.doneDeliveryMoneyStatus);
        let displayButtons = order.status ? 'style="display: none;"' : '';
        let displayButtons1 = order.cancelStatus ? 'style="display: none;"' : '';
        html += `
                <div class="m-order__get" status-type="${order.status}" id="${order.id}" >
                    <div class="manage-o__header u-s-m-b-30">
                        <div class="dash-l-r">
                            <div>
                                <div class="manage-o__text-2 u-c-secondary">Order #${order.id}</div>
                                <div class="manage-o__text u-c-silver" style="color: black !important;">${new Date(order.date).toDateString()}</div>
                            </div>
                            <div>
                                <div class="dash__link dash__link--brand" id="function-bar-${order.id}">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="manage-o__description">
                        <div class="description__container">
                           
                            <div class="description-title"> `
                         if (order.coupons.length > 0) html += `Coupon: ${order.coupons[0].type.toUpperCase()} ${order.coupons[0].discount}`
                         else html += `NO COUPON`
                   html +=     `</div>
                        </div>
                        <div class="description__info-wrap">
                            <div>
                                <span class="manage-o__badge badge--processing">${order.status}</span>
                            </div>
                            <div>
                                <span class="manage-o__text-2 u-c-silver">Address:
                                    <span class="manage-o__text-2 u-c-secondary">${order.shippingAddress}</span>
                                </span>
                            </div>
                            <div>
                                <span class="manage-o__text-2 u-c-silver">Total:
                                    <span class="manage-o__text-2 u-c-secondary">${order.total}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    }

    html += `
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>
    `;

    return html;
}

function getStatusText(status, cancelStatus, doneStatus) {
    if (cancelStatus) {
        return 'Hủy hàng';
    } else if (doneStatus) {
        return 'Hoàn thành';
    } else if (status) {
        return 'Nhận hàng';
    } else {
        return 'Chờ nhận';
    }
}

function deleteOrder(orderId) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    if (confirm("Are you sure you want to delete this order?")) {
        axios.delete(`http://localhost:8080/orders/${orderId}`, auth).then((response) => {
            alert("Xóa order thành công!");
            showOrder();
        }).catch((error) => {
            alert("Xóa order thất bại.");
        });
    } else {
        alert("Hủy xóa đơn hàng.");
    }
}

function cancelStatus(orderId) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    };

    axios.post(`http://localhost:8080/orders/cancel/${orderId}`, auth)
        .then((response) => {

        })
        .then(() => {
            alert("Đã cancel đơn hàng thành công!");
            showOrder();
        })
        .catch((error) => {
            alert("Lỗi khi cập nhật trạng thái đơn hàng.");
            console.error("Error updating order status:", error);
        });
}

function updateOrderStatus(orderId) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    };
    axios.post(`http://localhost:8080/orders/status/${orderId}`, auth).then((response1) => {
                     console.log("vao day")
                     getBorderColorByStatus()
                     getAllOrderStatus()
            })
            .then(() => {
                alert("Đã nhận đơn hàng thành công!");
            })
            .catch((error) => {
                alert("Lỗi khi cập nhật trạng thái đơn hàng.");
                console.error("Error updating order status:", error);
            });
}

function addOrderEventListeners(list) {
    list.forEach(order => {
        let receiveOrderBtn = document.querySelector(`.receiveOrder[data-id="${order.id}"]`);
        let cancelOrderBtn = document.querySelector(`.cancelOrder[data-id="${order.id}"]`);
        let deleteOrderBtn = document.querySelector(`.deleteOrder[data-id="${order.id}"]`);

        if (receiveOrderBtn && cancelOrderBtn && deleteOrderBtn) {
            receiveOrderBtn.addEventListener('click', function() {
                updateOrderStatus(order.id);
                cancelOrderBtn.style.display = 'none';
                showOrder();
            });
        }
    });
}

function getFoodQuantity(order) {
    let sum = 0;
    for(let i = 0; i < order.foods.length; i++) {
            let food = order.foods[i];
            sum += food.quantity;
    }
    return `<span class="manage-o__text-2 u-c-secondary">${sum}</span>`;
}

function getTotalPrice(order) {
    let total = 0;
    order.foods.forEach(food => {
        let price =  food.orderProductPK.food.price * food.quantity;
        total += price;
    });
    return total;
}
function getCanceledOrdersCount(orders) {
    return orders.filter(order => order.cancelStatus === true).length;
}
function getOrdersCount(orders) {
    return orders.filter(order => order.status === true).length;
}
function getDoneCount(orders) {
    return orders.filter(order => order.doneDeliveryMoneyStatus === true).length;
}
function getFoodTakeCount(orders) {
    return orders.filter(order => order.foodTakeStatus === true).length;
}
function getFoodShipCount(orders) {
    return orders.filter(order => order.deliveryFoodStatus === true).length;
}



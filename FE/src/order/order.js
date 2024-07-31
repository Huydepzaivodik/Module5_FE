let orders = []
function showOrder() {
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

        });
    })

}
function searchOrder() {
         let target = document.getElementById("target-search").value;
         let type = document.getElementById("order-search-type").value;

    axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response)=>{
        axios.get(`http://localhost:8080/orders/search`,{
            params: {
                shop_id: response.data.id,
                type: type,
                target: target
            }
        },getAuth()).then((response1) => {
            console.log("VAO DAY !")
            console.log(response1.data)
            let html = "";
            if(response1.data.length > 0){
                 html = OrderList(response1.data);
            }else{
                 html = ` <div class="u-s-p-y-60">
                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 u-s-m-b-30">
                                <div class="empty">
                                    <div class="empty__wrap">
                                        <span class="empty__big-text">HAVE NO RESULT</span>

                                        <span class="empty__text-1">No orders found on your order's shop.</span>

                                        <a class="empty__redirect-link btn--e-brand" href="#" onclick="showOrder()">Back To Orders</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>`
            }
            document.getElementById("app-content").innerHTML = html;
            addOrderEventListeners(response1.data);
            document.getElementById("order-search-type").value = type;
            chooseSearchType();
            getBorderColorByStatus()
            getAllOrderStatus(orders)
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
}
function chooseSearchType(){
      let type =  document.getElementById("order-search-type").value;
      let html = "";
      switch (type.toLowerCase()) {
          case "status":{
                html = `<select class="select-box select-box--primary-style" id="target-search" onchange="searchOrder()" style="background: ">
                                                        <option selected>Choose Status</option>
                                                        <option value="PENDING" >PENDING</option>
                                                        <option value="DOING" >DOING</option>
                                                        <option value="SHIPPING" >SHIPPING</option>
                                                        <option value="DONE" >DONE</option>
                         </select>
                     `
              break;
          }
          case "id":{
               html = `<label for="main-search"></label>

                            <input class="input-text input-text--border-radius input-text--style-1" type="text" id="target-search" placeholder="Search">

                            <button class="btn btn--icon fas fa-search main-search-button" onclick="searchOrder()"></button>`
              break;
          }
          case "coupon":{
              axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response)=>{
                  console.log()
                  axios.get(`http://localhost:8080/coupons/shop/${response.data.id}`,getAuth()).then((response1) =>{
                      let data = response1.data;
                      console.log(data)
                      let html = `<select class="select-box select-box--primary-style" id="target-search" onchange="searchOrder()">
                              <option selected>Choose Coupon</option>
                      </select>`
                      let list = ""
                      for (let i = 0; i < data.length; i++){
                          list  += `<option value="${data[i].id}">${String(data[i].type).toUpperCase()} ${String(data[i].discount).toUpperCase()}</option>`
                      }
                      document.getElementById("search-form").innerHTML = html;
                      document.getElementById("target-search").innerHTML += list;
                      return;
                  })
              })
              break;
          }
           default: {
               html = `<label for="main-search"></label>

                            <input class="input-text input-text--border-radius input-text--style-1" type="text" id="target-search" placeholder="Search">

                            <button class="btn btn--icon fas fa-search main-search-button" onclick="searchOrder()"></button>`
               break;
          }
      }
      document.getElementById("search-form").innerHTML = html;
}
function updateStatus(status){
         let sts = ["PENDING", "DOING","SHIPPING","DONE"];
         let index = sts.indexOf(status.toUpperCase());
         if(index < sts.length-1)
              return sts[index+1];
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
    getFunctionButton(list)
}
function getFunctionButton(list){
         for (let i = 0 ; i< list.length ; i++){
             let  order = list[i];
             html = ""
             if(order.status == "CANCEL")
                 html = ""
             else if(order.status != "PENDING")
                 html = `<a class="receiveOrder" data-id="${order.id}" onclick="updateOrderStatus(${order.id})">UPDATE STATUS |</a>                                 
                 <a onclick="showOrderDetails(${order.id})" >DETAILS</a>`
             else if(order.status == "DONE" || order.status == "SHIPPING")
                  html = `<a onclick="showOrderDetails(${order.id})" >DETAILS</a>`
             else
                 html = `<a class="receiveOrder" data-id="${order.id}" onclick="updateOrderStatus(${order.id})">UPDATE STATUS |</a>
                                    <a class="cancelOrder" onclick="cancelStatus(${order.id})" >CANCEL |</a>
                                    <a onclick="showOrderDetails(${order.id})" >DETAILS</a>`
             document.getElementById("function-bar-"+order.id).innerHTML = html;
    }
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
                            <div class="row">
                                <div class="col-lg-3" id="order-status">
                                </div>
                                <div class="col-lg-9 col-md-12" >
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30" style="background: lightgrey">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">My Orders</h1>
                                            <div class="m-order u-s-m-b-30">
                                             <div class="row">
                                                <div class="m-order__select-wrapper col-lg-6">
                                                    <label class="u-s-m-r-8" for="my-order-sort">Show:</label>
                                                    <select class="select-box select-box--primary-style" id="my-order-sort">
                                                        <option selected>Last 5 orders</option>
                                                        <option>Last 15 days</option>
                                                        <option>Last 30 days</option>
                                                        <option>Last 6 months</option>
                                                        <option>Orders placed in 2018</option>
                                                        <option>All Orders</option>
                                                    </select>
                                                </div>                                                
                                                <div class="m-order__select-wrapper col-lg-6">
                                                    <label class="u-s-m-r-8" for="order-search-type">Type Of Search:</label>
                                                    <select class="select-box select-box--primary-style" id="order-search-type" onclick="chooseSearchType()">
                                                        <option selected>Choose Type</option>
                                                        <option value="status">Status</option>
                                                        <option value="id">Order Id</option>
                                                        <option value="coupon">Coupon</option>
                                                    </select>
                                                    <span id="search-form">
                                                          <label for="target-search"></label>

                            <input class="input-text input-text--border-radius input-text--style-1" type="text" id="target-search" placeholder="Search">

                            <button class="btn btn--icon fas fa-search main-search-button" onclick="searchOrder()"></button>
                                                    </span>
                                                </div>
                                               </div>
                                            </div>
                                            <div class="m-order__list" style="background: lightgrey">
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
                           
                            <div class="description-title">Coupon: ${order.coupons[0].type.toUpperCase()} ${order.coupons[0].discount}</div>
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



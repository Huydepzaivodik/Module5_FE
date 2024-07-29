
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
            document.getElementById("target-search").value = target;
        })
    })
}
function chooseSearchType(){
      let type =  document.getElementById("order-search-type").value;
      let html = "";
      switch (type.toLowerCase()) {
          case "status":{
                html = `<select class="select-box select-box--primary-style" id="target-search">
                                                        <option selected>Choose Status</option>
                                                        <option value="PENDING">PENDING</option>
                                                        <option value="DOING">DOING</option>
                                                        <option value="SHIPPING">SHIPPING</option>
                                                        <option value="DONE">DONE</option>
                         </select>
                         <button class="btn btn--icon fas fa-search main-search-button" onclick="searchOrder()"></button>`
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
                      let html = `<select class="select-box select-box--primary-style" id="target-search">
                      </select>
                      <button class="btn btn--icon fas fa-search main-search-button" onclick="searchOrder()"></button>`;
                      let list = ""
                      for (let i = 0; i < data.length; i++){
                          list  += `<option value="${data[i].id}">${String(data[i].type).toUpperCase()} ${String(data[i].discount).toUpperCase()}</option>`
                      }
                      document.getElementById("search-form").innerHTML = html;
                      document.getElementById("target-search").innerHTML = list;
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
                                
                                <div class="col-lg-12 col-md-12">
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
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
                                            <div class="m-order__list">
    `;

    for (let i = 0; i < list.length; i++) {
        let order = list[i];
        let orderStatus = getStatusText(order.status, order.cancelStatus, order.doneDeliveryMoneyStatus);
        let displayButtons = order.status ? 'style="display: none;"' : '';
        let displayButtons1 = order.cancelStatus ? 'style="display: none;"' : '';

        html += `
                <div class="m-order__get">
                    <div class="manage-o__header u-s-m-b-30">
                        <div class="dash-l-r">
                            <div>
                                <div class="manage-o__text-2 u-c-secondary">Order #${order.id}</div>
                                <div class="manage-o__text u-c-silver">${order.date}</div>
                            </div>
                            <div>
                                <div class="dash__link dash__link--brand">
                                    <a class="receiveOrder" data-id="${order.id}" ${displayButtons} ${displayButtons1}>NHẬN ĐƠN |</a>
                                    <a class="cancelOrder" onclick="cancelStatus(${order.id})" data-id="${order.id}" ${displayButtons} ${displayButtons1}>HỦY ĐƠN |</a>
                                    <a class="deleteOrder" onClick="deleteOrder(${order.id})" data-id="${order.id}" ${displayButtons} ${displayButtons1}>XÓA |</a>
                                    <a onclick="showOrderDetails(${order.id})" ${displayButtons1}>CHI TIẾT</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="manage-o__description">
                        <div class="description__container">
                            <div class="description__img-wrap">
                                <img class="u-img-fluid" src="images/product/electronic/product3.jpg" alt="">
                            </div>
                            <div class="description-title">${order.note}</div>
                        </div>
                        <div class="description__info-wrap">
                            <div>
                                <span class="manage-o__badge badge--processing">${order.status}</span>
                            </div>
                            <div>
                                <span class="manage-o__text-2 u-c-silver">Số lượng:
                                    <span class="manage-o__text-2 u-c-secondary">${getFoodQuantity(order)}</span>
                                </span>
                            </div>
                            <div>
                                <span class="manage-o__text-2 u-c-silver">Tổng tiền:
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

    axios.get(`http://localhost:8080/orders/${orderId}`, auth)
        .then((response) => {
            let order = response.data;
            order.cancelStatus = true;

            return axios.put(`http://localhost:8080/orders/${orderId}`, order, auth);
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

    axios.get(`http://localhost:8080/orders/${orderId}`, auth)
        .then((response) => {
            let order = response.data;
            order.status = true;

            return axios.put(`http://localhost:8080/orders/${orderId}`, order, auth);
        })
        .then(() => {
            alert("Đã nhận đơn hàng thành công!");
            showOrder();
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



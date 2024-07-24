
function showOrder() {
    showMain();
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    };

    axios.get("http://localhost:8080/orders", auth)
        .then((response) => {
            axios.get("http://localhost:8080/foods", auth)
                .then((foodResponse) => {

                    let foods = foodResponse.data;
                    let list = response.data;

                    let html = OrderList(list, foods);
                    document.getElementById("app-content").innerHTML = html;
                    addOrderEventListeners(list);
                });
        });
}

function OrderList(list, foods ) {
    let canceledOrdersCount = getCanceledOrdersCount(list);
    let ordersCount = getOrdersCount(list);
    let doneCount = getDoneCount(list);
    let foodTakenCount = getFoodTakeCount(list);
    let foodShipCount = getFoodShipCount(list);

    let html = `
        <div class="u-s-p-y-60">
            <!--====== Section Content ======-->
            <div class="section__content">
                <div class="container">
                    <div class="breadcrumb">
                        <div class="breadcrumb__wrap">
                            <ul class="breadcrumb__list">
                                <li class="has-separator">
                                    <a href="index.html">Home</a>
                                </li>
                                <li class="is-marked">
                                    <a href="dash-my-order.html">My Account</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!--====== End - Section 1 ======-->

            <!--====== Section 2 ======-->
            <div class="u-s-p-b-60">
                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="dash">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-12">
                                    <!--====== Dashboard Features ======-->
                                    <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                                        <div class="dash__pad-1">
                                            <span class="dash__text u-s-m-b-16">Hello, Shop abcxyz</span>
                                            <ul class="dash__f-list">
                                                <li>
                                                    <a class="dash-active" href="dash-my-order.html">My Orders</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                                        <div class="dash__pad-1">
                                            <ul class="dash__w-list">
                                                <li>
                                                    <div class="dash__w-wrap">
                                                        <span class="dash__w-icon dash__w-icon-style-1"><i class="fas fa-cart-arrow-down"></i></span>
                                                        <span class="dash__w-text">${ordersCount}</span>
                                                        <span class="dash__w-name">Orders Placed</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">
                                                        <span class="dash__w-icon dash__w-icon-style-2"><i class="fas fa-times"></i></span>
                                                        <span class="dash__w-text">${canceledOrdersCount}</span>
                                                        <span class="dash__w-name">Cancel Orders</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">
                                                        <span class="dash__w-icon dash__w-icon-style-3"><i class="far fa-heart"></i></span>
                                                        <span class="dash__w-text">${doneCount}</span>
                                                        <span class="dash__w-name">DONE</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">
                                                        <span class="dash__w-icon dash__w-icon-style-3"><i class="far fa-heart"></i></span>
                                                        <span class="dash__w-text">${foodTakenCount}</span>
                                                        <span class="dash__w-name">RECEIVE</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">
                                                        <span class="dash__w-icon dash__w-icon-style-3"><i class="far fa-heart"></i></span>
                                                        <span class="dash__w-text">${foodShipCount}</span>
                                                        <span class="dash__w-name">SHIPPED</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!--====== End - Dashboard Features ======-->
                                </div>
                                <div class="col-lg-9 col-md-12">
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">My Orders</h1>
                                            <form class="m-order u-s-m-b-30">
                                                <div class="m-order__select-wrapper">
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
                                            </form>
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
                            <div class="description-title">HAHHAA</div>
                        </div>
                        <div class="description__info-wrap">
                            <div>
                                <span class="manage-o__badge badge--processing">${orderStatus}</span>
                            </div>
                            <div>
                                <span class="manage-o__text-2 u-c-silver">Số lượng:
                                    <span class="manage-o__text-2 u-c-secondary">${getFoodQuantity(order)}</span>
                                </span>
                            </div>
                            <div>
                                <span class="manage-o__text-2 u-c-silver">Tổng tiền:
                                    <span class="manage-o__text-2 u-c-secondary">${getTotalPrice(order)}</span>
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
    return `<span class="manage-o__text-2 u-c-secondary">${order.foods.length}</span>`;
}

function getTotalPrice(order) {
    let total = 0;
    order.foods.forEach(food => {
        total += food.price;
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

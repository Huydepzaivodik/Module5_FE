function showOrderDetails(id){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response) => {
        axios.get(`http://localhost:8080/orders/order?order_id=${id}&shop_id=${response.data.id}`, getAuth()).then((response1) => {
            let order = response1.data;
            console.log(order)
            let foodTakeStatus = getFoodTakeStatus(order.status, order.foodTakeStatus);
            let deliveryFoodStatus = getDeliveryFoodStatus(order.status, order.foodTakeStatus, order.deliveryFoodStatus);
            let doneDeliveryMoneyStatus = getDoneDeliveryMoneyStatus(order.status, order.foodTakeStatus, order.deliveryFoodStatus, order.doneDeliveryMoneyStatus);
            html = `   <div  class="u-s-p-y-60">

                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="breadcrumb">
                           
                                 <div>
                                        <a class="route-box__link" href="#" onclick="showOrder()"><i class="fas fa-long-arrow-alt-left"></i>
                                            <span>BACK TO ORDERS</span></a></div>
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
                                <div class="col-lg-12 col-md-12">
                                    <h1 class="dash__h1 u-s-m-b-30">Order Details</h1>
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div class="dash__pad-2">
                                            <div class="dash-l-r">
                                                <div>
                                                    <div class="manage-o__text-2 u-c-secondary">Order #${order.id}</div>
                                                    <div class="manage-o__text u-c-silver">Ngày đặt hàng ${new Date(order.date).toDateString()}</div>
                                                </div>
                                                <div>
                                                    <div class="manage-o__text-2 u-c-silver">Total:

                                                        <span class="manage-o__text-2 u-c-secondary">${getTotalPriceAfterCoupon(order)}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div class="dash__pad-2">
                                            <div class="manage-o">
                                                
                                                <div class="dash-l-r">
                                                    <div class="manage-o__text u-c-secondary">Delivered on ${new Date(order.date).toTimeString()}</div>
                                                    <div class="manage-o__icon"><i class="fas fa-truck u-s-m-r-5"></i>
                                                    <span class="manage-o__text">Standard</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;


            for (let i = 0; i < order.foods.length; i++) {
                html += `     
                                     <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div class="dash__pad-2">
                                            <div class="manage-o">
                                                <div class="manage-o__header u-s-m-b-30">
                                                    <div class="manage-o__icon"><i class="fas fa-box u-s-m-r-5"></i>

                                                        <span class="manage-o__text">Dish ${i + 1}</span></div>
                                                </div>
                                              
                                            
                                                <div class="manage-o__description">

                                                    <div class="description__container">
                                                        <div class="description__img-wrap">
                                                            <img class="u-img-fluid" src="${order.foods[i].orderProductPK.food.image}" alt=""></div>
                                                        <div class="description-title">${order.foods[i].orderProductPK.food.name}</div>
                                                    </div>
                                                    <div class="description__info-wrap">
                                                        <div>

                                                            <span class="manage-o__text-2 u-c-silver">Quantity:

                                                                <span class="manage-o__text-2 u-c-secondary">${order.foods[i].quantity}</span></span>
                                                                </div>
                                                                
                                                        <div>

                                                            <span class="manage-o__text-2 u-c-silver">Total:

                                                                <span class="manage-o__text-2 u-c-secondary">${order.foods[i].orderProductPK.food.price * order.foods[i].quantity} VND</span></span></div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
            }
            html += `
                                    
                                    
                                    
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                                                <div class="dash__pad-3">
                                                    <h2 class="dash__h2 u-s-m-b-8">ShippingAdderss: ${order.shippingAddress}</h2>
                                                    <h2 class="dash__h2 u-s-m-b-8">Name: ${order.user.name}</h2>

                                                    <span class="dash__text-2">Phone: ${order.user.phoneNumber}</span>
                                                </div>
                                            </div>

                                        </div>
                                          <div class="col-lg-6">
                                            <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                                                <div class="dash__pad-3">
                                                 <label class="u-s-m-r-8" for="my-order-sort">Coupon:</label>
                                                    <select class="select-box select-box--primary-style" id="my-order-sort" disabled>
                                                        `;
            if(order.coupons.length == 0) html += `<option selected>NO COUPON</option>`
            for (let i = 0; i < order.coupons.length; i++) {
                if(order.coupons[i].type.toUpperCase() == "MINUS")
                html += `                                                      
                <option selected> MINUS ${order.coupons[i].discount}</option>`;
                else{
                    html += `                                                      
                    <option selected> ${order.coupons[i].discount} PERCENT</option>`;
                }
            }
            let discountAmount = 0;
            if(order.coupons.length > 0)
                      discountAmount = getCouponDiscountAmount(order.coupons[0],getTotalPrice(order));
                       html += `
                                                        
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-lg-6">
                                            <div class="dash__box dash__box--bg-white dash__box--shadow u-h-100">
                                                <div class="dash__pad-3">
                                                    <h2 class="dash__h2 u-s-m-b-8">Total Summary</h2>
                                                    <div class="dash-l-r u-s-m-b-8">
                                                        <div class="manage-o__text-2 u-c-secondary">Subtotal</div>
                                                        <div class="manage-o__text-2 u-c-secondary">${getTotalPrice(order)}</div>
                                                    </div>
                                                    <div class="dash-l-r u-s-m-b-8">
                                                        <div class="manage-o__text-2 u-c-secondary">Shipping Fee</div>
                                                        <div class="manage-o__text-2 u-c-secondary">${order.delivery.cost}</div>
                                                    </div>
                                                    <div class="dash-l-r u-s-m-b-8">
                                                        <div class="manage-o__text-2 u-c-secondary">Coupon discount</div>
                                                        <div class="manage-o__text-2 u-c-secondary">${discountAmount}</div>
                                                    </div>
                                                    <div class="dash-l-r u-s-m-b-8">
                                                        <div class="manage-o__text-2 u-c-secondary">Total</div>
                                                        <div class="manage-o__text-2 u-c-secondary">${getTotalPriceAfterCoupon(order)}</div>
                                                    </div>

                                                    <span class="dash__text-2">Paid by Cash on Delivery</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>`;
            document.getElementById("app-content").innerHTML = html;
        });
        console.log(response.data)
    });
}
function getCouponDiscountAmount(coupon, subtotal) {
         if(coupon.type.toUpperCase() == "MINUS")
                  return coupon.discount;
         else return coupon.discount * subtotal;
}
function getTotalPrice(order) {
    let total = 0;
    order.foods.forEach(food => {
            total += food.orderProductPK.food.price * food.quantity;
    });
    return total;
}
function getTotalPriceAfterCoupon(order) {
    if(order.coupons.length > 0)
    return getTotalPrice(order) + order.delivery.cost - getCouponDiscountAmount(order.coupons[0],getTotalPrice(order));
    else
    return getTotalPrice(order) + order.delivery.cost
}
function getFoodTakeStatus(status,foodTakeStatus) {
    return status && foodTakeStatus ? 'timeline-l-i--finish' : '';
}
function getDeliveryFoodStatus(status,foodTakeStatus,deliveryFoodStatus) {
    return status && !foodTakeStatus && deliveryFoodStatus ? 'timeline-l-i--finish' : '';
}
function getDoneDeliveryMoneyStatus(status,foodTakeStatus,deliveryFoodStatus,doneDeliveryMoneyStatus) {
    return status && !foodTakeStatus && !deliveryFoodStatus && doneDeliveryMoneyStatus ? 'timeline-l-i--finish' : '';
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



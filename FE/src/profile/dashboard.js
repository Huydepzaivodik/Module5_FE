function showMyProfile(){
    showMenuOption()
    document.getElementById('right-dashboard').innerHTML = `                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">My Profile</h1>

                                            <span class="dash__text u-s-m-b-30">Look all your info, you could customize your profile.</span>
                                            <div class="row">
                                                <div class="col-lg-4 u-s-m-b-30">
                                                    <h2 class="dash__h2 u-s-m-b-8">Full Name</h2>

                                                    <span class="dash__text" id="u-name"></span>
                                                </div>
                                                <div class="col-lg-4 u-s-m-b-30">
                                                    <h2 class="dash__h2 u-s-m-b-8">E-mail</h2>

                                                    <span class="dash__text" id="u-email"></span>
                                                    <div class="dash__link dash__link--secondary">

                                                        <a href="#">Change</a></div>
                                                </div>
                                                <div class="col-lg-4 u-s-m-b-30">
                                                    <h2 class="dash__h2 u-s-m-b-8">Phone</h2>

                                                    <span class="dash__text" id="u-phone"></span>
                                                    <div class="dash__link dash__link--secondary">
                                                        <a href="#">Change</a></div>
                                                </div>
                                                <div class="col-lg-4 u-s-m-b-30">
                                                    <h2 class="dash__h2 u-s-m-b-8">Address</h2>

                                                    <span class="dash__text" id="u-address"></span>
                                                      <div class="dash__link dash__link--secondary">
                                                        <a href="#">Change</a></div>
                                                </div>
                                                <div class="col-lg-4 u-s-m-b-30">
                                                    <h2 class="dash__h2 u-s-m-b-8">Gender</h2>

                                                    <span class="dash__text" id="u-gender">Male</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="dash__link dash__link--secondary u-s-m-b-30">

                                                        <a data-modal="modal" data-modal-id="#dash-newsletter">Subscribe Newsletter</a></div>
                                                    <div class="u-s-m-b-16">

                                                        <a class="dash__custom-link btn--e-transparent-brand-b-2" onclick="showEditProfile()">Edit Profile</a></div>
                                                    <div>

                                                        <a class="dash__custom-link btn--e-brand-b-2" href="#">Change Password</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   `;

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    let userId = currentUser.id;

    axios.get(`http://localhost:8080/users/${userId}`,auth).then((response) => {
            let data = response.data;
            document.getElementById("u-name").innerText = data.name;
            document.getElementById("u-address").innerText = data.address;
            document.getElementById("u-email").innerText = data.email;
            document.getElementById("u-phone").innerText = data.phone;
            document.getElementById("u-gender").innerText = data.gender;
    })
}
function showMyOrder(){
    document.getElementById('right-dashboard').innerHTML = `<div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30" style="position: relative">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">My Orders</h1>
                                            <span class="dash__text u-s-m-b-30">Here you can see all products that have been delivered.</span>
                                            <div class="m-order u-s-m-b-30">
                                                <div class="m-order__select-wrapper" id="orders-info">
                                                     
                                                </div>                                           
                                            </div>
                                            <div class="m-order u-s-m-b-30">
                                                <div class="m-order__select-wrapper">
                                                    <label class="u-s-m-r-8" for="my-order-sort">Show:</label><select class="select-box select-box--primary-style" id="my-order-sort">
                                                        <option selected>Last 5 orders</option>
                                                        <option>Last 15 days</option>
                                                        <option>Last 30 days</option>
                                                        <option>Last 6 months</option>
                                                        <option>Orders placed in 2018</option>
                                                        <option>All Orders</option>
                                                    </select>
                                                </div>                                           
                                            </div>
                                            <div class="m-order__list" id="order-list" style="overflow: auto; height: 800px">
                                                                                          
                                            </div>
                                        </div>
                                    </div>
                                    `;
    getOrderList()
}
function showOrdersInfo(arr){
        document.getElementById("orders-info").innerHTML = `<div class="m-order__get" style="background: orangered; border-radius: 25px; height: 150px">
                                                    <div class="manage-o__header u-s-m-b-30" style="border: none; display: flex; justify-content: space-around; color: whitesmoke; margin: 0 ">
                                                         <div>
                                                             <h3>ORDERS INFORMATION IN MONTH</h3>
                                                         </div>
                                                    </div>
                                                    <div class="manage-o__header u-s-m-b-30" style="border: none; display: flex; justify-content: space-around; color: whitesmoke; ">
                                                        <div class="dash-l-r">
                                                            <div style="text-align: center">
                                                                <div class="manage-o__text-2 " style="font-size: 14px">ORDERS USED</div>
                                                                <div class="manage-o__text " style="margin-top: 5px; font-size: 18px !important;">${arr[1]}</div>
                                                            </div>
                                                            <div style="text-align: center">
                                                                <div class="manage-o__text-2 " style="font-size: 14px">COUPONS USED</div>
                                                                <div class="manage-o__text " style="margin-top: 5px; font-size: 18px !important;">${arr[0]}</div>
                                                            </div>  
                                                            <div style="text-align: center">
                                                                <div class="manage-o__text-2 " style="font-size: 14px">TOTAL MONEY USED</div>
                                                                <div class="manage-o__text " style="margin-top: 5px; font-size: 18px !important;">${arr[2]}</div>
                                                            </div>                                                            
                                                        </div>
                                                    </div>                                               
                                                </div>`
}
function getOrderList(){
         axios.get(`http://localhost:8080/orders/user/${getUser().id}`,getAuth()).then(function(response){
               let data = response.data.orders;
               let info = response.data.info;
               let html = ""
               getOrderStatusDashBox(data)
               showOrdersInfo(response.data.info)
             for (let i = 0; i < data.length; i++){
                    let order = data[i];
                   html += `<div class="m-order__get">
                                                    <div class="manage-o__header u-s-m-b-30">
                                                        <div class="dash-l-r">
                                                            <div>
                                                                <div class="manage-o__text-2 u-c-secondary">Order #${order.id}</div>
                                                                <div class="manage-o__text u-c-silver">Placed on ${new Date(order.date).toDateString()}</div>
                                                            </div>
                                                            <div>
                                                                <div class="dash__link dash__link--brand">
                                                                    <a  onclick="showUserOrderDetails(${order.id})">MANAGE</a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="manage-o__description">
                                                        <div class="description__container">
                                                            <div class="description__img-wrap">

                                                                <img class="u-img-fluid" src="${order.foods[0].orderProductPK.food.image}" alt=""></div>
                                                            <div class="description-title">${order.foods[0].orderProductPK.food.name}</div>
                                                        </div>
                                                        <div class="description__info-wrap">
                                                            <div>

                                                                <span class="manage-o__badge badge--processing">${order.status}</span></div>
                                                            <div>

                                                                <span class="manage-o__text-2 u-c-silver">Number Of Dishes:

                                                                    <span class="manage-o__text-2 u-c-secondary">${order.foods.length}</span></span></div>
                                                            <div>

                                                                <span class="manage-o__text-2 u-c-silver">Total:

                                                                    <span class="manage-o__text-2 u-c-secondary">${order.total}</span></span></div>
                                                        </div>
                                                    </div>
                                                </div> `
                   document.getElementById('order-list').innerHTML = html;
               }
         })
}
function showEditProfile(){

    document.getElementById('right-dashboard').innerHTML = `<div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">Edit Profile</h1>

                                            <span class="dash__text u-s-m-b-30">Looks like you haven't updated your profile</span>
                                            <div class="dash__link dash__link--secondary u-s-m-b-30">

                                                <a data-modal="modal" data-modal-id="#dash-newsletter">Subscribe Newsletter</a></div>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="dash-edit-p">
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">

                                                                <label class="gl-label" for="u-name">NAME *</label>

                                                                <input class="input-text input-text--primary-style" type="text" id="u-name" placeholder=""></div>
                                                        </div>
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">

                                                                <label class="gl-label" for="u-gender">GENDER</label><select class="select-box select-box--primary-style u-w-100" id="u-gender">
                                                                    <option selected id="selected"></option>
                                                                    <option value="male">Male</option>
                                                                    <option value="male">Female</option>
                                                                </select>
                                                            </div>
                                                            <div class="u-s-m-b-30">

                                                                <label class="gl-label" for="u-name">ADDRESS *</label>

                                                                <input class="input-text input-text--primary-style" type="text" id="u-address" placeholder=""></div>
                                                        </div>
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <h2 class="dash__h2 u-s-m-b-8">E-mail</h2>

                                                                <span class="dash__text" id="u-email"></span>
                                                                <div class="dash__link dash__link--secondary">

                                                                    <a href="#">Change</a></div>
                                                            </div>
                                                            <div class="u-s-m-b-30">
                                                                <h2 class="dash__h2 u-s-m-b-8" id="u-phone">Phone</h2>

                                                                <span class="dash__text">Please enter your mobile</span>
                                                                <div class="dash__link dash__link--secondary">

                                                                    <a href="#">Add</a></div>
                                                            </div>
                                                        </div>

                                                        <button class="btn btn--e-brand-b-2" type="submit">SAVE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
`;

    document.getElementById('right-dashboard').innerHTML = `
    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
        <div class="dash__pad-2">
            <h1 class="dash__h1 u-s-m-b-14">Edit Profile</h1>
            <span class="dash__text u-s-m-b-30">Looks like you haven't update your profile</span>
            <div class="dash__link dash__link--secondary u-s-m-b-30">
                <a data-modal="modal" data-modal-id="#dash-newsletter">Subscribe Newsletter</a>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="dash-edit-p">
                        <div class="gl-inline">
                            <div class="u-s-m-b-30">
                                <label class="gl-label" for="u-name">NAME *</label>
                                <input class="input-text input-text--primary-style" type="text" id="u-name" placeholder="">
                            </div>
                        </div>
                        <div class="gl-inline">
                            <div class="u-s-m-b-30">
                                <label class="gl-label" for="u-gender">GENDER</label>
                                <select class="select-box select-box--primary-style u-w-100" id="u-gender">
                                    <option selected id="selected"></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="u-s-m-b-30">
                                <label class="gl-label" for="u-address">ADDRESS *</label>
                                <input class="input-text input-text--primary-style" type="text" id="u-address" placeholder="">
                            </div>
                        </div>
                        <div class="gl-inline">
                            <div class="u-s-m-b-30">
                                <h2 class="dash__h2 u-s-m-b-8">E-mail</h2>
                                <span class="dash__text" id="u-email"></span>
                                <div class="dash__link dash__link--secondary">
                                    <a href="#">Change</a>
                                </div>
                            </div>
                            <div class="u-s-m-b-30">
                                <h2 class="dash__h2 u-s-m-b-8" id="u-phone">Phone</h2>
                                <span class="dash__text">Please enter your mobile</span>
                                <div class="dash__link dash__link--secondary">
                                    <a href="#">Add</a>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn--e-brand-b-2" id="save-profile-btn" type="button">SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    };

    let userId = currentUser.id;
    axios.get(`http://localhost:8080/users/${userId}`, auth).then((response) => {
        let data = response.data;
        document.getElementById("u-name").value = data.name;
        document.getElementById("u-address").value = data.address;
        document.getElementById("u-email").innerText = data.email;
        document.getElementById("u-phone").innerText = data.phoneNumber;
        document.getElementById("u-gender").value = data.gender.toLowerCase();
    });

    document.getElementById('save-profile-btn').addEventListener('click', () => {
        let updatedUser = {
            name: document.getElementById("u-name").value,
            address: document.getElementById("u-address").value,
            gender: document.getElementById("u-gender").value,
        };

        axios.put(`http://localhost:8080/users/${userId}`, updatedUser, auth).then((response) => {
            alert("Profile updated successfully!");
            showMyProfile();
        }).catch((error) => {
            console.error(error);
            alert("An error occurred while updating the profile.");
        });
    });
}
function showUserOrderDetails(index){
    axios.get(`http://localhost:8080/orders/${index}`,getAuth()).then(function(response){

        let order = response.data;
        let subtotal = getTotalPrice(order);
        let coupon_discount = getCouponDiscountAmount(order.coupons[0],subtotal);
        let total = getTotalPriceAfterCoupon(order);

        document.getElementById('right-dashboard').innerHTML = `<h1 class="dash__h1 u-s-m-b-30">Order Details</h1>
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div class="dash__pad-2">
                                            <div class="dash-l-r">
                                                <div>
                                                    <div class="manage-o__text-2 u-c-secondary">Order #${order.id}</div>
                                                    <div class="manage-o__text u-c-silver">Placed on ${new Date(order.date).toDateString()}</div>
                                                </div>
                                                <div>
                                                    <div class="manage-o__text-2 u-c-silver">Total:

                                                        <span class="manage-o__text-2 u-c-secondary">${order.total}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div class="dash__pad-2">
                                            <div class="manage-o">
                                                <div class="manage-o__header u-s-m-b-30">
                                                    <div class="manage-o__icon"><i class="fas fa-box u-s-m-r-5"></i>

                                                        <span class="manage-o__text">Package 1</span></div>
                                                </div>
                                                <div class="dash-l-r">
                                                    <div class="manage-o__text u-c-secondary">Delivered on ${new Date(order.date).toDateString()}</div>
                                                    <div class="manage-o__icon"><i class="fas fa-truck u-s-m-r-5"></i>

                                                        <span class="manage-o__text">Standard</span></div>
                                                </div>
                                                 <div class="manage-o__timeline">
                                                    <div class="timeline-row">
                                                        <div class="col-lg-4 u-s-m-b-30">
                                                            <div class="timeline-step">
                                                                <div class="timeline-l-i">

                                                                    <span class="timeline-circle"></span></div>

                                                                <span class="timeline-text">Pending</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 u-s-m-b-30">
                                                            <div class="timeline-step">
                                                                <div class="timeline-l-i">

                                                                    <span class="timeline-circle"></span></div>

                                                                <span class="timeline-text">Processing</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 u-s-m-b-30">
                                                            <div class="timeline-step">
                                                                <div class="timeline-l-i">

                                                                    <span class="timeline-circle"></span></div>

                                                                <span class="timeline-text">Delivered</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 u-s-m-b-30">
                                                            <div class="timeline-step">
                                                                <div class="timeline-l-i">

                                                                    <span class="timeline-circle"></span></div>

                                                                <span class="timeline-text">DONE</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <span id="foods-list"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                                                <div class="dash__pad-3">
                                                    <h2 class="dash__h2 u-s-m-b-8">Shipping Address</h2>
                                                    <h2 class="dash__h2 u-s-m-b-8">${order.user.name}</h2>

                                                    <span class="dash__text-2">${order.shippingAddress}</span>

                                                    <span class="dash__text-2">${order.user.phoneNumber}</span>
                                                </div>
                                               
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="dash__box dash__box--bg-white dash__box--shadow u-h-100" id="dashbox-info">
                                                <div class="dash__pad-3">
                                                    <h2 class="dash__h2 u-s-m-b-8">Total Summary</h2>
                                                    <div class="dash-l-r u-s-m-b-8">
                                                        <div class="manage-o__text-2 u-c-secondary">Subtotal</div>
                                                        <div class="manage-o__text-2 u-c-secondary">${subtotal}</div>
                                                    </div>
                                                    <div class="dash-l-r u-s-m-b-8">
                                                        <div class="manage-o__text-2 u-c-secondary">Shipping Fee</div>
                                                        <div class="manage-o__text-2 u-c-secondary">${order.delivery.cost} VND</div>
                                                    </div>
                                                    <div class="dash-l-r u-s-m-b-8">
                                                        <div class="manage-o__text-2 u-c-secondary">Coupon Discount</div>
                                                        <div class="manage-o__text-2 u-c-secondary">${coupon_discount} VND</div>
                                                    </div>
                                                    <div class="dash-l-r u-s-m-b-8">
                                                        <div class="manage-o__text-2 u-c-secondary">Total</div>
                                                        <div class="manage-o__text-2 u-c-secondary">${total}</div>
                                                    </div>                                                
                                                    <span class="dash__text-2">Paid by Cash on Delivery</span>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>`

                                    let html = ``;
                                    for (let i = 0; i < order.foods.length;i++){

                                        let food = order.foods[i];

                                        html += `<div class="manage-o__description">
                                                    <div class="description__container">
                                                        <div class="description__img-wrap">

                                                            <img class="u-img-fluid" src="${food.orderProductPK.food.image}" alt=""></div>
                                                        <div class="description-title">${food.orderProductPK.food.name}</div>
                                                    </div>
                                                    <div class="description__info-wrap">
                                                        <div>

                                                            <span class="manage-o__text-2 u-c-silver">Quantity:

                                                                <span class="manage-o__text-2 u-c-secondary">${food.quantity}</span></span></div>
                                                        <div>

                                                            <span class="manage-o__text-2 u-c-silver">Total:

                                                                <span class="manage-o__text-2 u-c-secondary">${food.quantity * food.orderProductPK.food.price}</span></span></div>
                                                    </div>
                                                </div>`

                                    }
                                    document.getElementById("foods-list").innerHTML = html;
                                    if(order.status == "SHIPPING")

                                             document.getElementById("dashbox-info").innerHTML += `<div class="dash-l-r u-s-m-b-8">
                                                        <button class="btn btn--e-brand-b-2" style="padding: 15px 30px; font-size: 25px; border-radius: 10px" onclick="updateOrderStatus(${order.id})">RERCEIVED</button>
                                                    </div>`;
                                    else if(order.status == "PENDING" || order.status == "DOING")

                                        document.getElementById("dashbox-info").innerHTML += `<div class="dash-l-r u-s-m-b-8">
                                                        <button class="btn btn--e-brand-b-2" style="padding: 15px 30px; font-size: 25px; border-radius: 10px" onclick="cancelStatus(${order.id})">CANCEL</button>
                                                    </div>`;
                                    getStatusTimeLine(order.status)
    })
}

function getStatusTimeLine(status){
         if(status == "CANCEL") return
         let sts = ["PENDING","DOING","SHIPPING","DONE"];
         let index = sts.indexOf(status);
         let timeline = document.getElementsByClassName("timeline-l-i");
         for (let i = 0; i < index+1; i++){
              timeline[i].classList.add("timeline-l-i--finish");
         }
}

function getOrderStatusDashBox(orders){
         let orderPlaced = 0;
         let orderCancel = 0;
         for (let i = 0; i < orders.length; i++){
             console.log("i:"+orders[i].status)
             if(orders[i].status == "DONE")
                    orderPlaced++;
             if(orders[i].status == "CANCEL"){
                 console.log("VAODAY")
                 orderCancel++;
             }
             console.log(i)
         }
         html = `<div class="dash__pad-1">
                                            <ul class="dash__w-list">
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-1"><i class="fas fa-cart-arrow-down"></i></span>

                                                        <span class="dash__w-text">${orderPlaced}</span>

                                                        <span class="dash__w-name">Orders Placed</span></div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-2"><i class="fas fa-times"></i></span>

                                                        <span class="dash__w-text">${orderCancel}</span>

                                                        <span class="dash__w-name">Cancel Orders</span></div>
                                                </li>                                              
                                            </ul>
                                        </div>`
        document.getElementById("order-status").innerHTML = html;
}
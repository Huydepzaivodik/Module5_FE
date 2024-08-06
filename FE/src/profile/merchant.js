function showMerchantEdit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(user.roles[0].authority == "ROLE_MERCHANT") {
        document.getElementById("right-dashboard").innerHTML = `
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">Edit Merchant Profile</h1>
                                            <div class="dash__link dash__link--secondary u-s-m-b-30">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="dash-edit-p">
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="regm-name">Name *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="regm-name" placeholder="">
                                                            </div>
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label">Avatar *</label>
                                                                <img class="u-img-fluid u-d-block" id="image" style="width: 50px !important; height: 50px !important;">
                                                            </div>
                                                        </div>
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="regm-address">Address *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="regm-address" placeholder="">
                                                            </div>
                                                        </div>
                                                         <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="regm-otime">Opening Time *</label>
                                                                <input class="input-text input-text--primary-style" type="time" id="regm-otime" placeholder="">
                                                            </div>
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="regm-ctime">Closing Time *</label>
                                                                <input class="input-text input-text--primary-style" type="time" id="regm-ctime" placeholder="">
                                                            </div>
                                                        </div>
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <h2 class="dash__h2 u-s-m-b-8">E-mail</h2>
                                                                <span class="dash__text" id="regm-email"></span>                            
                                                            </div>
                                                            <div class="u-s-m-b-30">
                                                                <h2 class="dash__h2 u-s-m-b-8">Phone</h2>
                                                                <span class="dash__text" id="regm-phone"></span
                                                            </div>
                                                        </div>
                                                        <button class="btn btn--e-brand-b-2" onclick="saveMerchant()">SAVE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>     
                                  </div>     
       `
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }
        let id = currentUser.id;
        axios.get(`http://localhost:8080/merchant/edit/${id}`, auth).then(respone => {
            let data = respone.data;
            document.getElementById('regm-name').value = data.name;
            document.getElementById('regm-email').innerText = data.email;
            document.getElementById('regm-phone').innerText = data.phone;
            document.getElementById('regm-address').value = data.address;
            let otime = data.opening_time.slice(11, 16);
            document.getElementById('regm-otime').value = otime;
            let ctime = data.closing_time.slice(11, 16);
            document.getElementById('regm-ctime').value = ctime;
            document.getElementById('image').src = data.image;
        })
    }else{
        document.getElementById("right-dashboard").innerHTML = `
                 <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">YOU ARE NOT A MERCHANT, DO YOU WANT TO BE ONE OF US? <a onclick="showMerchantRegister()" style="color: red">GO TO MERCHANT REGISTER</a></h1>
                                            
                                    </div>     
                                  </div>            
        `
    }
}
function saveMerchant(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    let id = currentUser.id;
    let name = document.getElementById('regm-name').value;
    let opening_time = document.getElementById('regm-otime').valueAsDate;
    let closing_time = document.getElementById('regm-ctime').valueAsDate;
    let email = document.getElementById('regm-email').innerText;
    let address = document.getElementById('regm-address').value;
    let image = document.getElementById('image').src;
    let phone = document.getElementById('regm-phone').innerText;
    let shop = {
        name: name,
        address: address,
        opening_time: opening_time,
        closing_time: closing_time,
        email: email,
        image: image,
        phone: phone,
        user: {
            id: id
        }
    }
    axios.post(`http://localhost:8080/merchant/edit`,shop,auth).then((respone) => {
        alert("Sửa thành công")
    })
}
function addCoupon(){
         let amount  = +document.getElementById('discount-amount').value;
         let type = document.getElementById('coupon-type').value;
         console.log(amount )
         if(type == "percent" && (amount > 100 || amount < 1)){
            document.getElementById("discount-amount").style = "border: 1px solid red; width: 100%";
            document.getElementById("coupon-type").style = "border: 1px solid red; width: 100%";
            return;
         }
         let start = document.getElementById("start-date").valueAsDate;
         let end = document.getElementById("end-date").valueAsDate;
         if(end < start){
             document.getElementById("start-date").style = "border: 1px solid red; width: 100%";
             document.getElementById("end-date").style = "border: 1px solid red; width: 100%";
             return;
         }
         let quantity = document.getElementById("quantity-coupon").value
         if(quantity < 0){
             document.getElementById("quantity-coupon").style = "border: 1px solid red; width: 100%";
             return;
         }
         axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response)=>{
             let coupon = {
                        type: type,
                        status: true,
                        startDate: start,
                        endDate: end,
                        quantity: quantity,
                        discount: amount,
                        shop: response.data
             }
             axios.post("http://localhost:8080/coupons",coupon,getAuth()).then((response)=>{
                   alert("ADDING SUCCESS");
                   showCouponUI();
             })
         })
}
function showCouponAddForm(){
         document.getElementById("quick-look-body").innerHTML = `
                      <div class="row"><div class="col-lg-2"></div>
                                 <div class="col-lg-8">
                                      <button class="btn dismiss-button fas fa-times" type="button" data-dismiss="modal" style="color: black" id="close-coupon-modal"></button>   
                                 <h1 class="checkout-f__h1">CREATE COUPON</h1>                            
                                 <div class="checkout-f__delivery">
                                        <div class="u-s-m-b-30">
                                            
                                                  <div class="u-s-m-b-15">

                                                <label class="gl-label" for="billing-email">DISCOUNT AMOUNT *</label>

                                                <input class="input-text input-text--primary-style" type="text" id="discount-amount" data-bill="" style="width: 100%"></div>
                                           <div class="u-s-m-b-15">
                                            
                                                <label class="gl-label" for="coupon-type">TYPE *</label><select class="select-box select-box--primary-style" id="coupon-type" data-bill="" style="width: 100%">
                                                    <option selected value="">Choose Coupon Type</option>
                                                    <option value="percent">PERCENT</option>
                                                    <option value="minus">MINUS</option>
                                                </select>
                                                <!--====== End - Select Box ======-->
                                            </div>
                                                                                  
                                            <!--====== First Name, Last Name ======-->
                                          
                                                <div class="u-s-m-b-15">

                                                    <label class="gl-label" for="start-date">START DATE *</label>

                                                    <input class="input-text input-text--primary-style" type="date" id="start-date" data-bill="" style="width: 100%"></div>
                                                <div class="u-s-m-b-15">

                                                    <label class="gl-label" for="end-date">END DATE *</label>

                                                    <input class="input-text input-text--primary-style" type="date" id="end-date" data-bill="" style="width: 100%"></div>
                                          
                                            
                                            <div class="u-s-m-b-15">

                                                <label class="gl-label" for="billing-phone">QUANTITY *</label>

                                                <input class="input-text input-text--primary-style" type="text" id="quantity-coupon" data-bill="" style="width: 100%"></div>                                                              
                                            <div class="u-s-m-b-15">
                                                <button class="btn btn--e-transparent-brand-b-2" type="submit" style="width: 100%; height: 50px;" onclick="addCoupon()">SAVE</button></div>                                      
                                         </div>
                                 </div>             
                                 </div>
                                 <div class="col-lg-2"></div>
                                 </div>                                                                
         `
    document.getElementById("close-coupon-modal").onclick = function () {
             showCouponUI();
    }
}
let choosenCoupons ;
function chooseCoupon(row){
         choosenCoupons = row.cells[0].textContent;
         let table = document.getElementById("coupon-list");
         let rows = table.rows;
         for (let i = 1; i < rows.length; i++) {
              rows[i].style.backgroundColor = "transparent";
              rows[i].style.color = "#235ac5";
              rows[i].style.fontWeight = "normal";
         }
         row.style.backgroundColor = "#ff4500";
         row.style.color = "black"
         row.style.fontWeight = "700";
}
function getCouponList(){
    axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response)=>{
        axios.get(`http://localhost:8080/coupons/shop/${response.data.id}`,getAuth()).then((response)=>{
            let data = response.data;
            let html = ``;
            for (let i=0; i<data.length; i++){
                 let coupon = data[i];
                 let start = new Date(coupon.startDate)
                 let end  = new Date(coupon.endDate)
                 if(coupon.status == true)
                  html += `<tr style="height: 70px; color: #235ac5;" onclick="chooseCoupon(this)" >
                                            <td>${coupon.id}</td>
                                            <td>${coupon.discount}</td>
                                            <td>${coupon.type}</td>
                                            <td>${start.toDateString()}</td>
                                            <td>${end.toDateString()}</td>
                                            <td style="display: none">${coupon.status}</td>
                          </tr>`
                  else
                      html += `<tr style="height: 70px; display:none ; color: #235ac5;" onclick="chooseCoupon(this)" >
                                            <td>${coupon.id}</td>
                                            <td>${coupon.discount}</td>
                                            <td>${coupon.type}</td>
                                            <td>${start.toDateString()}</td>
                                            <td>${end.toDateString()}</td>
                                            <td style="display: none">${coupon.status}</td>
                          </tr>`
            }
            document.getElementById("coupon-list").innerHTML += html;
        })
    })
}
function deleteCoupon(){
         axios.delete(`http://localhost:8080/coupons/${choosenCoupons}`,getAuth()).then(function(response){
              showCouponUI();
         })
}
function editCoupon(id){
    let amount  = +document.getElementById('discount-amount').value;
    let type = document.getElementById('coupon-type').value;
    console.log(amount )
    if(type == "percent" && (amount > 100 || amount < 1)){
        document.getElementById("discount-amount").style = "border: 1px solid red; width: 100%";
        document.getElementById("coupon-type").style = "border: 1px solid red; width: 100%";
        return;
    }
    let start = document.getElementById("start-date").valueAsDate;
    let end = document.getElementById("end-date").valueAsDate;
    if(end < start){
        document.getElementById("start-date").style = "border: 1px solid red; width: 100%";
        document.getElementById("end-date").style = "border: 1px solid red; width: 100%";
        return;
    }
    let quantity = document.getElementById("quantity-coupon").value
    if(quantity < 0){
        document.getElementById("quantity-coupon").style = "border: 1px solid red; width: 100%";
        return;
    }
    axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response)=>{
        let coupon = {
            id: id,
            type: type,
            status: true,
            startDate: start,
            endDate: end,
            quantity: quantity,
            discount: amount,
            shop: response.data
        }
        axios.post("http://localhost:8080/coupons",coupon,getAuth()).then((response)=>{
            alert("ADDING SUCCESS");
            showCouponUI();
        })
    })
}
function showEditForm(){
    axios.get(`http://localhost:8080/coupons/${choosenCoupons}`,getAuth()).then(function(response){
        let coupon = response.data;
        document.getElementById("quick-look-body").innerHTML = `
                      <div class="row"><div class="col-lg-2"></div>
                                 <div class="col-lg-8">
                                      <button class="btn dismiss-button fas fa-times" type="button" data-dismiss="modal" style="color: black" id="close-coupon-modal"></button>   
                                 <h1 class="checkout-f__h1">CREATE COUPON</h1>                            
                                 <div class="checkout-f__delivery">
                                        <div class="u-s-m-b-30">
                                            
                                                  <div class="u-s-m-b-15">

                                                <label class="gl-label" for="billing-email">DISCOUNT AMOUNT *</label>

                                                <input class="input-text input-text--primary-style" type="text" id="discount-amount" data-bill="" style="width: 100%" value="${coupon.discount}"></div>
                                           <div class="u-s-m-b-15">
                                            
                                                <label class="gl-label" for="coupon-type">TYPE *</label>
                                                <select class="select-box select-box--primary-style" id="coupon-type" data-bill="" style="width: 100%">
                                                    <option selected value="">Choose Coupon Type</option>
                                                    <option value="percent">PERCENT</option>
                                                    <option value="minus">MINUS</option>
                                                </select>
                                                <!--====== End - Select Box ======-->
                                            </div>
                                                                                  
                                            <!--====== First Name, Last Name ======-->
                                          
                                                <div class="u-s-m-b-15">

                                                    <label class="gl-label" for="start-date">START DATE *</label>

                                                    <input class="input-text input-text--primary-style" type="date" id="start-date" data-bill="" style="width: 100%" value="${coupon.startDate}"></div>
                                                <div class="u-s-m-b-15">

                                                    <label class="gl-label" for="end-date">END DATE *</label>

                                                    <input class="input-text input-text--primary-style" type="date" id="end-date" data-bill="" style="width: 100%" value="${coupon.endDate}"></div>
                                          
                                            
                                            <div class="u-s-m-b-15">

                                                <label class="gl-label" for="billing-phone">QUANTITY *</label>

                                                <input class="input-text input-text--primary-style" type="text" id="quantity-coupon" data-bill="" style="width: 100%" value="${coupon.quantity}"></div>                                                              
                                            <div class="u-s-m-b-15">
                                                <button class="btn btn--e-transparent-brand-b-2" type="submit" style="width: 100%; height: 50px;" onclick="editCoupon()">SAVE EDIT</button></div>                                      
                                         </div>
                                 </div>             
                                 </div>
                                 <div class="col-lg-2"></div>
                                 </div>                                                                
         `
        document.getElementById('start-date').value = new Date(coupon.startDate).getMilliseconds();
        document.getElementById('end-date').value = new Date(coupon.endDate).getMilliseconds();
        document.getElementById('coupon-type').value = coupon.type.toLowerCase();
        document.getElementById("close-coupon-modal").onclick = function () {
            showCouponUI();
        }
    })
}
function sortCoupon(){
    let table = document.getElementById("coupon-list")
    const rows = table.getElementsByTagName('tr');
    let typeS = document.getElementById("type").value;
    if(typeS == "default") showCouponUI()
    let statusS = document.getElementById("status").value;
    for (let i = 1; i < rows.length; i++) {
        const typeCell = rows[i].getElementsByTagName('td')[2];
        const type = typeCell.textContent;
        const statusCell = rows[i].getElementsByTagName('td')[5];
        const status = statusCell.textContent;
        console.log("type: " + type + " status: " + status +" types +" + typeS + " statusS" + statusS)
        if (type.toUpperCase() == typeS.toUpperCase() && status.toUpperCase() == statusS.toUpperCase()) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}
function showCouponUI(){
        let type = "type"
        let status = "status"
        let html =  `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal--shadow">
                    <div class="modal-body" id="quick-look-body">
                        <div class="row">
                            <button class="btn dismiss-button fas fa-times" type="button" data-dismiss="modal" style="color: black" id="close-coupon-modal"></button>
                            <div class="col-lg-3" >
                                 <h4 style="text-align: center; padding: 20px; color: orangered" >COUPON MANAGE</h4>
                                 <div class="u-s-m-b-8">
                                      <button class="btn btn--e-white-brand" onclick="showCouponAddForm()" style="height: 40px; width: 100%; border: 1px solid #aaaaaa; background: tomato">CREATE NEW COUPON</button>
                                 </div>
                                 <div class="u-s-m-b-8">
                                      <button class="btn btn--e-white-brand" onclick="showEditForm()" style="height: 40px; width: 100%; border: 1px solid #aaaaaa; background: tomato">EDIT COUPON</button>
                                 </div>
                                 <div class="u-s-m-b-8">
                                      <button class="btn btn--e-white-brand" onclick="deleteCoupon()" style="height: 40px; width: 100%; border: 1px solid #aaaaaa; background: tomato" >DELETE COUPON</button>
                                 </div>
                                
                            </div>   
                            <div class="col-lg-9">
                                <div class="gl-inline">
                                      <div class="u-s-m-b-8" style="display: flex; align-content: center">
                                                     <label for="type" style="color: black">TYPE:</label>
                                                     <select class="select-box select-box--transparent-b-2" id="type" onchange="sortCoupon()" >
                                                        <option selected value="default">SELECT TYPE</option>
                                                        <option value="percent">PERCENT</option>
                                                        <option value="minus">MINUS</option>                                                     
                                 </select></div>
                                      <div class="u-s-m-b-8" style="display: flex; align-content: center">
                                                     <label for="status" style="color: black">STATUS:</label>
                                                     <select class="select-box select-box--transparent-b-2" id="status" onchange="sortCoupon()" >
                                                        <option selected value="true">SELECT STATUS</option>
                                                        <option value="false">DISABLE</option>
                                                        <option value="true">ENABLE</option>                                                     
                                 </select></div>
                                </div>
                                <div style="overflow: auto; height: 400px">
                                    <table style="width: 100%; border-collapse: collapse;" id="coupon-list"> 
                                    <thead> <tr style="color: black; font-weight: bold;">
                                            <td>ID</td>
                                            <td>DISCOUNT</td>
                                            <td>TYPE</td>
                                            <td>START DATE</td>
                                            <td>END DATE</td>
                                           </tr></thead>                                                                                                                                                                                           
                                    </table>
                                </div>
                                <!--====== End - Product Detail ======-->
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>      
         `
        getCouponList()
        if(document.getElementById("quick-look") == null){
                   document.getElementById("app-content").innerHTML +=`<div class="modal fade" id="quick-look">` + html + "</div>"
        }else{
            document.getElementById("quick-look").innerHTML = html;
        }
         document.getElementById("quick-look").style = "display: block; opacity: 1";
         document.getElementById("close-coupon-modal").onclick = function () {
             document.getElementById("quick-look").style = "display: none; opacity: 0";
         }
}
function chooseTypeStats(){
         let type = document.getElementById("stats-order-sort").value;
         console.log(type);
         getStatsUI(type);
}
function showProfitStats(){
         document.getElementById("app-content").innerHTML = `            
            <div class="u-s-p-b-60">
                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="dash">
                        <div >
                            <div class="row">
                                <div class="col-lg-3 col-md-12">
                                      <div class="o-summary__section u-s-m-b-30" style="margin-top: 50px;margin-left: 25px">
                                           <h3 style="text-align: center; font-size: 24px">BEST SELLER FOOD TODAY</h3>
                                           <div class="o-summary__item-wrap gl-scroll" id="o-summary" style="background: #9D9D9D; min-height: 500px; max-height: 500px; padding: 0; border: 1px solid black; overflow: auto">
                                                 <div class="o-card" style="background: #F8F0DF; margin: 0">
                                                    <div class="o-card__flex" style="color: black;width: 100% !important; font-weight: bolder">
                                                        <div class="o-card__info-wrap" style="width: 10%">
                                                            <span class="o-card__name">
                                                                NO</span>
                                                        </div>
                                                        <div class="o-card__info-wrap" style="width: 20%">
                                                            <span class="o-card__name">
                                                                IMAGE</span>
                                                        </div>
                                                        <div class="o-card__info-wrap" style="width: 35%">
                                                            <span class="o-card__name">
                                                                FOOD NAME</span>
                                                        </div>
                                                        <div class="o-card__info-wrap" style="width: 25%">
                                                            <span class="o-card__name">QUANTITY</span>
                                                        </div>
                                                    </div>
                                                 </div>
                                                 
                                            </div>
                                        </div>
                                        
                                </div>
                                <div class="col-lg-9 col-md-12">
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14" style="font-size: 34px;width: 100%;text-align: center">SHOP PROFIT</h1>
                                            <div class="m-order__select-wrapper" >
                                                    <label class="u-s-m-r-8" for="stats-order-sort">Show:</label>
                                                    <select class="select-box select-box--primary-style" id="stats-order-sort" onchange="chooseTypeStats()">
                                                        <option value="month" selected>In Month</option>
                                                        <option value="week">On Week</option>
                                                        <option value="quarter">In Quarter</option>
                                                        <option value="lastmonth">Last Month</option>                                                  
                                                    </select>
                                                </div>
                                            <div class="m-order u-s-m-b-30" style="display: flex; ">
                                                <div class="m-order__select-wrapper" id="orders-info" style="width: 100%">
                                                     
                                                </div>
                                            </div>
                                            <div class="m-order__list" >
                                                 <table id="stats-list" style="width: 100%">
                                                     <thead>
                                                         <span class="o-card__name" style="color: orangered; font-size: 24px; font-weight: bold">ORDERS</span>
                                                         
                                                       <tr style="text-align: center; font-weight: bold; color: #222222">
                                                            <td style="width: 25%; border: 1px solid black">ORDER ID</td>
                                                            <td style="width: 25%;  border: 1px solid black">DATE</td>
                                                            <td style="width: 25%;  border: 1px solid black">DELIVERY</td>
                                                            <td style="width: 25%;  border: 1px solid black">TOTAL</td>
                                                        </tr>
                                                     </thead>
                                                     <tbody style="overflow: auto; max-height: 800px" id="orders-list-stats">
                                                 </tbody> 
                                                 </table>                                                 
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
`
    let type = "month"
    getStatsUI(type)
}
function getStatsUI(type){
    axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response) =>{
        axios.get(`http://localhost:8080/orders/stats/${response.data.id}?type=${type}`,getAuth()).then(({data}) =>{
            let bestseller = data.bestseller;
            console.log(data.bestseller)
            let bestsellerHtml = "";
            for(let i = 0; i < bestseller.length; i++) {
                bestsellerHtml += `<div class="o-card" style="background: #9D9D9D; margin: 0">
                                                    <div class="o-card__flex" style="color: black;width: 100% !important;">
                                                        <div class="o-card__info-wrap" style="width: 10%">
                                                            <span class="o-card__name">
                                                                ${i+1}</span>
                                                        </div>
                                                        <div class="o-card__info-wrap" style="width: 20%">

                                                                <img src="${bestseller[i].image}" alt="" style="height: 50px; width: 50px">
                                                        </div>
                                                        <div class="o-card__info-wrap" style="width: 35%">
                                                            <span class="o-card__name">
                                                                ${bestseller[i].name}</span>
                                                        </div>
                                                        <div class="o-card__info-wrap" style="width: 25%">
                                                            <span class="o-card__name" style="text-align: center">${bestseller[i].quantity}</span>
                                                        </div>
                                                    </div>
                                                 </div>`
            }
            document.getElementById('o-summary').innerHTML = bestsellerHtml;

            let subtotal = data.subtotal;
            let totalCouponDiscount = data.coupon;
            let platformDiscount = data.platformDis;

            document.getElementById("orders-info").innerHTML = `<div class="m-order__get" style="background: orangered; border-radius: 25px; height: 150px; width: 100%">
                                                    <div class="manage-o__header u-s-m-b-30" style="border: none; display: flex; justify-content: space-around; color: whitesmoke; margin: 0 ">
                                                         <div>
                                                             <h3>PROFIT STATS</h3>
                                                         </div>
                                                    </div>
                                                    <div class="manage-o__header u-s-m-b-30" style="border: none;  color: whitesmoke; ">
                                                        <div class="dash-l-r" style="display: flex; justify-content: space-around">
                                                            <div style="text-align: center; width: 25%">
                                                                <div class="manage-o__text-2 " style="font-size: 18px">REVENUE</div>
                                                                <div class="manage-o__text " style="margin-top: 5px; font-size: 24px !important;">${String(subtotal).replace(/(.)(?=(\d{3})+$)/g, "$1.")}</div>
                                                            </div>
                                                            <div style="text-align: center; width: 25%">
                                                                <div class="manage-o__text-2 " style="font-size: 18px">TOTAL COUPON DISCOUNT</div>
                                                                <div class="manage-o__text " style="margin-top: 5px; font-size: 24px !important;">${String(totalCouponDiscount).replace(/(.)(?=(\d{3})+$)/g, "$1.")}</div>
                                                            </div>  
                                                            <div style="text-align: center; width: 25%">
                                                                <div class="manage-o__text-2 " style="font-size: 18px">PLATFORM DISCOUNT</div>
                                                                <div class="manage-o__text " style="margin-top: 5px; font-size: 24px !important;">${String(platformDiscount).replace(/(.)(?=(\d{3})+$)/g, "$1.")}</div>
                                                            </div>                                                            
                                                        </div>
                                                    </div>                                               
                                                </div>`
            console.log(data)
            let orders = data.orders;
            let fullHtml = "";
            for (let i = 0; i < orders.length; i++) {
                let order = orders[i];
                fullHtml += `       
                        <tr style="text-align: center;">
                           <td style="width: 25%;  border: 1px solid black">#${order.id}</td>
                           <td style="width: 25%;  border: 1px solid black">${new Date(order.date).toDateString() }</td>
                           <td style="width: 25%;  border: 1px solid black">${order.delivery.name}</td>
                           <td style="width: 25%;  border: 1px solid black">${order.total - order.delivery.cost}</td>
                        </tr>
                    `;
            }
            document.getElementById('orders-list-stats').innerHTML = fullHtml;

        })
    })
}

function showMerchantUI(){
         showMain()
         document.getElementById("nav-bar").innerHTML = `

                            <!--====== Menu ======-->
                            <div class="ah-lg-mode">
                                <span class="ah-close">✕ Close</span>
                                <!--====== List ======-->
                                <ul class="ah-list ah-list--design2 ah-list--link-color-secondary">

                                    <li>
                                        <a onClick="showOrder()"> ORDER MANAGER</a></li>
                                    <li>
                                        <a onClick="showFood()"> FOOD MANAGER</a></li>
                                    <li>
                                        <a onClick="showProfitStats()"> PROFIT STATS</a></li>
                                    <li>
                                        <a onclick="showCouponUI()">COUPON MANAGER</a></li>    
                                </ul>
                            
                                <!--====== End - List ======-->
                            </div>
                            <!--====== End - Menu ======-->
         `
        showOrder()
}

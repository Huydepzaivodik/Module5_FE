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
         for (let i = 0; i < rows.length; i++) {
              rows[i].style.backgroundColor = "transparent";
              rows[i].style.color = "#7f7f7f";
         }
         row.style.backgroundColor = "#ff4500";
         row.style.color = "black"
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
                 html += `<tr style="height: 70px;" onclick="chooseCoupon(this)">
                                            <td>${coupon.id}</td>
                                            <td>${coupon.discount}</td>
                                            <td>${coupon.type}</td>
                                            <td>${start.getUTCDate()}</td>
                                            <td>${end.getUTCDate()}</td>
                                            <td>${coupon.status}</td>
                          </tr>`
            }
            document.getElementById("coupon-list").innerHTML += html;
        })
    })
}
function showCouponUI(){
        let html =  `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal--shadow">
                    <div class="modal-body" id="quick-look-body">
                        <div class="row">
                            <button class="btn dismiss-button fas fa-times" type="button" data-dismiss="modal" style="color: black" id="close-coupon-modal"></button>
                            <div class="col-lg-3" style="border-right: 1px solid black">
                                 <h4 style="text-align: center; padding: 20px">COUPON MANAGE</h4>
                                 <div class="u-s-m-b-8">
                                      <button class="btn btn--e-white-brand" onclick="showCouponAddForm()" style="height: 40px; width: 100%; border: 1px solid #aaaaaa">CREATE NEW COUPON</button>
                                 </div>
                                 <div class="u-s-m-b-8">
                                      <button class="btn btn--e-white-brand" onclick="showCouponAddForm()" style="height: 40px; width: 100%; border: 1px solid #aaaaaa">EDIT COUPON</button>
                                 </div>
                                 <div class="u-s-m-b-8">
                                      <button class="btn btn--e-white-brand" onclick="showCouponAddForm()" style="height: 40px; width: 100%; border: 1px solid #aaaaaa">DELETE COUPON</button>
                                 </div>
                                
                            </div>   
                            <div class="col-lg-9">
                                <div class="gl-inline">
                                      <div class="u-s-m-b-8" style="display: flex; align-content: center">
                                                     <label for="type">TYPE:</label>
                                                     <select class="select-box select-box--transparent-b-2" id="type">
                                                        <option selected>SELECT TYPE</option>
                                                        <option>PERCENT</option>
                                                        <option>MINUS</option>                                                     
                                 </select></div>
                                      <div class="u-s-m-b-8" style="display: flex; align-content: center">
                                                     <label for="status">STATUS:</label>
                                                     <select class="select-box select-box--transparent-b-2" id="status">
                                                        <option selected>SELECT STATUS</option>
                                                        <option>DISABLE</option>
                                                        <option>ABLE</option>                                                     
                                 </select></div>
                                </div>
                                <div style="overflow: auto; height: 400px">
                                    <table style="width: 100%; border-collapse: collapse;" id="coupon-list"> 
                                    <thead> <tr>
                                            <td>ID</td>
                                            <td>DISCOUNT</td>
                                            <td>TYPE</td>
                                            <td>START DATE</td>
                                            <td>END DATE</td>
                                            <td>STATUS</td>
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
                                        <a onclick="showCouponUI()">COUPON MANAGER</a></li>    
                                </ul>
                            
                                <!--====== End - List ======-->
                            </div>
                            <!--====== End - Menu ======-->
         `
        showOrder()
}

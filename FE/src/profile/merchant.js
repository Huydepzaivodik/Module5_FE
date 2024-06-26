function showMerchantEdit() {
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
    axios.get(`http://localhost:8080/merchant/edit/${id}`,auth).then(respone => {
        let data = respone.data;
        document.getElementById('regm-name').value = data.name;
        document.getElementById('regm-email').innerText = data.email;
        document.getElementById('regm-phone').innerText = data.phone;
        document.getElementById('regm-address').value = data.address;
        let otime = data.opening_time.slice(11,16);
        document.getElementById('regm-otime').value = otime;
        let ctime = data.closing_time.slice(11,16);
        document.getElementById('regm-ctime').value = ctime;
        document.getElementById('image').src = data.image;
    })
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
<<<<<<< HEAD
    axios.post(`http://localhost:8080/merchant/edit`,shop,auth).then(respone => {
         alert("Sửa thành công")
=======
    console.log(shop);
    axios.post(`http://localhost:8080/merchant/edit`, shop, auth).then((respone) => {
        alert("Sửa thành công")
>>>>>>> origin/main
    })
}
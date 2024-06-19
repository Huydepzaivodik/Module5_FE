
function showMerchantEdit(){
    console.log("Merchant")
       showMenuOption();
       document.getElementById("right-dashboard").innerHTML = `
                                    <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">Edit Merchant Profile</h1>
                                            <div class="dash__link dash__link--secondary u-s-m-b-30">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <form class="dash-edit-p">
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="">Name *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="regm-name" placeholder="">
                                                            </div>
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="">Avatar *</label>
                                                                <input class="input-text input-text--primary-style" type="file" id="regm-image" placeholder="">
                                                            </div>
                                                        </div>
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="">Address *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="regm-address" placeholder="">
                                                            </div>
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="">Name *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="regm-name" placeholder="">
                                                            </div>
                                                        </div>
                                                         <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="">Opening Time *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="regm-otime" placeholder="">
                                                            </div>
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="">Closing Time *</label>
                                                                <input class="input-text input-text--primary-style" type="text" id="regm-ctime" placeholder="">
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
                                                        <button class="btn btn--e-brand-b-2" type="submit">SAVE</button>
                                                    </form>
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
        let data = respone.data();
        document.getElementById('regm-name').value = data.name;
        document.getElementById('regm-email').value = data.email;
        document.getElementById('regm-phone').value = data.phone;
        document.getElementById('regm-otime').value = data.opening_time;
        document.getElementById('regm-ctime').value = data.closing_time;
    }).catch(({response}) => {
        showMain();
    })
}
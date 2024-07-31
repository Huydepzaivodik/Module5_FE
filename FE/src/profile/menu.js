function showMenuOption(){
    document.getElementById("app-content").innerHTML = `
                           <div class="container">
                            <div class="gl-inline">
                                      <div class="col-lg-3 col-md-12">

                                    <!--====== Dashboard Features ======-->
                                    <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                                        <div class="dash__pad-1">

                                            <span class="dash__text u-s-m-b-16">Hello, John Doe</span>
                                            <ul class="dash__f-list">
                                                <li>
                                                    <a class="dash-active">Manage My Account</a></li>
                                                <li>
                                                    <a onclick="showMyProfile()">My Profile</a></li>
                                                <li>
                                                    <a onclick="showMyOrder()">My Orders</a></li>
                                                <li>
                                                    <a onclick="showMerchantEdit()">My Shop</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="dash__box dash__box--bg-white dash__box--shadow dash__box--w" id="order-status">
                                        
                                    </div>
                                    <!--====== End - Dashboard Features ======-->
                                </div>
                                <div class="col-lg-9 col-md-12" id="right-dashboard">
                                                                                     
                                </div>
                                </div>
                           </div>
    `
}
function showFormLogin() {
    showMain();
    document.getElementById("app-content").innerHTML = `  
  <!--====== Section 1 ======-->
            <div class="u-s-p-y-60">
                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="breadcrumb">
                            <div class="breadcrumb__wrap">
                                <ul class="breadcrumb__list">
                                    <li class="has-separator">

                                        <a href="#" onclick="showMain()">Home</a></li>
                                    <li class="is-marked">

                                        <a href="#">Signin</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--====== End - Section 1 ======-->


            <!--====== Section 2 ======-->
            <div class="u-s-p-b-60">

                <!--====== Section Intro ======-->
                <div class="section__intro u-s-m-b-60">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section__text-wrap">
                                    <h1 class="section__heading u-c-secondary">ALREADY REGISTERED?</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Intro ======-->


                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="row row--center">
                            <div class="col-lg-6 col-md-8 u-s-m-b-30">
                                <div class="l-f-o">
                                    <div class="l-f-o__pad-box">
                                        <h1 class="gl-h1">I'M NEW CUSTOMER</h1>

                                        <span class="gl-text u-s-m-b-30">By creating an account with our store, you will be able to move through the checkout process faster, store shipping addresses, view and track your orders in your account and more.</span>
                                        <div class="u-s-m-b-15">

                                            <a class="l-f-o__create-link btn--e-transparent-brand-b-2" onclick="showFormRegister()">CREATE AN ACCOUNT</a></div>
                                        <h1 class="gl-h1">SIGNIN</h1>

                                        <span class="gl-text u-s-m-b-30">If you have an account with us, please log in.</span>
                                        <div class="l-f-o__form">
                                            <div class="gl-s-api">
                                                <div class="u-s-m-b-15">

                                                    <button class="gl-s-api__btn gl-s-api__btn--fb" type="button"><i class="fab fa-facebook-f"></i>

                                                        <span>Signin with Facebook</span></button></div>
                                                <div class="u-s-m-b-15">

                                                    <button class="gl-s-api__btn gl-s-api__btn--gplus" type="button"><i class="fab fa-google"></i>

                                                        <span>Signin with Google</span></button></div>
                                            </div>
                                            <div class="u-s-m-b-30">
                                                 <b><span style="color: red;font-size: small" id="error-login-username"></span></b>
                                                <label class="gl-label" for="login-email">USER NAME *</label>

                                                <input class="input-text input-text--primary-style" type="text" id="login-username" placeholder="Enter User Name"></div>
                                            <div class="u-s-m-b-30">
                                                <b><span style="color: red;font-size: small" id="error-login-password"></span>
</b> 
                                                <label class="gl-label" for="login-password">PASSWORD *</label>

                                                <input class="input-text input-text--primary-style" type="password" id="login-password" placeholder="Enter Password"></div>
                                            <div class="gl-inline">
                                                <div class="u-s-m-b-30">

                                                    <button class="btn btn--e-transparent-brand-b-2"  onclick="login()">LOGIN</button></div>
                                                <div class="u-s-m-b-30">

                                                    <a class="gl-link" href="lost-password.html">Lost Your Password?</a></div>
                                            </div>
                                            <div class="u-s-m-b-30">

                                                <!--====== Check Box ======-->
                                                <div class="check-box">

                                                    <input type="checkbox" id="remember-me">
                                                    <div class="check-box__state check-box__state--primary">

                                                        <label class="check-box__label" for="remember-me">Remember Me</label></div>
                                                         <span style="color: red;font-size: medium" id="error-sign-up"></span>

                                                </div>
                                                
                                                <!--====== End - Check Box ======-->
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
            <!--====== End - Section 2 ======-->
        </div>
        <!--====== End - App Content ======-->
`;
}


function login() {

    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let check = true;
    if (username.trim() === "") {
        document.getElementById("error-login-username").innerHTML = "Please enter username";
        check = false;
    }
    if (password.trim() === "") {
        document.getElementById("error-login-password").innerHTML = "Please enter password";
        check = false;
    }

    if (check === true) {
        let user = {
            username: username,
            password: password
        }
        console.log(user)
        axios.post("http://localhost:8080/login", user).then(({data}) => {
            localStorage.setItem("currentUser", JSON.stringify(data));
            let role = getRole();
            console.log(role)
            if(role == "USER")
            showMain();
            else if(role == "MERCHANT")
            showMerchantUI();
        }).catch(({response}) => {
            document.getElementById("error-sign-up").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + '<b>Login failed !</b>';
        })
    }

}
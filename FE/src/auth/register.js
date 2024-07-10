function showFormRegister() {
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

                                        <a onclick="showMain()">Home</a></li>
                                    <li class="is-marked">

                                        <a href="signup.html">Signup</a></li>
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
                                    <h1 class="section__heading u-c-secondary">CREATE AN ACCOUNT</h1>
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
                                        <h1 class="gl-h1">PERSONAL INFORMATION</h1>
                                        <div class="l-f-o__form">                                                                                                                   
                                            <div class="gl-inline">      
                                             <div class="u-s-m-b-30">
                                               
                                                <label class="gl-label" for="reg-fname">FIRST NAME *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="reg-fname" placeholder="First Name">
                                                 <b><span id="error-reg-fname" style="font-size: small;color: red"></span></b></div>  
                                                                                                                                            
                                            <div class="u-s-m-b-30">
                                               
                                                <label class="gl-label" for="reg-lname">LAST NAME *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="reg-lname" placeholder="Last Name">
                                                 <b><span id="error-reg-lname" style="font-size: small;color: red"></span></b></div>
                                             </div>
                                            
                                            <div class="gl-inline">                                           
                                               <div class="u-s-m-b-30">    
                                              
                                                <label class="gl-label" for="reg-address">ADDRESS *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="reg-address" placeholder="Address">
                                                <b><span id="error-reg-address" style="font-size: small;color:red;"></span></b></div>                                              
                                             <div class="u-s-m-b-30">
                                                
                                                <label class="gl-label" for="reg-phone-number">PHONE NUMBER *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="reg-phone-number" placeholder="Phone Number">
                                                <b><span id="error-reg-phone-number" style="font-size: small;color: red"></span></b></div>                                              
                                            </div>   
                                                                                               
                                            <div class="gl-inline">                                           
                                                <div class="u-s-m-b-30">
                                                    <label class="gl-label" for="gender">GENDER</label><select class="select-box select-box--primary-style u-w-100" id="gender">
                                                        <option selected>Male</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>
                                                
                                               <div class="u-s-m-b-30">
                                               
                                                <label class="gl-label" for="reg-email">EMAIL *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="reg-email" placeholder="Email">
                                                 <b><span id="error-reg-email" style="font-size: small;color: red"></span></b></div>                                                                                                                                        
                                            </div>
                                            
                                            
                                            <div class="u-s-m-b-30">
                                                <label class="gl-label" for="reg-username">USER NAME *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="reg-username" placeholder="Enter User name">
                                                <b><span id="error-reg-username" style="font-size: small;color: red"></span></b>
</div>
                                            <div class="u-s-m-b-30">
                                             
                                                <label class="gl-label" for="reg-password">PASSWORD *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="reg-password" placeholder="Enter Password">
                                                <b><span id="error-reg-password" style="color: red;font-size: small"></span></b></div>
                                                
                                             <div class="u-s-m-b-30">
                                               
                                                <label class="gl-label" for="reg-cfPassword">CONFIRM PASSWORD *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="reg-cfPassword" placeholder="Re-Enter Password">
                                                 <b><span id="error-reg-cfPassword" style="font-size: small;color: red"></span></b></div>                                                                  
                                            <div class="u-s-m-b-15">
                                                <button class="btn btn--e-transparent-brand-b-2" type="submit" onclick="register()">CREATE</button></div>
                                                 <span id="error-sign-up" style="color: red;font-size: medium"></span>                               
                                            <a class="gl-link" onclick="showFormLogin()">Return to Login</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>
            <!--====== End - Section 2 ======-->`;
}
function showMerchantRegister(){
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

                                        <a href="index.html">Home</a></li>
                                    <li class="is-marked">

                                        <a href="signup.html">Signup</a></li>
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
                                    <h1 class="section__heading u-c-secondary">MERCHANT APPLICATION</h1>
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
                                        <h1 class="gl-h1">SHOP INFORMATION</h1>
                                        <div class="l-f-o__form>
                                        <div class="gl-inline">      
                                             <div class="u-s-m-b-30">
                                                <label class="gl-label" for="regm-image"> AVATAR IMAGE *</label>
                                                <input class="input-text input-text--primary-style" type="file" id="imageUpload" placeholder="Avatar image" onchange="uploadImage(event)">
                                              </div>
                                              <div class="u-s-m-b-30">
                                                <img id="imagePreview" src="" alt="Your Image" class="img-thumbnail rounded-circle" style="display:none; width: 300px; height: 400px; ">
                                            </div> 
                                         </div>                                                                                     
                                            <div class="gl-inline">      
                                             <div class="u-s-m-b-30">
                                                <label class="gl-label" for="regm-name"> NAME *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="regm-name" placeholder="Name">
                                                </div>
                                             </div>                                                                                              
                                            <div class="gl-inline">                                           
                                               <div class="u-s-m-b-30">
                                                <label class="gl-label" for="regm-address">ADDRESS *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="regm-address" placeholder="Address"></div>                                              
                                             <div class="u-s-m-b-30">
                                                <label class="gl-label" for="regm-phone-number">PHONE NUMBER *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="regm-phone-number" placeholder="Phone Number"></div>                                              
                                            </div>   
                                                                                               
                                            <div class="gl-inline">                                          
                                               <div class="u-s-m-b-30">
                                                <label class="gl-label" for="regm-email">EMAIL *</label>
                                                <input class="input-text input-text--primary-style" type="text" id="regm-email" placeholder="Email"></div>                                                                                                                                        
                                            </div>
                                            
                                            <div class="gl-inline">                                          
                                               <div class="u-s-m-b-30">
                                                   <label class="gl-label" for="regm-otime">OPENING TIME *</label>
                                                   <input class="input-text input-text--primary-style" type="time" id="regm-otime" placeholder="OPENING TIME">
                                               </div>
                                               <div class="u-s-m-b-30">
                                                   <label class="gl-label" for="regm-ctime">CLOSING TIME *</label>
                                                   <input class="input-text input-text--primary-style" type="time" id="regm-ctime" placeholder="CLOSING TIME">
                                               </div>                                                                                                                                        
                                            </div>                             
                                            <div class="u-s-m-b-15">
                                                <button class="btn btn--e-transparent-brand-b-2" type="submit" onclick="registerMerchant()">CREATE</button>
                                            </div>
                                            <a class="gl-link" onclick="showFormLogin()">Return Login</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Content ======-->
            </div>
            <!--====== End - Section 2 ======-->`;
}
function register() {
    let username = document.getElementById("reg-username").value;
    let email = document.getElementById("reg-email").value;
    let password = document.getElementById("reg-password").value;
    let confirmPassword = document.getElementById("reg-cfPassword").value;
    let firstName = document.getElementById("reg-fname").value;
    let lastName = document.getElementById("reg-lname").value;
    let phoneNumber = document.getElementById("reg-phone-number").value;
    let gender = document.getElementById("gender").value;
    let address = document.getElementById("reg-address").value;
    let name = firstName + " " + lastName;


    const passwordLengthRegex = /^.{6,}$/;
    let check = true;

    if (!passwordLengthRegex.test(password)) {
        document.getElementById("error-reg-password").innerHTML = 'At least 6 characters long';
        document.getElementById("error-reg-cfPassword").innerHTML = '';
        check = false;
    } else if (password !== confirmPassword) {
        document.getElementById("error-reg-cfPassword").innerHTML = 'Password equal confirm password ?';
        document.getElementById("error-reg-password").innerHTML = '';
        check = false;

    } else {
        document.getElementById("error-reg-password").innerHTML = '';
        document.getElementById("error-reg-cfPassword").innerHTML = '';
    }

    const nameRegex = /^[a-zA-Z0-9]+$/;
    if (!nameRegex.test(username)) {
        document.getElementById("error-reg-username").innerHTML = "Invalid User Name"
        check = false;
    } else {
        document.getElementById("error-reg-username").innerHTML = ""

    }

    if (!nameRegex.test(firstName)) {
        document.getElementById("error-reg-fname").innerHTML = "Invalid First Name";
        check = false;
    } else {
        document.getElementById("error-reg-fname").innerHTML = ""

    }

    if (!nameRegex.test(lastName)) {
        document.getElementById("error-reg-lname").innerHTML = "Invalid Last Name"
        check = false;
    } else {
        document.getElementById("error-reg-lname").innerHTML = ""

    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        document.getElementById("error-reg-email").innerHTML = "";
    } else {
        document.getElementById("error-reg-email").innerHTML = "Invalid Email";
        check = false;

    }

    const phoneRegex = /^\d{10,15}$/;

    if (phoneRegex.test(phoneNumber)) {
        document.getElementById("error-reg-phone-number").innerHTML = "";
    } else {
        document.getElementById("error-reg-phone-number").innerHTML = "Invalid Phone Number";
        check = false;
    }

    if (address.trim() === '') {
        document.getElementById("error-reg-address").innerHTML = 'Invalid Address';
        check = false;
    } else {
        document.getElementById("error-reg-address").innerHTML = '';
    }

    if (check === true) {
        let user = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            address: address,
            gender: gender,
            email: email,
            name: name,
            phoneNumber: phoneNumber
        }
        axios.post("http://localhost:8080/register", user).then(() => {
            alert("Đăng ký thành công!")
            showFormLogin();
        }).catch(({response}) => {
            document.getElementById("error-sign-up").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + '<b>Sign Up Failed !</b>';
        })
    }


}

function registerMerchant(){
         let name = document.getElementById("regm-name").value;
         let address = document.getElementById("regm-address").value;
         let email = document.getElementById("regm-email").value;
         let phone = document.getElementById("regm-phone-number").value;
         let image = localStorage.getItem("regm-image");
         let otime = document.getElementById("regm-otime").valueAsDate;
         console.log(otime)
         let ctime = document.getElementById("regm-ctime").valueAsDate;
         let user = JSON.parse(localStorage.getItem('currentUser'));
         let shop = {
             name: name,
             address: address,
             email: email,
             phone: phone,
             image: image,
             opening_time: otime,
             closing_time: ctime,
             user: {
                 id: user.id,
             }
         }
    axios.post("http://localhost:8080/merchant/register", shop).then(() => {
        alert("Đăng ký thành công!")
        showMain();
    }).catch((error) => {
    })

}
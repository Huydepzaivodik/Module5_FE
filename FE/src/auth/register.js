function showFormRegister() {
    document.getElementById("main").innerHTML = `<div class="d"  style="background-image: url('https://wallpapers.com/images/hd/food-4k-3gsi5u6kjma5zkj0.jpg');
">
    <div class="rectangle-parent">
        <img class="frame-child" alt="" src="https://play-lh.googleusercontent.com/eafAaAaJFqETPuSjnWXMR6E2iOqCxp4ekQHdY1OJ4UwVDHrd5BI8X1tUUBEtvRsyUa8" style="border-radius: 3px">
        <div class="frame-parent">
            <div class="sign-in-to-fasco-parent">
                <div class="sign-in-to"><b>Trưa Nay Ăn Gì?</b></div>
                <div class="frame-group">
                    <div class="image-939-parent">
                        <img class="image-939-icon" alt="" src="https://i.pinimg.com/564x/ce/59/e2/ce59e210c1e61eaccd1074f9701e847e.jpg">
                        <div class="sign-up-with">Sign up with Google</div>
                    </div>
                    <div class="image-939-parent">
                        <img class="image-940-icon" alt="" src="https://xneelo.co.za/help-centre/wp-content/uploads/2016/12/gmail-logo-1.png">
                        <div class="sign-up-with">Sign up with Email</div>
                    </div>
                </div>
            </div>
            <div class="rectangle-group">
                <div class="frame-item">
                </div>
                <b class="or">OR</b>
                <div class="frame-item">
                </div>
            </div>
            <div class="frame-container">
            <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="username" class="form-label"><b>User Name</b></label>
                  <input style="width: 100%" type="text" class="form-control" id="username" aria-describedby="emailHelp">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="password" class="form-label"><b>Password</b></label>
                  <input style="width: 100%" type="password" class="form-control" id="password">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="cfPassword" class="form-label"><b>Confirm Password</b></label>
                  <input style="width: 100%" type="password" class="form-control" id="cfPassword">
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="name" class="form-label"><b>Name</b></label>
                  <input style="width: 100%" type="text" class="form-control" id="name" aria-describedby="emailHelp">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="email" class="form-label"><b>Email</b></label>
                  <input style="width: 100%" type="text" class="form-control" id="email">
                </div>
                <div class="col-md-4 mb-3">
                  <label for="address" class="form-label"><b>Address</b></label>
                  <input style="width: 100%" type="text" class="form-control" id="address">
                </div>
            </div>
            
           
            <div class="col-md-12 mb-3">
               <label for="phoneNumber" class="form-label"><b>Phone Number</b></label>
               <input style="width: 100%" type="text" class="form-control" id="phoneNumber" aria-describedby="emailHelp">
            </div>
                                                
                <div class="frame-div">       
                    <div class="frame-parent1">
                    <span id="error-sign-up" style="color: red"></span>
                       <button class="sign-in-wrapper-register" onclick="signUp()">
                        <div class="sign-in" style="font-family: Poppins;font-size: 15px;color: cornflowerblue">Register</div>
                    </button>
                       <b>Already had account? <a href="#" style="text-decoration: none" onclick="showFormLogin()">Login</a></b>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`


}

function signUp() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let confirmPassword = document.getElementById('cfPassword').value;
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phoneNumber = document.getElementById('phoneNumber').value;

    let user = {
        username: username,
        password: password,
        email: email,
        confirmPassword: confirmPassword,
        name: name,
        address: address,
        phoneNumber: phoneNumber,
    }
    axios.post("http://localhost:8080/register", user).then(() => {
        alert("Đăng ký thành công!")
        showFormLogin();
    }).catch(({response}) => {
        document.getElementById("error-sign-up").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + '<b>Register failed !</b>';
    })

}
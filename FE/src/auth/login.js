showFormLogin();

function showFormLogin() {
    document.getElementById('main').innerHTML = `
<div class="d">
    <div class="rectangle-parent">
        <img class="frame-child" alt="" src="https://wallpapers.com/images/featured/food-4k-1pf6px6ryqfjtnyr.jpg" style="border-radius: 3px">
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
                    <div class="mb-3">
                        <label for="username" class="form-label"><b>User Name</b></label>
                        <input type="text" class="form-control" id="username" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label"><b>Password</b></label>
                        <input type="password" class="form-control" id="password">
                    </div>

                <div class="frame-div">
                 <span id="error-sign-up" style="color: red"></span>
                    <button class="sign-in-wrapper"  type="submit">
                        <div class="sign-in" style="font-family: Poppins;font-size: 15px;color: white" onclick="login()">Sign In</div>
                    </button>
                    <div class="frame-parent1">
                       <button class="sign-in-wrapper-register" onclick="showFormRegister()">
                        <div class="sign-in" style="font-family: Poppins;font-size: 15px;color: cornflowerblue">Register</div>
                    </button>
                        <b class="forget-password">Forget Password?</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = {
        username: username,
        password: password
    }
    axios.post("http://localhost:8080/login", user).then((response) => {
        let data = response.data;
        localStorage.setItem("currentUser", JSON.stringify(data));
        showHome();
    }).catch(({response}) => {
        document.getElementById("error-sign-up").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + '<b>Login failed !</b>';
    })
}


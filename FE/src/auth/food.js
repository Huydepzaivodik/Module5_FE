function showEdit(id){
    showMain();
    axios.get(`http://localhost:8080/foods/${id}`).then((response) => {
        let list = response.data;
        document.getElementById("app-content").innerHTML = `<!--====== Section 1 ======-->
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

                            <a href="dash-edit-profile.html">My Account</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!--====== End - Section 1 ======-->


<!--====== Section 2 ======-->
<div class="u-s-p-b-60">

    <!--====== Section Content ======-->
    <div class="section__content">
        <div class="dash">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-12">

                        <!--====== Dashboard Features ======-->
                        <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                            <div class="dash__pad-1">

                                <span class="dash__text u-s-m-b-16">Hello, John Doe</span>
                                <ul class="dash__f-list">
                                    <li>

                                        <a class="dash-active" href="dashboard.html">Manage My Account</a></li>
                                    <li>

                                        <a href="dash-my-profile.html">My Profile</a></li>
                                    <li>

                                        <a href="dash-address-book.html">Address Book</a></li>
                                    <li>

                                        <a href="dash-track-order.html">Track Order</a></li>
                                    <li>

                                        <a href="dash-my-order.html">My Orders</a></li>
                                    <li>

                                        <a href="dash-payment-option.html">My Payment Options</a></li>
                                    <li>

                                        <a href="dash-cancellation.html">My Returns & Cancellations</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                            <div class="dash__pad-1">
                                <ul class="dash__w-list">
                                    <li>
                                        <div class="dash__w-wrap">

                                            <span class="dash__w-icon dash__w-icon-style-1"><i class="fas fa-cart-arrow-down"></i></span>

                                            <span class="dash__w-text">4</span>

                                            <span class="dash__w-name">Orders Placed</span></div>
                                    </li>
                                    <li>
                                        <div class="dash__w-wrap">

                                            <span class="dash__w-icon dash__w-icon-style-2"><i class="fas fa-times"></i></span>

                                            <span class="dash__w-text">0</span>

                                            <span class="dash__w-name">Cancel Orders</span></div>
                                    </li>
                                    <li>
                                        <div class="dash__w-wrap">

                                            <span class="dash__w-icon dash__w-icon-style-3"><i class="far fa-heart"></i></span>

                                            <span class="dash__w-text">0</span>

                                            <span class="dash__w-name">Wishlist</span></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--====== End - Dashboard Features ======-->
                    </div>
                    <div class="col-lg-9 col-md-12">
                        <div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                            <div class="dash__pad-2">
                                <h1 class="dash__h1 u-s-m-b-14">Edit </h1>

                                <div class="dash__link dash__link--secondary u-s-m-b-30">

                                <div class="row">
                                    <div class="col-lg-12">
                                        <form class="dash-edit-p">
                                            <div class="gl-inline">
                                                <div class="u-s-m-b-30">

                                                    <label class="gl-label" for="reg-fname"> NAME *</label>

                                                    <input class="input-text input-text--primary-style" type="text" id="reg-fname" placeholder="Name" value="${list.name}"></div>
                                                <div class="u-s-m-b-30">

                                                    <label class="gl-label" for="reg-lname">Picture</label>

                                                    <input class="input-text input-text--primary-style" type="text" id="reg-lname" placeholder="Imgae" value="${list.image}"></div>
                                            </div>
                                            <div class="gl-inline">
                                                <div class="u-s-m-b-30">

                                                    <!--====== Date of Birth Select-Box ======-->

                                                    <span class="gl-label">QUANTITY AND PRICE</span>
                                                    <div class="gl-dob">

                                                        <input class="input-text input-text--primary-style" type="text" id="reg-nname" placeholder="Quantity" value="${list.quantity}">

                                                        <input class="input-text input-text--primary-style" type="text" id="reg-pname" placeholder="Price" value="${list.price}">
                                                    </div>
                                                    <!--====== End - Date of Birth Select-Box ======-->
                                                </div>
                                           
                                            </div>
                                            <div class="gl-inline">
                                            <div class="u-s-m-b-30">
                                             <label class="gl-label" for="reg-lname">Description</label>

                                            <input class="input-text input-text--primary-style" type="text" id="reg-iname" placeholder="Description" value="${list.description}">
                                            </div>
                                            </div>


                                            <button class="btn btn--e-brand-b-2" type="submit" onclick="edit(${list.id})">SAVE</button>
                                        </form>
                                    </div>
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
</div>`;

});
}



function edit(id) {
    let name = document.getElementById("reg-fname").value;
    let image = document.getElementById("reg-lname").value;
    let quantity = document.getElementById("reg-nname").value;
    let price = document.getElementById("reg-pname").value;
    let description = document.getElementById("reg-iname").value;

    let updatedFood = {
        name: name,
        image: image,
        quantity: quantity,
        price: price,
        description: description
    };

    console.log(updatedFood);

    axios.put(`http://localhost:8080/foods/${id}`, updatedFood).then(() => {
        // Handle the successful update
    });
}

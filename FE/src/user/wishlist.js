
    function showWishlist() {
    document.getElementById('app-content').innerHTML = `
                <div class="u-s-p-b-60">
                    <div class="section__intro u-s-m-b-60">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="section__text-wrap">
                                        <h1 class="section__heading u-c-secondary">WISHLIST</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section__content">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30" id="wishlist-container">
                                    
                                </div>
                                <div class="col-lg-12">
                                    <div class="route-box">
                                        <div class="route-box__g1">
                                            <a class="route-box__link" href="shop-side-version-2.html">
                                                <i class="fas fa-long-arrow-alt-left"></i>
                                                <span>CONTINUE SHOPPING</span>
                                            </a>
                                        </div>
                                        <div class="route-box__g2">
                                            <a class="route-box__link" onclick="clearWishlist()">
                                                <i class="fas fa-trash"></i>
                                                <span>CLEAR WISHLIST</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    getWishlist();
}

    function deleteFromWishlist(id) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser == null) return;
    let auth = {
    headers: {
    "Authorization": `Bearer ${currentUser.accessToken}`
}
};
    axios.get(`http://localhost:8080/user/foods/${id}`, auth).then((response) => {
    console.log(response.data);
    axios.post(`http://localhost:8080/wishlist/delete/${currentUser.id}`, response.data, auth).then((response) => {
    alert(response.data);
    showWishlist();
});
});
}

    function clearWishlist() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser == null) return;
    let auth = {
    headers: {
    "Authorization": `Bearer ${currentUser.accessToken}`
}
};
    axios.post('http://localhost:8080/wishlist/deleteAll', currentUser.id, auth).then((response) => {
    alert(response.data);
    showWishlist();
});
}

    function getWishlist() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser == null) return;
    let auth = {
    headers: {
    "Authorization": `Bearer ${currentUser.accessToken}`
}
};
    axios.get(`http://localhost:8080/wishlist/${currentUser.id}`, auth).then((response) => {
    let data = response.data;
    console.log(data.food);
    if (data.food.length == 0) {
    if (document.getElementById("wishlist-container") != null) {
    document.getElementById("wishlist-container").innerHTML = `
                            <div class="u-s-p-y-60">
                                <div class="section__content">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 u-s-m-b-30">
                                                <div class="empty">
                                                    <div class="empty__wrap">
                                                        <span class="empty__big-text">EMPTY</span>
                                                        <span class="empty__text-1">No items found in your wishlist.</span>
                                                        <a class="empty__redirect-link btn--e-brand" onclick="showFood()">CONTINUE SHOPPING</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
}  else
        document.getElementById("wishlist-container-mini").innerHTML = `
                        <div class="u-s-p-y-60">
                            <div class="section__content">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 u-s-m-b-30">
                                            <div class="empty">
                                                <div class="empty__wrap">
                                                    <span class="empty__big-text">EMPTY</span>
                                                    <span class="empty__text-1">No items found in your wishlist.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    return;
}
    let fullHtml = "";
    for (let i = 0; i < data.food.length; i++) {
    let food = data.food[i];
    fullHtml += `       
                        <div class="w-r u-s-m-b-30">
                                    <div class="w-r__container">
                                        <div class="w-r__wrap-1">
                                            <div class="w-r__img-wrap">

                                                <img class="u-img-fluid" src="${food.image}" alt=""></div>
                                            <div class="w-r__info">

                                                <span class="w-r__name">

                                                    <a onclick="showFoodDetail(${food.id})">${food.name}</a></span>

                                                <span class="w-r__price">${food.price}</span>

                                            </div>
                                        </div>
                                        <div class="w-r__wrap-2">

                                            <a class="w-r__link btn--e-brand-b-2" data-modal="modal" onclick="addTocart(${food.id})">ADD TO CART</a>

                                            <a class="w-r__link btn--e-transparent-platinum-b-2" onclick="showFoodDetail(${food.id})">VIEW</a>

                                            <a class="w-r__link btn--e-transparent-platinum-b-2" href="#" onclick="deleteFromWishlist(${food.id})">REMOVE</a></div>
                                    </div>
                                </div>
                    `;
    }
    document.getElementById("wishlist-container").innerHTML = fullHtml;
});
}


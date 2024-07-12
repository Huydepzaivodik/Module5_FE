
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
                                <div class="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                                    <div class="table-responsive">
                                        <table class="table-p">
                                            <tbody id="wishlist-container"></tbody>
                                        </table>
                                    </div>
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
    showMiniWishlist();
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
    showMiniWishlist();
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
    document.getElementById("wishlist-number").innerHTML = data.food.length;

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
                                                        <a class="empty__redirect-link btn--e-brand" href="shop-side-version-2.html">CONTINUE SHOPPING</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
}

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

    let miniHtml = "";
    for (let i = 0; i < data.food.length; i++) {
    let food = data.food[i];
    miniHtml += `
                        <div class="card-mini-product">
                            <div class="mini-product">
                                <div class="mini-product__image-wrapper">
                                    <a class="mini-product__link" href="product-detail.html">
                                        <img class="u-img-fluid" src="${food.image}" alt="">
                                    </a>
                                </div>
                                <div class="mini-product__info-wrapper">
                                    <span class="mini-product__category">
                                        <a href="shop-side-version-2.html">${food.description}</a>
                                    </span>
                                    <span class="mini-product__name">
                                        <a href="product-detail.html" onclick="showFoodDetail(${food.id})">${food.name}</a>
                                    </span>
                                    <span class="mini-product__quantity">1 x</span>
                                    <span class="mini-product__price">$${food.price}</span>
                                </div>
                            </div>
                            <a class="mini-product__delete-link far fa-trash-alt" onclick="deleteFromWishlist(${food.id})"></a>
                        </div>
                    `;
}
    document.getElementById("wishlist-container-mini").innerHTML = miniHtml;

    let fullHtml = "";
    for (let i = 0; i < data.food.length; i++) {
    let food = data.food[i];
    fullHtml += `
                        <tr>
                            <td>
                                <div class="table-p__box">
                                    <div class="table-p__img-wrap">
                                        <img class="u-img-fluid" src="${food.image}" alt="">
                                    </div>
                                    <div class="table-p__info">
                                        <span class="table-p__name">
                                            <a href="product-detail.html">${food.name}</a>
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="table-p__price">$${food.price}</span>
                            </td>
                            <td>
                                <div class="table-p__del-wrap">
                                    <a class="far fa-trash-alt table-p__delete-link" onclick="deleteFromWishlist(${food.id})"></a>
                                </div>
                            </td>
                        </tr>
                    `;
}
    document.getElementById("wishlist-container").innerHTML = fullHtml;
});
}


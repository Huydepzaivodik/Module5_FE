function showWishlist() {
    document.getElementById('app-content').innerHTML = `
        <!--====== App Content ======-->
        <div class="app-content">
            <!--====== Section 1 ======-->
            <div class="u-s-p-y-60">
                <div class="section__content">
                    <div class="container">
                        <div class="breadcrumb">
                            <div class="breadcrumb__wrap">
                                <ul class="breadcrumb__list">
                                    <li class="has-separator"><a href="#" onclick="showMain()">Home</a></li>
                                    <li class="is-marked"><a href="#" onclick="showWishlist()">Wishlist</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--====== End - Section 1 ======-->

            <!--====== Section 2 ======-->
            <div class="u-s-p-b-60">
                <div class="section__intro u-s-m-b-60">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section__text-wrap">
                                    <h1 class="section__heading u-c-secondary">Wishlist</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--====== End - Section Intro ======-->

                <!--====== Section Content ======-->
                <div class="section__content">
                    <div class="container">
                        <div class="row" id="wishlist-container">
                            <!-- Wishlist items will be dynamically added here -->
                        </div>
                        <div class="col-lg-12">
                            <div class="route-box">
                                <div class="route-box__g">
                                    <a class="route-box__link" href="shop-side-version-2.html">
                                        <i class="fas fa-long-arrow-alt-left"></i><span>CONTINUE SHOPPING</span>
                                    </a>
                                </div>
                                <div class="route-box__g">
                                    <a class="route-box__link" href="#" onclick="clearWishlist()">
                                        <i class="fas fa-trash"></i><span>CLEAR WISHLIST</span>
                                    </a>
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
    getWishlist();
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

        if (data.food.length === 0) {
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

        let html = "";
        for (let i = 0; i < data.food.length; i++) {
            let item = data.food[i];
            html += `
                <!--====== Wishlist Product ======-->
                <div class="w-r u-s-m-b-30">
                    <div class="w-r__container">
                        <div class="w-r__wrap-1">
                            <div class="w-r__img-wrap">
                                <img class="u-img-fluid" src="${item.image}" alt="">
                            </div>
                            <div class="w-r__info">
                                <span class="w-r__name">
                                    <a href="product-detail.html?id=${item.id}">${item.name}</a>
                                </span>
                                <span class="w-r__category">
                                    <a href="shop-side-version-2.html">${item.description}</a>
                                </span>
                                <span class="w-r__price">$${item.price}</span>
                            </div>
                        </div>
                        <div class="w-r__wrap-2">
                            <a class="w-r__link btn--e-brand-b-2" href="#" onclick="addToCart(${item.id})">ADD TO CART</a>
                            <a class="w-r__link btn--e-transparent-platinum-b-2" href="pd-detail" onclick="showFoodDetail(${item.id})">VIEW</a>
                            <a class="w-r__link btn--e-transparent-platinum-b-2" href="#" onclick="deleteFromWishlist(${item.id})">REMOVE</a>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById("wishlist-container").innerHTML = html;
    }).catch(error => {
        console.error('Error fetching wishlist:', error.response ? error.response.data : error.message);
    });
}

function deleteFromWishlist(id) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser == null) return;

    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    };

    axios.post(`http://localhost:8080/wishlist/delete/${currentUser.id}`, { foodId: id }, auth)
        .then((response) => {
            alert(response.data);
            showWishlist();
        })
        .catch(error => {
            console.error('Error deleting item from wishlist:', error.response ? error.response.data : error.message);
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

    axios.post(`http://localhost:8080/wishlist/clear/${currentUser.id}`, {}, auth)
        .then((response) => {
            alert(response.data);
            showWishlist();
        })
        .catch(error => {
            console.error('Error clearing wishlist:', error.response ? error.response.data : error.message);
        });
}
function showEdit(id) {
    // showFood();
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    axios.get(`http://localhost:8080/foods/${id}`, auth).then((response) => {
        let food = response.data;
        console.log(food)
        document.getElementById("shop-p__collection").innerHTML = `<div class="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                <input type="hidden" name="" id="shop-id" value="${food.shop.id}">
                                        <div class="dash__pad-2">
                                            <h1 class="dash__h1 u-s-m-b-14">Edit Food </h1>
                                            <div class="dash__link dash__link--secondary u-s-m-b-30">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="dash-edit-p">
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-name">Food Name </label>
                                                                <input class="input-text input-text--primary-style" type="text" id="food-name"  placeholder="" value="${food.name}">
                                                                <span id="food-name-error" style="font-size: small;color: red"></span>
                                                            </div>
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label">Image</label>
                                                                <img class="u-img-fluid u-d-block" id="food-image" src="${food.image}" style="width: 200px !important; height: 200px !important;">
                                                            </div>
                                                        </div>
                                                        <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-description">Description</label>
                                                                <textarea class="input-text input-text--primary-style" type="text" id="food-description" placeholder="" >${food.description}</textarea>
                                                                <span id="food-description-error" style="font-size: small;color: red"></span>
                                                            </div>
                                                        </div>
                                                        
                                                         <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-price">Price</label>
                                                                <input class="input-text input-text--primary-style" type="number" id="food-price" placeholder="" value="${food.price}">
                                                                <span id="food-price-error" style="font-size: small;color: red"></span>                                                           
                                                            </div>
                                                        </div>
                                                        
                                                         <div class="gl-inline">
                                                            <div class="u-s-m-b-30">
                                                                <label class="gl-label" for="food-quantity">Quantity</label>
                                                                <input class="input-text input-text--primary-style" type="number" id="food-quantity" placeholder="" value="${food.quantity}">
                                                                <span id="food-quantity-error" style="font-size: small;color: red"></span>                                                                                                             
                                                            </div>
                                                        </div>
                                                         <button class="btn btn--e-brand-b-1" onclick="showFood()" >Back Food List</button>
                                                        <button class="btn btn--e-brand-b-2" style="margin-left: 680px" onclick="edit(${food.id})">SAVE</button>
                                                                                                             
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>     
                                  </div>     `;

    });
}

function edit(id) {
    let name = document.getElementById("food-name").value;
    let image = document.getElementById("food-image").src;
    let quantity = document.getElementById("food-quantity").value;
    let price = document.getElementById("food-price").value;
    let description = document.getElementById("food-description").value;
    let check = true;


    if (name.trim() === "") {
        document.getElementById("food-name-error").innerHTML = "Not Empty !"
        check = false;
    } else {
        document.getElementById("food-name-error").innerHTML = ""

    }

    if (description.trim() === "") {
        document.getElementById("food-description-error").innerHTML = "Not Empty !"
        check = false;
    } else {
        document.getElementById("food-description-error").innerHTML = ""

    }

    if (check === true) {

        let shop_id = document.getElementById("shop-id").value;
        let updatedFood = {
            name: name,
            image: image,
            quantity: quantity,
            price: price,
            description: description,
            shop: {
                id: shop_id
            }
        };

        console.log(updatedFood);

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let auth = {
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }

        axios.put(`http://localhost:8080/foods/${id}`, updatedFood, auth).then(() => {
            alert("Update Successfully !")
            showFood();
        });
    }


}
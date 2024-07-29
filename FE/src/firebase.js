function uploadImage(e) {
    let fbBucketName = 'images';
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            localStorage.setItem('regm-image', downloadURL);
            document.getElementById('imagePreview').src = downloadURL;
            document.getElementById('imagePreview').style.display = 'block';
        });
}
function getShop(){
         axios.get(`http://localhost:8080/merchant/shop/${getUser().id}`,getAuth()).then((response)=>{
                  return response.data.id;
         })
}
function getUser(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser;
}
function getAuth(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let auth = {
        headers: {
            "Authorization": `Bearer ${currentUser.accessToken}`
        }
    }
    return auth;
}
function getRole(){
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user == null) return null;
    if(user.roles[0].authority == "ROLE_USER") {
        return "USER";
    }else if(user.roles[0].authority == "ROLE_ADMIN") {
        return "ADMIN";
    }else if(user.roles[0].authority == "ROLE_MERCHANT") {
        return "MERCHANT";
    }
}

let role = getRole();
console.log(role)
if(role == null || role == "USER") showMain();
else if(role == "MERCHANT") showMerchantUI();
else if(role == "ADMIN") console.log("admin");
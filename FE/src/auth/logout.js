function logout() {
    localStorage.removeItem("currentUser");
    showMain();

}
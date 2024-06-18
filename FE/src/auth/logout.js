function logout() {
    localStorage.removeItem("auth");
    showMain();

}
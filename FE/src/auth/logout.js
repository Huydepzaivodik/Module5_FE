function logout() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("currentUser");
        showMain();
    }

}
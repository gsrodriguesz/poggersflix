window.addEventListener("load", () => {
    document.getElementById("wrapper").style.display = "none"
})

function showNav() {
    let navElement = document.getElementById("navContent")
    if (navElement.style.display == 'none') {
        navElement.style.display = 'flex'
    } else {
        navElement.style.display = 'none'
    }
}

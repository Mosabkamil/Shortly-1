const navIconElement = document.querySelector(".bars-model");
const navBarElement = document.getElementById("navBar")


navIconElement.onclick = function(e){
    navBarElement.classList.toggle("block");
}
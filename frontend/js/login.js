const roleSelect = document.getElementById("roleSelect");
const adminForm = document.getElementById("adminForm");

roleSelect.addEventListener("change",function(){

if(this.value === "admin"){
adminForm.classList.remove("hidden");
}
else if(this.value === "student"){
window.location.href = "student.html";
}
else{
adminForm.classList.add("hidden");
}

});
const name=document.getElementById("name");
 const surname=document.getElementById("surname");
 const email=document.getElementById("mail");
 const password=document.getElementById("password");
 const confirm_password=document.getElementById("confirm_password");
const togglePasswordButtons = document.querySelectorAll(".toggle-password");
togglePasswordButtons.forEach(button => {
    button.addEventListener("click", function() {   
        const targetId = this.getAttribute("data-target");
        const targetInput = document.getElementById(targetId);
        if (targetInput.type === "password") {
            targetInput.type = "text";
            this.textContent = "Hide";
        } else {
            targetInput.type = "password";
            this.textContent = "Show";
        }
    });
});



showpassword.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash");;
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

});

if(email.value.includes("@")){
    alert("valid email");

    if (!/^\d{10}$/.test(number.value.trim())) {
        formMessage.textContent = "Number must be exactly 10 digits.";
    }
    return;
    
}

 const number=document.getElementById("number");
if(number.value.length!==10){
    alert("invalid number");
}else{
    alert("valid number");
}

const button=document.getElementById("create_account");
button.addEventListener("click",function(){
    if(name.value==="" || surname.value==="" || number.value==="" || mail.value==="" || password.value==="" || confirm_password.value===""){
        alert("please fill in all fields");
    }else{
        alert("account created successfully");
    }

    if(password.value.length<8){
       alert("password must be at least 8 characters long");
    }else{
      alert("valid password");
   }   

   if(password.value!==confirm_password.value){
    alert("passwords do not match");
    }else{
    alert("account created successfully");
    }
});

function setFieldState(input){
    input.classList.add("error");
    input.classList.remove("success");
    if (input.value.trim() === "") {
        input.classList.add("error");
        input.classList.remove("success");
    } else {
        input.classList.remove("error");
        input.classList.add("success");
    }
}

if(name.input.value.trim() === ""||
 surname.input.value.trim() === "" ||
  number.input.value.trim() === "" || 
  mail.input.value.trim() === "" || 
  password.input.value.trim() === "" ||
  confirm_password.input.value.trim() === ""){
    alert("please fill in all fields");
    forMessage.classList.remove("success");
    if(!validateForm()){
        formMessage.textContent = "Please fill in all fields.";
        return;
    }
  }
setTimeout(function(){
    window.location.href = "home.html";
},5000);


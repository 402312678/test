setInterval(() => {
    const name = document.querySelector('input[type="text"]').value;
    const surname = document.querySelectorAll('input[type="text"]')[1].value;
    const number = document.querySelectorAll('input[type="text"]')[2].value;
    const email = document.querySelectorAll('input[type="text"]')[3].value;
    const password = document.querySelector('input[type="password"]').value;    
    if(name === "" || surname === "" || number === "" || email === "" || password === ""){
        alert("please fill in all fields");
    }else{
        alert("welcome to home page");
    }
}
, 5000);
    

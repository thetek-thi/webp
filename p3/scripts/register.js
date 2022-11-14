
//document.getElementById("register").addEventListener("submit", checkForm);
 // TODO: Username existiert schon fehlt noch 
 // TODO: Einfügen in main.js




function checkUser() {
    var username = document.register.username.value;
    let status = false;
    if (username.length <= 3) {
        //alert("Der gewählte Nutzername ist zu kurz, er muss mindestens 3 Zeichen lang sein.");
        console.log("Nutzername ist zu kurz")
        document.getElementById("username").style.borderColor = "red";
        document.getElementById("username").style.borderWidth = "3px";
    } else {
        document.getElementById("username").style.borderColor = "green";
        document.getElementById("username").style.borderWidth = "3px";
        status = true;
    }
    return status;
}

//if (xmlhttp.status == 204){

function checkPassword() {
    var password = document.register.password.value;
    let status = false;
    if (password.length < 8) {
        //alert("Passwortlänge muss mindestens 8 Zeichen betragen.");
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("password").style.borderWidth = "3px";
    } else {
        document.getElementById("password").style.borderWidth = "3px";
        document.getElementById("password").style.borderColor = "green";
        status = true;
    }
    return status;
}
function checkConfirm() {
    var confirmPassword = document.register.confirmPassword.value;
    let status = false;
    password = document.register.password.value;
    if (password !== confirmPassword) {
        //alert("Die Passwörter stimmen nicht überein!");
        document.getElementById("confirmPassword").style.borderWidth = "3px";
        document.getElementById("confirmPassword").style.borderColor = "red";
    } else {
        document.getElementById("confirmPassword").style.borderColor = "green";
        document.getElementById("confirmPassword").style.borderWidth = "3px";
        status = true;
    }
    return status;
}

function submission(){
    let status = false;
    
    if( checkPassword() && checkUser() && checkConfirm()){
        status = true;
    }
    else{
        alert("Es sind noch Eingaben ungültig:")
    }
    return status;
}


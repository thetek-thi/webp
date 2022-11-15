
//document.getElementById("register").addEventListener("submit", checkForm);
// TODO: Username existiert schon fehlt noch 
// TODO: Einfügen in main.js




//function checkUser() {
//    var username = document.register.username.value;
//    let status = false;
//    console.log()
//    if ((username.length < 3) || (checkUserExistence() == false)) {
//        //alert("Der gewählte Nutzername ist zu kurz, er muss mindestens 3 Zeichen lang sein.");
//        console.log("Nutzername ist zu kurz oder Name gibt es schon")
//    } else {
//        status = true;
//    }
//    return status;
//}

function checkUserExistence() {
    var username = document.register.username.value;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 204) {
                console.log("Exists");
                document.getElementById("username").style.borderColor = "red";
                document.getElementById("username").style.borderWidth = "3px";
            } else if (xmlhttp.status == 404) {
                if(username.length <3){
                document.getElementById("username").style.borderColor = "red";
                document.getElementById("username").style.borderWidth = "3px";
                } else{
                document.getElementById("username").style.borderColor = "green";
                document.getElementById("username").style.borderWidth = "3px";
                }
                console.log("Does not exist");
            }
        }
        //console.log(xmlhttp.status);
    };

    xmlhttp.open("GET", "https://online-lectures-cs.thi.de/chat/" + window.chatCollectionId + "/user/" + username, true);
    // console.log("https://online-lectures-cs.thi.de/chat/" + window.chatCollectionId +"/user/" + username);
    // console.log(xmlhttp);
    xmlhttp.send();
}

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

function submission() {
    let status = false;

    if (checkPassword() && checkUser() && checkConfirm() && checkUserExistence()) {
        status = true;
    }
    else {
        alert("Es sind noch Eingaben ungültig:")
    }
    return status;
}


/*
 * TODO auslagern (??)
 *
 * COLLECTION ID
 *  - 288e633a-bebc-4bcc-80b8-4d6f4226b644
 *
 * USER TOM
 *  - uname: Tom
 *  - pw: c3f39e8d
 *  - token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjY3ODk5NDExfQ.XIPoLdoBdBDzM13ivyXFrCEgXlg1CBOcxrYVPIDrUO8
 *
 * USER JERRY
 *  - uname: Jerry
 *  - pw: 74bd67be
 *  - token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSmVycnkiLCJpYXQiOjE2Njc4OTk0MTF9.fJVvhRn2Wpme--QuNtBk623ff3ES-nZOUwI6PBu9Qyg
 */


var akt_fl; // aktuelle Freundesliste
document.getElementById("form1").addEventListener("submit", handleForm);

function loadUsers() {
    var xmlhttp = new XMLHttpRequest();
    var dataliste;
    xmlhttp.onreadystatechange = function () {
        let data;
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            data = JSON.parse(xmlhttp.responseText);
            akt_fl = data;

            dataliste = document.getElementById('listoffriends');
            data.forEach(element => {
                let listopt = document.createElement('option');
                listopt.innerHTML = element;
                dataliste.appendChild(listopt);
            });
            document.body.appendChild(dataliste);
        }
    }
    xmlhttp.open("GET", "https://online-lectures-cs.thi.de/chat/cb52a772-0dd5-42d7-a36a-38fe68da2144/user", true);
    // Add token, e. g., from Tom
    xmlhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjY4MjY0NjMzfQ.cjMRSUi5outdsogKBhoajZqqfCDhlHZXFt61o0l1FlA');
    xmlhttp.send();
}

function handleForm(event) {
    let myForm = event.target;
    let formData = new FormData(myForm);
    let eingabe;

    for (let key of formData.keys()) {
        console.log(key, formData.get(key));
        eingabe = formData.get(key);
    }

    if (pruefen(akt_fl, eingabe)) {
        alert("Passt");
    } else {
        event.preventDefault();
        alert("passt nicht");
    }
}

function pruefen(array, eingabe) {
    for (let data of array) {
        if(data == eingabe) {
            return true; 
        }
    return false;
    }
}
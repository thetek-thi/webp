var akt_fl; // aktuelle Freundesliste
document.getElementById("form1").addEventListener("submit", handleForm);

function loadUsers() {
    var xmlhttp = new XMLHttpRequest();
    var dataliste;
    xmlhttp.onreadystatechange = function () {
        let data;
        let input = document.getElementById('friendinput').value
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            data = JSON.parse(xmlhttp.responseText);
            akt_fl = data;

            dataliste = document.getElementById('listoffriends');
            while (dataliste.lastChild) dataliste.removeChild(dataliste.lastChild)
            data.forEach(element => {
                if (!element.toLowerCase().startsWith(input.toLowerCase())) return;
                let listopt = document.createElement('option');
                listopt.innerHTML = element;
                dataliste.appendChild(listopt);
            });
        }
    }
    xmlhttp.open("GET", `https://online-lectures-cs.thi.de/chat/${window.chatCollectionId}/user`, true);
    // Add token, e. g., from Tom
    xmlhttp.setRequestHeader('Authorization', `Bearer ${window.chatToken}`);
    xmlhttp.send();
}

function handleForm(event) {
    let eingabe = document.getElementById('friendinput').value;

    if (akt_fl.includes(eingabe)) {
        alert("Passt");
    } else {
        event.preventDefault();
        alert("passt nicht");
    }
}

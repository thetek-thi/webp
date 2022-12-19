var akt_fl; // aktuelle Freundesliste
// document.getElementById("form1").addEventListener("submit", handleForm);

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
                if (element.toLowerCase().startsWith(input.toLowerCase())) {
                    let listopt = document.createElement('option');
                    listopt.innerHTML = element;
                    dataliste.appendChild(listopt);
                }
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

const updateFriends = async () => {
  await fetch(`${window.chatServer}/${window.chatCollectionId}/friend`, {
    headers: { Authorization: `Bearer ${window.chatToken}` },
  }).then(res => res.json())
    .then(async (friends) => {
      await fetch(`${window.chatServer}/${window.chatCollectionId}/unread`, {
        headers: { Authorization: `Bearer ${window.chatToken}` },
      }).then(res => res.json())
        .then(unread => {
          let res = ''
          for (const i in friends) {
            if (friends[i]['status'] !== 'accepted')
              continue
            let m = '?'
            for (const j of Object.keys(unread))
              if (j === friends[i]['username'])
                m = unread[j]
            res += `<li><a href="../chat?user=${friends[i]['username']}">${friends[i]['username']}<span style="float:right;">(${m})</span></a></li>`
          }
          document.getElementById('addfriendshere').innerHTML = res
        })
    })
}

window.onload = () => {
  updateFriends()
  window.setInterval(async () => {
    updateFriends()
  }, 2000)
}

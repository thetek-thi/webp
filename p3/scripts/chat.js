let chatview
let messages = []

const getChatMessages = async () => {
  const username = 'Jerry'
  let ret
  await fetch(`${window.chatServer}/${window.chatCollectionId}/message/${username}`, {
    headers: { Authorization: `Bearer ${window.chatToken}` }
  }).then(res => ret = res.json())
  return ret
}

const updateMessages = async () => {
  let newmessages = await getChatMessages()
  /* optimization: since chat messages cannot change or get deleted in this api,
     the chat view does not need to be updated when the length of the array does
     not need to be updated. */
  if (newmessages.length != messages.length) {
    messages = newmessages
    const now = new Date()
    while (chatview.lastChild)
      chatview.removeChild(chatview.lastChild)
    for (const msg of messages) {
      const msgElem = document.createElement('p')
      const time = new Date(msg.time)
      // i hate the js date api
      let timefmt = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}` == `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
        ? `${(time.getHours() < 10 ? '0' : '') + time.getHours()}:${(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}:${(time.getSeconds() < 10 ? '0' : '') + time.getSeconds()}`
        : `${time.getFullYear()}-${(time.getMonth() < 10 ? '0' : '') + time.getMonth()}-${(time.getDate() < 10 ? '0' : '') + time.getDate()} &nbsp; ${(time.getHours() < 10 ? '0' : '') + time.getHours()}:${(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}:${(time.getSeconds() < 10 ? '0' : '') + time.getSeconds()}`
      msgElem.innerHTML = `<b>${msg.from}</b>: ${escapeHtml(msg.msg)} &nbsp; <small class="timelabel">${timefmt}</small>`
      chatview.appendChild(msgElem)
    }
  }
}

const sendMessage = (message, to) => {
  fetch(`${window.chatServer}/${window.chatCollectionId}/message`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${window.chatToken}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ message, to })
  })
}

const sendMessageHandler = (e) => {
  const msginput = document.getElementById('msginput')
  const msg = msginput.value
  sendMessage(msg, 'Jerry')
  msginput.value = ''
}

const escapeHtml = (str) => {
  return new Option(str).innerHTML
}

window.onload = () => {
  chatview = document.getElementById('chatview')
  window.setInterval(() => {
    updateMessages()
  }, 1000)
}

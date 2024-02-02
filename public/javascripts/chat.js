function name(data){
    document.querySelector('.name').innerHTML = '';
    const ul = document.createElement('ul');
    data.forEach(element => {
        ul.innerHTML += `<li class='ns' ns=${element.nsTitle}><img src=${element.img}>${element.nsTitle}</li>`
    });
    document.querySelector('.name').appendChild(ul);

    Array.from(document.querySelectorAll('.ns')).forEach(item => {
        item.addEventListener('click', connectNamespace)
    })
}

let ns;
function connectNamespace(event){
    ns = event.target.getAttribute('ns');
    ns = io(`http://localhost:3000/${ns}`);

    ns.on('data', (data) => {
 
        room(data)
    })
    ns.on('message', message => {
       let ul = document.querySelector('.board');
       ul.innerHTML += `<li>${message}</li>`
    })
    return;
}


function room(data){
    document.querySelector('.inner-room').innerHTML = '';
    const ul = document.createElement('ul');
    
    data.forEach(item => {
        ul.innerHTML += `<li class='rooms'><img src="/images/room.png" style="width: 22px;">${item.roomTitle}</li>`
    })
    document.querySelector('.inner-room').append(ul);

    Array.from(document.querySelectorAll('.rooms')).forEach(item => {
        item.addEventListener('click', joinRoom)
    })
    return;
}

function joinRoom(event){
    let roomName = event.target.textContent;
    document.querySelector('.board').innerHTML = ''
    ns.emit('room', roomName, (newNumberOfUsers) => {
        document.querySelector('.users').innerHTML = newNumberOfUsers
    })
    ns.on('history', history => {
        console.log(history)
        let ul = document.querySelector('.board');
        console.log('message')
        history.forEach(item => ul.innerHTML += `<li>${item}</li>`)
    })
}

document.querySelector('.send-message').addEventListener('submit', (e) => {
    e.preventDefault();
    let text = document.querySelector('.text').value;

    ns.emit('message', text);
})
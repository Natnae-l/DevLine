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

function connectNamespace(event){
    let ns = event.target.getAttribute('ns');
    ns = io(`http://localhost:3000/${ns}`);

    ns.on('data', (data) => {
        console.log(data)
    })
}
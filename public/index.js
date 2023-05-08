const btnModel = document.querySelector('.btn-model');
const closeModel = document.querySelector('.closeModalBtn');
const model = document.querySelector('.create-model');
const overlay = document.querySelector('.overlay');

// open model
btnModel.addEventListener('click', () => {
    model.classList.remove('hidden');
    overlay.classList.remove('hidden');
})

// fn to close model
const close = () => {
    model.classList.add('hidden');
    overlay.classList.add('hidden');
}

closeModel.addEventListener('click', close)

function sendData(e){
    fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: e.value})
    })
    .then(res => res.json())
}
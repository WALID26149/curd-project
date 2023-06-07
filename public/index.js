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

// close the model with press key escape
window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      close();
    }
  });

//close the model outside
overlay.addEventListener('click', close)

function sendData(e) {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('search-box').value;
    if (typeof searchInput === 'string') {
        searchResults.classList.remove('hidden');
    }
    if (searchInput == false) {
        searchResults.classList.add('hidden');
    }
    let match2 = e.value.match(/\s*/);
    if (match2[0] === e.value) {
        searchResults.innerHTML = '';
        return;
    }     
    fetch('/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: e.value})
        }).then(res => res.json()).then(data => {
            let payload = data.payload;
            searchResults.innerHTML = '';
            if(payload.length < 1){
                searchResults.innerHTML = '<p>sorry Nothing Found</p>';
                return; 
            }
            payload.forEach((item, index) => {
                if(index > 0) searchResults.innerHTML += '<hr>';
                searchResults.innerHTML += `<form action="/api/v1/products/?title=${item.title}" method="get">
                    <button class="title-btn" type="submit">
                        <p>${item.title}</p>
                    </button>
                </form>`;
            });
            return;
        });
    searchResults.innerHTML = ' ';
}
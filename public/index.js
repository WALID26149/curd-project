/* eslint-disable */
const btnModel = document.querySelector('.btn-model');
const closeModel = document.querySelector('.closeModalBtn');
const model = document.querySelector('.create-model');
const overlay = document.querySelector('.overlay');
const searchInput = document.getElementById('search-box');
const copyright = document.querySelector('.footer-company-copy-right');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const toggleBox = document.getElementById('toggle-box-checkbox');

// switch between tabs
document.addEventListener('DOMContentLoaded', function() {
    tabsContainer.addEventListener('click', e => {
        const clicked = e.target.closest('.operations__tab');
      
        // Guard clause
        if (!clicked) return;
      
        // Remove active classes
        tabs.forEach(t => t.classList.remove('operations__tab--active'));
        tabsContent.forEach(c => c.classList.remove('operations__content--active'));
      
        // Activate tab
        clicked.classList.add('operations__tab--active');
      
        // Activate content area
        document
          .querySelector(`.operations__content--${clicked.dataset.tab}`)
          .classList.add('operations__content--active');
      });
});

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

//close the model outside
overlay.addEventListener('click', close)

// close the model with press key escape
window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      close();
    }
  });


// searchInput.addEventListener("keyup", sendData)
searchInput.addEventListener('keyup' , sendData = e => {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('search-box').value;
    
    if (typeof searchInput === 'string') {
        searchResults.classList.remove('hidden');
    }
    if (searchInput == false) {
        searchResults.classList.add('hidden');
    }
    let match = e.value.match(/\s*/);
    if (match[0] === e.value) {
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
                searchResults.innerHTML += `<form action="/product/${item.slug}" method="get">
                    <button class="title-btn" type="submit">
                        <p>${item.title}</p>
                    </button>
                </form>`;
            });
            return;
        });
    searchResults.innerHTML = ' ';
}); 

// copy right 
const getDate = new Date().getFullYear();
copyright.innerHTML = `Walid allan copy-right &copy ${getDate}`;




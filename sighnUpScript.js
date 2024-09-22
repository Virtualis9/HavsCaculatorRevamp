
function goBack(){
    window.location.href = 'index.html';
    return
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxzTxukCi13mM5irfmfiRuv2zWZsjmWQVO7AqWvvXmwrXdZ0JxTUvYhMLKGUSOWyFV1Aw/exec';
const form = document.getElementById('form');

form.addEventListener('submit', e => {
    window.location.href = 'index.html'
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            } 
        })
        .catch(error => console.log('Error!', error.message));
});



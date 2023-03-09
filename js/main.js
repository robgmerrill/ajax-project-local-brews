
const searchButton = document.querySelector('#search-button');
const zipInput = document.querySelector('input')
// declare globally so that when this is set in the AJAX request I can use it later for event listener on ul
var data;


const breweriesContainer = document.querySelector('#breweries-container')

searchButton.addEventListener('click', function(e) {
    e.preventDefault();
    const zip = parseInt(zipInput.value);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.openbrewerydb.org/breweries?by_postal=' + zip);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            data = xhr.response;
        if (data.length > 0) {
            // DOM creation
            var html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                html += '<li><div><h2>' + data[i].name + '</h2><p>' + data[i].street + '<br>' + data[i].city + ', ' + data[i].state + ' ' + data[i].postal_code + '</p></div><div class="visited"><i class="fa-solid fa-map"></i></div></li>';
            }
            html += '</ul>';
            breweriesContainer.innerHTML = html;
        } else {
            breweriesContainer.innerHTML = '<p>Sorry, no breweries found.</p>';
        }}
    });
    xhr.send();
    zipInput.value = '';
})

breweriesContainer.addEventListener('click', function(e) {
    if (e.target.tagName === "I") {
        var li = e.target.closest('li')
        var name = li.querySelector('h2').textContent;
        // find object to push into data
        for (var i = 0; i < data.length; i++) {
            if (name === data[i].name) {
                dataObject.visited.push(data[i])
            }
        }
    }
})

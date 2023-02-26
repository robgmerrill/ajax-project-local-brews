console.log(dataObject.visited)
const homeView = document.querySelector('[data-view="home"]')
console.log(homeView)

const visitedView = document.querySelector('[data-view="visited"]')
console.log(visitedView)

const searchButton = document.querySelector('#search-button');
const zipInput = document.querySelector('input')
var data;

const homeLink = document.querySelector('#home-link')
const visitedLink = document.querySelector('#visited-link')


const breweriesContainer = document.querySelector('#breweries-container')
const visitedBreweries = document.querySelector('#visited-breweries')
console.log(visitedBreweries)

searchButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('this button was clicked')
    const zip = parseInt(zipInput.value);
    console.log(zip)
    console.log(typeof zipCode)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.openbrewerydb.org/breweries?by_postal=' + zip);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
        var breweries = document.getElementById('breweries');
        if (xhr.status === 200) {
        data = xhr.response;
        console.log(data)
        if (data.length > 0) {

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
    console.dir(e.target)
    if (e.target.tagName === "I") {
        var li = e.target.closest('li')
        var name = li.querySelector('h2').textContent;
        
        // find object to push into data
        for (var i = 0; i < data.length; i++) {
            if (name === data[i].name) {
                console.log(dataObject.visited)
                // TODO: don't allow multiple entries
                // before pushing object into dataObject.visited
                // check if it is alreay in dataObject.visited
                // for (var i = 0; i < dataObject.visited.length; i++) {
                //     console.log(dataObject.visited[i])
                //     if (dataObject.visited[i].name === name ) {
                //         console.log('match')
                //         return;
                       
                //     }
                // }
                console.log("This should happen unless already added")
                dataObject.visited.push(data[i])
                visitedBreweriesGenerator();
            }
        }
    }
})

function viewSwap(view) {
    if (view === 'home') {
        homeView.className = ''
        visitedView.className = 'hidden'
    }  else if (view === 'visited') {
        homeView.className = 'hidden'
        visitedView.className = ''
    }
}

visitedLink.addEventListener('click', function() {
    dataObject.view = 'visited';
    viewSwap('visited')
})

homeLink.addEventListener('click', function() {
    dataObject.view = 'home'
    viewSwap('home')
})

document.addEventListener('DOMContentLoaded', function() {
    console.log('page loaded');
    visitedBreweriesGenerator();
})

function visitedBreweriesGenerator() {
    var html = '<ul>';
    for (var i = 0; i < dataObject.visited.length; i++) {
        var data = dataObject.visited;
        html += '<li><div><h2>' + data[i].name + '</h2><p>' + data[i].street + '<br>' + data[i].city + ', ' + data[i].state + ' ' + data[i].postal_code + '</p></div><div><i id="star1" class="fa-regular fa-star"></i><i id="star2" class="fa-regular fa-star"></i><i id="star3" class="fa-regular fa-star"></i><i id="star4" class="fa-regular fa-star"></i><i id="star5" class="fa-regular fa-star"></i></div><div class="visited"><i class="fa-sharp fa-solid fa-xmark"></i></i></div></li>';
    }
    html += '</ul>';
    visitedBreweries.innerHTML = html;
}
const homeView = document.querySelector('[data-view="home"]')

const visitedView = document.querySelector('[data-view="visited"]')

const searchButtonForm = document.querySelector('form');
const zipInput = document.querySelector('input')
let data;

const homeLink = document.querySelector('#home-link')
const visitedLink = document.querySelector('#visited-link')


const breweriesContainer = document.querySelector('#breweries-container')
const visitedBreweries = document.querySelector('#visited-breweries')

searchButtonForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const zip = zipInput.value.trim(); // Trim any whitespace
    if (!zip) {
        console.log('Please enter a zip code.');
        return; // Early return if no zip code is entered
    }

    try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries?by_postal=${zip}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();

        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                breweriesContainer.append(renderBrewery(data[i]))
            }
        } else {
            breweriesContainer.innerHTML = '<p>Sorry, no breweries found.</p>';
        }
    } catch (error) {
        console.error('Error fetching breweries:', error);
        breweriesContainer.innerHTML = '<p>Error loading breweries. Please try again later.</p>';
    }

    zipInput.value = ''; // Clear the input field
});

function renderBrewery(brewery) {
    // Create the list item
    const li = document.createElement('li');

    // Create and fill the info div
    const infoDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = brewery.name;
    const p = document.createElement('p');
    p.innerHTML = `${brewery.street}<br>${brewery.city}, ${brewery.state} ${brewery.postal_code}`; // innerHTML is used here for simplicity with line breaks

    infoDiv.appendChild(h2);
    infoDiv.appendChild(p);

    // Create and fill the visited div
    const visitedDiv = document.createElement('div');
    visitedDiv.className = 'visited';
    const mapIcon = document.createElement('i');
    mapIcon.className = 'fa-solid fa-map';
    visitedDiv.appendChild(mapIcon);

    // Append the divs to the list item
    li.appendChild(infoDiv);
    li.appendChild(visitedDiv);

    return li;
}

breweriesContainer.addEventListener('click', function(e) {
    // listen for click on I tag for the visited map
    if (e.target.tagName === "I") {
        // find the closest li of the click event
        var li = e.target.closest('li')
        // get the value for the h2
        var name = li.querySelector('h2').textContent; // "Bay Bridge Co"

        // find object to push into data
        for (var i = 0; i < data.length; i++) {
            if ("Bay Bridge Co" === data[0].name) {
                // todo: don't add brewery if it already exists in favorited
                dataObject.visited.push(data[0])
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
    visitedBreweriesGenerator();
})

function visitedBreweriesGenerator() {
    var ul = document.createElement('ul');
    var data = dataObject.visited; // Move this outside the loop to avoid repeated lookups

    for (var i = 0; i < data.length; i++) {
        var li = document.createElement('li');

        // Brewery info div
        var infoDiv = document.createElement('div');
        var h2 = document.createElement('h2');
        h2.textContent = data[i].name;
        var p = document.createElement('p');
        p.innerHTML = data[i].street + '<br>' + data[i].city + ', ' + data[i].state + ' ' + data[i].postal_code; // Using innerHTML for line breaks, acceptable use case
        infoDiv.appendChild(h2);
        infoDiv.appendChild(p);

        // Stars div
        var starsDiv = document.createElement('div');
        for (var j = 1; j <= 5; j++) {
            var star = document.createElement('i');
            star.id = 'star' + j;
            star.className = 'fa-regular fa-star';
            starsDiv.appendChild(star);
        }

        // Visited div
        var visitedDiv = document.createElement('div');
        visitedDiv.className = 'visited';
        var xMark = document.createElement('i');
        xMark.className = 'fa-sharp fa-solid fa-xmark';
        visitedDiv.appendChild(xMark);

        // Append everything
        li.appendChild(infoDiv);
        li.appendChild(starsDiv);
        li.appendChild(visitedDiv);
        ul.appendChild(li);
    }

    var visitedBreweries = document.getElementById('visited-breweries');
    visitedBreweries.innerHTML = ''; // Clear existing content
    visitedBreweries.appendChild(ul);
}

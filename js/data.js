/* exported data */
var dataObject = {
    visited: [],
    view: '',
    nextEntryId: 1,
    editing: null
}

const previousBreweriesJSON = localStorage.getItem('breweries-local-storage')

if (previousBreweriesJSON !== null) {
    dataObject.visited = JSON.parse(previousBreweriesJSON);
  }

window.addEventListener('beforeunload', function (event) {
    const breweriesJSON = JSON.stringify(dataObject.visited);
    localStorage.setItem('breweries-local-storage', breweriesJSON);
  });

  
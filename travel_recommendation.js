const navigationLinks = document.querySelector('.nav-links')
const links = navigationLinks.querySelectorAll('a')

links.forEach((a) => {
    function addRemoveActiveClass() {
        links.forEach(a => a.classList.remove('active'))
        this.classList.add('active')
    }
    a.addEventListener('click', addRemoveActiveClass)
})

function hideSearchUponScrolling () {
    if (window.scrollY > 400) {
        document.querySelector('.nav-search').classList.add('hide')
    } else {
        document.querySelector('.nav-search').classList.remove('hide')
    }
}

window.addEventListener('scroll', hideSearchUponScrolling)

function searchDestination(value) {
    let query = value.trim().toLowerCase()
    
    let resultDiv = document.querySelector('#search-results')
    let key;
    if (!query) {
        resultDiv.innerHTML = "" 
        return
    } else if (["country", "countries", "australia", "japan", "brazil"].includes(query)) {
        key = "countries"
    } else if (["beach", "beaches"].includes(query)) {
        key = "beaches"
    } else if (["temple", "temples"].includes(query)) {
        key = "temples"
    } else {
        resultDiv.innerHTML = 'Query doesn\'t match any data. Please try \'beach\', or \'country\'.';
        return
    }
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data, query, key);
            let list = data[key]
            console.log(list);
            if (key == "countries") {
                if (["australia", "japan", "brazil"].includes(query)) {
                    list = list.filter(a => a.name.toLowerCase() == query);
                }
                let cities = list.reduce((acc, item) => acc.concat(...item.cities), [])
                resultDiv.innerHTML = cities.map(data => {
                    return `<li>
                        <img src="${data.imageUrl}">
                        <span>${data.name}</span>
                        <p>${data.description}</p>
                        <button>Book Now!</button>
                    </li>`
                }).join('')
            } else {
                resultDiv.innerHTML = list.map(data => {
                    return `<li>
                        <img src="${data.imageUrl}">
                        <span>${data.name}</span>
                        <p>${data.description}</p>
                        <button>Book Now!</button>
                    </li>`
                }).join('')
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
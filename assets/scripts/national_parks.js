
let searchLocations = document.getElementById("radioLocation");
let searchParkTypes = document.getElementById("radioParkType");
let npDDLs = document.getElementById("np-select");
let resultsCards = document.getElementById("results")
let appParksSwitch = document.getElementById("all-parks-switch")

function showAll() {
    resultsCards.innerHTML = ''
    nationalParksArray.forEach((park) => {
        returnCard(park)
    })
}


appParksSwitch.addEventListener("change", function (event) {
    if (event.target.checked) {
        searchLocations.disabled = true;
        searchLocations.checked = false;
        searchParkTypes.disabled = true;
        searchParkTypes.checked = false;
        // npDDLs.classList.remove("d-none")
        showAll()
    } else {
        searchLocations.disabled = false;
        searchParkTypes.disabled = false;
        resultsCards.classList.add("d-none")
    }
})

searchLocations.addEventListener("change", function (event) {
    if (event.target.checked) {
        // resultsCards.classList.add("d-none")
        appParksSwitch.checked = false;
        returnLocationsDDL()
    }
})

searchParkTypes.addEventListener("change", function (event) {
    if (event.target.checked) {
        // resultsCards.classList.add("d-none")
        appParksSwitch.checked = false;
        returnParkTypesDDL()
    }
})

npDDLs.addEventListener("change", function (event) {
    resultsCards.innerHTML = ''
    resultsCards.classList.remove("d-none")
    nationalParksArray.forEach((park) => {
        if (park.State === event.target.value) {
            returnCard(park)
        } else if (park.LocationName.includes(event.target.value)) {
            returnCard(park);
        }
    })
})

function returnLocationsDDL() {
    npDDLs.classList.remove("d-none")
    npDDLs.innerHTML = `<option hidden value="">Choose A Location...</option>`
    locationsArray.forEach((location) => {
        npDDLs.innerHTML += `<option value="${location}">${location}</option>`
    })
}

function returnParkTypesDDL() {
    npDDLs.classList.remove("d-none")
    npDDLs.innerHTML = `<option hidden value="">Choose A Park Type...</option>`
    parkTypesArray.forEach((location) => {
        npDDLs.innerHTML += `<option value="${location}">${location}</option>`
    })
}

function returnCard(park) {
    let cardBack = `
            <p> 
                ${park.Address}, <br>
                ${park.City}, ${park.State},<br>
                ${park.ZipCode}<br>
            </p>
            <p> ${park.Phone} </p>
        `

    if (park.Phone === 0) {
        cardBack = `
            <p> 
                ${park.Address}, <br>
                ${park.City}, ${park.State},<br>
                ${park.ZipCode}<br>
            </p>
        `
    }

    if (park.Visit) {
        cardBack += `<a href="${park.Visit}" target="_blank" class="btn btn-primary">Check out Park!</a>`
    }

    resultsCards.innerHTML += `
        <div class="card flip-card" style="width: 18rem;">
            <div class="flip-card-inner">
                <div class="card-body flip-card-front ">
                    <h5 class="card-title">${park.LocationName}</h5>
                </div>
                <div class="flip-card-back">
                    ${cardBack}
                </div>
            </div>
        </div>
    `
}

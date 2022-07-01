
let searchLocations = document.getElementById("radioLocation");
let searchParkTypes = document.getElementById("radioParkType");
let npDDLs = document.getElementById("np-select");
let resultsCards = document.getElementById("np-results")
let appParksSwitch = document.getElementById("all-parks-switch")
let appParksSwitchLabel = document.getElementById("all-parks-switch-label")

function showAll() {
    resultsCards.innerHTML = ''
    nationalParksArray.forEach((park) => {
        returnCard(park)
    })
}


appParksSwitch.addEventListener("change", function (event) {
    if (event.target.checked) {
        searchLocations.checked = false;
        searchParkTypes.checked = false;
        npDDLs.classList.add("d-none")
        resultsCards.classList.remove("d-none")
        showAll()
    } else {
        resultsCards.classList.add("d-none")
    }
})

appParksSwitchLabel.addEventListener("click", function (event) {
    if (appParksSwitch.checked) {
        appParksSwitch.checked = false
        appParksSwitch.dispatchEvent(new Event("change"))
    } else {
        appParksSwitch.checked = true
        appParksSwitch.dispatchEvent(new Event("change"))
    }
})

searchLocations.addEventListener("change", function (event) {
    if (event.target.checked) {
        appParksSwitch.checked = false;
        resultsCards.innerHTML = ''
        returnLocationsDDL()
    }
})

searchParkTypes.addEventListener("change", function (event) {
    if (event.target.checked) {
        appParksSwitch.checked = false;
        resultsCards.innerHTML = ''
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

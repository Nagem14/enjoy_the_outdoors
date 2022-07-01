"use strict"

let locationsArray = []
let nationalParksArray = []
let parkTypesArray = []

window.onload = function () {

    loadJsonData("assets/data/locations.json").then((locations) => {
        locationsArray = locations;
    })

    loadJsonData("assets/data/nationalparks.json").then((nationalParks) => {
        nationalParksArray = nationalParks.parks;
        showAllMountains()
    })

    loadJsonData("assets/data/parktypes.json").then((parkTypes) => {
        parkTypesArray = parkTypes;
    })

}

let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}

function showAllMountains() {
    nationalParksArray.forEach((park) => {
        returnCard(park)
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

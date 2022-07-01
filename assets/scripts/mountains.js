let mountainContent = document.getElementById("mountain-content")
let mountainDDL = document.getElementById("mountain-select")
let sunCycleContainer = document.getElementById("sun-cycle")

mountainDDL.addEventListener("change", function (event) {
    mountainsArray.forEach(mountain => {
        if (mountain.name === event.target.value) {
            mountainContent.innerHTML = `
                <h3>${mountain.name}</h3>
                <div id="mtn-desc">
                <img src="assets\\images\\mountains\\${mountain.img}">
                </img>
                <div id="mtn-info">
                <p>${mountain.desc}</p>
                <p>Elevation: ${mountain.elevation}ft</p>
                </div>
                </div>
        `
            getSunsetForMountain(mountain.coords.lat, mountain.coords.long).then(sunsetData => {
                sunCycleContainer.innerHTML = `<p>Sunrise: ${sunsetData.results.sunrise} UTC<p>
                <p>Sunset: ${sunsetData.results.sunset} UTC<p>
                
                `
                sunCycleContainer.classList.remove("d-none")

            })
        }
    });
})

async function getSunsetForMountain(lat, lng) {
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
    let data = await response.json()
    return data
}
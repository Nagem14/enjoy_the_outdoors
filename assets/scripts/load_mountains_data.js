"use strict"

let mountainsArray = []
let mountainsDDL = document.getElementById("mountain-select")

window.onload = function(){
    loadJsonData("assets/data/mountains.json").then((mountainsData) => {
        mountainsArray = mountainsData.mountains;
        //code would go here for stuff that needs to be done with the data on page load
        generateMountainsDDL()
        mountainsDDL.classList.remove("d-none")
    })
}

//function that can "fetch" the sunset/sunrise times
let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}

function generateMountainsDDL(){
    mountainsDDL.innerHTML = `<option value="">Choose A Mountain</option>`
    mountainsArray.forEach((mountain) => {
    mountainsDDL.innerHTML += `<option value="${mountain.name}">${mountain.name}</option>`
    })
}
var getAnimalsFromXML = function (callback) {
    //get the tab. should be PetPoint xml as it's disabled otherwise (see background.js)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("webkit-xml-viewer-source-xml").innerHTML'}, function (results) {
            //should be only one result
            let parser = new DOMParser()
            let xmlDoc = parser.parseFromString(results[0], "text/xml")
            let animals = xmlDoc.getElementsByTagName("Detail")

            var animalsBySpecies =  {}
            for (var i = 0; i < animals.length; i++) {
                let animal = animals[i]
                let species = animal.getAttribute("Species")
                let name = animal.getAttribute("AnimalName")

                let speciesList = animalsBySpecies[species]
                if (!speciesList) {
                    speciesList = new Set()
                    animalsBySpecies[species] = speciesList
                }
                speciesList.add(name)
            }

            //turn the sets into arrays to play nice with JSON.stringify()
            for (var species in animalsBySpecies) {
                animalsBySpecies[species] = Array.from(animalsBySpecies[species])
            }

            callback(animalsBySpecies)
        })
    })
}

getAnimalsFromXML(function (animalsBySpecies) {
    chrome.storage.sync.set({animalsBySpecies: animalsBySpecies}, function () {
        chrome.tabs.create({url: chrome.extension.getURL("results.html")})
    })
})



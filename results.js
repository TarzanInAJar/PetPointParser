let copyButton = document.getElementById("copy")

//TODO cleaner way of doing this?
copyButton.onclick = function (element) {
    function listener (e) {
        let rich = document.getElementById("results").innerHTML
        let plain = document.getElementById("results").innerText

        e.clipboardData.setData("text/html", rich);
        e.clipboardData.setData("text/plain", plain);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
}

//this should already be set from popup.js
chrome.storage.sync.get(['animalsBySpecies'], function (results) {
    let animalsBySpecies = results.animalsBySpecies
    if (!animalsBySpecies || isEmpty(animalsBySpecies)){
        document.getElementById("results").innerHTML = "Received no results from extension! Nothing to show"
        return
    }

    var html = ''

    //for each list of Cats, Dogs, etc
    for (var species in animalsBySpecies) {
        var animals = animalsBySpecies[species]
        let count = animals.length

        //list header IE: 'Cats (4 total)'
        html += '<span style="font-weight: bold;">'
        html += species + 's (' + count + ' total)'
        html += '</span>'

        // put each animal in the list
        html += '<ol>\n'
        for (var i in animals) {
            let animal = animals[i]
            html += '  <li>' + animal + '</li>\n'
        }
        html += '</ol>'
    }
    document.getElementById("results").innerHTML = html
})

var isEmpty = function (obj) {
    if (Object.entries(obj) === 0 && obj.constructor === Object) {
        return true
    }
    return false
}


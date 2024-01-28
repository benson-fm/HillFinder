let form = document.getElementById("filterForm");

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let e = document.getElementById("selectPrice")
    let price = e.options[e.selectedIndex].value
    e = document.getElementById("selectArea")
    area = e.options[e.selectedIndex].value
    e = document.getElementById("selectDistance")
    distance = e.options[e.selectedIndex].value
    e = document.getElementById("selectBed")
    bed = e.options[e.selectedIndex].value
    e = document.getElementById("selectBath")
    bath = e.options[e.selectedIndex].value
    e = document.getElementById("selectBoba")
    let boba = e.options[e.selectedIndex].value

    let data = {
        "price": price,
        "area": area,
        "distance": distance,
        "bed": bed,
        "bath": bath,
        "boba": boba
    }
    console.log('Button Pressed')
    getListings(data['price'],data['bed'])
})

function getListings(price_status,bed_status){
    const url = 'http://127.0.0.1:5000'
    const response = fetch(url + '/searchlistings/' + price_status + '/' + bed_status)
    .then(response => response.json())
    .then(json => {

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle.
            while (currentIndex > 0) {
          
              // Pick a remaining element.
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
        }
        
        json = shuffle(json)

        console.log(json)
          

        updateListings(json)
        console.log('Done with listings')
        updateDistances(json)
        console.log('Done With Distances')
        updateBoba(json)
        console.log('Done With Boba')
    
    })
}


function random_listing(picked) {
    count = 0
    while (count == 0) {
    x = Math.floor(Math.random() * data.length)
    if(x in picked == false) {
        picked.append(x)
        count += 1
    }
    }
    return picked, x
}


function updateListings(data) {
    picked = []
    count = 0
    for(let i=1; i <= 6; i++) {
        listing = data[i-1]
        listing_address = document.getElementById("address"+i.toString())
        listing_address.innerHTML = `<b>${listing["address"].replace(", Irvine, CA", "")}</b>`
        image = document.getElementById("cardImg" + i.toString())
        image.src = listing["imgSrc"]
        listing_price = document.getElementById("price"+ i.toString())
        listing_price.innerHTML = `$${listing["price"]}`
    }
}

function updateDistances(data) {
    for(let i = 1; i<= 6; i++) {
        const service = new google.maps.DistanceMatrixService();
        // build request
        const origin1 = "UC Irvine";
        const destinationA = data[i-1]["address"];
        const request = {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false,
        };     
        // get distance matrix response
        service.getDistanceMatrix(request).then((response) => {
            // process response
            distanceMiles = response["rows"][0]["elements"][0]["distance"]["text"]
            time = response["rows"][0]["elements"][0]["duration"]["text"]
            console.log(distanceMiles)
            console.log(time)
        
            data = {
                "distance": distanceMiles,
                "time": time
            }

            listingDistance = document.getElementById("listingDistance" + i.toString())
            listingDistance.innerHTML = `${data['distance']}`

            
        })   
    }
}

// function getDistance(data) {
//     const service = new google.maps.DistanceMatrixService();
//     // build request
//     const origin1 = "UC Irvine";
//     const destinationA = data["address"];
//     const request = {
//         origins: [origin1],
//         destinations: [destinationA],
//         travelMode: google.maps.TravelMode.DRIVING,
//         unitSystem: google.maps.UnitSystem.IMPERIAL,
//         avoidHighways: false,
//         avoidTolls: false,
//     };

//     // get distance matrix response
//     service.getDistanceMatrix(request).then((response) => {
//         // process response
//         distanceMiles = response["rows"][0]["elements"][0]["distance"]["text"]
//         time = response["rows"][0]["elements"][0]["duration"]["text"]
//         console.log(distanceMiles)
//         console.log(time)
    
//         data = {
//             "distance": distanceMiles,
//             "time": time
//         }

//         return data
//     })
// }

function updateBoba(data){
    for(let i = 1; i<= 6; i++){
    const url = 'http://127.0.0.1:5000'
    const response = fetch(url + '/searchboba/' + data[i-1]['address'])
    .then(response => response.json())
    .then(json => {
        distanceBoba = document.getElementById('boba' + i.toString())
        distanceBoba.innerHTML = `${json['name'].replace(' - Irvine','')} \n ${Math.round(json['distance'])}m`
    })
    
    }
}
function getDistance() {
    const service = new google.maps.DistanceMatrixService();
    // build request
    const origin1 = "UC Irvine";
    const destinationA = "10510 Moledo Ct Elk Grove";
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

        return data
    })
}

// send data to python with Flask
function sendData(data) {
    console.log(data)    
}

sendData(getDistance())

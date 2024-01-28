let data = [
    {
        "price": "5000",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bed": "4 beds",
        "bath": "4 baths",
        "boba": "5 mi",
        "imgSrc": "https://photos.zillowstatic.com/fp/070f78f8485ab58d76e95f88d3a8d3dc-p_e.jpg"
    },
    {
        "price": "5000",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bed": "4 beds",
        "bath": "4 baths",
        "boba": "5 mi"
    },
    {
        "price": "5000",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bed": "4 beds",
        "bath": "4 baths",
        "boba": "5 mi"
    },
    {
        "price": "5000",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bed": "4 beds",
        "bath": "4 baths",
        "boba": "5 mi"
    },
    {
        "price": "5000",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bed": "4 beds",
        "bath": "4 baths",
        "boba": "5 mi"
    },
    {
        "price": "5000",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bed": "4 beds",
        "bath": "4 baths",
        "boba": "5 mi"
    }
]


function updateListings() {
    for(let i = 1; i <= 6; i++) {
        card = document.getElementById("card"+i.toString())
        card.innerHTML = `
        <div class="card" id="card1">
            <img class="cardImg" src="../house.webp" alt="House" style="width:100%">
            <div class="container">
                <div class="listingInfoRow1">
                    <h4 class="listingName"><b>Plaza Verde</b></h4> 
                    <p class="listingPrice">$1000</p>
                </div>
                <div class="listingInfoRow2">
                    <p class="listingAddress">9999 Mesa Rd</p> 
                    <p class="listingDistance">10 mi</p>
                </div>
            </div>
        </div>
        `
    }
}

updateListings()
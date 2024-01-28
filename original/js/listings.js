data = [
    {
        "name": "Camino Del Sol",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bath": "4 baths",
        "boba": "5 mi",
        'address': '100 Piedmont, Irvine, CA',
        'price': 2445,
        'beds': '1',
        'imgSrc': 'https://photos.zillowstatic.com/fp/be2335a427c0fe3be5ffe9d707eac6d9-p_e.jpg',
        'overall_score': 3
    }, 
    {
        "name": "Camino Del Sol",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bath": "4 baths",
        "boba": "5 mi",
        'address': '100 Anacapa, Irvine, CA',
        'price': 2810,
        'beds': '1',
        'imgSrc': 'https://photos.zillowstatic.com/fp/c4d264fd312bd9709d21701c4ed69cc9-p_e.jpg',
        'overall_score': 3
    }, 
    {
        "name": "Camino Del Sol",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bath": "4 baths",
        "boba": "5 mi",
        'address': '100 Esperanza, Irvine, CA',
        'price': 2470,
        'beds': '1',
        'imgSrc': 'https://photos.zillowstatic.com/fp/8668c69b5bb9c42d47f0456130eb6186-p_e.jpg',
        'overall_score': 3
    },
    {
        "name": "Camino Del Sol",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bath": "4 baths",
        "boba": "5 mi",
        'address': '1100 Stanford, Irvine, CA',
        'price': 2695,
        'beds': '1',
        'imgSrc': 'https://photos.zillowstatic.com/fp/4d5e7b6b67a56ffd2ff16cbc9b32663c-p_e.jpg',
        'overall_score': 3
    },
    {
        "name": "Camino Del Sol",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bath": "4 baths",
        "boba": "5 mi",
        'address': '100 Mirasol, Irvine, CA',
        'price': 2570,
        'beds': '1',
        'imgSrc': 'https://photos.zillowstatic.com/fp/569e131fa7fb7e8b29fcd7608a6fb399-p_e.jpg',
        'overall_score': 3
    },
    {
        "name": "Camino Del Sol",
        "distance": "10 mi",
        "area": "20,000 sqft",
        "bath": "4 baths",
        "boba": "5 mi",
        'address': '700 Sonoma Aisle, Irvine, CA',
        'price': 3365,
        'beds': '2',
        'imgSrc': 'https://photos.zillowstatic.com/fp/ffc21bd53a35a89416ce840a4f6df786-p_e.jpg',
        'overall_score': 3
    }
]

function updateListings(data) {
    for(let i = 1; i <= 6; i++) {
        listing = data[i-1]
        card = document.getElementById("card"+i.toString())
        card.innerHTML = `
            <img class="cardImg" src=${listing["imgSrc"]} alt="House" style="width:100%">
            <div class="container">
                <div class="listingInfoRow1">
                    <h4 class="listingName"><b>${listing["name"]}</b></h4> 
                    <p class="listingPrice">$${listing["price"]}</p>
                </div>
                <div class="listingInfoRow2">
                    <p class="listingAddress">${listing["address"].replace(", Irvine, CA", "")}</p> 
                    <p class="listingDistance">${listing["distance"]}</p>
                </div>
            </div>
        `
    }
}

updateListings()
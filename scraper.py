import requests
import json
#url = 'https://www.zillow.com/homes/Irvine,-CA_rb/'
#key =  'a807570d-241e-48cf-aba6-6911519f5b7c'

#/ Set your API key and listing URL
api_key =  'a807570d-241e-48cf-aba6-6911519f5b7c'  # CHANGE WITH YOUR API KEY
listing_url = 'https://www.zillow.com/irvine-ca/rentals/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-117.90917784228515%2C%22east%22%3A-117.63932615771483%2C%22south%22%3A33.59329309877736%2C%22north%22%3A33.780693783343956%7D%2C%22usersSearchTerm%22%3A%22Irvine%2C%20CA%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A52650%2C%22regionType%22%3A6%7D%5D%2C%22filterState%22%3A%7B%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A12%7D'  # The URL of the listing page with the 'searchQueryState' parameter.

#/ API endpoint and default headers
api_url = "https://app.scrapeak.com/v1/scrapers/zillow/listing"

parameters = {"api_key": api_key, "url": listing_url}



def make_int(price: str) -> int:
    new = ''
    for x in price:
        if x.isdigit():
            new += x

    return int(new)



#/ Make the API request
response = requests.get(api_url, params=parameters)
response_content = json.loads(response.text)
content = response_content['data']['cat1']['searchResults']['listResults']
for listing in content:
    print(listing['address'])
    if 'price' in listing.keys():
        print(make_int(listing['price']))
    else:
        units = listing['units']
        temp = units[0]
        lowest = temp['price']
        lowest = make_int(lowest)
        for unit in units:
            if make_int(unit['price']) < lowest:
                lowest = make_int(unit['price'])

        print(lowest)
                



            





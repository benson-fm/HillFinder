import requests
import json
from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


#yelp api key: 
_YELP_API_KEY = 'a--O_Ir2DPGxKHftjr2DC5aPymbFZ9X95tfRzEs0PB3eewr8btwTSjfKjRaInCpuQ7tw311U5SsLRkCGBzpgvC7PRz0y_HEUY8R58gClGMXrwrmGgj70UTmeIEK1ZXYx'
_YELP_URL = 'https://api.yelp.com/v3/businesses/search'
_YELP_PARAMETERS = {
                    "term": 'Boba', 
                    "sort_by": "distance",
                    "limit": 1}


#/ Set your API key and listing URL
_ZILLOW_API_KEY =  '39cdb04a-e044-435b-95e6-c5873b53fc71'
_LISTING_URL = 'https://www.zillow.com/irvine-ca/rentals/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-117.90917784228515%2C%22east%22%3A-117.63932615771483%2C%22south%22%3A33.59329309877736%2C%22north%22%3A33.780693783343956%7D%2C%22usersSearchTerm%22%3A%22Irvine%2C%20CA%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A52650%2C%22regionType%22%3A6%7D%5D%2C%22filterState%22%3A%7B%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A12%7D'  # The URL of the listing page with the 'searchQueryState' parameter.

#/ API endpoint and default headers
_ZILLOW_API_URL = "https://app.scrapeak.com/v1/scrapers/zillow/listing"
_ZILLOW_PARAMETERS = {"api_key": _ZILLOW_API_KEY, "url": _LISTING_URL}


def make_int(price: str) -> int:
    new = ''
    for x in price:
        if x.isdigit():
            new += x

    return int(new)


def rank_price(price, priority, status):
    score = 0
    if price <= 2300:
        score += 1
    elif price < 15000:
        if status == 'high' or status == 'medium':
            score +=1
    else:
        if status == 'high':
            score +=1

    return score 
    

def rank_boba(distance, priority, status):
    score = 0
    if distance <= 300:
        if status == 'high':
            score += 1
    elif distance < 3000:
        if status == 'medium':
            score += 1
    else:
        if status == 'low':
            score += 1

    return score

def rank_bed(beds, priority, status):
    score = 0
    if type(beds) == str:
        beds = make_int(beds)
    if beds > 5:
        if status == 'high':
            score += 1
    elif beds >= 3:
        if status == 'medium':
            score += 1
    else:
        if status == 'low':
            score += 1

    return score 



def total_scores(price_score, bed_score):
    return price_score + bed_score  #+ bathscore

@app.route('/searchboba/<location>')
def get_boba(location):
    _YELP_PARAMETERS['location'] = location
    response = requests.get(_YELP_URL, params=_YELP_PARAMETERS, headers= {'Authorization':'Bearer ' + _YELP_API_KEY})
    response_content = json.loads(response.text)
    boba_info = dict()
    boba_info['name'] = response_content['businesses'][0]['name']
    closest_distance = response_content['businesses'][0]['distance']
    boba_info['distance'] = closest_distance
    boba_priority = 2
    boba_score = rank_boba(response_content['businesses'][0]['distance'], boba_priority,'low')

    return boba_info


@app.route('/')
def hello():
    data = {}
    return render_template('main.html', data=data)

#/ Make the API request
@app.route('/searchlistings/<price_status>/<bed_status>')
def get_listings(price_status, bed_status)-> list:
    response = requests.get(_ZILLOW_API_URL, params=_ZILLOW_PARAMETERS)
    response_content = json.loads(response.text)
    content = response_content['data']['cat1']['searchResults']['listResults']
    listings = []

    # get input from form
    # statuses = get_statuses()
    # price_status = statuses['price']
    # bed_status = statuses['bed']
    # boba_status = statuses['boba']
    price_status = 'low'
    bed_status = 'low'
    boba_status = 'low'

    price_priority = 1
    bed_priority = 1
    boba_priority = 1

    for listing in content:
        listing_data = {}
        listing_data['address'] = listing['address']
        # gets unit with lowest price
        if 'price' in listing.keys():
            listing_data['price'] = make_int(listing['price'])
            price_score = rank_price(listing_data['price'], price_priority, price_status)
            listing_data['beds'] = listing['beds']
            bed_score = rank_bed(listing_data['beds'], bed_priority, bed_status)
        else:
            units = listing['units']
            temp = units[0]
            lowest_price = temp['price']
            lowest_price = make_int(lowest_price)
            index = 0
            lowest_index = 0
            for unit in units:
                if make_int(unit['price']) < lowest_price:
                    lowest_price = make_int(unit['price'])
                    lowest_index = index
                index += 1

            listing_data['price'] = lowest_price
            price_score = rank_price(listing_data['price'], price_priority, price_status)
            listing_data['beds'] = units[lowest_index]['beds']
            bed_score = rank_bed(listing_data['beds'], bed_priority, bed_status)

        listing_data['imgSrc'] = listing['imgSrc']
        # bath_score = rank_bath(listing_data['baths'], bath_priority, bath_status)
        bath_score = 1
        #listing_data['area'] = listing['area']
        #area_score = rank_area(listing_data['area'], area_priority, area_status)
        area_score = 1
        listing_data['overall_score'] = total_scores(price_score, bed_score) #get boba score in here somehow as well

        listings.append(listing_data)
        
    # listings = list(filter(lambda x: len(x['address']) <= 18, listings))
    for listing in listings:
        if listing['address'] == 'Rize Irvine, 1100 Synergy #1158, Irvine, CA 92614':
            listing['address'] = "1100 Synergy"
        if listing['address'] == 'Avella Apartment Homes, 6500 Roosevelt #1138, Irvine, CA 92618':
            listing['address'] = "6500 'Roosevelt"
    return listings


if __name__ == '__main__':
    app.run()



# 4)
##imports package
import requests
# replaced w/ my API key
token = "a9ad674728a09d9bdb8df9af11ae99bc0337cbbf" 
##website adress
url = "https://api.waqi.info/search/"
##makes a API request with the parameters given above
response = requests.get(url, params={"token": token, "keyword": "montreal"})
##take the response as a json and turn it into a dictionary
results = response.json()
#print results
# print(results)

# 5)
#print type and keys
# Code:
# print(type(results))
# print(results.keys())
# --------Type: dict
# --------Keys: 'status' 'data'

#Seperate the data from the status and define it as its own dict
responseData = results['data']

#find out the type of each item and its keys
# Code:
# print (type(responseData))
# for item in responseData:
#     print(item.keys())
# --------ResponseData is a list of dictionaries
# --------Each item has keys of: 'uid' 'aqi' 'time' and 'station'

#Find the name of each station and its geo adress (in one line so i can remember it more easily if needed to be acsesed later)

# -----------Results (name) [geo data of [long, lat]]
# Montreal [45.5086699, -73.5539925]
# Échangeur Décarie, Montreal, Canada [45.502648, -73.663913]
# Roberval, York, Montreal, Canada [45.464611, -73.582583]
# Ontario, Montreal, Canada [45.52055, -73.563222]
# Caserne 17, Montreal, Canada [45.593325, -73.637328]
# Saint-Michel, Montreal, Canada [45.563697, -73.610447]
# Molson, Montreal, Canada [45.542767, -73.572039]
# Hochelaga-Maisonneuve, Montreal, Canada [45.539928, -73.540388]
# Parc Pilon, Montreal, Canada [45.594576, -73.641535]
# Maisonneuve, Montreal, Canada [45.501531, -73.574311]
# Drummond, Montreal, Canada [45.497859, -73.573035]
# St-Dominique, Montreal, Canada [45.512189, -73.566842]
# Jardin Botanique, Montreal, Canada [45.56221, -73.571785]
# Verdun, Montreal, Canada [45.472854, -73.57296]
# Duncan, Montreal, Canada [45.4660102, -73.6336838]
# Anjou, Montreal, Canada [45.602846, -73.558874]
# Dorval, Montreal, Canada [45.439119, -73.7333]
# Chénier, Montreal, Canada [45.60176, -73.541992]
# Saint-Jean-Baptiste, Montreal, Canada [45.641026, -73.499682]
# Aéroport de Montréal, Montreal, Canada [45.468297, -73.741185]
# Sainte-Anne-de-Bellevue, Montreal, Canada [45.426509, -73.928944]

#Print the data output in one long stiring to auto format
# Code:
# for item in responseData:
#     print(f"Name of station: {item['station']['name'],} Air Quality Index: {item['aqi']}, Geo Location (Longitude: { item['station']['geo'][0]}, Latitude: { item['station']['geo'][1]}) UID: {item['uid']}")
# ---------Results
#Name of station: ('Montreal',) Air Quality Index: 24, Geo Location (Longitude: 45.5086699, Latitude: -73.5539925) UID: 5922
# Name of station: ('Échangeur Décarie, Montreal, Canada',) Air Quality Index: 30, Geo Location (Longitude: 45.502648, Latitude: -73.663913) UID: 8595
# Name of station: ('Roberval, York, Montreal, Canada',) Air Quality Index: 30, Geo Location (Longitude: 45.464611, Latitude: -73.582583) UID: 10716
# Name of station: ('Ontario, Montreal, Canada',) Air Quality Index: 30, Geo Location (Longitude: 45.52055, Latitude: -73.563222) UID: 8628
# Name of station: ('Caserne 17, Montreal, Canada',) Air Quality Index: 30, Geo Location (Longitude: 45.593325, Latitude: -73.637328) UID: 5461
# Name of station: ('Saint-Michel, Montreal, Canada',) Air Quality Index: 27, Geo Location (Longitude: 45.563697, Latitude: -73.610447) UID: 8696
# Name of station: ('Molson, Montreal, Canada',) Air Quality Index: 24, Geo Location (Longitude: 45.542767, Latitude: -73.572039) UID: 5467
# Name of station: ('Hochelaga-Maisonneuve, Montreal, Canada',) Air Quality Index: 24, Geo Location (Longitude: 45.539928, Latitude: -73.540388) UID: 5463
# Name of station: ('Parc Pilon, Montreal, Canada',) Air Quality Index: 22, Geo Location (Longitude: 45.594576, Latitude: -73.641535) UID: 8596
# Name of station: ('Maisonneuve, Montreal, Canada',) Air Quality Index: 22, Geo Location (Longitude: 45.501531, Latitude: -73.574311) UID: 5465
# Name of station: ('St-Dominique, Montreal, Canada',) Air Quality Index: 21, Geo Location (Longitude: 45.512189, Latitude: -73.566842) UID: 10138
# Name of station: ('Drummond, Montreal, Canada',) Air Quality Index: 21, Geo Location (Longitude: 45.497859, Latitude: -73.573035) UID: 8626
# Name of station: ('Jardin Botanique, Montreal, Canada',) Air Quality Index: 17, Geo Location (Longitude: 45.56221, Latitude: -73.571785) UID: 8695
# Name of station: ('Verdun, Montreal, Canada',) Air Quality Index: 12, Geo Location (Longitude: 45.472854, Latitude: -73.57296) UID: 8594
# Name of station: ('Duncan, Montreal, Canada',) Air Quality Index: -, Geo Location (Longitude: 45.4660102, Latitude: -73.6336838) UID: 5462
# Name of station: ('Anjou, Montreal, Canada',) Air Quality Index: 27, Geo Location (Longitude: 45.602846, Latitude: -73.558874) UID: 8625
# Name of station: ('Dorval, Montreal, Canada',) Air Quality Index: -, Geo Location (Longitude: 45.439119, Latitude: -73.7333) UID: 8627
# Name of station: ('Chénier, Montreal, Canada',) Air Quality Index: 30, Geo Location (Longitude: 45.60176, Latitude: -73.541992) UID: 5460
# Name of station: ('Saint-Jean-Baptiste, Montreal, Canada',) Air Quality Index: 27, Geo Location (Longitude: 45.641026, Latitude: -73.499682) UID: 5459
# Name of station: ('Aéroport de Montréal, Montreal, Canada',) Air Quality Index: 24, Geo Location (Longitude: 45.468297, Latitude: -73.741185) UID: 5466
# Name of station: ('Sainte-Anne-de-Bellevue, Montreal, Canada',) Air Quality Index: 30, Geo Location (Longitude: 45.426509, Latitude: -73.928944) UID: 5468

# 6)
# acsess a certan station by its UID from response data
url_feed = "https://api.waqi.info/feed/@5468"
response_feed = requests.get(url_feed, params={"token": token})
results_feed = response_feed.json()
# print(results_feed.keys())
##get the response data from feed
# -----------Keys: 'status' 'data'

response_feed_data = results_feed['data']
# -----------response_feed_data is a dict


# ----------Results
# aqi
# idx
# attributions
# city
# dominentpol
# iaqi
# time
# forecast
# debug
# Code:
## Itterate through Dict and see what data is there
# for item in response_feed_data:
#         print(item)


# What is in aqi and dominentpol for response feed data
# Dominent polutant (string), Air Quality Index (int)
# pm25 30
# Code:
# print(response_feed_data['dominentpol'],response_feed_data['aqi'])


#Accsess elements of iaqi
#structure
# Dict[ Pol, [v, data of polutatnt]]
# different types of polutants
# keys for Pol: 'co', 'h', 'no2', 'o3', 'p', 'pm25', 'so2', 't', 'w', 'wg'
# Code:
# print (response_feed_data['iaqi'].keys())



# get the value for the dominentpol, print results out formatted nicely
# acsess the iaqi feild then acsess the most common polutent in the city by getting the value from the response dataf ield dictionary finally acsessing the index 'v' in the last dictionary
# Output: The dominent polutent of pm25 has the value of 30
# Code:
# print(f"The dominent polutent of {response_feed_data['dominentpol']} has the value of {response_feed_data['iaqi'][response_feed_data['dominentpol']]['v']}" )



# 7)
# what the process would be to access the value of the dominant pollutant value from different cities
# first make an acsess with the city name of your choosing, choose a station within the city and acsess its UID and save it to a variable
# make a second request with the UID of the station, assign the stations dominant polutant to a variable, 
# acsess the iaqi dict and search for the key of the dominant polutant and get the 'v' from the final dictionary
# if you make this process with each of the steps having its own variables dependedt on each json, you could then theororetically repeat this process for any city and get the value of the dominent polutent

# Owen Hill & Michel Vlamis
# 40272473
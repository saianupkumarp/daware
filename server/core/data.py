import math
import random, json
import settings
import string

EarthRadius = 6371 # km
OneDegree = EarthRadius * 2 * math.pi / 360 * 1000 # 1 degree latitude in meters
NumberOfLocations = 18 # Number of test data needed

def random_point_in_disk(max_radius):
    r = max_radius * random.random()**0.5
    theta = random.random() * 2 * math.pi
    return [r * math.cos(theta), r * math.sin(theta)]

def random_location(lon, lat, max_radius):
    dx, dy = random_point_in_disk(max_radius)
    random_lat = lat + dy / OneDegree
    random_lon = lon + dx / ( OneDegree * math.cos(lat * math.pi / 180) )
    return [random_lon, random_lat]

def passport_id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def get_list_of_random_location(lon, lat, max_radius):
    data = []
    for i in range(0, NumberOfLocations + 1):
        person = dict()
        rand_geo_details = random_location(lon, lat, max_radius)
        person["Name"] = "User - " + str(i)
        person["Nationality"] = random.choice(settings.COUNTRIES)
        person["Age"] = random.randint(27, 63)
        person["Passport Number"] = passport_id_generator()
        person["Longitude"], person["Latitude"] = rand_geo_details
        person["geo"] = rand_geo_details
        person["risk_profile"] = random.choice(settings.RISK_PROFILE)
        if person["risk_profile"] == 'HIGH':
            if person["Age"] >= 50:
                person["BP"] = random.randint(180, 220)
                person["Heart Rate"] = random.randint(90, 120) # https://www.medicalnewstoday.com/articles/259201.php
            else:
                person["BP"] = random.randint(150, 180)
                person["Heart Rate"] = random.randint(80, 110)
        elif person["risk_profile"] == 'MEDIUM':
            if person["Age"] >= 50:
                person["BP"] = random.randint(170, 180)
                person["Heart Rate"] = random.randint(81, 90)
            else:
                person["BP"] = random.randint(130, 150)
                person["Heart Rate"] = random.randint(71, 80)
        else:
            if person["Age"] >= 50:
                person["BP"] = random.randint(160, 170)
                person["Heart Rate"] = random.randint(63, 70)
            else:
                person["BP"] = random.randint(120, 130)
                person["Heart Rate"] = random.randint(65, 70)
        data.append(person)
    return json.dumps(data)



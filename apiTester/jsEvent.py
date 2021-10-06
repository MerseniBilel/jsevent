import requests
import os
import time
from faker import Faker
from sys import platform
import random;
from datetime import date
import json


BASRURL = "https://avatars.dicebear.com/api/{}/{}.svg"
spritesOptions = ["male", "female", "human", "initials", "bottts", "avataaars", "jdenticon", "gridy", "micah", "identicon"]



def insertInto(data, endpoint):
    try:
        result = requests.post(endpoint, data=data, headers={"Content-Type": "application/json"})
        if(result.status_code == 200):
            print("inserted successfully")
            return result
    except Exception as e:
        print(e.message)



def generateUser():
    fake = Faker()
    newUser = {
        "name": str(fake.first_name()),
        "lastname" : str(fake.last_name()),
        "email": str(fake.email()),
        "password" : "123456",
        "image" : "https://avatars.dicebear.com/api/{}/{}.svg".format(random.choice(spritesOptions),fake.first_name() )
        }
    jsonUser = json.dumps(newUser)
    return jsonUser

def generateEvent():
    fake = Faker()
    newEvent = {
        "name" : fake.last_name(),
        "description" : str(fake.text()),
        "eventimg" : followLink("https://source.unsplash.com/640x904/?event"),
        "eventdate": date.today().strftime("%Y-%m-%d"),
        "eventLeader" : {
            "leaderName" : fake.first_name(),
            "leaderLastname" : fake.last_name(),
            "leaderimg" : "https://avatars.dicebear.com/api/{}/{}.svg".format(random.choice(spritesOptions),fake.first_name() ),
        }
    }
    jsonEvent = json.dumps(newEvent)
    return jsonEvent

def followLink(link):
    response = requests.get(link);
    return response.url;

def main():
    if platform == "linux" or platform == "linux2":
        os.system("clear")
    if platform == "win32":
        os.system("cls")
    for _ in range(10):
        user = generateUser()
        event = generateEvent()
        userResponse = insertInto(user, "http://localhost:3033/api/users")
        eventResponse = insertInto(event, "http://localhost:3033/api/events")



if __name__ == '__main__':
    main()

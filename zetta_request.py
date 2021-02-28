# Turns led device on and off through zetta api

import requests


URL = "http://127.0.0.1:1337/servers/Prototype%20Zetta%20Server%20v0.1"

r = requests.get(url = URL)  # send get request to zetta server


led_id = r.json()["entities"][1]["properties"]["id"]  # device id of the led
# ex: '568e46fe-ca14-4632-a783-90897573401d'


# send get request to access the led device, using the device id just found
device_URL = f"http://127.0.0.1:1337/servers/Prototype%20Zetta%20Server%20v0.1/devices/{led_id}"

led_request = requests.get(url=URL)
led_data = led_request.json()

# send post request to server to turn on/off LED

data = {'action':'turn-on'}
# data = {'action':'turn-off'}

led_on = requests.post(url=device_URL, data=data)

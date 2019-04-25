
import requests
from AuthTest import fetchToken, getHeader

oauthurl = "https://maxiemgeldhof.com"
localurl = "http://rentify.world"

refresh = ""

header = getHeader(fetchToken("fill@filler.com", "rentify"))

# r = requests.post("https://rentify.world/api/rooms", headers= header, json={"address": "ggia yeeet"})
# print(r.text)

# r = requests.get("https://rentify.world/api/rooms", headers= header)
# print(r.text)

# r = requests.get("http://rentify.world/api/issues/5ca7627cb9495d00116b3896", headers= header)
# print(r.text)

# r = requests.get("https://rentify.world/api/users", headers= header)
# print(r.text)

# r = requests.get("https://rentify.world/api/issues/5ca7627cb9495d00116b3896", headers= header)
# print(r.text)

# r = requests.get("https://rentify.world/api/groups", headers= header)
# print(r.text)

r = requests.get("https://rentify.world/api/groups/5ca7627cb9495d00116b3896/rooms", headers= header)
print(r.text)

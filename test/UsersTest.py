from AuthTest import fetchToken, getHeader
import requests

header = getHeader(fetchToken("fill@filler.com", "rentify"))
r = requests.get("http://localhost:4200/users/landlords", headers= header)
print(r.text)

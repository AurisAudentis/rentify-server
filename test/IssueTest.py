from AuthTest import fetchToken, getHeader
import requests

header = getHeader(fetchToken("random43@rand.be", "random_password"))

r = requests.get("http://localhost:4200/issues", headers= header)
print(r.text)
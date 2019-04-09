from AuthTest import fetchToken, getHeader
import requests


remote = "https://rentify.world/api"
localurl = "http://localhost:4200"


header1 = getHeader(fetchToken("fill@filler.com", "rentify"))



# r = requests.post(remote + "/groups", headers=header1, json={"description":"Building one", "maintainers": [], "rooms": [{"address":"New room"}]})
r = requests.get(remote + "/groups", headers= header1)

grp = r.json()["landlord"][0]
# rmid = grp["rooms"][0]
# r = requests.post(remote + f"/rooms/{rmid}/users", headers=header1)


# r = requests.post(remote + f"/issues/group/{grp['_id']}", headers=header1, json={"description": "da worst issue", "issue_title": "Help me dammit"})
# print(r.json())

r = requests.get(remote + f"/issues/{grp['_id']}", headers=header1)
print(r.json())
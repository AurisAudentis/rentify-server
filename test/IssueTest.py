from AuthTest import fetchToken, getHeader
import requests

header1 = getHeader(fetchToken("fill@filler.com", "rentify"))
header2 = getHeader(fetchToken("fill@filler.com", "rentify"))

r = requests.get("http://localhost:4200/groups", headers= header1)
# gidten = r.json()["tenant"][0]["_id"]

# r = requests.get(f"http://localhost:4200/issues/{gidten}", headers=header1)


r = requests.post("http://localhost:4200/groups", headers=header2, json={"description":"Building one", "maintainers": [], "rooms": [{"address":"New room"}]})
print(r.json())
grp = r.json()

rmid = grp["rooms"][0]["_id"]
r = requests.post(f"http://localhost:4200/rooms/{rmid}/users", headers=header1)


r = requests.get(f"http://localhost:4200/issues/{grp['_id']}", headers=header1)


r = requests.post(f"http://localhost:4200/issues/group/{grp['_id']}", headers=header1, json={"description": "da worst issue", "issue_title": "Help me dammit"})
print(r)

r = requests.get(f"http://localhost:4200/issues/{grp['_id']}", headers=header2)
print(r.text)
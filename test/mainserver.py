from AuthTest import fetchToken, getHeader
import requests


remote = "https://rentify.world/api"
localurl = "http://localhost:4200"


header1 = getHeader(fetchToken("fill@filler.com", "rentify"))

files = {"file": open("test/index.jpg", 'rb')}

r = requests.post(localurl + "/issues/5caca71d6a0ea04048a76604/pictures", headers=header1,files=files )
print(r.text)

r = requests.get(localurl + "/issues/5caca71d6a0ea04048a76604/pictures/46ee8a46e319f8f39e5f5b0394882acd", headers=header1)
print(r.text)

# r = requests.get(remote + "/users/landlords", headers=header1)
# print(r.text)

# r = requests.put(remote + "/auth/register", 
#     data={"mail": "max@maxiemgeldhof.com", "oid": "1d4ddef8-5019-466a-8c05-0e496825829c", "full_name":"Joris Landuyt", "phonenum":"0456789865"})

# r = requests.get(remote + "/rooms", headers=header1)
# print(r.text)

# r = requests.post(localurl + "/groups", json={"rooms": ["Sevaanstraat 1", "Sevaanstraat 2"], "description": "The best group", "maintainers":[],},  headers=header1)
# print(r.text)

# # r = requests.post(remote + "/groups", headers=header1, json={"description":"Building one", "maintainers": [], "rooms": [{"address":"New room"}]})
# r = requests.get(remote + "/groups", headers= header1)

# grp = r.json()["landlord"][0]
# # rmid = grp["rooms"][0]
# # r = requests.post(remote + f"/rooms/{rmid}/users", headers=header1)


# # r = requests.post(remote + f"/issues/group/{grp['_id']}", headers=header1, json={"description": "da worst issue", "issue_title": "Help me dammit"})
# # print(r.json())

# r = requests.get(remote + f"/issues/{grp['_id']}", headers=header1)
# print(r.js
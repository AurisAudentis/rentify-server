from AuthTest import fetchToken, getHeader
import requests


header = getHeader(fetchToken("fill@filler.com", "rentify"))


r = requests.get("http://localhost:4200/rooms/", headers= header)
print(r.json())
rid = r.json()[0]["_id"]

r = requests.post("http://localhost:4200/groups", headers=header, json={"description":"Building one", "maintainers": [], "rooms": [{"Address":"New room"}]})
gid = r.json()["_id"]
r = requests.put(f"http://localhost:4200/groups/{gid}/rooms", headers=header, json={"rooms":[rid]})

#It's a put. Should have absolutely no effect.
r = requests.put(f"http://localhost:4200/groups/{gid}/rooms", headers=header, json={"rooms":[rid]})
print(r.json())


r = requests.delete(f"http://localhost:4200/rooms/{rid}/users", headers=header)
print(r.text)

r = requests.post(f"http://localhost:4200/rooms/{rid}/users", headers=header)
print(r.json())


r = requests.get("http://localhost:4200/groups", headers= header)
print(r)
print(r.json())


r = requests.get(f"http://localhost:4200/groups/{gid}/rooms", headers= header)
print(r)
print(r.json())
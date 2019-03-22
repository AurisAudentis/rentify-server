import requests

oauthurl = "https://maxiemgeldhof.com"
localurl = "http://localhost:4200"


def fetchToken(mail, password):
    r = requests.post(oauthurl + "/oauth/token", data={"email": mail, "pw":password})
    print(r.json())
    token = r.json()["jwt"]
    return token

def getHeader(token):
    return {"Authorization":"bearer " + token}

def registerBackend(mail, password):
    r = requests.post(oauthurl + "/oauth/sso/register", data={"email": mail, "password": password})
    print(r.json())
    return r.json()["uid"]


email = "random16@rand.be"
password = "random_password"
uid = registerBackend(email, password)

r = requests.put(localurl + "/auth/register", 
    data={"mail": email, "oid": uid, "full_name":"Joris Landuyt", "phonenum":"0456789865"})

print(r.text)

r = requests.get(localurl + "/", headers=getHeader(fetchToken(email, password)))
print(r.text)
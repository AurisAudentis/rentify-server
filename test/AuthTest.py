import requests

oauthurl = "https://maxiemgeldhof.com"
localurl = "http://localhost:4200"

refresh = ""


def fetchToken(mail, password):
    global refresh
    r = requests.post(oauthurl + "/oauth/token", data={"email": mail, "pw":password})
    token = r.json()["jwt"]
    refresh = r.json()["refr"]
    return token

def fetchTokenByRefr(mail, token):
    r = requests.post(oauthurl + "/oauth/token", data={"email": mail, "token":token})
    return r.json()["jwt"]

def getHeader(token):
    return {"Authorization":"bearer " + token}

def registerBackend(mail, password):
    r = requests.post(oauthurl + "/oauth/sso/register", data={"email": mail, "password": password})
    return r.json()["uid"]


email = "random43@rand.be"
password = "random_password"
uid = "b6cd6a0a-9682-4c22-92c8-59e641bdcc7c"

# r = requests.put(localurl + "/auth/register", 
#     data={"mail": email, "oid": uid, "full_name":"Joris Landuyt", "phonenum":"0456789865"})

# fetchToken(email, password)
# print(getHeader(fetchTokenByRefr(email, refresh)))
# r = requests.get(localurl + "/", headers=getHeader(fetchTokenByRefr(email, refresh)))
# print(r.text)
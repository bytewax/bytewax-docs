import pandas as pd
from bytewax import Gateway
import json

gateway = Gateway()
data = pd.read_csv('swarm/data.csv')
payload = data.to_json()
response = gateway.request(payload, gateway='forecast')
resp = json.loads(response.payload)
print(resp)
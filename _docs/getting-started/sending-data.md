---
title: Sending Data to a Swarm
category: Getting Started
order: 5
---

## Gateways

In our Swarm definition, we defined a Gateway that uses gRPC and gave it the name `hello-world`. Now that we have our Swarm deployed, we can send data to this Gateway. To do this, we can use the Gateway class in the python SDK.

```python
from bytewax import Gateway
gateway = Gateway()
print(Gateway.request({'name':'Bee'}, gateway = 'hello-world'))
```

Here we are instantiating a Gateway object and then using the `request()` method to send our payload to the `hello-world` Gateway that we defined in our Swarm. When using the `request()` method, our code will wait for the response from the Gateway.

The data will be returned as a JSON object to be used or deserialized by the client. The data being sent to the Gateway should also be JSON serializable or it will fail.

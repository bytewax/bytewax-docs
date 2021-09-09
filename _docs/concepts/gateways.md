---
title: Gateways
category: Concepts
order: 3
---

Gateways are data entry points or connectors. These can be gRPC endpoints, Kafka connectors, or RESTful endpoints. These are deployed on Bytewax and can be reached by other services. The Bytewax SDK contains methods that allow developers to easily connect data sources to Bytewax via requests, topics or other.  In the examples so far, we have seen gateways that are endpoints that we can make requests to and receive results back from.

## Creating a Gateway

Gateways are defined in a Swarm definition. This is the default gateway bee that uses gRPC to send data to Bytewax.

```yaml
  - name: hello-world-input-bee
    type: gateway-input
    spec:
      name: hello-world
```

And then can be used in an application via the SDK like the following example.

```python
from bytewax import Gateway
gateway = Gateway()
print(gateway.request({'name':'Bee'}, gateway = 'hello-world'))
```

Here we have instantiated a Gateway object and we are using our machine's authentication token to authenticate. We are then sending data via a request method. This method waits for a response from Bytewax.

Another possible method to send data to a Gateway is the `submit()` method, which will send data and then close the connection and not wait for a response. This is good for Swarms that publish to a data store or another system and a response is not needed.

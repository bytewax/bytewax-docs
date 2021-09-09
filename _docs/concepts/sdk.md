---
title: Bytewax SDK
category: Concepts
order: 4
---

The Bytewax Python SDK is available on PyPI - [bytewax](https://pypi.org/project/bytewax/). This is currently the only language support we have, but we will be expanding so check back for other languages. Also reach out to us as we may have other clients available that aren't shown here.

## Swarm

### Swarm()

Bytewax has the concept of a Swarm object that is used to provide information to the Bees, since they do not have a concept of which Swarm they are running in. The Swarm object also provides methods that can be used to communicate across bees. These are mainly:

#### `swarm.publish(data, context=context)`

**Arguments**:

- `data`: This is the data you would like to send to the next swarm. This can be any type and will be pickled and then passed to the next step in the swarm.
- `context (Dict)`: this is an internal object that is used by Bytewax.

#### `swarm.respond(response, context=context)`

**Arguments**:

- `response (JSON)`: This is the data you would like to send to the next swarm. This should be a JSON serializable type or the data should be serialized before it is passed.
- `context (Dict)`: this is an internal object that is used by Bytewax.

### DevSwarm()

It is important to be able to test run your Bees locally as you develop. We added a DevSwarm object to the SDK that mirrors most of the behavior of the Swarm object does on Bytewax. Instead of the `swarm.publish()` and `swarm.respond()` sending data through the internal platform, the data is stored in DevSwarm in

- `swarm.published`
- `swarm.responded`

Which are lists that will contain all of the data passed.

## Bee

A bee is a decorated function.

### `@register_bee(name='name')`

**Arguments**:

- `name (str)`: This is the name that you will use to reference your Bee in the Swarm YAML file.

## Gateway

### `Gateway.request(payload, gateway='gateway-name')`

Gateway request is a blocking request to Bytewax. It will wait for a return before continuing.
**Arguments**:

- `payload (JSON)`: This is the data you would like to send to the gateway for processing. This should be a JSON serializable type or the data should be serialized before it is passed.
- `gateway (Str)`: The name of the gateway to send data to.

### `Gateway.submit(payload, gateway='gateway-name')`

Gateway request is a non-blocking request to Bytewax. It will continue immediately without waiting for a response.

**Arguments**:

- `payload (JSON)`: This is the data you would like to send to the gateway for processing. This should be a JSON serializable type or the data should be serialized before it is passed.
- `gateway (Str)`: The name of the gateway to send data to.

## Errors

### LoginError
Error to return when no Bytewax token is available

### Unavailable
Error to return when the Bytewax API is unavailable

### SwarmNotFound
Error returned when the specified Swarm is not found

### SwarmCreationError
Error returned when creating a Swarm was unsuccessful

### SwarmDeletionError
Error returned when creating a Swarm was unsuccessful

### ResourceNotFound
Error returned when resource (Swarm or Bee) is not found
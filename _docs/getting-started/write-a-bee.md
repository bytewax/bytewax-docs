---
title: Write a Bee
category: Getting Started
order: 3
---

## Writing Bees

Bees are functions, written in code that will run on Bytewax. There can be multiple Bees in one file and Bytewax will load the file contents when the Bee is created as part of a Swarm, but the function will only run when new data comes in. This is designed this way so you can load a model initially and not on each function call. To register a Bee, we use the Bytewax SDK.

## Bytewax SDK

The Bytewax SDK provides us with primitives to pass data, register bees and interact with Bytewax. We need to import the `bytewax` module at the top of our file to use the methods and classes associated with it.

```python
from bytewax.swarm import register_bee
```

### Defining a Bee function

Bees are very similar to functions. And they run like a function would on your computer. To define a Bee function we use the Bytewax `register_bee` decorator. Let's look at our `hello` Bee.

```python
@register_bee(name = "hello")
def hello(swarm, payload, context):
    print("hello {}".format(payload['name']))
    swarm.publish(payload,context=context)
```

### Processing messages

Each time the Bee preceding this Bee that we specified in our Swarm YAML file publishes a message, Bytewax will invoke the function hello in this file with the `swarm`, `payload`, and `context` arguments.

The first argument, `swarm`, is an object that contains methods and information related to the Swarm that this Bee is running in. The `swarm` object can be used to `.publish()` a message for processing by the next bee in the pipeline or to `.respond()` from the Swarm back to the caller.

The second argument, `payload`, is the message that was passed to this Bee from the gateway-input Bee.

The last argument is the context and is used internally to pass metadata through the swarm.

In this example the only logic in our `hello` Bee is that we will print the `payload`. The print statement can be found in the bee logs in the dashboard or via the cli like shown below.

![Bee Logs](/assets/img/docs/logs.png)

#### Publishing

In our case we are going to use the `swarm.publish()` method to pass the `payload` to our next Bee based on which Bees we have listed in our Swarm's YAML file as receiving their input from `hello` Bee.

```python
swarm.publish(payload,context=context)
```

#### Responding

When we want to return some data to where the original request was made from (in the case of HTTP or gRPC Gateways), we use the `swarm.respond()` method to respond to through the Gateway. Let's take a look at our `goodbye` Bee which is going to respond to the request made to our Gateway. 

```python
@register_bee(name = "goodbye")
def goodbye(swarm, payload, context):
    swarm.respond("goodbye {}".format(payload['name']), context = context)
```

In the next section we will deploy our Swarm and then following that we will look at how to send and receive data like we mentioned above.
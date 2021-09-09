---
title: Define a Swarm
category: Getting Started
order: 2
---

## What is a Swarm?

A Bytewax Swarm is a sequence of processing steps. Each individual processing step in a Swarm is what we call a Bee. In other words, a Swarm is a collection of Bees arranged into a topology or a directed acyclic graph (DAG).

A swarm is written in a declarative YAML format and here we will define the flow data takes through the swarm.

```yaml
---
name: hello-world
bees:

  - name: hello-world-input-bee
    type: gateway-input
    spec:
      name: hello-world

  - name: hello
    type: python
    input:
      name: hello-world-input-bee
    spec:
      image: registry.bytewax.net/hello-world:latest
      file: hello.py
      bee: hello 
      
  - name: goodbye
    type: python
    input: 
      name: hello
    spec:
      image: registry.bytewax.net/hello-world:latest
      file: hello.py
      bee: goodbye
```

Let’s take a look at our Swarm definition. At the top of the swarm definition, we give our Swarm the name hello-world. Below that we have a list of Bees. The first of which is our `gateway-input` Bee that we have named `hello-world-input-bee` the next, named `hello` is a `python` type and specifies a spec that includes an image, a file, and a Bee. The final bee is the goodbye bee, which is another Python bee.

### Gateway Input

In order for our first Bee to receive messages, we’ll need to tell Bytewax to configure a Gateway for us. Configuring a Gateway will allow us to use the Bytewax SDK to send messages to our Swarm. We have configured that here by using a predefined Bytewax Bee type called `gateway-input`. For more information on Bee types and available Bees, see the detailed [Bees documentation](../../concepts/bees)

### Defining our first Bee

Next, we define our `hello` Bee. We’ll give our Bee a name, and a type. This Bee is written in Python, which is why we have set the type parameter of this Bee to python.

### Bee input

Each Bee in a Swarm needs to configure a way to receive messages. To do that, we’ll set the `name` field of `input` to match that of the `gateway-input` Bee we defined above: `hello-world-input-bee`. If you look at the `goodbye` Bee you can see the `input` for that Bee is the `hello` Bee.

### Bee spec

A Bee spec is configurable information that is specific to the type of Bee. The `hello` and `goodbye` Bees are using the `python` Bee `type` and the spec is specific to it. The `python` Bee `type` has three required fields: `file`, `image` and `bee`. The `file` argument tells Bytewax where to find the file that this Bee is defined in. The `image` argument is the Docker image that contains the code and dependencies for this Bee, and finally, the `bee` argument tells Bytewax which function to call, but more on that in the next section.

---
title: Bees
category: Concepts
order: 1
---

A Bee contains the logic for each step in a Swarm. Whether that is tokenizing text, augmenting data or making a prediction with an existing model. Users can write custom Bees that take advantage of custom internal libraries or they can leverage Bees from built by the Bytewax team or shared by the broader Bytewax community. The reusability and modularity of the Bees comes from the design of how they work.

Bees are stateless. They have no concept of the Swarm that they are in, but rather will receive the Swarm object, and context with the data payload. This allows a Bee to accept a set of configuration variables and then can be reused in different Swarms. This design is to support that many data pipelines are the result of collaboration across internal teams and the sharing of knowledge across the data science community. We wanted to support teams managing individual Bees that could be used by others to construct their Swarms.

Once a Bee's logic is executed, the bee can either publish data for the next Bee in the swarm or respond to the original request that passed data through the Gateway.

## Bees in Swarms

A collection of Bees make up a Swarm, they can be running sequentially or in parallel as shown in the diagram below.

![Swarm architecture](/assets/images/docs/swarm_architecture.svg)

In a Swarm yaml, Bees will be defined by at least 3, but most likely 4 fields. These are the Bee definition and the fields will be at minimum:
- `name`
- `type`
- `spec`

The additional 4th, is `input`. This is not required for all Bees in the case, like for a gateway-input type Bee, which assumes the input is the gateway specified in the Bee as shown below.

```yaml
  - name: hello-world-input-bee
    type: gateway-input
    spec:
      name: hello-world
```

An example of the more common fields is shown below for a `python` type Bee.

```yaml
  - name: hello
    type: python
    input:
      name: hello-world-input-bee
    spec:
      image: registry.bytewax.net/hello-world:latest
      file: hello.py
      bee: hello
```

### Name

The Bee name defines what the Bee resource will be called when it is running on Bytewax. This will be unique to the Swarm and the name will be the identifier that can be used by subsequent Bees to define where their input will come from.

### Type

Bees on Bytewax, like Bees in the wild are not all the same :). Bee types refer to an implemented Bee created by your team, Bytewax, or the broader ecosystem. Each Bee will have a specified environment and will execute a certain logic that will depend on the implemented code and the variables that can be passed to it. This is easiest explained with an example in a swarm YAML file below.

```yaml
name: classify
bees:

  - name: input-bee
    type: gateway-input
    spec:
      name: img_classify

  - name: classify
    type: bytewax/tf_serving
    input:
      name: input-bee
    spec:
      url: http://s3.amazonaws.com/my_models/model_1

  - name: post-processing
    type: python
    input: 
      name: classify
    spec:
      image: registry.bytewax.net/classify:latest
      file: process.py
      bee: process

  - name: re-classify
    type: postgres
    input: 
      name: post-processing
    spec:
      db: postgresql://{{ secrets.postgres_creds }}@ip.address
      query: `INSERT INTO reclassify VALUES (data['process'], data['classification'], data['score'])`
```

In this example, we are using four different types of Bees. The first is a `gateway-input` Bee and it requires a `name` under the `spec` field. The second is a `tf_serving` type Bee that only requires the user to specify the URL of a model. The third Bee is a `python` Bee that runs some custom code and the final Bee is a database Bee that inserts into our database. Neither of the first two Bees or the final Bee requires the user to write any code, in these instances, the code has been written by others and you will be able to deploy this swarm directly and the Bee will leverage the spec to run.

### Spec

The `spec` is unique to the Bee type, these are defined when a Bee is created and shown in the documentation for the Bee. You can think of these as input variables that will be used by the Bee. In our example above our model URL path was all that was required for our tf-serving Bee to run our model.

### Input

The input is used to define the shape of the Swarm. Based on what Bee `name` is given in the Swarm's YAML file in the `input` field, the bee will receive the published data from that Bee. In our example above, the `post-processing` Bee will receive the data published by the `tf-serving` Bee.

Let's continue on to show what the internals of a Bee look like.

## Writing a Bee

All Bees, whether community written, Bytewax written or user written will contain similar patterns required to work with the Bytewax framework despite having different logic and requiring different values to be configured in the `spec`. We will use a custom written `python` type bee to illustrate how a Bee is structured.

```yaml
  - name: post-processing
    type: python
    input: 
      name: classify
    spec:
      image: registry.bytewax.net/classify:latest
      file: process.py
      bee: process
```

In the this Bee, we are configuring it to run with a specified image, file and a Bee. The Bee is a decorated function in the file that will execute on each payload. Below is the Bee's custom code that will run.

```python
from bytewax.swarm import register_bee

@register_bee(name='process')
def process(swarm, data, context):
  if data['score'] < .8:
    swarm.publish(data, context)
    swarm.respond('could not classify')
  else:
    swarm.respond({'data':data['classification']}, context)
```

### Registering a Bee

We decorate our function that we use to do some post-processing logic in the code snippet above. The decorator will let bytewax know that this is a Bee that we will run at the step indicated by the swarm.yaml.

```python
@register_bee(name='process')
```

The `name` argument shown in the decorator is the argument that will be used in the spec field `bee` for our python Bee. Having the name field in the decorator allows us to have multiple Bees in one file, which can be useful while developing and minimizing the number of files. 

The `name` in the decorator does not have to match the name of the function as it does in the snippet above, but it is sometimes useful and clarifying to do so.

### Publishing Data

When there are following Bees, we use the `swarm.publish()` method to pass the data to the next Bee(s).

```python
swarm.publish(data, context)
```

 When data is published it is serialized and passed to the next Bee(s) where it is deserialized. This is to allow sending all sorts of different types of data. Bytewax handles the serializing and deserializing and this is not noticeable to the user. If two Bees have the same `input` field value, they would receive the same data that is published. In addition to the data, we pass the context to the `publish()` method. The context contains metadata used internally and for more info on this checkout the [bytewax-sdk detailed docs](../sdk).

In our example swarm we have been using, this will pass the data to the re-classify Bee, which is storing the classification with low confidence into a database table that can be used later for re-training the model.

### Responding

At any point in the swarm, a Bee’s logic can dictate whether we need to exit the swarm and respond to the client. We use the `swarm.respond()` method to do so. The will serialize the data into a JSON object. If the data is not JSON serializable, it will have to be serialized before it is sent. In most cases, it is recommended to serialize the data prior to responding, to ensure it is in the format expected by the client.

## Writing a Custom Bee Type

{% include alert.html type="info" icon="error" content="Coming Soon" %}

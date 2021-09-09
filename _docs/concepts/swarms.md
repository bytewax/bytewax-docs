---
title: Swarms
category: Concepts
order: 2
---

A Swarm is a collection of processing steps organized into a directed acyclic graph (DAG) made up of [Bees](../bees). The Swarm is defined in a declarative YAML file and the structure of the DAG is determined by the input field for each bee.

![Swarm architecture](/assets/img/docs/swarm_architecture.svg)

Each Bee does not have any information of the Swarm it is running in, but is passed the
Swarm context via a Swarm object. When a user is running a Swarm on Bytewax this uses the Swarm() class and if the user is developing locally, this will use the DevSwarm() class.

### Swarm Definition

The Swarm definition has 2 parts to it. The name of the swarm, which must be unique to your bytewax cluster and a list of bees.

```yaml
name: my_swarm
bees:
  - name: bee_name1
  ...
```

The structure of the fields for each individual Bee is dependent on the type as we discussed in the [Bees section](../bees).

When a user deploys a Swarm on Bytewax with the command line tool, Bytewax will translate the Swarm into the resources that will be deployed on the cluster. This is done by an internal system called the Beekeeper. The beekeeper will validate your Swarm's yaml file and if it is valid, will create the resources.

### Swarm Objects

Bytewax has the concept of a Swarm object that is used to provide information to the Bees, since they do not have a concept of which Swarm they are running in. The Swarm object also provides methods that can be used to communicate across bees. We covered these in the [Bees section](../bees). For more information on how to use the Swarm object, check out the [Bytewax SDK section](../sdk).

### Testing Locally with the DevSwarm Object

It is important to be able to test run your Bees locally as you develop. We added a DevSwarm object to the SDK that mirrors most of the behavior of the Swarm object does on Bytewax. You can use the DevSwarm() class in the SDK to do so. Let’s take a look at how we would run our `process` Bee locally using our DevSwarm() class.

```python
from bytewax.swarm import register_bee

@register_bee(name='process')
def process(swarm, data, context):
  if data['score'] < .8:
    swarm.publish(data, context)
    swarm.respond('could not classify')
  else:
    swarm.respond({'data':data['classification']}, context)

if __name__ == '__main__':
    swarm = DevSwarm()
    data = {'score':0.75, 'classification':'cat'}
    process(swarm, data, {})
    print("published: {}".format(swarm.published))

    data = {'score':0.85, 'classification':'cat'}
    process(swarm, data, {})
    print("responded: {}".format(swarm.responded))
```

Running the python file above would print the following:

```bash
published: [{'score':0.75, 'classification':'cat'}]
responded: ['could not classify', {'data':cat}]
```

In this file we have written our Bee exactly as we would have to run on Bytewax. We then instantiated a DevSwarm object and used it to pass it to our functions. This is allowing us to test our Bees as we develop locally and we could implement automated testing with this as well.

### `swarm.published`

In the instance above, the `print(swarm.published)` line would print out a list of the data that was published. In this case, the first time we ran the bee we gave it a score of 0.75 so published would contain the data passed in. It is important to note that `swarm.published` is a list and will continue to add items to it as you pass them in.

### `swarm.responded`

In the next print statement, after we run the bee again with a score over 0.80, our conditional statement logic will not publish, but only respond. This adds another response to the `swarm.responded` object and we can see the two items printed out from the print statement.

---
title: Deploying a Swarm
category: Getting Started
order: 4
---

## Deploying a Swarm

Before we can deploy our swarm, we need to touch on the Docker containers that our bees will be running in.

### Docker Images

A Bee runs in a Docker container that is based on a Docker image that we can build and specify the contents of what will be available in it. Let's take our `hell-world` Swarm for example.

```Dockerfile
FROM registry.bytewax.net/bytewax/python-sdk:latest

COPY . /swarm
WORKDIR /swarm
```

Here we are basing our image on the Bytewax python-sdk image. This is common practice for images used on Bytewax. Next we `COPY` our bee files over and that’s it. If we had a model running in this example, we would be able to `COPY` that in as well. If we had additional python requirements, this would also be where we install those. Once that is done we will be able to deploy our Swarm using the Bytewax CLI.

Now we can build and push our image to the Bytewax registry.

```bash
docker login registry.bytewax.net # requires username and password

docker build -t registry.bytewax.net/hello-world:latest .

docker push registry.bytewax.net/hello-world:latest
```

### Waxctl

waxctl is the command-line interface that allows you to interact with Bytewax and the resources that have been deployed there. You can use the command-line tool to log in, as we saw earlier, but you can also, create swarms, update swarms and delete swarms. There are other resources you can interact with. For a full list, check out the [bytewax cli docs](../../concepts/cli).

### Creating our swarm

Once our Docker image has been built and pushed, we can go ahead and create our swarm. To create a swarm with `waxctl`, simply pass the path to your swarm definition YAML file name as the argument to the command and bytewax will set up all the infrastructure for your swarm.

```bash
waxctl create-swarm swarm.yaml
```

Once we have deployed our swarm, we can view its health in the dashboard or we can view it in from the CLI.

```bash
waxctl list-swarms
```

Which in our case will output
```JSON
[
    {'created_at': '2021-08-09T18:17:18Z', 'name': 'hello-world', 'namespace': 'example-userspace', 'status': 'healthy'}
]
```

Now let's move on to sending some data to our new Swarm.

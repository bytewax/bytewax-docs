---
title: Overview
category: Concepts
order: 0
---

## What is Bytewax?
Bytewax is a machine learning platform focused on processing data and serving machine learning models through real-time pipelines that we call Swarms. Bytewax lets you deploy, run and manage Swarms that will receive data through Gateways and make inferences/predictions with a machine learning model. Bytewax was developed specifically for facilitating real-time inference/prediction.

Let’s unpack some of that language around Gateways, Swarms, and Bees. [Swarms](/swarms) are topologies of individual functions that are referred to as worker Bees or [Bees](/../concepts/bees) and [Gateways](/../concepts/gateways) are endpoints or data connectors used to send and receive data.

![Swarm architecture](/assets/images/docs/swarm_architecture.svg)

To conceptualize this, you can think of data as flowing into a Gateway and then flowing through the Swarm with various steps (Bees) that change the data, send it down a different path in the Swarm or return the data through the Gateway.

Data is sent to Bytewax via a [Gateway](/../concepts/gateway) and Swarms will ingest data from the Gateway and potentially return it to the Gateway or send it to another Gateway.

{% include alert.html type="info"
  icon="build"
  content="Users can deploy Gateways developed by Bytewax or they can build their own custom Gateways" %}

Bytewax provides an SDK and a platform for building and deploying Swarms. Once the Swarms are deployed on Bytewax they can be integrated with an application to start receiving data and making inferences/predictions.

## Getting Started {#getting-started}

<!-- {% include alert.html type="error"
  icon="error"
  content="This documentation assumes <strong>basic level knowledge of Machine Learning</strong>. If you are new to machine learning, some of the terms may be confusing." %} -->

If you want to skip ahead and get building, the easiest way to do so is by following the [Getting Started Docs](../../getting-started) which follows and explains the [Hello World tutorial](https://docs.bytewax.io/tutorials/hello-world/).

To install Bytewax, simply install the package associated with the language you are using. For Python

```bash
pip install bytewax
```

Then reach out to the [Bytewax team](accounts@bytewax.io) to get a cluster set up or for your user account.

## Bytewax Architecture
Coming back to our Swarm diagram again, We will go into depth into each one of the components shown below in the documentation.

![Swarm architecture](/assets/images/docs/swarm_architecture.svg)

### Bytewax Cluster

The Bytewax line denotes the items that are running on the Bytewax cluster. A Bytewax cluster is a group of compute nodes that are running Bytewax on top of them. Bytewax Private Cloud is the most common offering and that is a private cluster that we manage for our customers in the cloud of their choice.

#### Networking, Security & Privacy

To facilitate a secure environment, a Bytewax cluster is secured within a private network that can be peered to the users network. This provides the security customers need for sensitive data while providing the convenience of a cloud service.

#### Scaling

Customers can specify the size of their cluster and this can be modified at any time with the addition or subtraction of nodes to the cluster. Within your cluster, individual bees can also scale independently. Bees share resources inside the cluster and to maintain the scalability of Bees your cluster will need to be sized to meet the throughput and load requirements.

#### Cluster Installation

Bytewax is installable with the Bytewax installation module. It can be installed and configured in under 30 minutes and have you ready to deploy Swarms.

---
title: Introduction
category: Getting Started
order: -1
---

## What is Bytewax?

Bytewax is a serverless platform for deploying, running, and managing machine learning models. Bytewax lets you deploy, run and manage pipelines that will ingest data and make inferences/predictions with a machine learning model. Bytewax was developed specifically for facilitating real-time inference/prediction. Bytewax pipelines can be simple with a single step or complex with multiple models. These pipelines are referred to as Swarms and the individual steps are referred to as worker Bees or just Bees. The entry point to a Swarm is what we call a Gateway and this is what is used to facilitate sending data to a Swarm. In this tutorial we will create a hello-world Swarm that has a hello-world Gateway and will run a hello Bee.

### Bees

Bees are the crux of a Swarm as they are the code that runs to manipulate data and make inferences and predictions. You can think of Bees as small scripts or functions that will do an individual task like encode some data or use a model to make a prediction given some input data.

### Swarms

A Swarm is a topology of Bees that work in sequence or in parallel to turn some input data into a decision or some other useful output data. You can think of a Swarm as an assembly line that will take the raw inputs, change them as needed and then output something. At Bytewax, we designed Swarms to be able to publish data to other systems or respond to the client that originally sent the data to the Swarm.

### Gateways

A Gateway is an entry point for data to enter into Bytewax. In some cases, this would be an endpoint you send a data payload to, but it could also be some other Gateway that listens to an s3 bucket or something similar. The Bytewax SDK provides useful methods for sending data to a Gateway and configuring them for a Swarm that we will cover in detail in the concepts [Gateway section](../../concepts/Gateways)

## How Does Bytewax Work?

Bytewax is a serverless platform. When you write code for a Bee and then define how data will ultimately reach that Bee in a Swarm you only have to create that Swarm and your Bee will be running on Bytewax. You don't have to configure any of the infrastructure. Underneath your Swarm are queues with topics and containers running code that facilitate running your Swarm.

Containers? Each Bee runs in a docker container. We can write custom Python code that we will register as a Bee and then this will run in a container on Bytewax. 

{% include alert.html type="info"
  icon="open_in_new"
  content="If you want to dig in on docker and how it works, check out the <a href='https://docs.docker.com/get-started/overview/' target='_blank'>docker documentation</a>." %}

Queues? A queue is a data structure that keeps messages in a sequence. Queues have topics used for separating which data is what. Queues also have the idea of a publisher and a listener in that a publisher will write messages to the queue and then a listener will listen for new messages on a queue. This is what connects all the Bees to create your Swarm. We will go into more depth in [the Swarms documentation](../../concepts/Swarms).
Let’s continue with the tutorial by [setting up our environment](../getting-started/set-up/)

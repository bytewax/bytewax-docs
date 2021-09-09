---
title: NLP Inference quickstart
description: Learn how to write an inference swarm for NLP. We will first tokenize the code snippet and then run inference from our pretrained model.
snippets:
  - url: /examples/nlp-inference/snippets/swarm.yaml
    name: swarm.yaml
    id: swarm
  - url: /examples/nlp-inference/snippets/make_tokens.py
    name: make_tokens.py
    id: make-tokens
  - url: /examples/nlp-inference/snippets/predict.py
    name: predict.py
    id: predict
  - url: /examples/nlp-inference/snippets/client.py
    name: client.py
    id: client
  - url: /examples/nlp-inference/snippets/create_swarm.sh
    name: create_swarm.sh
    id: create-swarm

featured-image: assets/img/nlp.png
featured-image-alt: NLP quickstart
---

## Create basic swarm

At the base level, a swarm is a definition of processing steps. Each individual processing step is what we call a bee. A swarm of bees will work on a stream of data :). Swarms are written in yaml and can be considered Directed Acyclic Graphs (DAGs). We are going to set up a swarm to use machine learning to classify code. In this example we already trained the model and setup an sklearn transform step in a notebook and then stored it in bytewx.
{: data-highlight="1-23" data-snippet="swarm"}

**Define a swarm**
At the top of the swarm definition, we give the swarm a name. The next part of this is the first input bee. the first step can be unique because we are receiving data from outside of bytewax potentially. We call this a `gateway-input` type.
{: data-highlight="1-7" data-snippet="swarm"}


**Define a bee to tokenize**
Next we can define a bee. A bee is just a processing step that can receive data and you can write complex or simple instructions on what to do with that data. 
This bee is `type = container`, which means it expects an image and a command. In this bee we are going to handle the tokenization of the text. This could also be a step that would augment the data or create/add features for later steps.
{: data-highlight="9-15" data-snippet="swarm"}

**Script for processing**
Each bee is like a serverless function, for this container type bee you can specify a docker `image` and the `command` that will run your code. The next step we will look at what goes into creating a bee. 
{: data-highlight="14-15" data-snippet="swarm"}

**Using the sdk in a bee**
Use the bytewax sdk to watch for new data and setup the processing steps.
Here we use an `sklearn pipeline` loaded from bytewax to pre-process the text and then publish it to the next step.
{: data-highlight="1-13" data-snippet="make-tokens"}

**Watching for data**
Each bee has the ability to watch for new data. This runs as an endless `for` loop
and is done with the `watch()` command.
{: data-highlight="6" data-snippet="make-tokens"}

**Passing data**
After processing, we need to pass data to the next step in the swarm. This is handled 
with the `swarm.publish()` where you can pass data and context to the next bee.
{: data-highlight="13" data-snippet="make-tokens"}

**Define a bee to classify language**
Back in our swarm definition we designated the next bee in this workflow to do the classification. This bees code (`run_inference.py`) is going to receive the output from the prior bee. 
{: data-highlight="17-23" data-snippet="swarm"}

**Make a prediction**
Use the bytewax sdk to watch for new data for prediction. Here we have loaded the model and then we start a watch loop. This will allow us to make predictions on new data. `swarm.respond` is used to pass the prediction back to the client.
{: data-highlight="6-11" data-snippet="run-inference"}

**Create the Swarm**
There is a command line tool to submit swarms (alternatively this could be done via GitHub actions). Login and submit the swarm yaml!
{: data-highlight="1-4" data-snippet="create-swarm"}

**Make a request to bytewax**
Now that we have created a workflow that will be listening to our `ghtop-inference` workflow we could start sending data from our application to this swarm. The `request()` will send the data to bytewax and wait for the returned result from the workflow.
{: data-highlight="10-12" data-snippet="client"}

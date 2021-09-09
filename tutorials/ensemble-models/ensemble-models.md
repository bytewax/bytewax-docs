---
title: Advanced ensemble model
description: This example shows the potential of bytewax by creating very complex swarm topologies. We will show a swarm that allows users to dynamically run live inference on multiple models and return a result based on the average response from each model.
snippets:
  - url: /examples/ensemble-models/snippets/swarm.yaml
    name: swarm.yaml
    id: swarm

featured-image: assets/img/ensemble.png
featured-image-alt: ensemble model
---

## Ensemble model example
In this example, our goal is to use multiple models to predict images. Each model will make its own prediction based on some preprocessed data and then we will return data based on the weighted average of each prediction.
{: data-highlight="1-69" data-snippet="swarm"}

**Swarm overview**
Our swarm will predict one of two classes - a real bear or teddy bear. We are going to use a few state of the art image recognition models alongside less sophisticated ones.
{: data-highlight="1-69" data-snippet="swarm"}

**Taking input from Gateway**
The first step to most live-inference type swarms is the gateway input. This allows us to process images coming from an API endpoint or the `bytewax` client.
{: data-highlight="4-7" data-snippet="swarm"}

**Process images**
Most incoming raw data isn't ready for inference on it's own. In this step we will run our custom preprocessing on each image. This step is common for all models.
{: data-highlight="9-15" data-snippet="swarm"}

**Microbatchnig**
Machine learning servers, and deep learning on GPU in particular, can benefit greatly from batching. This is very hard for live inference, as request-response model requires a lot of complex logic to enable this feature. With stream processing bytewax is capable of creating batches from incoming messages and helping inference servers maximize their performance. The batching bee is a predefined bee supplied by bytewax that allows users to enable batching with a few lines of code. Bytewax will provide a collection of predefined bees to abstract most of the typical use cases. Predefined bees will allow both bytewax and customers (and maybe even community) to create a marketplace of reusable, atomic pieces of logic that can be shared across multiple swarms.
{: data-highlight="17-23" data-snippet="swarm"}

**Setup 3 parallel models for ensemble**
In this section, we will run 3 models in parallel. Each will generate its independent predictions. By combining predictions from multiple models into a single, average prediction, our overall accuracy can be higher than any single model could achieve individually. Architecture like that is called an ensemble.
{: data-highlight="25-46" data-snippet="swarm"}

**Tensorflow serving**
Notice that we are using prebuilt bees here, in this example it's `tensorflow-serving` bee.  In this example we are pulling a pretrained model from s3.
{: data-highlight="25-30" data-snippet="swarm"}

**Easily attach GPU when necessary**
Another predefined bee could be `tensor-RT` - an optimized model serving architecture developed by NVidia. It can consume ONNX model, created by PyTorch, and run it efficiently on GPU. In this bee we are adding clause to enable GPU for this step.
{: data-highlight="32-38" data-snippet="swarm"}

**Reusable logic and reduce steps**
In this step we are reusing weighted average bee purpose built for ensemble models. This Bytewax supplied bee that gathers input from multiple models and reduces it into a single prediction.
{: data-highlight="48-54" data-snippet="swarm"}

**Join inputs**
Reducing multiple streams into a single message can be done in multiple ways. With the `join` keyword we ask bytewax to wait unil all the previous steps finish processing and publishing their messages and only then send all 3 predictions to `generate-prediction-from-ensemble` step.
{: data-highlight="51-54" data-snippet="swarm"}

**Respond to user**
After generating the batch of predictions, let's respond to user. This can be done by simple `respond` bee.
{: data-highlight="56-59" data-snippet="swarm"}

**Log predictions**
It's useful to log all the predictions for later model analysis or retraining. This is independent from the response flow since we want to examine each model separately. We can create `save-to-database` which will insert all the json payloads into a table for later querying. We are using `stack` reduce method here, it will trigger save as soon as each model returns it's inference independently.
{: data-highlight="61-69" data-snippet="swarm"}



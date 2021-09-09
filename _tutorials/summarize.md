---
title: NLP Quickstart
description: Learn how to write your first inference Swarm.
snippets:
  - url: tutorials/summarize/swarm.yaml
    name: swarm.yaml
    id: swarm
  - url: tutorials/summarize/summarize.py
    name: summarize.py
    id: summarize
  - url: tutorials/summarize/client.py
    name: client.py
    id: client
  - url: tutorials/summarize/Dockerfile
    name: Dockerfile
    id: dockerfile
  - url: tutorials/summarize/shell_commands.sh
    name: shell_commands.sh
    id: shell-commands
featured-image: assets/images/tutorials/nlp-processing.png
featured-image-alt: NLP Quickstart
download-url: tutorials/summarize/summarize.zip
---

# Building your first Swarm
In this example, we'll show you how to build a Swarm that will summarize short snippets of text. We'll be using the [Pegasus](https://arxiv.org/pdf/1912.08777.pdf) pre-trained model, and the Huggingface [transformers](https://github.com/huggingface/transformers/) library.

**What is a Swarm?**
A bytewax [Swarm](/concepts/swarms/) is a sequence of processing steps. Each individual processing step in a Swarm is what we call a Bee. In other words, a Swarm is a collection of Bees arranged in a sequence.
![Swarm architecture](/assets/img/docs/swarm_architecture.svg)
{: data-snippet="swarm"}

## Define a Swarm
Let's look at an example Swarm definition. We define our Swarm using YAML. At the top of the swarm definition, we give our Swarm the name `summarize`.
{: data-highlight="2" data-snippet="swarm"}

**Adding Bees to our Swarm**
After we have given the swarm a name, we can list out our bees under `bees:`. In order for our first Bee to receive messages, we'll need to tell bytewax to configure a gateway for us. Configuring a gateway will allow us to use the bytewax SDK to send messages to our Swarm. We'll configure that here by using a predefined bytewax Bee called `gateway-input`.
{: data-highlight="3-7" data-snippet="swarm"}

**Defining our first Bee**
Next, we define our first Bee. We'll give our Bee a `name`, and a `type`. This Bee is written in Python, so we'll set the `type` parameter of this Bee to `python`.
{: data-highlight="8-15" data-snippet="swarm"}

**Bee input**
Each Bee in a Swarm needs to configure a way to receive messages. To do that, we'll set the `name` field of `input` to match that of the `gateway-input` bee we defined above: `summarize-input-bee`.
{: data-highlight="10-11" data-snippet="swarm"}

**Bee spec**
A Bee spec is a way to tell bytewax how to run our code. This bee spec is specific to the `python` Bee type that we're using in this example, and has three required fields: `file`, `image` and `bee`. The `file` argument tells bytewax where to find the file that this Bee is defined in. The `image` argument is the Docker image that contains the code and depencencies for this Bee, and finally, the `bee` argument tells bytewax which function to call, but more on that in just a moment.
{: data-highlight="12-15" data-snippet="swarm"}

**Next steps**
Now that we've created our Swarm definition, we're ready to look at how to write the code for our Bee.

## Writing the code for a Bee
In this step, we're looking at the code within a Bee. On the highlighted line, we're importing the bytewax SDK decorator `register_bee`. We'll use this function to tell bytewax which function to call when this bee is processing a message.
{: data-highlight="7" data-snippet="summarize"}

**Defining a Bee function**
The `register_bee` takes an argument called `name`. It's important that this `name` argument matches the one that we defined in the `bee` field in the swarm definition for this step.
{: data-highlight="10" data-snippet="summarize"}

**Watching for messages**
Each time this Bee receives a message, it will invoke the function `summarize` in this file with the `swarm`, `payload` and `context` arguments.
{: data-highlight="11" data-snippet="summarize"}

The first argument `swarm` is a reference to the Swarm that this Bee is running in. The `swarm` object can be used to `.publish()` a message for processing by the next bee in the pipeline, or to `.respond()` from the Swarm back to the caller.
{: data-highlight="11" data-snippet="summarize"}

The second argument, `payload` is the message that was passed to this Bee from the `gateway-input` Bee. The last argument `context` is something we won't be covering in this example, and can be safely ignored.
{: data-highlight="11" data-snippet="summarize"}

**Processing a message**
In this Bee, we'll summarize the text sent to us in the `payload` argument.
{: data-highlight="11" data-snippet="summarize"}

**Loading the model**
Before we begin, we'll need to load our pretrained model and a tokenizer from the transformers library. Since this step will download a large model, we'll write these lines outside of the body of our `summarize` function so that they only happen once, when the Bee is loaded.
{: data-highlight="4-5" data-snippet="summarize"}

**Tokenizing the input**
Before we generate a summary, we'll need to transform our input string into a series of tokens. We'll do that using the `AutoTokenizer` class that we instantiated above to tokenize our `payload`.
{: data-highlight="12-14" data-snippet="summarize"}

**Generating the summary**
Now that we have our tokenized input, we can ask the model to generate a summary for us! For more information on how this works you can check out <a href="https://ai.googleblog.com/2020/06/pegasus-state-of-art-model-for.html">a blog on this model</a>
{: data-highlight="15" data-snippet="summarize"}

**Untokenizing the summary**
We now have our summary, but we'll need to take one more step before we can read it. The model will return a sequence of tokens that need to be decoded by the tokenizer to turn the summary into a string.
{: data-highlight="17" data-snippet="summarize"}

**Responding to the Client**
We can use the bytewax sdk to easily respond with the output from our summarization model.
{: data-highlight="18" data-snippet="summarize"}

## Deploying a Swarm to bytewax
In order to run this example yourself, you'll need to install the bytewax SDK, and the `waxctl` command line utility.
{: data-snippet="shell-commands"}

**Creating a virtual environment**
We recommend that you create a virtual environment to install Python packages into. If you are unfamiliar with virtual environments, check out the [Python user guide](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).
{: data-highlight="1" data-snippet="shell-commands"}

**Logging into bytewax**
First, you'll need to log into your bytewax account in order to generate an authentication token. This token will be used when we send messages to the bytewax Gateway.
{: data-highlight="3" data-snippet="shell-commands"}

**Deploying the Swarm**
Now that we're logged in, we can deploy our Swarm to bytewax!
{: data-highlight="5" data-snippet="shell-commands"}

## Making a request to bytewax
With our Swarm complete, we can now look at how to send a request to bytewax. For this example, we'll write a small script that you can run locally.
{: data-snippet="client"}

**Import the Gateway**
First, we'll need to import the bytewax SDK Gateway object and initialize it.
{: data-highlight="1-3" data-snippet="client"}

**Gateway.request()**
Now that we have our gateway object ready, we can send our first request to our Swarm. The `gateway.request()` method takes two arguments. The first argument will be the `payload` object that our `summarize` function receives. The second argument should match the name in the `spec` field of the gateway-input Bee that we configured in our `swarm.yaml` file.
{: data-highlight="5-8" data-snippet="client"}

**Running the client**
Now that we've reviewed the code we'll be using, let's run it! You should see a short summary of the text we sent to the Swarm printed out.
{: data-highlight="7" data-snippet="shell-commands"}

**Success!**
🐝 Congratulations! 🐝 We've successfully created and deployed our first Swarm, and sent a request to it for processing.

---
title: Bytewax Getting Started
description: Learn how Bytewax works with a Hello World example in this getting started tutorial. Press the down arrow and follow along with the text on the left which will highlight the corresponding code on the right.
snippets:
  - url: tutorials/hello-world/setup.sh
    name: setup.sh
    id: setup
  - url: tutorials/hello-world/swarm.yaml
    name: swarm.yaml
    id: swarm
  - url: tutorials/hello-world/hello.py
    name: hello.py
    id: hello
  - url: tutorials/hello-world/client.py
    name: client.py
    id: client
  - url: tutorials/hello-world/Dockerfile
    name: Dockerfile
    id: dockerfile
  - url: tutorials/hello-world/shell_commands.sh
    name: shell_commands.sh
    id: shell-commands
featured-image: tutorials/hello-world/hello-world.png
featured-image-alt: Hello World
download-url: tutorials/hello-world/hello-world.zip
---

# Building your first Swarm
In this tutorial, we'll show you how to build a hello world example. There is no machine learning being used here, this is primarily to show you how Bytewax works. First we will get our environment set up and then we will create a Swarm that will print `hello <name>` to the logs and then respond `goodbye <name>`.

Throughout the tutorial you will see a few different files with highlighted lines in the code panel that correspond to the section of text that provides an explanation of what is going on. If you are following along and would like to run the tutorial, you will have to copy the code and put it in a file on your local machine with a name that matches what is shown in the tab at the top of the highlighted code panel.

## Setup
If you haven't gotten your environment set up yet, we recommend using something to manage your Python environment like [pyenv](https://realpython.com/intro-to-pyenv/) or [conda](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html). Bytewax is tested and works with Python versions 3.7 and higher. Once you have a fresh environment set up, we can install Bytewax, which is a Python installable package. Bytewax comes with a command-line interface called `waxctl` you can use this to log in. We will also get logged in to the Bytewax registry.
{: data-highlight="1-3" data-snippet="setup"}

## Define a Swarm
What you see in the code panel is our hello world Swarm definition. We have defined this Swarm using YAML. At the top of the swarm definition, we gave the Swarm the name `hello-world`.  
{: data-highlight="2" data-snippet="swarm"}

**Adding Bees to our Swarm**
In order for our first Bee to receive messages, we'll need to tell Bytewax to configure a gateway for us. Configuring a gateway will allow us to use the Bytewax SDK to send messages to our Swarm. We'll configure that here by using a predefined Bytewax Bee type called `gateway-input`.
{: data-highlight="5-8" data-snippet="swarm"}

**Defining our first Bee**
Next, we define our first Bee. We'll give our Bee a `name`, and a `type`. This Bee is written in Python, so we'll set the `type` parameter of this Bee to `python`.
{: data-highlight="10-17" data-snippet="swarm"}

**Bee input**
Each Bee in a Swarm needs to configure a way to receive messages. To do that, we'll set the `name` field of `input` to match that of the `gateway-input` bee we defined above: `hello-world-input-bee`.
{: data-highlight="12-13" data-snippet="swarm"}

**Bee spec**
A Bee spec is a way to tell bytewax how to run our code. This bee spec is specific to the `python` Bee type that we're using in this example, and has three required fields: `file`, `image` and `bee`. The `file` argument tells Bytewax where to find the file that this Bee is defined in. The `image` argument is the Docker image that contains the code and dependencies for this Bee, and finally, the `bee` argument tells Bytewax which function to call, but more on that in just a moment.
{: data-highlight="14-17" data-snippet="swarm"}

**Defining our next Bee**
We can have many bees in a swarm. Our next bee will say hello in spanish. For our next bee we will specify to receive the input from the previous bee, hello.
{: data-highlight="21-22" data-snippet="swarm"}

**Next steps**
Now that we've created our Swarm definition, we're ready to look at how to write the code for our Bees.

## Writing Bees
We can have multiple bees in one file and then we will use the Bytewax SDK to register them individually.
{: data-snippet="hello"}

## Bytewax SDK
In this step, we're looking at the code within a Bee. On the highlighted line, we're importing the Bytewax SDK decorator `register_bee`. We'll use this function to tell Bytewax which function to call when this bee is processing a message.
{: data-highlight="1" data-snippet="hello"}

**Defining a Bee function**
The `register_bee` takes an argument called `name`. It's important that this `name` argument matches the one that we defined in the `bee` field in the swarm definition for this step.
{: data-highlight="3" data-snippet="hello"}

**Watching for messages**
Each time this Bee receives a message, it will invoke the function `hello` in this file with the `swarm`, `payload` and `context` arguments.
{: data-highlight="4" data-snippet="hello"}

The first argument `swarm` is a reference to the Swarm that this Bee is running in. The `swarm` object can be used to `.publish()` a message for processing by the next bee in the pipeline, or to `.respond()` from the Swarm back to the caller.
{: data-highlight="4" data-snippet="hello"}

The second argument, `payload` is the message that was passed to this Bee from the `gateway-input` Bee. The last argument `context` is something we won't be covering in this example, and can be safely ignored.
{: data-highlight="4" data-snippet="hello"}

### Processing a message
In this Bee, we are going to print out some information. This will show up in the logs. Then we are going to publish the message to the next Bee as was defined in our Swarm definition.
{: data-highlight="5-6" data-snippet="hello"}

**Publishing**
In order to pass data on to the next step in the swarm that we previously defined in `swarm.yaml`, we need to instruct the bee to publish it.
{: data-highlight="6" data-snippet="hello"}

**Responding**
If instead of publishing to the next Bee, we want to respond to the client, we can use the `swarm.respond()` method as we have in the `goodbye` Bee.
{: data-highlight="10" data-snippet="hello"}

### Adding Additional Bees
We can add as many bees as required in the same file or other files as long as they are decorated and given a name. In this example, we have the hello bee and then the goodbye bee.
{: data-highlight="8-10" data-snippet="hello"}

## Deploying a Swarm to bytewax
In order to deploy a swarm we will need to build and push our image that we have written in a Dockerfile. We are going to write that in the next steps. Once that is done, we can create the Swarm with the `waxctl`.

**Using Docker and Writing a Dockerfile**
Bees run in docker containers. This allows us to add custom libraries and customize what our Bees can use. Our docker image will be based off of the bytewax python-sdk image so that it includes the bytewax sdk. We can add in whichever models, data or files are required here and we can also install further requirements if needed.
{: data-snippet="dockerfile"}

**Building and Pushing your Image**
We will use your local docker, which we used to log in to the Bytewax registry in the set up, to build our docker image from our docker container and then push that to the registry.
{: data-highlight="1-3" data-snippet="shell-commands"}

**Deploying our Swarm**
Now that we have pushed our docker image to the Bytewax registry, Bytewax will be able to use that image to run our Bees. We are now ready to deploy our hello-world Swarm.
{: data-highlight="5" data-snippet="shell-commands"}

**Viewing our Swarm**
Congratulations on deploying your first swarm, the resources that you just created will be visible in the dashboard. Go check them out by clicking through on the hello-world Swarm in the list of Swarms in the [dashboard](https://dashboard.bytewax.net/swarms).

## Making a request to bytewax
With our Swarm created, we can now look at how to send a request to bytewax. For this example, we'll write a small script that you can run locally.
{: data-snippet="client"}

**Import the Gateway**
First, we'll need to import the bytewax SDK Gateway object and initialize it.
{: data-highlight="1-2" data-snippet="client"}

**Gateway.request()**
Now that we have our gateway object ready, we can send our first request to our Swarm. The `gateway.request()` method takes two arguments. The first argument will be the `payload` object that our `hello` function receives. The second argument should match the name in the `spec` field of the gateway-input Bee that we configured in our `swarm.yaml` file.
{: data-highlight="3" data-snippet="client"}

**Running the client**
Now that we've reviewed the code we'll be using, let's run it with `python ./client.py`. This will send the payload to the swarm, which will execute our bees and you should see something like `goodbye Bee` print out. You can change the name parameter in `client.py` to return a different name than Bee.

**Viewing the Logs**
Remember how we printed the name in the `hello` Bee? If we go back to the dashboard, we will be able to see that in the logs by clicking on the hello Bee in the detailed swarm view. Alternatively we can use waxctl to get the logs with `waxctl get-bee-logs hello-world hello`.

**Success!**
🐝 Congratulations! 🐝 We've successfully completed the hello world example for Bytewax.

**Next Steps**
Now that you have successfully built your first swarm you can go through some of the more [advanced tutorials](https://docs.bytewax.io/tutorials/) or dig into the concepts in the [documentation](https://docs.bytewax.io/concepts/overview/).

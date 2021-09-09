---
title: Bytewax Time Series Forecasting
description: Build an ARIMA time series forecasting swarm using jupyter notebooks and test it with Bytewax DevSwarm.
snippets:
  - url: tutorials/timeseries/swarm.yaml
    name: swarm.yaml
    id: swarm
  - url: tutorials/timeseries/client.py
    name: client.py
    id: client
  - url: tutorials/timeseries/Dockerfile
    name: Dockerfile
    id: dockerfile
  - url: tutorials/timeseries/shell_commands.sh
    name: shell_commands.sh
    id: shell-commands
notebooks:
  - url: tutorials/timeseries/forecast.ipynb
    name: forecast.ipynb
    id: forecast
featured-image: assets/img/tutorials/forecasting.png
featured-image-alt: ARIMA Time Series Forecasting
download-url: tutorials/timeseries/timeseries.zip
---

# Using DevSwarm and Jupyter Notebooks for forecasting
In this example, we are going to leverage the bytewax DevSwarm capabilities to develop and test our swarm locally in a jupyter notebook and then we will deploy the bees running in our notebook in our remote environment.

## What is a DevSwarm?
A bytewax DevSwarm is an object that we can use to test the functionality of bees as we develop and also for writing tests it simulates much of what is done by bytewax remotely. When our swarm is running on bytewax, a swarm object is passed to it and the bee can use the `publish()` or `respond()` methods. This is similar to the methods available to the DevSwarm. The difference is that the `publish()` and `respond()` methods assign values to a DevSwarm object that you can retrieve in your local dev environment.
{: cell-highlight="1" data-snippet="forecast"}

**Importing the DevSwarm Class**
The DevSwarm is part of the bytewax SDK. We can import it at the top of our jupyter notebook we import `DevSwarm` from the bytewax SDK. This has no impact on the file when it runs on bytewax remotely.
{: cell-highlight="1" data-snippet="forecast"}

**Using the DevSwarm**
In order to simulate how a swarm object is passed to bees when they run remotely on bytewax, We instantiate a swarm object that we can then pass to our bees we will be developing.
{: cell-highlight="1" data-snippet="forecast"}

**Running a DevSwarm**
For now let's assume we have 2 bees, `data_prep` and `arima`. In `data_prep` we will be publishing data to the next bee with the `publish()` method and then in `arima` we will be responding to our client with the `respond()` method. Now that we have our DevSwarm object that we assigned to `swarm` we can then call our bees like functions (which they are) and pass the `swarm`. Our first bee publishes, so we will get a DevSwarm object called `published` that will contain our published result. Similarly on line 64, our bee that publishes will add its output data to the DevSwarm `responded` object.
{: cell-highlight="2" data-snippet="forecast"}

**A note on published and responded**
`published` and `responded` are lists and for each time a bee publishes, the output will be appended. This will continue to add objects until it is cleared from memory, so when you are running a DevSwarm, you need to be explicit in calling the index of the output if you are passing it to the next bee.
{: cell-highlight="2" data-snippet="forecast"}

**Simulating JSON serialization in a DevSwarm**
There are a number of different bytewax Gateways. When we run this swarm we will use the default bytewax Gateway and this expects JSON data, so in our notebook here we simulate that instead of reading our csv file directly to a Pandas DataFrame object.
{: cell-highlight="3" data-snippet="forecast"}

## Writing Bees in a Jupyter Notebook

In this step, we're looking at the bee code within a Jupyter notebook. Like the python bees we have written in other tutorials we decorate the bee with `register_bee`, which takes an argument called `name`. It's important that this `name` argument matches the one that we defined in the `bee` field in the swarm definition for this step. At the end of the function we use `swarm.publish()`. **Note** that there is no return here and thats why we used the `published` object earlier with the DevSwarm.
{: cell-highlight="3" data-snippet="forecast"}

**Making a Forecast**
For this swarm we are actually training our ARIMA model every time we call this bee. This might not be the best method if you are sending a stream of data to this endpoint. For more information about the ARIMA method and ARIMA package in Python you can checkout the [documentation](https://pypi.org/project/pmdarima/). In this bee, we are splitting the data into test and train. We are then training our model by trying various parameters for the different ARIMA coefficients. Once we have the best fit, we checkout our correlation coefficient out of sample and then we make a prediction for the future. We only return the prediction if our correlation coefficient is above 75% because we are more confident in it.
{: cell-highlight="4" data-snippet="forecast"}

There are all sorts of cool benefits to developing in Notebooks like inline visualizations and rerunning cells, however you would not necessarily want to run a notebook in production. In our case, since we are just using the bee functions, we can put our bee into a swarm and then deploy it and we don't have to worry about the complexities of our notebook executing every time a bee receives new data.

### Defining our Swarm

Luckily for us, the hard part here is taken care of by bytewax and we can create a swarm using python bees the same way we have in the other tutorials. We are going to have a separate bee defined in our yaml file for each one of our functions and the `data-prep` output will be passed to `arima`.
{: data-snippet="swarm"}

## Deploying Our Swarm to bytewax

Following the same flow as the previous tutorials, we can use waxctl to deploy our swarm.
{: data-highlight="5" data-snippet="shell-commands"}

## Making a request to bytewax

With our Swarm created, we can now look at how to send a request to bytewax. For this example, we'll write a small script that you can run locally to send data to our swarm.
{: data-snippet="client"}

**Success!**
🐝 Congratulations! 🐝 We've successfully run a swarm locally from a Jupyter Notebook.

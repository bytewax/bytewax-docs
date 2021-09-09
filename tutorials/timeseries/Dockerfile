FROM registry.bytewax.net/bytewax/python-sdk:latest

COPY ./requirements.txt /
RUN pip install -r /requirements.txt

RUN mkdir swarm

COPY swarm/forecast.ipynb swarm/forecast.ipynb
WORKDIR /swarm
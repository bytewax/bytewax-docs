docker build -t registry.bytewax.net/hello-world:latest .

docker push registry.bytewax.net/hello-world:latest

waxctl create-swarm swarm.yaml

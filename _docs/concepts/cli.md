---
title: Bytewax CLI
category: Concepts
order: 5
---

The Bytewax Command-Line Interface ships with the Python SDK. The CLI has the following available commands.

## login

Login to Bytewax. This will authenticate you to start accessing/modifying resources. You will be taken to a browser login screen.

```bash
waxctl login
```

## logout

Logout of Bytewax. Destroys your current session.

```bash
waxctl logout
```

## create-swarm

Create a Swarm with a swarm definition file.

```bash
waxctl create-swarm [OPTIONS] SWARM_DEFINITION_FILE
```

## delete-swarm

Delete a Swarm. This is permanent.

```bash
waxctl delete-swarm [OPTIONS] SWARM_NAME
```

## get-bee

Get information about a single Bee in a Swarm.

```bash
waxctl get-bee [OPTIONS] SWARM_NAME BEE_NAME
```

## get-bee-logs

Get the logs of a Bee, including the logs of a Bee which may have been terminated because of an error.

```bash
waxctl get-bee-logs [OPTIONS] SWARM_NAME BEE_NAME
```

## get-bees

Get a summary of all the Bees in a Swarm.

```bash
waxctl get-bees [OPTIONS] SWARM_NAME
```

## get-swarm

Get the information associated with a certain Swarm.

```bash
waxctl get-swarm [OPTIONS] SWARM_NAME
```

## list-swarms

List all swarms on the cluster.

```bash
waxctl list-swarms [OPTIONS]
```

---
title: Monitoring and Logging
category: Getting Started
order: 6
---

Bytewax comes with a certain amount of monitoring out of the box. This is primarily for monitoring your swarm resources and not for the model itself, there are other tools that can be integrated to do that.

The health status and logs of your bees and swarms can be found via `waxctl` or via the bytewax dashboard. To retrieve the logs of our hello Bee, let's use `waxctl`.

```bash
waxctl get-bee-logs hello-world hello
```

Which for me, output:

```txt
DEBUG:root:Swarm config: {'input': {'name': 'hello-world-input-bee'}, 'name': 'hello', 'spec': {'bee': 'hello', 'file': 
'hello.py', 'image': 'registry.bytewax.net/hello-world:latest'}, 'type': 'python', 'token': 'example', 'swarm_name': 
'hello-world', 'swarm_api_address': 'hello-world-api.example-userspace:50051', 'swarm_version': '1'}
hello Zander
```

If I wanted to monitor my swarm from the dashboard I would click into my individual swarm and then I could see the logs, status, resource visualizations etc.

![Individual Bee](/assets/images/docs/logs.png)

🐝 Congratulations! 🐝 We've successfully created and deployed our first Swarm, sent a request to it for processing and used the various methods available for troubleshooting, monitoring and debugging.

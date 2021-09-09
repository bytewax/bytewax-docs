---
title: Secrets
category: Concepts
order: 6
---

At some point, you may need to add some secrets to your swarm; like a connection string for a database or an API token for some data service. To facilitate this, secrets can be added to bytewax via the CLI or the dashboard and then accessed in a swarm yaml with `{{ secrets.my_secret }}` or in a bee with `bytewax.get_secret(name = 'my_secret')`.

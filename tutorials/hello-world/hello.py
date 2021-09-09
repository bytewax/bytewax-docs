from bytewax.swarm import register_bee

@register_bee(name = "hello")
def hello(swarm, payload, context):
    print("hello {}".format(payload['name']))
    swarm.publish(payload,context=context)

@register_bee(name = "goodbye")
def goodbye(swarm, payload, context):
    swarm.respond("goodbye {}".format(payload['name']), context = context)

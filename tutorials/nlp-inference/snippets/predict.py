 from bytewax import swarm, model

# load the model from bytewax
model = model.load(name='ghtop-classifier' version='1.0.0')

@register_bee(name = "predict")
def predict(swarm, req, context):
    # run the sklearn model predict function
    prediction = model.predict(req)

    # return the response to the request loop
    swarm.respond(prediction[0], context=context)

from bytewax import register_bee
from sklearn.preprocessing import FunctionTransformer

pipeline = processing.load_pipeline(name='make_tokens')

@register_bee(name = "make-tokens")
def make_tokens(swarm, req, context):

    # Use the pipeline to transform the data
    cleaned_data = pipeline['preprocessing'].transform([req['snippet']])
    tokenized_data = pipeline['vectorizer'].transform(cleaned_data)

    # publish the tokenized data to the next step
    swarm.publish(tokenized_data, context)

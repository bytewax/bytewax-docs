from bytewax.gateway import Gateway

gateway = Gateway()

response = gateway.request(
    """Students are often tasked with reading a document and producing a summary (for example, a book report) to demonstrate both reading comprehension and writing ability. This abstractive text summarization is one of the most challenging tasks in natural language processing, involving understanding of long passages, information compression, and language generation.""",
    gateway="summarize",
)
print(response.payload)

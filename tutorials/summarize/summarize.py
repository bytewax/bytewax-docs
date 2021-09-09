import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("google/pegasus-xsum")
model = AutoModelForSeq2SeqLM.from_pretrained("google/pegasus-xsum")

from bytewax.swarm import register_bee


@register_bee(name="summarize")
def summarize(swarm, payload, context):
    batch = tokenizer(
        payload, truncation=True, padding="longest", return_tensors="pt"
    ).to("cpu")
    translated = model.generate(**batch)

    summary = tokenizer.batch_decode(translated, skip_special_tokens=True)[0]
    swarm.respond(summary, context=context)

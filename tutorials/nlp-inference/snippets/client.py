from bytewax import request

# a string that is a python code snippet 
code_to_detect = """
import time

time.time()
"""

# make a bytewax request with the code snippet
prediction = request(code_to_detect, gateway="ghtop-inference")
print(prediction)

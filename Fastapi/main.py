from fastapi import FastAPI
from jinja2 import Template


app = FastAPI()

# Move the template logic into the endpoint so it triggers on every page refresh
template_string = "Hello {{ name }}! You have {{ messages }} new alerts."
template = Template(template_string)

@app.get("/")
def read_root():
    output = template.render(name="Navya", messages=5)
    
    return output
